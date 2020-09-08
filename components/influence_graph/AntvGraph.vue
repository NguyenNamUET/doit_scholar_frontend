<template>
  <div >
      <div ref="mountNode">

      </div>
  </div>
</template>

<script>
    import G6 from '@antv/g6'

    export default {
      name: "AntvGraph",
      data() {
        return {
          initData: {
            // The array of nodes
            nodes: [
              {
                id: 'node1', // String, unique and required
                x: 100, // Number, the x coordinate
                y: 200, // Number, the y coordinate
                label: 'Source', // The label of the node
              },
              {
                id: 'node2',
                x: 300,
                y: 200,
                label: 'Target',
              },
            ],
            // The array of edges
            edges: [
              // An edge links from node1 to node2
              {
                source: 'node1', // String, required, the id of the source node
                target: 'node2', // String, required, the id of the target node
                label: 'I am an edge', // The label of the edge
              },
            ],
          }
        }
      },
      created() {
        if (process.client) {
          console.log('working')
          let graph = new G6.Graph({
            container: this.$refs.mountNode, // String | HTMLElement, required, the id of DOM element or an HTML node
            width: 800, // Number, required, the width of the graph
            height: 500, // Number, required, the height of the graph
          })
          graph.data(this.initData)
          graph.render()
        }
      }
    }
</script>

<style scoped>
</style>
