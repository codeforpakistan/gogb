<template>
  <v-app>
    <v-app-bar app :elevation="0" color="primary">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>{{ title }}</v-app-bar-title>
      <template v-slot:append>
        <v-btn @click="toggleTheme" icon><v-icon>mdi-theme-light-dark</v-icon></v-btn>
        <v-btn icon>
          <v-avatar>
            <span class="text-h5">CJ</span>
          </v-avatar>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item link title="Home"></v-list-item>
        <v-list-item link title="Caetgories"></v-list-item>
        <v-list-item link title="List Item 3"></v-list-item>
        <v-divider/>
        <v-list-item link title="Sign out" to="login"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-bottom-navigation>
      <v-btn value="recent"><v-icon>mdi-progress-clock</v-icon><span>Pending</span></v-btn>
      <v-btn value="favorites"><v-icon>mdi-check-all</v-icon><span>Resolved</span></v-btn>
      <v-btn value="nearby"><v-icon>mdi-finance</v-icon><span>Stats</span></v-btn>
    </v-bottom-navigation>
    
    <v-main>
      <router-view />
    </v-main>
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
      title: 'Govt. of Gilgit-Baltistan',
      drawer: false,
      tab: 1
    }),
  }
</script>