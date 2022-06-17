<template>
  <v-col>
    <v-row style="padding: 10px; margin-left: 135px; margin-top: 10px"
      ><v-avatar color="grey" size="50"><v-icon>mdi-account</v-icon></v-avatar>
      <div class="font-weight-bold" style="margin-top: 15px; margin-left: 10px">
        Bem vindo ao Dashboard, {{ userName }}
      </div></v-row
    >

    <v-row justify="center mt-10">
      <v-btn
        class="mr-4 pa-6 create-account buttons button_size black--text font-weight-bold"
        elevation="10"
        style="height: 350px"
        color="#ADD8E6"
        dark
        to="/patientRecord"
      >
        Cadastrar Paciente
      </v-btn>
      <v-btn
        class="ml-4 pa-6 create-account buttons button_size black--text font-weight-bold"
        elevation="10"
        style="height: 350px"
        color="#FFCBDB"
        dark
        to="/calendar"
      >
        Meu Calendario
      </v-btn>
    </v-row>
  </v-col>
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
    user() {
      return this.currentUser;
    },
  },
  mounted() {
    this.userName = this.currentUser.name;
  },
};
</script>
<style lang="scss">
.button_size {
  width: 500px;
  height: 400px;
}
.name {
  margin-left: 20px;
  margin-top: 26px;
}
.avatar {
  margin-left: 135px;
  margin-top: 5px;
}
</style>
