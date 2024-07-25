<template>
  <v-bottom-navigation v-model="tab" app grow  v-if="this.$route.name != 'login'">
    <v-btn :to="{ name: 'home' }"><span>Home</span><v-icon>mdi-home</v-icon></v-btn>
    <v-btn :to="{ name: 'stats' }"><span>Stats</span><v-icon>mdi-finance</v-icon></v-btn>
    <v-btn :to="{ name: 'user' }"><span>User</span><v-icon>mdi-account</v-icon></v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  data: () => ({
    tab: "home"
  })
}
</script>
<style>
.v-bottom-navigation .v-btn:not(.v-btn--round).v-size--default { 
  height: 56px;
}
</style>