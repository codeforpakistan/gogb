<template>
  <v-main>
    <app-bar title="Statistics"></app-bar>
    <v-card flat tile>
      <v-card-text>
      <GChart
        type="PieChart"
        :data="status.data"
        :options="status.options"
      />
      <GChart
        type="LineChart"
        :data="timeline.data"
        :options="timeline.options"
      />
      <GChart
        type="PieChart"
        :data="type.data"
        :options="type.options"
      />

      </v-card-text>
    </v-card>
  </v-main>
</template>

<script>
  import AppBar from '@/components/AppBar'
  import { GChart } from 'vue-google-charts/legacy'
  export default {
    components: { AppBar, GChart },
    data: () => ({
      status: {
        data: [
          ['Status', 'Activities'],
          ['Pending', 100],
          ['Resolved', 50]
        ],
        options: {
          chartArea:{left:0, width:'100%', height:'75%'},
          legend: {position: 'top', alignment: 'center'},
          height: 300,
        },
      },
      timeline: {
        data: [
          ['Year', 'Strike', 'Protest', 'Violence'],
          ['2020', 100, 234, 120],
          ['2021', 75, 43, 90],
          ['2022', 50, 220, 94],
          ['2023', 50, 74, 23],
          ['2024', 50, 110, 32]
        ],
        options: {
          chartArea:{left:0, width:'100%', height:'75%'},
          legend: {position: 'top', alignment: 'center'},
          height: 300,
        },
      },
      type: {
        data: [
          ['Type', 'Activities'],
          ['Strike', 100],
          ['Protest', 75],
          ['Violence', 50]
        ],
        options: {
          chartArea:{left:0, width:'100%', height:'75%'},
          legend: {position: 'top', alignment: 'center'},
          height: 300,
        },
      },
      headers: [
        { text: 'Location', value: 'district' },
        { text: 'Total', value: 'total' },
        { text: 'Pending', value: 'pending' },
        { text: 'Resolved', value: 'resolved' },
      ],
      activities: [
        { division: 'Baltistan', district: 'Ghanche', total: 100, pending: 50, resolved: 50 },
        { division: 'Baltistan', district: 'Shigar', total: 100, pending: 50, resolved: 50 },
        { division: 'Baltistan', district: 'Kharmang', total: 100, pending: 50, resolved: 50 },
        { division: 'Baltistan', district: 'Skardu', total: 100, pending: 50, resolved: 50 },
        { division: 'Baltistan', district: 'Roundu', total: 100, pending: 50, resolved: 50 },
        { division: 'Gilgit', district: 'Gilgit', total: 100, pending: 50, resolved: 50 },
        { division: 'Gilgit', district: 'Ghizer', total: 100, pending: 50, resolved: 50 },
        { division: 'Gilgit', district: 'Hunza', total: 100, pending: 50, resolved: 50 },
        { division: 'Gilgit', district: 'Nagar', total: 100, pending: 50, resolved: 50 },
        { division: 'Gilgit', district: 'Gupis–Yasin', total: 100, pending: 50, resolved: 50 },
        { division: 'Diamer', district: 'Diamer', total: 100, pending: 50, resolved: 50 },
        { division: 'Diamer', district: 'Astore', total: 100, pending: 50, resolved: 50 },
        { division: 'Diamer', district: 'Darel', total: 100, pending: 50, resolved: 50 },
        { division: 'Diamer', district: 'Tangir', total: 100, pending: 50, resolved: 50 },
      ],
    }),
  }
</script>