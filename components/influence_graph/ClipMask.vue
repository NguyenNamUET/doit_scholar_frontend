<template>
  <g>
    <text :x="sideWidth + radius" text-anchor="middle" :y="halfSize + radius + 10" fill="black" font-size="30">Author name</text>
  </g>
</template>

<script>
export default {
  name: "ClipMask",
  props: ["title", "halfSize", "sideWidth", "radius"]
}
</script>

<style scoped>
  .circle {
    background-color: white;
  }
</style>
