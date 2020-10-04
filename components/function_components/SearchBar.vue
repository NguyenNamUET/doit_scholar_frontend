<template>
  <div class="field has-addons">
    <div class="control is-expanded">
<!--      <input-->
<!--        v-if="this.home"-->
<!--        v-on:keyup.enter="submitQuery"-->
<!--        v-model="search_query"-->
<!--        class="input"-->
<!--        type="text"-->
<!--        placeholder="Nhập từ khóa tìm kiếm: tên tác giả, tên văn bản, năm xuất bản,..."-->
<!--      >-->
      <b-autocomplete
        v-model="search_query"
        @keyup.enter.native="submitQuery"
        class="autocomplete"
        :data="autocomplete_data"
        @typing="getAutocomplete"
        :loading="is_loading"
        placeholder="Nhập từ khóa tìm kiếm: tên tác giả, tên văn bản, năm xuất bản,..."
        @select="option => this.selected = option"
      >
        <template slot="empty">Không tìm thấy kết quả cho từ khóa {{search_query}}</template>
        <template slot-scope="props">
          <a
            :href="'/paper/' + formatTitle(props.option._source.title) + '.p-' + props.option._id"
            :title="props.option._source.title"
          >
            <span>
              <i class="far fa-newspaper"></i> {{props.option._source.title}}
            </span>

            <div class="text-class-3 color-class-3">
              Số trích dẫn của văn bản: {{props.option._source.citations_count}}
            </div>
          </a>
        </template>
      </b-autocomplete>
    </div>
    <div class="control">
      <p class="button is-warning" v-on:click="submitQuery">
        <i class="fas fa-search"></i>Tìm kiếm
      </p>
    </div>
  </div>
</template>

<script>
import {autocomplete} from "@/API/elastic_api";
import {formatTitle} from "assets/utils";

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
          raw_data: [],
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
        formatTitle(title) {
          return formatTitle(title)
        },
        getAutocomplete: _.debounce(async function(name) {
          // if (!this.search_query.length)
          //   this.autocomplete_data = []
          this.is_loading = true
          this.raw_data = await autocomplete({
            search_content: name,
            size: 10
          })
          this.autocomplete_data = _.toArray(this.raw_data)
          this.is_loading = false
          console.log(this.autocomplete_data)
        }),
        submitQuery() {
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
  .autocomplete {
    position: relative;
    z-index: 3;
  }
</style>
