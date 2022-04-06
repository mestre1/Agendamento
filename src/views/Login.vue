<template>
  <v-row no-gutters justify="center" class="home">
    <v-col lg="6" md="8" class="column-cards">
      <v-card class="pa-8" elevation="0" tile>
        <v-card-title class="card-title"> Entrar </v-card-title>
        <login-form-vue @login="loginWithFirebase" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import LoginFormVue from "@/components/LoginForm.vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { mapActions } from "vuex";

export default {
  name: "FrontLogin",
  components: { LoginFormVue },
  methods: {
    ...mapActions(["addUser"]),
    loginWithFirebase(user) {
      signInWithEmailAndPassword(getAuth(), user.email, user.password)
        .then(() => {
          this.addUser({
            name: getAuth().currentUser.displayName,
            email: getAuth().currentUser.email,
          });
          this.$router.push({ name: "dashboard" });
        })
        .catch((err) => {
          this.error = err.message;
        });
      console.log(user);
    },
  },
};
</script>
<style lang="scss">
@import url("https://fonts.google.com/css?family=Nunito");
.home {
  .img {
    width: 90%;
  }
  .column-cards {
    height: 100%;
    .card-title {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      font-size: 38px;
      margin-top: 10px;
      margin-bottom: 10px;
      line-height: 30px;
      text-align: center;
    }
    .card-subtitle {
      font-family: "Gill Sans";
      font-size: 26px;
      margin-bottom: 40px;
      text-align: center;
    }
    .line {
      width: auto;
      padding-right: 92px;
      padding-left: 92px;
    }
    .buttons {
      text-transform: none;
      font-family: "Gill Sans";
      height: 48px;
      width: 190px;
    }
    .create-account {
      color: black;
    }
  }
}
</style>
