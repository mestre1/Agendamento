<template>
  <v-app>
    <toolbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Toolbar from "./components/ToolbarInApp.vue";

export default {
  name: "App",

  components: {
    Toolbar,
  },
};
</script>
