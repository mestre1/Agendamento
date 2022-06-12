<template>
  <v-row no-gutters justify="center" class="home">
    <v-col lg="6" md="8" class="column-cards">
      <v-card class="pa-8" elevation="0" tile>
        <v-card-title class="card-title justify-center">
          Cadastro de Paciente
        </v-card-title>
        <register-form @patientRegister="recordPatient" />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>

import RegisterForm from "../components/RegisterPatientForm.vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
//import app from "@/plugins/firebase"
import {getFirestore, collection, addDoc, getDocs} from "firebase/firestore"
export default {
  name: "patientRecord",
   components: { RegisterForm },
  methods: {

   async recordPatient(user){
      const app = getAuth().app
      const db = getFirestore(app) 
      const professional = getAuth().currentUser

      try{
        const docRef = await addDoc(collection(db, user.cpf), {
          name: user.name,
          date: user.date,
          email: user.email,
          cpf: user.cpf,
          professionalID: professional.uid,
          professionalName: professional.displayName
        })
        console.log("Document written with ID: ", professional.uid, "-> ", docRef);
        const q = await getDocs(collection(db, professional))
        q.forEach((doc) => {
          if(doc.data().name === user.name ){
            console.log(`${doc.id} => ${doc.data().name}`)
          }
        })
        console.log("contains -> ", q.docs.find(doc => doc.data().name === user.name).data().name)
        
      }catch(err){
        this.error = err.message
      }

    },

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
};