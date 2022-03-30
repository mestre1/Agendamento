<template>
  <v-app>
    <toolbar />
    <v-main>
      <home />
      <register />
      <login />
    </v-main>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";

import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";

export default {
  name: "App",

  components: {
    Login,
    Register,
    Home,
    Toolbar,
  },
};
</script>
