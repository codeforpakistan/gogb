<template>
  <v-main>
    <app-bar title="Law &amp; Order"></app-bar>
    <v-list two-line subheader>
      <v-subheader>List of Incidents</v-subheader>
      <v-list-item v-for="(item,i) in items" :key="i" :to="{ name: 'law_detail', params: { id: item.id } }"">
        <v-list-item-avatar color="primary">
          <v-img :src="item.user"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.type }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>{{ toRelativeTime(item.start) }}</v-list-item-action-text>
          <v-icon :color="iconColor(item.status)">{{ statusIcon(item.status) }}</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-fab-transition>
      <v-btn color="pink" dark fab absolute fixed bottom right :to="{ name: 'law_create' }" style="z-index:999;bottom:5em;">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-main>
</template>
<script>
import AppBar from '@/components/AppBar'
import RelativeTime from '@yaireo/relative-time'
import Incidents from '@/data/incidents.json'
export default {
  components: { AppBar },
  data: () => ({
    items: Incidents,
  }),
  methods: {
    toRelativeTime(date) {
      const relativeTime = new RelativeTime();
      return relativeTime.from(new Date(date))
    },
    typeIcon(type) {
      if (type == 'Strike') return 'ST'
      if (type == 'Violence') return 'VL'
      if (type == 'Protest') return 'PT'
      return 'NA'
    },
    statusIcon(status) {
      if (status == 'Resolved') return 'mdi-check-circle'
      if (status == 'Pending')  return 'mdi-alert-circle'
      return 'mdi-progress-alert'
    },
    iconColor(status) {
      if (status == 'Resolved') return 'success'
      if (status == 'Pending')  return 'warning'
      return 'error'
    },
  },
}
</script>