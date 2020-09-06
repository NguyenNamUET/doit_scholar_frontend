<template>
  <div class="field has-addons">
  <div class="control is-expanded">
<!--    <input-->
<!--      v-if="this.home"-->
<!--      v-on:keyup.enter="submitQuery"-->
<!--      v-model="search_query"-->
<!--      class="input"-->
<!--      type="text"-->
<!--      placeholder="Nhập từ khóa tìm kiếm: tên tác giả, tên văn bản, năm xuất bản,..."-->
<!--    >-->
    <div v-on:keyup.enter="submitQuery">
      <b-autocomplete
      v-model="search_query"
      :data="data"
      @typing="getAutocomplete"
      :loading="is_loading"
      placeholder="Nhập từ khóa tìm kiếm: tên tác giả, tên văn bản, năm xuất bản,..."
      @select="option => this.selected = option"
      >
        <template slot="empty">No results for {{search_query}}</template>
      </b-autocomplete>
    </div>

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
          data: [],
          search_query: '',
          query_params: {},
          autocomplete_data: [],
          selected: null,
          is_loading: false,
        }
      },
      // computed: {
      //   async filteredDataArray() {
      //     return this.autocomplete_data.filter((option) => {
      //       return option
      //         .toString()
      //         .toLowerCase()
      //         .indexOf(this.search_query.toLowerCase()) >= 0
      //     })
      //   }
      // },
      methods: {
        getAutocomplete: _.debounce(async function(name) {
          // if (!this.search_query.length)
          //   this.autocomplete_data = []
          this.is_loading = true
          let result = await autocomplete({
            search_content: name,
            size: 5
          })
          this.data = _.map(result, (item)=>{return item._source.title})
          this.is_loading = false
        }),
        submitQuery() {
          console.log(this.search_query)
          this.query_params = {
            query: this.search_query,
            start: 0,
            size: 10,
            top_author_size: 10,
            page: 1
            }
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
