<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-col>
        <v-row>
          <v-text-field v-model="email" label="Email" outlined></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="password"
            :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showpassword ? 'text' : 'password'"
            name="input-10-1"
            label="Senha"
            outlined
            hint="Mínimo de 8 caracteres"
            @click:append="showpassword = !showpassword"
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
            Entrar
          </v-btn>
          <v-btn
            class="ml-4 pa-6 buttons"
            outlined
            color="primary"
            dark
            to="/register"
          >
            Não Tenho Conta
          </v-btn>
        </v-row>
      </v-col>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      valid: true,
      email: "",
      password: "",
      showpassword: false,
      rules: {
        required: (value) => !!value || "Obrigatório.",
        min: (v) => v.length >= 8 || "Minimo 8 characteres",
        emailRules: [
          (v) => !!v || "Obrigatorio",
          (v) => /.+@.+\..+/.test(v) || "E-mail deve ser um endereço valido",
        ],
      },
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const userLogin = {
          email: this.email,
          password: this.password,
        };
        this.$emit("login", userLogin);
      }
    },
  },
};
</script>
