<script>
  import { Bar } from 'vue-chartjs'
  import {chartColors} from "assets/utils"

  export default {
    extends: Bar,
    props: ['dataset','labels','title'],
    data() {
      return {
        options: {
          responsive: true,
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: this.title
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false
                }
              }
            ]
          }
        },
        chart_data: {
          labels: this.labels,
          datasets: [
            {
              label: this.title,
              backgroundColor: chartColors.yellow,
              data: this.dataset
            }
          ]
        }
      }
    },
    mounted() {
      this.renderChart(this.chart_data, this.options)
    }
  }
</script>

<style scoped>

</style>
