<template>
  <v-card color="transparent" tile flat>
    <v-card-title>{{ activity.subject }}</v-card-title>
    <v-card-text>
      <v-text-field v-model="activity.subject" label="Subject"></v-text-field>
      <v-row>
        <v-col><v-autocomplete v-model="activity.type" :items="types" label="Type"></v-autocomplete></v-col>
        <v-col><v-autocomplete label="Location" :items="locations" v-model="activity.location"></v-autocomplete></v-col>
      </v-row>

      <v-row>
        <v-col><v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="activity.start" label="Start date" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="activity.start" @input="menu1 = false"></v-date-picker>
        </v-menu></v-col>
      
        <v-col><v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="activity.end" label="End date" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="activity.end" @input="menu2 = false"></v-date-picker>
        </v-menu></v-col>
      </v-row>

      <v-textarea v-model="activity.description" label="Description"></v-textarea>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-btn color="secondary" depressed block :to="{ name: 'detail' }">Update</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  const { DateTime } = require("luxon");
  export default {
    data: () => ({
      menu2: false,
      activity: {
        subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        type: 'Strike',
        location: 'Chilas',
        status: 'Resolved',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non nisi sed ante vehicula varius non vel odio. Phasellus varius, arcu sed eleifend sodales, nibh metus rutrum enim, et venenatis eros ex quis purus. Proin finibus efficitur tortor, sed tincidunt ante varius sed. Etiam sodales magna a dignissim sagittis. Phasellus accumsan auctor sem, quis congue nisl rhoncus id. Proin nulla ligula, bibendum eget cursus non, finibus sed velit. Phasellus mattis libero lectus, in facilisis neque blandit id. Mauris pellentesque ex non tincidunt rhoncus. Morbi in dictum augue. Etiam tristique sagittis ullamcorper. In auctor sit amet nulla id consequat. Suspendisse vitae neque et augue lobortis hendrerit. Etiam pretium auctor auctor. Proin euismod posuere erat eget fermentum.',
        start: '2020-12-20',
        end: '2020-12-20',
      },
      types: ['Strike', 'Protest', 'Violence'],
      locations: ['Aliabad','Chilas','Dambudas','Darel','Eidghah','Gahkuch','Gilgit','Khaplu','Kharmang','Nagar','Phander','Shigar','Skardu','Tangir'],
      status: ['Open', 'Assigned', 'Pending', 'Rejected', 'Resolved', 'Closed']
    }),
  }
</script>