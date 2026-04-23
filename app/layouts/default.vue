<template>
  <div class="min-h-screen">
    <TopNavBar />
    <SideBar />
    <main class="w-full min-h-screen pl-[300px] bg-bg-primary pt-[56px]">
      <div class="p-12">
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
