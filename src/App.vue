<template>
  <v-app>
    <bottom-nav />
    <router-view />
  </v-app>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue'
  export default {
    components: { BottomNav },
    data: () => ({
      title: 'Govt. of Gilgit-Baltistan',
      tab: "home"
    }),
  }
</script>