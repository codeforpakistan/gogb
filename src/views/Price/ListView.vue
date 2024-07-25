<template>
  <v-main>
    <app-bar title="Price Control"></app-bar>
    <v-list two-line subheader>
      <v-subheader>List of Inspections</v-subheader>
      <v-list-item v-for="(item,i) in items" :key="i" :to="{ name: 'price_detail', params: { id: item.id } }">
        <v-list-item-avatar color="primary">
          <v-img :src="item.user"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.type }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.location }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>{{ toRelativeTime(item.date) }}</v-list-item-action-text>
          <v-icon :color="iconColor(item.status)">{{ statusIcon(item.status) }}</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-fab-transition>
      <v-btn color="pink" dark fab absolute fixed bottom right :to="{ name: 'price_create' }" style="z-index:999;bottom:5em;">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-main>
</template>
<script>
import AppBar from '@/components/AppBar'  
import RelativeTime from '@yaireo/relative-time'
import Inspections from '@/data/inspections.json'
export default {
  components: { AppBar },
  data: () => ({
    items: Inspections,
  }),
  methods: {
    toRelativeTime(date) {
      const relativeTime = new RelativeTime();
      return relativeTime.from(new Date(date))
    },
    typeIcon(type) {
      if (type == 'Grocers') return 'GR'
      if (type == 'Barbershop') return 'BA'
      if (type == 'Autoparts') return 'AU'
      return 'NA'
    },
    statusIcon(status) {
      if (status == 'Compliant') return 'mdi-check-circle'
      if (status == 'Violation')  return 'mdi-alert-circle'
      return 'mdi-progress-alert'
    },
    iconColor(status) {
      if (status == 'Compliant') return 'success'
      if (status == 'Violation')  return 'warning'
      return 'error'
    },
  },
}
</script>