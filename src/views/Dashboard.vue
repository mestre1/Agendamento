<template>
  <div>Bem vindo ao Dashboard, {{ userName }}</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "FrontDashboard",
  data() {
    return {
      userName: "nome",
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  mounted() {
    this.userName = this.currentUser.userName;
  },
};
</script>
