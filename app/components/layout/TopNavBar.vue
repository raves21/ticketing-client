<template>
  <header
    class="fixed top-0 left-0 right-0 h-14 ml-[300px] bg-white flex items-center justify-end px-6 gap-4 z-10 shadow-sm"
  >
    <!-- User Section -->
    <Menu as="div" class="relative">
      <MenuButton
        class="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <!-- Avatar -->
        <div
          class="size-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0"
        >
          <span class="text-white text-xs font-semibold leading-none">
            {{ initials }}
          </span>
        </div>
        <!-- Name + Role -->
        <div class="text-left">
          <p class="text-sm font-semibold text-gray-800 leading-tight">
            {{ currentUser?.first_name }} {{ currentUser?.last_name }}
          </p>
          <p class="text-xs text-gray-500 leading-tight capitalize">
            {{ currentUser?.role }} &middot; {{ currentUser?.office?.code }}
          </p>
        </div>
        <!-- Chevron -->
        <ChevronDown class="size-4 text-gray-400 shrink-0" />
      </MenuButton>

      <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <MenuItems
          class="absolute right-0 mt-1 w-44 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none py-1"
        >
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700',
                active ? 'bg-gray-100' : '',
              ]"
            >
              <UserIcon class="size-4 text-gray-500" />
              Profile
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              @click=""
              :class="[
                'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600',
                active ? 'bg-red-50' : '',
              ]"
            >
              <LogOut class="size-4" />
              Logout
            </button>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  </header>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDown, LogOut, User as UserIcon } from "lucide-vue-next";
import { useCurrentUser } from "~/domains/auth/api/queries";

const { data: currentUser } = useCurrentUser();

const initials = computed(() => {
  if (!currentUser.value) return "?";
  return `${currentUser.value.first_name[0]}${currentUser.value.last_name[0]}`.toUpperCase();
});
</script>
