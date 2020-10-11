<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props:['dataset','title'],
  data() {
    return {
      options: {
        responsive: true,
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: this.title
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.dataset, this.options)
  }
}
</script>
