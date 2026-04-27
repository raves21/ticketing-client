<template>
  <div class="bg-white rounded-2xl shadow-xl w-[400px] overflow-hidden">
    <!-- Header -->
    <div class="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
      <div
        class="size-9 rounded-full bg-red-100 flex items-center justify-center shrink-0"
      >
        <CircleAlert class="size-5 text-red-600" />
      </div>
      <h2 class="text-base font-semibold text-gray-900">ERROR</h2>
    </div>

    <!-- Body -->
    <div class="px-6 py-5">
      <p class="text-sm text-gray-600">{{ message }}</p>
    </div>

    <!-- Footer -->
    <div class="flex justify-end px-6 pb-5">
      <button
        @click="closeDialog"
        class="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-medium transition-colors cursor-pointer"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CircleAlert } from "lucide-vue-next";
import { useGlobalStore } from "~/store/useGlobalStore";

withDefaults(
  defineProps<{
    message?: string;
  }>(),
  {
    message: "An error occurred.",
  },
);

const { closeDialog } = useGlobalStore();
</script>
