<template>
  <div class="h-screen grid place-items-center bg-white">
    <div
      class="h-[800px] w-[900px] bg-bg-primary grid place-items-center rounded-md"
    >
      <div class="w-[50%] flex flex-col gap-6">
        <p class="text-2xl font-semibold text-center">TICKETING SYSTEM</p>
        <Form
          :validation-schema="schema"
          :initial-values="defaultValues"
          @submit="onSubmit"
          class="flex flex-col gap-8 bg-white p-8 rounded-md"
        >
          <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <label>Email</label>
              <Field
                :validate-on-blur="false"
                :validate-on-change="false"
                name="email"
                type="text"
                class="p-4 bg-bg-primary rounded-md"
                placeholder="Email"
              />
              <ErrorMessage name="email" class="text-red-500" />
            </div>
            <div class="flex flex-col gap-2">
              <label>Password</label>
              <Field
                :validate-on-blur="false"
                :validate-on-change="false"
                type="password"
                name="password"
                class="p-4 bg-bg-primary rounded-md"
                placeholder="Password"
              />
              <ErrorMessage name="password" class="text-red-500" />
            </div>
          </div>
          <Button type="submit" class="rounded-md text-white py-6">
            LOGIN
          </Button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import {
  Form,
  Field,
  ErrorMessage,
  type SubmissionHandler,
} from "vee-validate";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { useLogin } from "~/domains/auth/api/mutations";

definePageMeta({
  layout: false,
});

const zodSchema = z.object({
  email: z
    .string()
    .min(1, "This field is required.")
    .email("Invalid email format."),
  password: z.string().min(1, "This field is required."),
});

const schema = toTypedSchema(zodSchema);

const defaultValues: z.infer<typeof zodSchema> = {
  email: "",
  password: "",
};

onMounted(() => {
  const token = localStorage.getItem("token");
  if (token) {
    navigateTo("/dashboard");
  }
});

const { mutateAsync: login } = useLogin();

const onSubmit: SubmissionHandler = async (values) => {
  await login({ email: values.email, password: values.password });
  navigateTo("/dashboard");
};
</script>
