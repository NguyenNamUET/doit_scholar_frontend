<template>
  <div>
    <client-only>
      <AntvGraph/>
    </client-only>
  </div>
</template>

<script>
import AntvGraph from "@/components/influence_graph/AntvGraph";
  export default {
  name: "test",
    components: {
    'AntvGraph': () => import('@/components/influence_graph/AntvGraph.vue')
    },
  }
</script>

<style scoped>

</style>
