<template>
  <v-main>
    <app-bar title="Law &amp; Order"></app-bar>
    <v-card color="transparent" tile flat>
      <v-card-title>{{ item.subject }}</v-card-title>
      <v-card-text>
        <v-text-field v-model="item.subject" label="Subject"></v-text-field>
        <v-row>
          <v-col><v-autocomplete v-model="item.type" :items="types" label="Type"></v-autocomplete></v-col>
          <v-col><v-autocomplete label="Location" :items="locations" v-model="item.location"></v-autocomplete></v-col>
        </v-row>

        <v-row>
          <v-col><v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="item.start" label="Start date" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="item.start" @input="menu1 = false"></v-date-picker>
          </v-menu></v-col>
        
          <v-col><v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="item.end" label="End date" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="item.end" @input="menu2 = false"></v-date-picker>
          </v-menu></v-col>
        </v-row>

        <v-textarea v-model="item.description" label="Description"></v-textarea>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn color="secondary" depressed block :to="{ name: 'law_detail' }">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>
<script>
import AppBar from '@/components/AppBar'
const { DateTime } = require("luxon");
export default {
  components: { AppBar },
  data: () => ({
    menu2: false,
    item: {
      subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      type: 'Strike',
      location: 'Chilas',
      status: 'Resolved',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non nisi sed ante vehicula varius non vel odio. Phasellus varius, arcu sed eleifend sodales, nibh metus rutrum enim, et venenatis eros ex quis purus. Proin finibus efficitur tortor, sed tincidunt ante varius sed. Etiam sodales magna a dignissim sagittis.',
      start: '2020-12-20',
      end: '2020-12-20',
    },
    types: ['Strike', 'Protest', 'Violence'],
    locations: ['Aliabad','Chilas','Dambudas','Darel','Eidghah','Gahkuch','Gilgit','Khaplu','Kharmang','Nagar','Phander','Shigar','Skardu','Tangir'],
    status: ['Open', 'Assigned', 'Pending', 'Rejected', 'Resolved', 'Closed']
  }),
}
</script>