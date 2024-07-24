<template>
  <v-card color="transparent" tile flat>
    <v-card-title>New activity</v-card-title>
    <v-card-text>
      <v-text-field v-model="activity.subject" label="Title"></v-text-field>
      <v-row>
        <v-col><v-autocomplete v-model="activity.type" :items="types" label="Type"></v-autocomplete></v-col>
        <v-col><v-autocomplete label="Location" :items="locations" v-model="activity.location" :hint="hint" persistent-hint append-icon="mdi-map-marker" @click:append="getLocation()" /></v-col>
      </v-row>
      <v-textarea v-model="activity.description" label="Description"></v-textarea>
      <v-row dense>
        <v-col><v-btn outlined rounded block depressed><v-icon>mdi-microphone</v-icon></v-btn></v-col>
        <v-col><v-btn outlined rounded block depressed><v-icon>mdi-camera</v-icon></v-btn></v-col>
        <v-col><v-btn outlined rounded block depressed><v-icon>mdi-video</v-icon></v-btn></v-col>
        <v-col><v-btn outlined rounded block depressed><v-icon>mdi-file-document-outline</v-icon></v-btn></v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-btn color="primary" depressed block :to="{ name: 'law_detail' }">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      activity: {
        subject: null,
        type: null,
        location: null,
        status: null,
        description: null,
        start: null,
        end: null,
      },
      hint: null,
      types: ['Strike', 'Protest', 'Violence'],
      locations: ['Aliabad','Chilas','Dambudas','Darel','Eidghah','Gahkuch','Gilgit','Khaplu','Kharmang','Nagar','Phander','Shigar','Skardu','Tangir'],
      status: ['Open', 'Assigned', 'Pending', 'Rejected', 'Resolved', 'Closed']
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