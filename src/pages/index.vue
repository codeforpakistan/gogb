<template>
  <activity-list />
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