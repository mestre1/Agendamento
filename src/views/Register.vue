<template>
  <v-row no-gutters justify="center" class="home">
    <v-col lg="6" md="8" class="column-cards">
      <v-card class="pa-8" elevation="0" tile>
        <v-card-title class="card-title justify-center">
          Cadastro
        </v-card-title>
        <register-form @register="createFirebaseUser" />
      </v-card>
    </v-col>
    <v-col align-end lg="5" md="12" class="column-card">
      <v-card class="pa-8" elevation="0" tile>
        <v-img class="img" src="@/assets/images/cadastro.svg"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import RegisterForm from "../components/RegisterForm.vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default {
  name: "FrontRegister",
  components: { RegisterForm },
  methods: {
    createFirebaseUser(user) {
      const auth = getAuth();
      createUserWithEmailAndPassword(getAuth(), user.email, user.password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: user.name,
          });
          this.$router.push({ name: "login" });
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
.home {
  .img {
    width: 90%;
  }
  .column-cards {
    height: 100%;
    .card-title {
      font-family: "Gill Sans", "Gill Sans MT", "Trebuchet MS", sans-serif;
      font-size: 38px;
      size: 100%;
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
