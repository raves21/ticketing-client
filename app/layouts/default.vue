<template>
  <div class="min-h-screen">
    <TopNavBar />
    <SideBar />
    <main class="w-full min-h-screen pl-[300px] pt-[56px] flex flex-col">
      <div class="p-12 flex-1 flex flex-col">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import SideBar from "~/components/layout/SideBar.vue";
import TopNavBar from "~/components/layout/TopNavBar.vue";
import { useCurrentUser } from "~/domains/auth/api/queries";

useCurrentUser();

onMounted(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigateTo("/");
  }
});
</script>
