<template>
  <v-main>
    <app-bar title="Law &amp; Order"></app-bar>
    <v-list two-line>
      <v-list-item v-for="(activity,i) in activities" :key="i" :to="{ name: 'law_detail' }">
        <v-list-item-avatar color="primary">
          <span class="white--text">{{ typeIcon(activity.type) }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ activity.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ activity.start.toRelative() }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon :color="iconColor(activity.status)">{{ statusIcon(activity.status) }}</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <template v-if="this.$route.name == 'incidents'">
      <v-fab-transition>
        <v-btn color="pink" dark fab absolute fixed bottom right :to="{ name: 'law_create' }" style="z-index:999;bottom:5em;">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>
  </v-main>
</template>
<script>
import AppBar from '@/components/AppBar'
const { DateTime } = require("luxon");
export default {
  components: { AppBar },
  data: () => ({
    activities: [
      { value: 1, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', start: DateTime.fromISO('2020-12-20'), status: 'Resolved', type: 'Strike' },
      { value: 2, title: 'Duis eget dui vel justo cursus vulputate sed vulputate dolor', start: DateTime.fromISO('2020-12-20'), status: 'Pending', type: 'Violence' },
      { value: 3, title: 'Proin at eros vitae justo egestas lacinia nec ac turpis', start: DateTime.fromISO('2020-12-20'), status: 'Resolved', type: 'Strike' },
      { value: 4, title: 'Etiam quis mollis mi. Suspendisse potenti', start: DateTime.fromISO('2020-12-20'), status: 'Pending', type: 'Violence' },
      { value: 5, title: 'Proin convallis eget velit sed semper', start: DateTime.fromISO('2020-12-20'), status: 'Resolved', type: 'Strike' },
      { value: 6, title: 'Nulla in nunc gravida, facilisis justo sit amet, tincidunt elit', start: DateTime.fromISO('2020-12-20'), status: 'Resolved', type: 'Strike' },
      { value: 7, title: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos', start: DateTime.fromISO('2020-12-20'), status: 'Pending', type: 'Violence' },
      { value: 8, title: 'Praesent mollis justo odio, sit amet semper turpis mattis eget', start: DateTime.fromISO('2020-12-20'), status: 'Resolved', type: 'Strike' },
      { value: 9, title: 'Curabitur ultricies sollicitudin diam et iaculis', start: DateTime.fromISO('2020-12-20'), status: 'Pending', type: 'Violence' },
      { value: 10, title: 'Aenean ornare tortor ac magna consequat lobortis', start: DateTime.fromISO('2020-12-20'), status: 'Pending', type: 'Violence' },
      { value: 11, title: 'Cras non elementum turpis', start: DateTime.fromISO('2020-12-20'), status: 'Pending', type: 'Violence' },
    ]
  }),
  methods: {
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