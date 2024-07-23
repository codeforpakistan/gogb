<template>
  <v-app>

    <!-- <app-bar :title="title"></app-bar> -->
    
    <template v-if="this.$route.name != 'login'">

      <v-bottom-navigation app grow>
        <v-btn :to="{ name: 'home' }"><span>Home</span><v-icon>mdi-home</v-icon></v-btn>
        <v-btn :to="{ name: 'stats' }"><span>Stats</span><v-icon>mdi-finance</v-icon></v-btn>
        <v-btn :to="{ name: 'user' }"><span>User</span><v-icon>mdi-account</v-icon></v-btn>
      </v-bottom-navigation>

      <template v-if="this.$route.name == 'incidents'">
        <v-fab-transition>
          <v-btn color="pink" dark fab absolute fixed bottom right :to="{ name: 'create' }" style="z-index:999;bottom:5em;">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>

    </template>

    <router-view />

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