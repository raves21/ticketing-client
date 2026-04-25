<template>
  <DataTable
    :columns="columns"
    :data="ticketsSentByMyOffice?.data || []"
    :actions="actions"
  >
    <template #code="{ value }">
      <p class="font-semibold">{{ value }}</p>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "tickets",
});

import DataTable, {
  type Column,
  type ActionItem,
} from "~/components/shared/DataTable.vue";
import { useTicketsSentByMyOffice } from "~/domains/tickets/api/queries";

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

const { data: ticketsSentByMyOffice } = useTicketsSentByMyOffice({});
</script>
