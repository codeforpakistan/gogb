<template>
  <v-layout class="fill-height">
    <v-app-bar :elevation="0" color="primary">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>{{ title }}</v-app-bar-title>
      <template v-slot:append>
        <v-btn @click="toggleTheme" icon><v-icon>mdi-theme-light-dark</v-icon></v-btn>
      </template>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center">
      <v-card min-width="300" flat>
        <v-card-text>
          <v-text-field label="Username" v-model="username"></v-text-field>
          <v-text-field label="Password" type="password" v-model="password"></v-text-field>
          <v-btn color="primary" flat class="mt-2" type="submit" block to="/">Login</v-btn>
        </v-card-text>
      </v-card>
    </v-main>
  </v-layout>
</template>
<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
<script>
  export default {
    data: () => ({
      title: 'Govt. of Gilgit-Baltistan',
      username: "username",
      password: "password",
    }),
  }
</script>