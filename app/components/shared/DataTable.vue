<template>
  <div
    class="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm font-poppins"
  >
    <table class="w-full text-sm text-left whitespace-nowrap">
      <thead class="bg-gray-50 text-gray-600 border-b border-gray-200">
        <tr>
          <th
            v-for="col in columns"
            :key="col.accessorKey"
            class="px-6 py-3 font-medium tracking-wider"
            :class="{ truncate: col.maxWidth }"
            :style="col.maxWidth ? { maxWidth: col.maxWidth } : {}"
          >
            {{ col.label }}
          </th>
          <th v-if="actions && actions.length" class="px-6 py-3 w-10">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          class="hover:bg-gray-50 transition-colors"
          :class="{ 'cursor-pointer': onRowClick }"
          @click="onRowClick?.(row)"
        >
          <td
            v-for="col in columns"
            :key="col.accessorKey"
            class="px-6 py-6 text-gray-700"
            :class="{ truncate: col.maxWidth }"
            :style="col.maxWidth ? { maxWidth: col.maxWidth } : {}"
          >
            <slot
              :name="col.accessorKey"
              :row="row"
              :value="getCellValue(row, col)"
            >
              {{ getCellValue(row, col) }}
            </slot>
          </td>
          <td v-if="actions && actions.length" class="px-6 py-6 text-right">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <button
                  class="size-8 text-gray-500 group hover:bg-accent grid place-items-center rounded-md transition-colors"
                >
                  <EllipsisVertical class="size-5 group-hover:stroke-white" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-40">
                <DropdownMenuItem
                  v-for="(actionItem, index) in actions"
                  :key="index"
                  @click="actionItem.action(row)"
                  class="cursor-pointer data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900"
                >
                  {{ actionItem.label }}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </td>
        </tr>

        <!-- Empty State -->
        <tr v-if="!data || data.length === 0">
          <td
            :colspan="columns.length + (actions?.length ? 1 : 0)"
            class="px-6 py-12 text-center text-gray-500"
          >
            No data available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { EllipsisVertical } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export type Column = {
  label: string;
  accessorKey: string;
  getValue?: (row: any) => any;
  maxWidth?: string;
};

export type ActionItem = {
  label: string;
  action: (item: any) => void;
};

defineProps<{
  columns: Column[];
  data: any[];
  actions?: ActionItem[];
  onRowClick?: (row: any) => void;
}>();

function resolvePath(obj: any, path: string): any {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function getCellValue(row: any, col: Column): any {
  if (col.getValue) return col.getValue(row);
  return resolvePath(row, col.accessorKey);
}
</script>
