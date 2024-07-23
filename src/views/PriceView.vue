<template>
  <v-main>
    <app-bar title="Price Control"></app-bar>
    <v-list lines="two">
      <v-list-item v-for="(inspection,i) in inspections" :key="i" to="detail">
        <v-list-item-avatar color="primary">
          <span class="white--text">{{ typeIcon(inspection.type) }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ inspection.type }} in {{ inspection.location }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ inspection.date.toRelative() }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon :color="iconColor(inspection.status)">{{ statusIcon(inspection.status) }}</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-main>
</template>
<script>
import AppBar from '@/components/AppBar'  
  const { DateTime } = require("luxon");
  
  export default {
    components: { AppBar },
    data: () => ({
      inspections: [
        { value: 1, type: 'Grocers', location: 'Chilas, Diamer', date: DateTime.fromISO('2024-07-20'), status: 'Compliant' },
        { value: 2, type: 'Barbershop', location: 'Phander, Gupis-Yasin', date: DateTime.fromISO('2020-12-20'), status: 'Violation' },
        { value: 3, type: 'Grocers', location: 'Eidgah, Astore', date: DateTime.fromISO('2020-12-20'), status: 'Compliant' },
        { value: 4, type: 'Grocers', location: 'Chilas, Diamer', date: DateTime.fromISO('2020-12-20'), status: 'Compliant' },
        { value: 5, type: 'Grocers', location: 'Chilas, Diamer', date: DateTime.fromISO('2020-12-20'), status: 'Compliant' },
        { value: 6, type: 'Grocers', location: 'Chilas, Diamer', date: DateTime.fromISO('2020-12-20'), status: 'Compliant' },
        { value: 7, type: 'Grocers', location: 'Chilas, Diamer', date: DateTime.fromISO('2020-12-20'), status: 'Compliant' },
        { value: 8, type: 'Grocers', location: 'Chilas, Diamer', date: DateTime.fromISO('2020-12-20'), status: 'Compliant' },
        { value: 9, type: 'Grocers', location: 'Chilas, Diamer', date: DateTime.fromISO('2020-12-20'), status: 'Compliant' },
      ]
    }),
    methods: {
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