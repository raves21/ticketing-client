<template>
  <div :class="cn('size-full grid place-items-center', customClass)">
    <p class="font-medium text-lg">An error occured.</p>
  </div>
</template>

<script setup lang="ts">
import { cn } from "~/lib/utils";
defineProps<{
  customClass?: string;
}>();
</script>
