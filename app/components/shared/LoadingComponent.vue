<template>
  <div :class="cn('size-full grid place-items-center', customClass)">
    <Loader class="size-9 stroke-accent animate-spin" />
  </div>
</template>

<script setup lang="ts">
import { Loader } from "lucide-vue-next";
import { cn } from "~/lib/utils";
defineProps<{
  customClass?: string;
}>();
</script>
