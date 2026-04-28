<template>
  <div class="flex-1 flex flex-col">
    <LoadingComponent
      v-if="officesStatus === 'pending'"
      :custom-class="'flex-1'"
    />
    <ErrorComponent v-if="officesStatus === 'error'" :custom-class="'flex-1'" />
    <div v-if="offices" class="flex flex-col gap-8">
      <p class="text-2xl font-bold">CREATE NEW TICKET</p>

      <Form
        :validation-schema="schema"
        :initial-values="defaultValues"
        @submit="onSubmit"
        class="flex flex-col gap-8 p-12 rounded-md shadow-sm relative overflow-hidden"
      >
        <div class="absolute top-0 left-0 h-full w-[6px] bg-accent"></div>
        <!-- SECTION 01: REQUEST IDENTIFICATION -->
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-4">
            <div
              class="w-9 h-9 rounded-full bg-blue-100 text-blue-600 text-sm font-bold flex items-center justify-center"
            >
              01
            </div>
            <p
              class="text-sm font-semibold tracking-widest text-gray-600 uppercase"
            >
              Request Identification
            </p>
          </div>

          <div class="flex gap-8">
            <!-- Recipient Office -->
            <div class="flex flex-col gap-2 flex-1">
              <label
                class="text-xs font-semibold tracking-widest text-gray-500 uppercase"
              >
                Recipient Office
              </label>
              <Field name="recipientOfficeId" v-slot="{ field, errorMessage }">
                <select
                  v-bind="field"
                  class="p-3 bg-bg-primary border border-gray-200 rounded-md text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="" disabled>Select an office...</option>
                  <option
                    v-for="office in offices"
                    :key="office.id"
                    :value="office.id"
                  >
                    {{ office.name }} ({{ office.code }})
                  </option>
                </select>
                <span v-if="errorMessage" class="text-red-500 text-xs">{{
                  errorMessage
                }}</span>
              </Field>
            </div>

            <!-- Priority Level -->
            <div class="flex flex-col gap-2">
              <label
                class="text-xs font-semibold tracking-widest text-gray-500 uppercase"
              >
                Priority Level
              </label>
              <Field name="priorityLevel" v-slot="{ field }">
                <div class="flex">
                  <button
                    v-for="level in priorityLevels"
                    :key="level.value"
                    type="button"
                    @click="field.onChange(level.value)"
                    :class="
                      cn(
                        'px-5 py-2 text-xs font-semibold tracking-widest uppercase border transition-all',
                        field.value === level.value
                          ? {
                              'bg-white z-10': true,
                              'border-blue-600 text-blue-600':
                                level.value === 'routine',
                              'border-orange-500 text-amber-500':
                                level.value === 'urgent',
                              'border-red-600 text-red-600':
                                level.value === 'emergency',
                            }
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                        level.value === 'routine' ? 'rounded-l-sm' : '',
                        level.value === 'emergency' ? 'rounded-r-sm' : '',
                        level.value !== 'routine' ? '-ml-px' : '',
                      )
                    "
                  >
                    {{ level.label }}
                  </button>
                </div>
              </Field>
              <ErrorMessage name="priorityLevel" class="text-red-500 text-xs" />
            </div>
          </div>

          <!-- Request Title -->
          <div class="flex flex-col gap-2">
            <label
              class="text-xs font-semibold tracking-widest text-gray-500 uppercase"
            >
              Request Title
            </label>
            <Field
              :validate-on-blur="false"
              :validate-on-change="false"
              name="requestTitle"
              type="text"
              class="p-4 bg-bg-primary border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Brief summary of the request"
            />
            <ErrorMessage name="requestTitle" class="text-red-500 text-xs" />
          </div>
        </div>

        <!-- SECTION 02: DETAILED DESCRIPTION -->
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-4">
            <div
              class="w-9 h-9 rounded-full bg-blue-100 text-blue-600 text-sm font-bold flex items-center justify-center"
            >
              02
            </div>
            <p
              class="text-sm font-semibold tracking-widest text-gray-600 uppercase"
            >
              Detailed Description
            </p>
          </div>

          <!-- Scope of Work -->
          <div class="flex flex-col gap-2">
            <label
              class="text-xs font-semibold tracking-widest text-gray-500 uppercase"
            >
              Scope of Work &amp; Justification
            </label>
            <Field
              :validate-on-blur="false"
              :validate-on-change="false"
              name="description"
              as="textarea"
              rows="6"
              class="p-4 bg-bg-primary border border-gray-200 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Provide all necessary context, dates, and specific requirements for this ticket"
            />
            <ErrorMessage name="description" class="text-red-500 text-xs" />
          </div>
        </div>

        <div class="flex justify-end">
          <Button type="submit" class="rounded-md text-white px-8 py-3">
            SUBMIT TICKET
          </Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { cn } from "~/lib/utils";
import {
  Form,
  Field,
  ErrorMessage,
  type SubmissionHandler,
} from "vee-validate";
import { z } from "zod";
import ErrorDialog from "~/components/shared/ErrorDialog.vue";
import { Button } from "~/components/ui/button";
import { useOffices } from "~/domains/offices/api/queries";
import { useCreateTicket } from "~/domains/tickets/api/mutations";
import { useGlobalStore } from "~/store/useGlobalStore";
import LoadingComponent from "~/components/shared/LoadingComponent.vue";
import ErrorComponent from "~/components/shared/ErrorComponent.vue";
import { usePendingOverlay } from "~/utils/composables/usePendingOverlay";

const { openDialog } = useGlobalStore();
const { data: offices, status: officesStatus } = useOffices({ except_own: 1 });
const { mutateAsync: createTicket, status: createTicketStatus } =
  useCreateTicket();

usePendingOverlay({
  isPending: () => createTicketStatus.value === "pending",
  pendingMessage: "Creating Ticket",
});

const priorityLevels = [
  { value: "routine", label: "Routine" },
  { value: "urgent", label: "Urgent" },
  { value: "emergency", label: "Emergency" },
];

const zodSchema = z.object({
  recipientOfficeId: z
    .number()
    .min(1, "Please select a recipient office.")
    .nullable(),
  priorityLevel: z.string().min(1, "Please select a priority level."),
  requestTitle: z.string().min(1, "This field is required."),
  description: z.string().min(1, "This field is required."),
});

const schema = toTypedSchema(zodSchema);

const defaultValues: z.infer<typeof zodSchema> = {
  recipientOfficeId: null,
  priorityLevel: "routine",
  requestTitle: "",
  description: "",
};

const onSubmit: SubmissionHandler = async (values) => {
  try {
    const formData = new FormData();
    formData.append("recipient_office_id", values.recipientOfficeId.toString());
    formData.append("priority_level", values.priorityLevel);
    formData.append("title", values.requestTitle);
    formData.append("description", values.description);
    await createTicket(formData);
    navigateTo("/tickets");
  } catch (error) {
    openDialog(ErrorDialog);
  }
};
</script>
