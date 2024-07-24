<template>
  <v-main>
    <app-bar title="Law &amp; Order"></app-bar>
    <v-card color="transparent" tile flat>
      <v-card-title>{{ item.subject }}</v-card-title>
      <v-card-subtitle class="d-flex mt-1">
        <v-icon :color="itemColor(item.status)">{{ itemIcon(item.status) }}</v-icon>
        <span class="ms-2 flex-grow-1">{{ item.type }}</span>
      </v-card-subtitle>
      <v-card-text>
        <p class="mb-0">Started: {{ item.start.toRelative() }}</p>
        <p>Ended: {{ item.end.toRelative() }}</p>
        <p>{{ item.description }}</p>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn color="primary" class="flex-grow-1" depressed :to="{ name: 'law_edit' }">Edit</v-btn>
        <v-btn color="secondary" class="flex-grow-1" depressed :to="{ name: 'law_list' }">Resolve</v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>
<script>
import AppBar from '@/components/AppBar'
const { DateTime } = require("luxon");
export default {
  components: { AppBar },
  data: () => ({
    item: {
      subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      type: 'Strike',
      status: 'Resolved',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non nisi sed ante vehicula varius non vel odio. Phasellus varius, arcu sed eleifend sodales, nibh metus rutrum enim, et venenatis eros ex quis purus. Proin finibus efficitur tortor, sed tincidunt ante varius sed. Etiam sodales magna a dignissim sagittis. Phasellus accumsan auctor sem, quis congue nisl rhoncus id. Proin nulla ligula, bibendum eget cursus non, finibus sed velit. Phasellus mattis libero lectus, in facilisis neque blandit id. Mauris pellentesque ex non tincidunt rhoncus. Morbi in dictum augue. Etiam tristique sagittis ullamcorper. In auctor sit amet nulla id consequat. Suspendisse vitae neque et augue lobortis hendrerit. Etiam pretium auctor auctor. Proin euismod posuere erat eget fermentum. ',
      start: DateTime.fromISO('2020-12-20'),
      end: DateTime.fromISO('2021-12-22'),
    },
    types: ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'],
    status: ['Open', 'Assigned', 'Pending', 'Rejected', 'Resolved', 'Closed']
  }),
  methods: {
    itemIcon(status) {
      if (status == 'Resolved') return 'mdi-check-circle'
      if (status == 'Pending')  return 'mdi-alert-circle'
      return 'mdi-progress-alert'
    },
    itemColor(status) {
      if (status == 'Resolved') return 'success'
      if (status == 'Pending')  return 'warning'
      return 'error'
    },
  },
}
</script>