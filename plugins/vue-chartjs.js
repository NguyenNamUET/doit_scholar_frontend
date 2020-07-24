import Vue from 'vue'
import { Bar } from 'vue-chartjs'

Vue.component('my-line', Bar.extend({
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
}))
