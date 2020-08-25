<template>
  <div v-if="this.search_results.length !== 0"
       class="container"
       id="page_container">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child">
          <h1 class="text-class-1">
            <strong>Tìm được {{this.total_count | formatNumber}} kết quả</strong>
          </h1>
          <!------------------------      DROPDOWN HERE   --------------------------->
          <div id="sort_section">
            <DropDown :dd_data="{msg:'Lĩnh vực',fields: this.field_sort, type:0}" @update-fos-checked="updateFOSChecked"/>
            <DropDown :dd_data="{msg:'Tác giả',fields: this.author_info, type:1}" @update-authors-checked="updateAuthorsChecked"/>
          </div>
          <!-------------------------------------------------------------------------->
        </div>
      </div>
    </div>

    <!------------------------      AUTHORS CARD HERE   --------------------------->
    <div class="tile is-ancestor">
      <div class="tile is-parent is-8 is-vertical">
        <div class="tile is-child columns is-multiline" v-if="author_hidden">
            <AuthorInfo
              v-for="author in author_info.slice(0,3)"
              v-bind:author_info="author"
            >
            </AuthorInfo>
            <a class="column is-full text-class-3" v-on:click="author_hidden = false">Xem thêm tác giả</a>
        </div>

        <div class="tile is-child columns is-multiline" v-else>
          <AuthorInfo
            v-for="author in this.author_info"
            v-bind:author_info="author"
          >
          </AuthorInfo>
          <a class="column is-full text-class-3" v-on:click="author_hidden = true">Ẩn bớt tác giả</a>
        </div>

        <div class="tile is-child">
          <SearchResult v-for="result in this.search_results" v-bind:search_result="result"></SearchResult>
        </div>
      </div>
    </div>
    <!-------------------------------------------------------------------------->


    <!------------------------      PAGINATION HERE   --------------------------->
    <Pagination :page-count="this.total_count"
                v-model="current_page"
                :click-handler="updatePage"
                :page-range="3"
                :margin-pages="2"
                :container-class="'pagination'"
                :page-class="'page-item'">
    </Pagination>
    <!-------------------------------------------------------------------------->
  </div>

  <div v-else>
    <NuxtError v-bind:error="{statusCode:404, message:'Không tìm thấy từ khóa'}"></NuxtError>
  </div>

</template>

<script>
    import {formatNumber} from "../assets/utils";
    import {filtered_keys} from "../assets/utils";
    import DropDown from "../components/DropDown";
    import {publication_type} from "../assets/utils";
    import AuthorInfo from "../components/search_page/AuthorInfo";
    import SearchResult from "../components/search_page/SearchResult";
    import NuxtError from "@/components/ErrorPage";
    import Pagination from "@/components/Pagination";

    export default {
      name: "search",
      watchQuery: true,
      components: {SearchResult, AuthorInfo, DropDown, Pagination, NuxtError},
      head() {
        return {
          title: 'DoIT Scholar - Tìm kiếm văn bản học thuật'
        }
      },
      data() {
        return {
          total_count: 0,
          field_sort: null,
          publication_sort: publication_type,
          query_params: null,
          author_info: null,
          search_results: null,
          author_hidden: true,
          msg_hidden: false,

          //Nam added this for dropdown
          authorsChecked: [],
          fosChecked: [],
          //24/08/2020: Nam changed this for pagination
          current_page: 1,
          per_page: 1
        }
      },
      filters: {
        formatNumber(number) {
          return formatNumber(number)
        }
      },
      async asyncData({query, store}) {
        let query_params = query
        console.log("asyncData: ",query)
        if("top_author_size" in query) {
          query_params["return_top_author"] = true
        }
        if("fos0" in query) {
          let fos_keys = filtered_keys(Object.assign({},query), /fos/)
          query_params["fields_of_study"] = []
          for(let i=0; i<fos_keys.length; i++){
            let key = fos_keys[i]
            query_params["fields_of_study"].push(query[key])
          }
        }
        if("author0" in query) {
          let author_keys = filtered_keys(Object.assign({},query), /author\d/)
          query_params["authors"] = []
          for(let i=0; i<author_keys.length; i++){
            let key = author_keys[i]
            query_params["authors"].push(query[key])
          }
        }
        console.log("asyncData: ",query_params)
        query_params["return_fos_aggs"]= true
        await store.dispatch('search_result/paper_by_title', query_params)
        console.log(store.state.search_result)
        if(store.state.search_result.search_results.length > 0) {
          return {
            query_params: query,
            current_page: parseInt(query['page']),
            search_results: store.state.search_result.search_results,
            keyword: query['searchContent'],
            total_count: store.state.search_result.total,
            author_info: store.state.search_result.aggregation.author_count.name.buckets,
            field_sort: store.state.search_result.aggregation.fields_of_study.buckets,
            last_paper_id: store.state.search_result.last_paper_id
          }
        }
        else{
           return {
            query_params: query,
            current_page: parseInt(query['page']),
            search_results: store.state.search_result.search_results,
            keyword: query['searchContent'],
            total_count: 0,
            author_info: [],
            field_sort: [],
          }
        }
      },
      methods: {
        //20/08/2020: Nam added this for pagination (view Pagination.vue for details)
        updatePage(pageNum){
          let router_query = Object.assign({},this.$route.query)
          router_query["start"]=(pageNum - 1) * this.per_page
          router_query["size"]=this.per_page
          router_query["page"]=pageNum;
          //Delete these to have consitent router
          delete router_query["fields_of_study"]
          delete router_query["return_top_author"]
          delete router_query["return_fos_aggs"]
          console.log("updatePage: ", router_query)
          this.$router.push({name: 'search', query: router_query})
        },
        //24/08/2020: Nam fixed this for dropdown search
        async updateFOSChecked(checkedCategories) {
          this.fosChecked = checkedCategories
          let router_query = {query: this.$route.query.query,
                              start: 0,
                              size: this.$route.query.size,
                              top_author_size: 10,
                              page: 1
          }
          //Create fields of study params for example ?fos0=Medicine&fos1=Engineering
          for(let i=0; i<this.fosChecked.length; i++){
            router_query[`fos${i}`]=this.fosChecked[i]
          }
          this.$router.push({name: 'search', query: router_query})
          console.log("updateFOSChecked: ",router_query)
        },
        async updateAuthorsChecked(checkedCategories) {
          this.authorsChecked = checkedCategories
          let router_query = {query: this.$route.query.query,
                              start: this.$route.query.start,
                              size: this.$route.query.size,
                              top_author_size: 10,
                              page: this.current_page
          }
          //Create authors params for example ?author0=Medicine&author1=Engineering
          for(let i=0; i<this.authorsChecked.length; i++){
            router_query[`author${i}`]=this.authorsChecked[i]
          }
          this.$router.push({name: 'search', query: router_query})
          console.log("updateAuthorsChecked: ",router_query)
        }
      }
    }
</script>

<style scoped>
  @import "assets/general_styling.scss";
  .container {
    padding: 40px 20px;
  }
  #sort_section {
    border-top: 1px solid #d9dadb;
    padding: 10px;
    border-bottom: 1px solid #d9dadb;
  }
  p {
    color: black;
  }
  button:hover {
    cursor: pointer;
  }

</style>
