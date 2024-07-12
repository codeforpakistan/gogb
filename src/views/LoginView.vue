<template>
  <v-card min-width="340px" flat>
    <v-card-text>
      <v-text-field label="Username" v-model="username"></v-text-field>
      <v-text-field label="Password" type="password" v-model="password"></v-text-field>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-btn color="primary" depressed class="mt-2" type="submit" block :to="{ name: 'home' }">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      username: "username",
      password: "password",
    }),
  }
</script>