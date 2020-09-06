<template>
  <div class="field has-addons">
  <div class="control is-expanded">
    <input
      v-if="this.home"
      v-on:keyup.enter="submitQuery"
      v-model="search_query"
      class="input"
      type="text"
      placeholder="Nhập từ khóa tìm kiếm: tên tác giả, tên văn bản, năm xuất bản,..."
    >
    <b-autocomplete
      v-else
      v-on:keyup.enter="submitQuery"
      v-model="search_query"
      :data="filteredDataArray"
      @input="getAutocomplete"
      :loading="is_loading"
      placeholder="Nhập từ khóa tìm kiếm: tên tác giả, tên văn bản, năm xuất bản,..."
      @select="option => this.selected = option"
    >
      <template slot="empty">No results for {{search_query}}</template>
    </b-autocomplete>
  </div>
  <div class="control">
    <p class="button is-primary" v-on:click="submitQuery">
      Tìm kiếm
    </p>
  </div>
</div>
</template>

<script>
import {autocomplete} from "@/API/elastic_api";

export default {
      name: "SearchBar",
      props: ['home'],
      data() {
        return {
          search_query: '',
          query_params: {},
          autocomplete_data: [],
          selected: null,
          is_loading: false,
        }
      },
      computed: {
        async filteredDataArray() {
          return this.autocomplete_data.filter((option) => {
            return option
              .toString()
              .toLowerCase()
              .indexOf(this.search_query.toLowerCase()) >= 0
          })
        }
      },
      methods: {
        async getAutocomplete() {
          console.log('getting')
          if (!this.search_query.length)
            this.autocomplete_data = []

          this.is_loading = true
          let result = await autocomplete({
            search_content: this.search_query,
            size: 5
          }).finally((response) => {
            this.is_loading = false
            console.log('here', response)
          })
          console.log(result)
        },
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
        },
      }
    }
</script>

<style scoped>
</style>
