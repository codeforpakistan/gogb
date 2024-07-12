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
            <v-btn color="secondary" variant="flat" block to="detail">Update</v-btn>
          </v-card-actions>
        </v-card>
    </v-main>
</template>
<script>
  export default {
    data: () => ({
      activity: {
        subject: 'Activity 1',
        type: 'Strike',
        status: 'Resolved',
        description: 'the quick brown fix jumps over the lazy dog',
        start: null,
        end: null,
      },
      types: ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'],
      status: ['Open', 'Assigned', 'Pending', 'Rejected', 'Resolved', 'Closed']
    }),
  }
</script>