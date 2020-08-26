<template>
  <div class="field has-addons">
  <div class="control is-expanded">
    <input
      v-on:keyup.enter="submitQuery"
      v-model="search_query"
      class="input"
      type="text"
      placeholder="Nhập từ khóa tìm kiếm: tên tác giả, tên văn bản, năm xuất bản,..."
    >
  </div>
  <div class="control">
    <p class="button is-primary" v-on:click="submitQuery">
      Tìm kiếm
    </p>
  </div>
</div>
</template>

<script>
    export default {
      name: "SearchBar",
      chart_data() {
        return {
          search_query: '',
          query_params: {}
        }
      },
      methods: {
        submitQuery() {
          this.query_params = {
            query: this.search_query,
            start: 0,
            size: 10,
            top_author_size: 10,
            page: 1
            }
          this.$router.push({name:'search',
            query: this.query_params
          })
        }
      }
    }
</script>

<style scoped>
</style>
