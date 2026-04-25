<template>
  <p>received</p>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "tickets",
});

import { useTicketsAssignedToMyOffice } from "~/domains/tickets/api/queries";

const {
  data: ticketsData,
  isLoading,
  isError,
} = useTicketsAssignedToMyOffice({
  page: 1,
  searchQuery: undefined,
});
</script>
