<template>
  <div id="container">
    <svg xlmns="http://www.w3.org/2000/svg" :viewBox.camel="viewbox">
      <g>
        <defs>
          <marker id="arrowhead" markerWidth="100" markerHeight="100"
                  refX="3.5" refY="3.5" orient="0deg">
            <polygon points="0 0, 10 3.5, 0 7" />
          </marker>
        </defs>
        <g v-for="(item, i) in items" :key="item+i">
          <g>
            <text :x="0" :y="calculateYPos(i) + 8">
              {{ item }}
            </text>

            <path
              marker-start="url(#arrowhead)"
              :d="'M' + (sideWidth) + ',' + halfSize +' '+
                   'C' + (sideWidth*0.75) + ',' + halfSize +' '+
                         halfSize*0.75 + ',' + calculateYPos(i) +' '+
                         (sideWidth*0.25) + ',' + calculateYPos(i)"
            />
          </g>
        </g>
        <g v-for="(item, i) in items" :key="item + i">
          <g>
            <text :x="sideWidth + middleWidth + sideWidth*0.95" :y="calculateYPos(i) + 8">
              {{ item }}
            </text>

            <path
              marker-end="url(#arrowhead)"
              :d="'M' + (sideWidth + middleWidth) + ',' + halfSize +' '+
                   'C' + (middleWidth + sideWidth + sideWidth*0.25) + ',' + halfSize +' '+
                         halfSize*1.25 + ',' + calculateYPos(i) +' '+
                         (sideWidth + middleWidth + sideWidth*0.9) + ',' + calculateYPos(i)"
            />
          </g>
        </g>
        <clip-mask
          :title="'test'"
          :half-size="halfSize"
          :side-width="sideWidth"
          :radius="radius"
        ></clip-mask>
      </g>
    </svg>
  </div>
</template>

<script>
//Guide: https://medium.com/@krutie/building-a-dynamic-tree-diagram-with-svg-and-vue-js-a5df28e300cd
import ClipMask from "@/components/influence_graph/ClipMask";
export default {
  name: "influence_graph",
  components: {ClipMask},
  data() {
    return {
      graph_size: 1000,
      items: [
        "influenced_1",
        "influenced_1",
        "influenced_1",
        "influenced_1",
        "influenced_1",
        "influenced_1",
        "influenced_1",
        "influenced_1"
      ],
    }
  },
  methods: {
    calculateYPos(i) {
      // new values for x2 and x3
      let x = this.distance * i + this.distance * 0.5;
      return Math.round(x);
    }
  },
  computed: {
    sideWidth() { // topHeight in horizontal
      // 20% of the size
      return this.graph_size * 0.45;
    },
    middleWidth() { // bottomHeight in horizontal
      // 80% of the size
      return this.graph_size * 0.1;
    },
    height() {
      return this.graph_size;
    },
    halfSize() {
      return this.graph_size * 0.5;
    },
    distance() {
      // distance between two array items on the horizon
      return Math.round(this.height / this.items.length);
    },
    radius() {
      return (this.middleWidth*0.5)
    },
    viewbox() {
      return "0 0 " + this.graph_size + " " + this.graph_size;
    }
  },
}
</script>

<style scoped>
  #container {
    display: flex;
    height: 100vh;
    justify-content: center;
  }
  svg {
    width: 100%;
    height: 100%;
  }
  path {
    stroke: #5bbaa1;
    fill: none;
    stroke-width: 3;
    stroke-linecap: round;
  }
  #arrowhead {
    stroke: #5bbaa1;
    fill: #5bbaa1;
  }
</style>
