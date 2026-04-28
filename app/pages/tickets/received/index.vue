<template>
  <div class="flex-1 flex flex-col">
    <LoadingComponent
      v-if="ticketsAssignedToMyOfficeStatus === 'pending'"
      :custom-class="'flex-1'"
    />
    <ErrorComponent
      v-if="ticketsAssignedToMyOfficeStatus === 'error'"
      :custom-class="'flex-1'"
    />
    <DataTable
      v-if="ticketsAssignedToMyOffice"
      :columns="columns"
      :data="ticketsAssignedToMyOffice?.data || []"
      :actions="actions"
      :on-row-click="(row) => navigateTo(`/tickets/${row.id}`)"
    >
      <template #code="{ value }">
        <p class="font-semibold">{{ value }}</p>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "tickets",
});

import DataTable, {
  type Column,
  type ActionItem,
} from "~/components/shared/DataTable.vue";
import { useTicketsAssignedToMyOffice } from "~/domains/tickets/api/queries";
import LoadingComponent from "~/components/shared/LoadingComponent.vue";
import ErrorComponent from "~/components/shared/ErrorComponent.vue";

const columns: Column[] = [
  {
    label: "Code",
    accessorKey: "code",
  },
  {
    label: "Title",
    accessorKey: "title",
  },
  {
    label: "Status",
    accessorKey: "status",
  },
  {
    label: "Priority Level",
    accessorKey: "priority_level",
  },
  {
    label: "Creator",
    accessorKey: "creator",
    getValue: (row: any) =>
      `${row.creator.first_name} ${row.creator.last_name}`,
  },
  {
    label: "Sender",
    accessorKey: "sender_office.code",
  },
  {
    label: "Recipient",
    accessorKey: "recipient_office.code",
  },
];

const actions: ActionItem[] = [
  {
    label: "View",
    action: () => {},
  },
];

const {
  data: ticketsAssignedToMyOffice,
  status: ticketsAssignedToMyOfficeStatus,
} = useTicketsAssignedToMyOffice({});
</script>
