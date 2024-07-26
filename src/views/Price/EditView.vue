<template>
  <v-main>
    <app-bar title="Price Control"></app-bar>
    <v-card color="transparent" tile flat>
      <v-card-title>{{ item.type }} in {{ item.location }}</v-card-title>
      <v-card-text>
        <v-autocomplete v-model="item.type" :items="types" label="Type"></v-autocomplete>
        <v-autocomplete label="Location" :items="locations" v-model="item.location"></v-autocomplete>
        <v-autocomplete label="Status" :items="status" v-model="item.status"></v-autocomplete>

        <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="item.date" label="Date and Time" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="item.date" @input="menu = false"></v-date-picker>
        </v-menu>

        <v-text-field label="Fine" v-model="item.fine" suffix="PKR" />
        <div class="d-flex">
          <v-checkbox class="me-2" v-model="item.warned" label="Warning"></v-checkbox>
          <v-checkbox class="me-2" v-model="item.sealed" label="Sealed"></v-checkbox>
          <v-checkbox class="me-2" v-model="item.fir" label="FIR"></v-checkbox>
          <v-checkbox v-model="item.arrest" label="Arrest"></v-checkbox>
        </div>
        
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn color="secondary" depressed block :to="{ name: 'price_detail', params: { id: item.id } }">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>
<script>
import AppBar from '@/components/AppBar'
import Inspections from '@/data/inspections.json'
import Locations from '@/data/locations.json'
export default {
  components: { AppBar },
  data: () => ({
    menu: false,
    items: Inspections,
    locations: Locations,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non nisi sed ante vehicula varius non vel odio. Phasellus varius, arcu sed eleifend sodales, nibh metus rutrum enim, et venenatis eros ex quis purus. Proin finibus efficitur tortor, sed tincidunt ante varius sed. Etiam sodales magna a dignissim sagittis.',
    types: ['Grocers', 'Barbershop', 'Butcher'],
    status: ['Violation', 'Compliant']
  }),
  computed: {
    item() {
      return this.items.find(x => x.id == this.$route.params.id)
    }
  },
}
</script>