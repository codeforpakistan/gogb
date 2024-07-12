<template>
  <v-app>
    <v-app-bar app color="primary">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-show="this.$route.name != '/login'"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>{{ title }}</v-app-bar-title>
      <template v-slot:append>
        <v-btn @click="toggleTheme" icon><v-icon>mdi-theme-light-dark</v-icon></v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item link title="Home" to="/"></v-list-item>
        <v-list-item link title="Dashboard" to="dashboard" ></v-list-item>
        <v-list-item link title="List Item 3"></v-list-item>
        <v-divider/>
        <v-list-item link title="Sign out" to="login"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-bottom-navigation v-model="tab" grow v-show="this.$route.name != '/login'">
    <v-fab icon="mdi-plus" 
        color="primary"
        class="ms4 mb4"
        location="bottom end"
        size="64"
        oapp></v-fab>
      <v-btn value="list" to="/"><v-icon>mdi-home</v-icon><span>Activities</span></v-btn>
      <v-btn value="form" to="create"><v-icon>mdi-plus</v-icon><span>New</span></v-btn>
      <v-btn value="stats" to="stats"><v-icon>mdi-finance</v-icon><span>Stats</span></v-btn>
      <v-btn value="user" to="user"><v-icon>mdi-account</v-icon><span>User</span></v-btn>
    </v-bottom-navigation>
    <router-view />
  </v-app>
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
      title: 'Gilgit-Baltistan',
      drawer: false,
      tab: "pending"
    }),
  }
</script>