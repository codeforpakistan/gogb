<template>
  <v-app>

    <v-app-bar app color="primary" dark flat clipped-left>
      <v-btn icon v-if="this.$route.name != 'home'" :to="{ name: 'home' }" exact><v-icon>mdi-arrow-left</v-icon></v-btn>
      <v-app-bar-title>{{ title }}</v-app-bar-title>
    </v-app-bar>
    
    <v-bottom-navigation app v-model="tab" grow v-show="this.$route.name != 'login'">
      <v-btn value="home" :to="{ name: 'home' }" exact><span>Activities</span><v-icon>mdi-home</v-icon></v-btn>
      <v-btn value="stats" :to="{ name: 'stats' }" exact><span>Stats</span><v-icon>mdi-finance</v-icon></v-btn>
      <v-btn value="user" :to="{ name: 'user' }" exact><span>User</span><v-icon>mdi-account</v-icon></v-btn>
    </v-bottom-navigation>

    <v-main>
      <router-view />
    </v-main>

    <v-fab-transition>
      <v-btn color="pink" dark fab absolute fixed bottom right :to="{ name: 'create' }" style="z-index:999;bottom:5em;" v-show="this.$route.name == 'home'">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>

  </v-app>
</template>

<script>
  export default {
    data: () => ({
      title: 'Govt. of Gilgit-Baltistan',
      tab: "home"
    }),
  }
</script>