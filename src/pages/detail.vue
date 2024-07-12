<template>
  <v-main>
    <v-card color="transparent" tile flat>
      <v-card-title>{{ activity.subject }}</v-card-title>
      <v-card-subtitle>
        <span class="me-1">{{ activity.type }}</span>
        <v-icon :color="itemColor(activity.status)" :icon="itemIcon(activity.status)" size="small"></v-icon>
        </v-card-subtitle>
      <v-card-text>
        <p class="mb-5">{{ activity.description }}</p>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn color="primary" class="flex-grow-1" variant="flat" to="/edit">Edit</v-btn>
        <v-btn color="secondary" class="flex-grow-1" variant="flat" to="/">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>
<script>
  export default {
    data: () => ({
      activity: {
        subject: 'Activity 1',
        type: 'Strike',
        status: 'Resolved',
        description: 'the quick brown fox jumps over the lazy dog',
        start: '2020-12-20 11:30:22',
        end: '2020-12-22 11:30:22',
      },
      types: ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'],
      status: ['Open', 'Assigned', 'Pending', 'Rejected', 'Resolved', 'Closed']
    }),
    methods: {
      itemIcon(status) {
        if (status == 'Resolved') return 'mdi-check'
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