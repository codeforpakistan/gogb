<template>
  <v-main>
    <app-bar title="Govt. of Gilgit-Baltistan"></app-bar>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <v-card :to="{name: 'law_list'}" class="text-center">
            <v-img 
              src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
              class="white--text align-end" 
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
            >
              <v-card-title>Law and Order</v-card-title>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card :to="{name: 'price_list'}" class="text-center">
            <v-img 
              src="https://cdn.vuetifyjs.com/images/cards/plane.jpg"
              class="white--text align-end" 
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
            >
              <v-card-title class="mb-0">Price Control</v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import AppBar from '@/components/AppBar'  
export default {
  components: { AppBar },
}
</script>