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
                label="Data de Nascimento"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              :active-picker.sync="activePicker"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
            ></v-date-picker>
          </v-menu>
        </v-row>
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
      </v-col>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "RefisterForm",
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
        min: (v) => v.length >= 8 || "Minimo 8 characteres",
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
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const userRegister = {
          name: this.name,
          date: this.date,
          email: this.email,
          password: this.password,
        };
        this.$emit("register", userRegister);
      }
    },
  },
};
</script>
