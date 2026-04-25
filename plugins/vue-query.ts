import {VueQueryPlugin, QueryClient} from "@tanstack/vue-query";

export const neverRefetchSettings = {
  gcTime: Infinity,
  staleTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default defineNuxtPlugin((app) => {
    
    app.vueApp.use(VueQueryPlugin, {queryClient});
})
