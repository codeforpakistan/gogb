<template>
  <v-main>
    <app-bar title="Price Control"></app-bar>
    <v-card color="transparent" tile flat>
      <v-card-title>New item</v-card-title>
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

        <v-textarea v-model="description" label="Description"></v-textarea>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn color="primary" depressed block :to="{ name: 'price_detail', params: { id: 1 } }">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>
<script>
import AppBar from '@/components/AppBar'
import Locations from '@/data/locations.json'
export default {
  components: { AppBar },
  data: () => ({
    item: {
      subject: null,
      type: null,
      location: null,
      status: null,
      description: null,
      date: null,
    },
    hint: null,
    types: ['Grocers', 'Barbershop', 'Butcher'],
    status: ['Violation', 'Compliant'],
    locations: Locations,
  }),
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    },
    showPosition(position) {
      this.hint = `N${position.coords.latitude} E${position.coords.longitude}`
    }
  }
}
</script>