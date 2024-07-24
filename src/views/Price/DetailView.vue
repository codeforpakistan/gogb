<template>
  <v-main>
    <app-bar title="Prince Control"></app-bar>
    <v-card color="transparent" tile flat>
      <v-card-title>{{ item.subject }}</v-card-title>
      <v-card-subtitle class="d-flex mt-1">
        <v-icon :color="itemColor(item.status)">{{ itemIcon(item.status) }}</v-icon>
        <span class="ms-2 flex-grow-1">{{ item.type }}</span>
      </v-card-subtitle>
      <v-card-text>
        <p class="mb-0">Date: {{ toRelativeTime(item.date) }}</p>
        <p>{{ item.description }}</p>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn color="primary" class="flex-grow-1" depressed :to="{ name: 'price_edit' }">Edit</v-btn>
        <v-btn color="secondary" class="flex-grow-1" depressed :to="{ name: 'price_list' }">Resolve</v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>
<script>
import AppBar from '@/components/AppBar'
import Inspections from '@/data/inspections.json'
import RelativeTime from '@yaireo/relative-time'
export default {
  components: { AppBar },
  data: () => ({
    items: Inspections,
    types: ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'],
    status: ['Open', 'Assigned', 'Pending', 'Rejected', 'Resolved', 'Closed']
  }),
  computed: {
    item() {
      return this.items.find(x => x.id == this.$route.params.id)
    }
  },
  methods: {
    toRelativeTime(date) {
      const relativeTime = new RelativeTime();
      return relativeTime.from(new Date(date))
    },
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