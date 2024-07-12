<template>
    <v-main>
        <v-card color="transparent" tile flat>
          <v-card-title>New activity</v-card-title>
          <v-card-text>
            <v-text-field v-model="activity.subject" label="Subject"></v-text-field>
            <v-autocomplete v-model="activity.type" :items="types" label="Type"></v-autocomplete>
            <v-textarea v-model="activity.description" label="Description"></v-textarea>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-btn color="primary" variant="flat" block to="detail">Submit</v-btn>
          </v-card-actions>
        </v-card>
    </v-main>
</template>
<script>
  export default {
    data: () => ({
      activity: {
        subject: null,
        type: null,
        status: null,
        description: null,
        start: null,
        end: null,
      },
      types: ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'],
      status: ['Open', 'Assigned', 'Pending', 'Rejected', 'Resolved', 'Closed']
    }),
  }
</script>