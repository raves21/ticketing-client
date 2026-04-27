<template>
  <div
    v-if="pendingOverlay.isPending"
    class="flex fixed items-center w-dvw h-dvh justify-center gap-6 z-500 bg-gray-800/65"
  >
    <p class="text-3xl text-white">{{ pendingOverlay.message }}</p>
    <Loader2 class="size-11 animate-spin stroke-white" />
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import { useGlobalStore } from "~/store/useGlobalStore";

const store = useGlobalStore();
const { pendingOverlay } = storeToRefs(store);
</script>
