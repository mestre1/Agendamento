<template>
  <v-row no-gutters justify="center" class="home">
    <v-col lg="6" md="8" class="column-cards">
      <v-card class="pa-8" elevation="0" tile>
        <v-card-title class="card-title"> Cadastro </v-card-title>
        <register-form />
        <line-or class="line" />
        <v-row justify="center mt-6 mb-6">
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
    <v-col align-end lg="5" md="12" class="column-card">
      <v-card class="pa-8" elevation="0" tile>
        <v-img class="img" src="@/assets/cadastro.svg"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import LineOr from "../components/LineOr.vue";
import RegisterForm from "../components/RegisterForm.vue";
//import * as firebase from "firebase/app";
//import "firebase/auth";

export default {
  name: "FrontRegister",
  components: { LineOr, RegisterForm }

  /*methods(){
    async registrar(){
       // alert('Cadastro realizado com sucesso')
       try{
           const user =  firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
           this.$router.replace({name: "register"})
       }catch(err){
          console.log(err)
       }
     
    }
  }*/
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
