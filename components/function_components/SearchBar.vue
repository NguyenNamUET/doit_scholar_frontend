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

  </div>

</template>

<script>
    export default {
      name: "SearchBar",
      data() {
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
            console.log(this.search_query)
          if(this.search_query!==""){
            this.$router.push({name:'search', query: this.query_params})
          }
          else{
            console.log("error")
            this.$buefy.toast.open({
              duration: 3000,
              message: `Thanh tìm kiếm <b>không thể để trống</b>`,
              position: 'is-bottom',
              type: 'is-danger'
            })
          }
        }
      }
    }
</script>

<style scoped>
</style>
