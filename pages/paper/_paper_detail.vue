<template>

</template>

<script>
    export default {
      name: "_paper_detail",
      data() {
        return {
          paper_id: null,
        }
      },
      async asyncData({route, $axios}) {
        // let id_pattern = /[0-9a-z]+$/g
        // let paper_id = id_pattern.exec(route.params.paper_detail)
        // let data = await $axios.$get('https://api.semanticscholar.org/v1/paper/' + paper_id)
        // console.log(paper_id, data)
        // return {
        //   paper_id: paper_id,
        //   paper_detail: data
        // }
      }
    }
</script>

<style scoped>

</style>
