<template>
  <div class="field has-addons">
  <div class="control is-expanded">
    <input v-model="search_query" class="input" type="text" placeholder="Nhập từ khóa tìm kiếm: tên tác giả, tên văn bản, năm xuất bản,...">
  </div>
  <div class="control">
    <a class="button is-primary" @click="submitQuery">
      Tìm kiếm
    </a>
  </div>
</div>
</template>

<script>
    export default {
      name: "SearchBar",
      data() {
        return {
          search_query: '',
        }
      },
      methods: {
        submitQuery() {
          this.$router.push({name:'search',
            query: {
              query: this.search_query
            }
          })
        }
      }
    }
</script>

<style scoped>
</style>
