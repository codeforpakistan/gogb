<template>
  <v-main>
    <app-bar title="Law &amp; Order">
      <template slot="actions">
        <v-btn icon :to="{ name: 'law_edit', params: { id: item.id } }" exact><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon :to="{ name: 'law_list' }" exact><v-icon>mdi-check</v-icon></v-btn>
      </template>
    </app-bar>
    <v-card color="transparent" tile flat>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-subtitle class="d-flex mt-1">
        <v-icon :color="itemColor(item.status)">{{ itemIcon(item.status) }}</v-icon>
        <span class="ms-2 flex-grow-1">{{ item.type }}</span>
      </v-card-subtitle>
      <v-card-text>
        <p class="mb-0">Started: {{ toRelativeTime(item.start) }}</p>
        <p>Ended: {{ toRelativeTime(item.end) }}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non nisi sed ante vehicula varius non vel odio. Phasellus varius, arcu sed eleifend sodales, nibh metus rutrum enim, et venenatis eros ex quis purus. Proin finibus efficitur tortor, sed tincidunt ante varius sed. Etiam sodales magna a dignissim sagittis.</p>
      </v-card-text>
    </v-card>
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