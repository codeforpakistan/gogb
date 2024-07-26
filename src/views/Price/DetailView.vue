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
        <p><v-icon>mdi-currency-usd</v-icon> {{ item.fine }}</p>
        <p class="text--primary font-weight-bold"><v-icon>mdi-alert-circle-outline</v-icon> {{ item.warned ? 'Warned' : 'Not Warned' }} </p>
        <p><v-icon>mdi-lock-outline</v-icon> {{ item.sealed ? 'Sealed' : 'Not Sealed' }} </p>
        <p><v-icon>mdi-file-document-outline</v-icon> {{ item.fir ? 'FIR' : 'No FIR' }} </p>
        <p><v-icon>mdi-handcuffs</v-icon> {{ item.fir ? 'Arrest' : 'No Arrest' }} </p>
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