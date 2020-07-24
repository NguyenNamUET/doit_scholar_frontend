<template>

</template>

<script>
  import { Bar } from 'vue-chartjs'
  export default {
    name: "CitationBar",
    extends: Bar,
    mounted() {
      this.renderChart({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Citation Graph',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      })
    }
  }
</script>

<style scoped>

</style>
