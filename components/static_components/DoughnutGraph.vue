<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props:['dataset','title'],
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
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.dataset, this.options)
  }
};
</script>
