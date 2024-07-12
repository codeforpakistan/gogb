<template>
  <v-main class="d-flex align-center justify-center">
    <v-card min-width="340px" flat>
      <v-card-text>
        <v-text-field label="Username" v-model="username"></v-text-field>
        <v-text-field label="Password" type="password" v-model="password"></v-text-field>
        <v-btn color="primary" flat class="mt-2" type="submit" block to="/">Login</v-btn>
      </v-card-text>
    </v-card>
  </v-main>
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
      username: "username",
      password: "password",
    }),
  }
</script>