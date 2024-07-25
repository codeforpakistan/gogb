<template>
  <v-app-bar app color="primary" dark flat clipped-left>
    <v-app-bar-nav-icon v-if="this.$route.name == 'home'"></v-app-bar-nav-icon>
    <v-btn icon v-else @click="$router.go(-1)" exact><v-icon>mdi-arrow-left</v-icon></v-btn>
    <v-app-bar-title v-text="title" />
    <v-spacer></v-spacer>
    <slot name="actions"></slot>
  </v-app-bar>
</template>
<script>
export default {
  props: {
    title: { type: String, required: true },
  }
}
</script>