<script setup lang="ts">
import { setTheme, theme } from "./theme";

const resetMode = () => setTheme("system");
const checkMode = () => setTheme(theme.value === 'dark' ? 'light' : 'dark');
</script>

<template>
  <div class="flex flex-col p-2 gap-4 min-h-screen bg-white dark:bg-gray-900">
    <h1 class="dark:text-white">Hello World!</h1>
    <p class="dark:text-white">Current theme source: <strong>{{ theme }}</strong></p>

    <div>
      <button type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="checkMode">
        Toggle Dark Mode
      </button>
      <button type="button"
        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        @click="resetMode">
        Reset to System Theme
      </button>
    </div>

  </div>
</template>
