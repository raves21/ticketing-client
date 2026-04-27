<template>
  <aside
    class="fixed top-0 left-0 bottom-0 w-[300px] text-sm bg-bg-secondary flex flex-col gap-8 py-6 px-4 z-20"
  >
    <div class="flex items-center gap-3">
      <Loader class="size-[32px] text-accent stroke-2" />
      <span class="font-semibold text-xl">Ticketing System</span>
    </div>
    <div class="flex flex-col">
      <NuxtLink
        v-for="(route, i) in routes"
        :key="i"
        :to="route.href"
        :class="
          cn(
            'flex items-center gap-3 py-6 pl-3 rounded-md hover:bg-gray-400/20 hover:text-black transition-colors font-medium',
            {
              'bg-accent text-white hover:bg-accent hover:text-white':
                matchesRoute({
                  routeName: route.href,
                }),
            },
          )
        "
      >
        <component :is="route.icon" />
        <p>{{ route.name }}</p>
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Loader, Ticket, LayoutGrid } from "lucide-vue-next";
import type { FunctionalComponent } from "vue";
import { cn } from "~/lib/utils";

type SideBarRoute = {
  name: string;
  icon: FunctionalComponent;
  href: string;
};

const routes: SideBarRoute[] = [
  {
    name: "DASHBOARD",
    icon: LayoutGrid,
    href: "/dashboard",
  },
  {
    name: "TICKETS",
    icon: Ticket,
    href: "/tickets",
  },
];
</script>
