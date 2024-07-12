<template>
  <v-card flat tile>
    <v-card-title>Statistics</v-card-title>
    <GChart
      type="PieChart"
      :data="chartData"
      :options="chartOptions"
    />
    <v-card-text>

    </v-card-text>
  </v-card>
</template>

<script>
  import { GChart } from 'vue-google-charts/legacy'
  export default {
    components: { GChart },
    data: () => ({
      
      chartData: [
        ['Status', 'Activities'],
        ['Pending', 100],
        ['Resolved', 50]
      ],
      chartOptions: {
        chartArea:{left:0, width:'100%', height:'75%'},
        legend: {position: 'top', alignment: 'center'},
        height: 300,
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