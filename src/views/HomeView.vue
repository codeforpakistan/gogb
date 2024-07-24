<template>
  <v-main>
    <app-bar title="Govt. of Gilgit-Baltistan"></app-bar>
    <v-container>
      <v-row dense>
        <v-col>
          <v-btn block depressed :to="{name: 'law_list'}"><v-icon left>mdi-gavel</v-icon> Law and Order</v-btn>
        </v-col>
        <v-col>
          <v-btn block depressed :to="{name: 'price_list'}"><v-icon left>mdi-chart-bar</v-icon> Price Control</v-btn>
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