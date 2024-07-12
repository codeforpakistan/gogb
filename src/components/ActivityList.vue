<template>
  <v-list lines="two">
    <v-list-item v-for="(item,i) in activities" :key="i" 
      to="detail"
      :subtitle="item.start"
      :title="item.title"
    >
      <template v-slot:append>
        <v-icon :color="itemColor(item.status)" :icon="itemIcon(item.status)" size="small"></v-icon>
      </template>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
    data: () => ({
      activities: [
        { value: 1, title: 'Activity 1', subtitle: "The quick brown fox jumps pver the lazy dog", to: "detail", start: '21 December 2022', status: 'Resolved', icon:'mdi-check' },
        { value: 2, title: 'Activity 2', subtitle: "The quick brown fox jumps pver the lazy dog", to: "detail", start: '21 December 2022', status: 'Pending', icon: 'mdi-alert-circle-outline' },
        { value: 3, title: 'Activity 3', subtitle: "The quick brown fox jumps pver the lazy dog", to: "detail", start: '21 December 2022', status: 'Resolved', icon:'mdi-check' },
        { value: 4, title: 'Activity 4', subtitle: "The quick brown fox jumps pver the lazy dog", to: "detail", start: '21 December 2022', status: 'Pending', icon: 'mdi-alert-circle-outline' },
        { value: 5, title: 'Activity 5', subtitle: "The quick brown fox jumps pver the lazy dog", to: "detail", start: '21 December 2022', status: 'Resolved', icon:'mdi-check' },
        { value: 6, title: 'Activity 6', subtitle: "The quick brown fox jumps pver the lazy dog", to: "detail", start: '21 December 2022', status: 'Resolved', icon:'mdi-check' },
        { value: 7, title: 'Activity 7', subtitle: "The quick brown fox jumps pver the lazy dog", to: "detail", start: '21 December 2022', status: 'Pending', icon: 'mdi-alert-circle-outline' },
        { value: 8, title: 'Activity 8', subtitle: "The quick brown fox jumps pver the lazy dog", to: "detail", start: '21 December 2022', status: 'Resolved', icon:'mdi-check' },
        { value: 9, title: 'Activity 9', subtitle: "The quick brown fox jumps pver the lazy dog", to: "detail", start: '21 December 2022', status: 'Pending', icon: 'mdi-alert-circle-outline' },
      ]
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