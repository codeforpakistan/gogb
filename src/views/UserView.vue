<template>
  <v-main>
    <app-bar title="User Preferences"></app-bar>
    <v-card flat tile>
      <v-card-title>Username</v-card-title>
      <v-card-text>
        <v-text-field label="Department" v-model="user.department"></v-text-field>
        <v-autocomplete label="Location" :items="locations" v-model="user.location"></v-autocomplete>
        <v-switch v-model="$vuetify.theme.dark" label="Use dark theme"></v-switch>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn color="secondary" depressed block :to="{ name: 'login' }">Sign Out</v-btn>
      </v-card-actions>

    </v-card>
  </v-main>
</template>

<script>
import AppBar from '@/components/AppBar'
export default {
  components: { AppBar },
  data: () => ({
    user: {
      department: 'Civil Administration',
      location: 'Chilas',
    },
    locations: ['Aliabad','Chilas','Dambudas','Darel','Eidghah','Gahkuch','Gilgit','Khaplu','Kharmang','Nagar','Phander','Shigar','Skardu','Tangir'],
  }),
}
</script>