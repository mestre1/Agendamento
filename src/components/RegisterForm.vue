<template>
  <v-form v-model="valid">
    <v-container>
      <v-col>
        <v-row>
          <v-text-field label="Nome" outlined></v-text-field>
        </v-row>
        <v-row>
          <v-text-field label="Data nascimento" outlined></v-text-field>
        </v-row>
        <v-row>
          <v-text-field label="Email" outlined></v-text-field>
        </v-row>
        <v-row>
          <v-text-field label="Senha" outlined></v-text-field>
        </v-row>
      </v-col>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "RefisterForm",
};
</script>
