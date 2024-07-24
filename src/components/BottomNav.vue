<template>
  <v-bottom-navigation app grow>
    <v-btn :to="{ name: 'home' }"><span>Home</span><v-icon>mdi-home</v-icon></v-btn>
    <v-btn :to="{ name: 'stats' }"><span>Stats</span><v-icon>mdi-finance</v-icon></v-btn>
    <v-btn :to="{ name: 'user' }"><span>User</span><v-icon>mdi-account</v-icon></v-btn>
  </v-bottom-navigation>
</template>