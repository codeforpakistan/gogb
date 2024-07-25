<template>
  <v-main>
    <app-bar title="Price Control">
      <template slot="actions">
        <v-btn icon :to="{ name: 'price_edit', params: { id: item.id } }" exact><v-icon>mdi-pencil</v-icon></v-btn>
      </template>
    </app-bar>
    <v-card color="transparent" tile flat>
      <v-card-title>{{ item.type }}</v-card-title>
      <v-card-subtitle>{{ item.location }}</v-card-subtitle>
      <v-card-text>
        <p><v-icon :color="itemColor(item.status)">{{ itemIcon(item.status) }}</v-icon> {{ item.status }}</p>
        <p><v-icon>mdi-calendar</v-icon> {{ toRelativeTime(item.date) }}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non nisi sed ante vehicula varius non vel odio. Phasellus varius, arcu sed eleifend sodales, nibh metus rutrum enim, et venenatis eros ex quis purus. Proin finibus efficitur tortor, sed tincidunt ante varius sed. Etiam sodales magna a dignissim sagittis.</p>
      </v-card-text>
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
      if (status == 'Compliant') return 'mdi-check-circle'
      if (status == 'Violation')  return 'mdi-alert-circle'
      return 'mdi-progress-alert'
    },
    itemColor(status) {
      if (status == 'Compliant') return 'success'
      if (status == 'Violation')  return 'warning'
      return 'error'
    },
  },
}
</script>