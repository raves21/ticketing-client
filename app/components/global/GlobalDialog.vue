<template>
  <TransitionRoot appear :show="dialog.isOpen" as="template">
    <Dialog @close="closeDialog" class="relative z-50">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-black/65 backdrop-blur-[1px]"
          aria-hidden="true"
        />
      </TransitionChild>

      <!-- Panel -->
      <div class="fixed inset-0 grid place-items-center">
        <TransitionChild
          as="template"
          enter="duration-100 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel>
            <component
              :is="dialog.content"
              v-if="dialog.content"
              v-bind="dialog.props"
            ></component>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "~/store/useGlobalStore";

const store = useGlobalStore();
const { dialog } = storeToRefs(store);
const { closeDialog } = store;
</script>
