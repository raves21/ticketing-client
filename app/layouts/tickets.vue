<template>
  <DefaultLayout>
    <div class="flex flex-col gap-14 flex-1 bg-">
      <div class="flex justify-between">
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
                  'text-gray-500 bg-bg-primary hover:bg-gray-200 flex-1 py-2 grid place-items-center transition-colors',
                  {
                    'bg-accent text-white font-medium hover:bg-accent':
                      matchesRoute({
                        routeName: route.href,
                      }),
                  },
                )
              "
              prefetch
              :to="route.href"
            >
              {{ route.name }}
            </NuxtLink>
          </div>
        </div>
        <button
          @click="() => navigateTo('/tickets/create')"
          class="flex items-center gap-4 bg-accent text-sm rounded-md h-fit py-3 px-4 hover:bg-accent-hover transition-colors"
        >
          <p class="font-medium text-white">NEW TICKET</p>
          <Plus class="size-4 stroke-white stroke-2" />
        </button>
      </div>
      <slot />
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { cn } from "~/lib/utils";
import DefaultLayout from "./default.vue";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-vue-next";

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
