<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-col>
        <v-row>
          <v-text-field v-model="name" label="Nome" outlined></v-text-field>
        </v-row>
        <v-row>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Telefone"
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
          </v-menu>
        </v-row>
        <v-row>
          <v-text-field v-model="email" label="Email" outlined></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="cpf"
            :rules="[rules.required, rules.min]"
            :counter="11"
            :type="'number'"
            :value="currentValue"
            name="input-10-1"
            label="CPF"
            outlined
            hint="CPF valido de 11 digitos"
          ></v-text-field>
        </v-row>
        <v-row justify="center">
          <v-btn
            :disabled="!valid"
            class="mr-4 pa-6 create-account buttons"
            color="primary"
            dark
            @click="validate"
          >
            Cadastrar
          </v-btn>
          <v-btn
            class="ml-4 pa-6 buttons"
            outlined
            color="primary"
            dark
            to="/dashboard"
          >
            Cancelar
          </v-btn>
        </v-row>
      </v-col>
    </v-container>
  </v-form>
</template>

<script>
import { vMask } from "v-mask";
import Vue from "vue";
import { mapGetters } from "vuex";

Vue.directive("mask", vMask);

export default {
  name: "RegisterPatientForm",
  data() {
    return {
      valid: true,
      name: "",
      email: "",
      date: "",
      activePicker: null,
      menu: false,
      password: "",
      showpassword: false,
      rules: {
        required: (value) => !!value || "Obrigatório.",
        min: (v) => v.length == 11 || "seu CPF precisa ter 11 digitos",
        emailRules: [
          (v) => !!v || "Obrigatorio",
          (v) => /.+@.+\..+/.test(v) || "E-mail deve ser um endereço valido",
        ],
      },
      watch: {
        menu(val) {
          val && setTimeout(() => (this.activePicker = "YEAR"));
        },
      },
      professionalName: "",
      professionalUID: "",
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    user() {
      return this.currentUser;
    },
  },
  mounted() {
    this.professionalName = this.currentUser.name;
    this.professionalUID = this.currentUser.uid;
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const patientRegister = {
          name: this.name,
          date: this.date,
          email: this.email,
          cpf: this.cpf,
          professionalName: this.professionalName,
          professionalUID: this.professionalUID,
        };
        this.$emit("patientRegister", patientRegister);
      }
    },
  },
};
</script>
