<template>
  <DefaultLayout>
    <div class="flex flex-col gap-14 rounded-md p-10 flex-1 bg-white shadow-sm">
      <div class="flex flex-col gap-8">
        <p class="text-2xl font-bold">TICKETS</p>
        <div
          class="flex rounded-md overflow-hidden border border-gray-400 w-[500px]"
        >
          <NuxtLink
            v-for="(route, i) in routes"
            :key="i"
            :class="
              cn(
                'text-gray-500 bg-bg-primary flex-1 py-2 grid place-items-center transition-colors',
                {
                  'bg-accent text-white font-medium': matchesRoute({
                    routeName: route.href,
                  }),
                },
              )
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
    name: "RECEIVED",
    href: "/tickets/received",
  },
  {
    name: "SENT",
    href: "/tickets/sent",
  },
];
</script>
