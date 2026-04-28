<template>
  <div class="flex flex-col flex-1">
    <LoadingComponent
      v-if="ticketInfoStatus === 'pending'"
      :custom-class="'flex-1'"
    />
    <ErrorComponent
      v-if="ticketInfoStatus === 'error'"
      :custom-class="'flex-1'"
    />
    <div v-if="ticketInfo" class="flex-1">
      <p>{{ JSON.stringify(ticketInfo, null, 2) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ErrorComponent from "~/components/shared/ErrorComponent.vue";
import LoadingComponent from "~/components/shared/LoadingComponent.vue";
import { useTicketInfo } from "~/domains/tickets/api/queries";

const route = useRoute();
const ticketId = route.params.ticketId as string;

const { data: ticketInfo, status: ticketInfoStatus } = useTicketInfo(ticketId);
</script>
