<script>
  import { Bar } from 'vue-chartjs'
  import {chartColors} from "../../assets/utils";

  export default {
    extends: Bar,
    props: ['dataset','labels'],
    data() {
      return {
        options: {
          responsive: true,
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Trích dẫn theo năm'
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        },
        chart_data: {
          labels: this.labels,
          datasets: [
            {
              label: 'Trích dẫn theo năm',
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
