<template>
  <v-row no-gutters justify="center" class="home">
    <v-col lg="6" md="12" class="column-cards">
      <v-card class="pa-8" elevation="0" tile>
        <v-card-title class="card-title">
          O mais simples e completo sistema para pisicólogos e consultórios de
          Psicologia
        </v-card-title>
        <v-card-subtitle class="card-subtitle">
          Gerencie melhor seu tempo e se aproxime mais do seu paciente!
        </v-card-subtitle>
        <line-or class="line" />
        <v-row justify="center mt-10 mb-10">
          <v-btn
            class="mr-4 pa-6 create-account buttons"
            color="primary"
            dark
            to="/register"
          >
            Criar conta
          </v-btn>
          <v-btn
            class="ml-4 pa-6 buttons"
            outlined
            color="primary"
            dark
            to="/login"
          >
            Já possuo uma conta
          </v-btn>
        </v-row>
      </v-card>
    </v-col>
    <v-col align-end lg="6" md="12" class="column-card">
      <v-card class="pa-8" elevation="0" tile>
        <v-img class="img" src="@/assets/splashScreen.svg"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import LineOr from "../components/LineOr.vue";
export default {
  name: "Ho-me",
  components: { LineOr },
};
</script>
<style lang="scss">
@import url("https://fonts.google.com/css?family=Nunito");
.home {
  .img {
    width: 92%;
  }
  .column-cards {
    height: 100%;
    .card-title {
      font-family: "Gill Sans", "Gill Sans MT", "Calibri", "Trebuchet MS",
        sans-serif;
      font-size: 39px;
      margin-top: 90px;
      margin-bottom: 40px;
      line-height: 40px;
      text-align: center;
    }
    .card-subtitle {
      font-family: "Gill Sans", "Gill Sans MT", "Calibri", "Trebuchet MS",
        sans-serif;
      font-size: 26px;
      padding-inline: 50px;
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
      font-family: "Arial";
      height: 48px;
      width: 190px;
    }
    .create-account {
      color: black;
    }
  }
}
</style>
