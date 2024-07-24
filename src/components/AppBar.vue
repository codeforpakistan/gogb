<template>
  <v-app-bar app color="primary" dark flat clipped-left>
    <v-btn icon @click="$router.go(-1)" exact><v-icon>mdi-arrow-left</v-icon></v-btn>
    <v-app-bar-title class="text-no-wrap">{{ title }}</v-app-bar-title>
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