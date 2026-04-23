<template>
  <DefaultLayout>
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-3">
        <p class="text-2xl font-bold">TICKETS</p>
        <div
          class="flex rounded-md overflow-hidden border border-gray-500 w-min"
        >
          <NuxtLink
            v-for="(route, i) in routes"
            key="i"
            :class="
              cn('text-gray-500 px-3 py-2', {
                'bg-white text-black font-medium': matchesRoute({
                  routeName: '/tickets/received',
                  fuzzy: true,
                }),
              })
            "
            :to="route.href"
          >
            {{ route.name }}
          </NuxtLink>
        </div>
      </div>
      <slot />
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { cn } from "~/lib/utils";
import DefaultLayout from "./default.vue";

type Route = {
  name: string;
  href: string;
};

const routes: Route[] = [
  {
    name: "Received",
    href: "/tickets/received",
  },
  {
    name: "Sent",
    href: "/tickets/sent",
  },
];
</script>
