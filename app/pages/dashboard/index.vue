<template>
  <div class="flex flex-col gap-8">
    <div class="flex h-[300px] gap-8">
      <div class="flex-1 bg-white rounded-md h-full"></div>
      <div class="flex-1 bg-white rounded-md h-full"></div>
      <div class="flex-1 bg-white rounded-md h-full"></div>
    </div>
    <div class="flex h-[480px] gap-8">
      <div class="flex-2 bg-white rounded-md h-full">
        <p class="text-2xl font-bold">dashboard</p>
      </div>
      <div class="flex-1 bg-white rounded-md h-full"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
</script>
