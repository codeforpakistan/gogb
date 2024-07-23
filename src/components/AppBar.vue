<template>
  <v-app-bar app color="primary" dark flat clipped-left>
    <v-btn icon v-if="this.$route.name != 'home'" @click="$router.go(-1)" exact><v-icon>mdi-arrow-left</v-icon></v-btn>
    <v-app-bar-title>{{ title }}</v-app-bar-title>
  </v-app-bar>
</template>
<script>
export default {
  props: {
    title: { type: String, required: true },
  }
}
</script>