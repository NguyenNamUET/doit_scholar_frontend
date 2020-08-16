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
          <div id="sort_section">
            <DropDown v-bind:msg="this.field_sort" @update-fos-checked="updateFOSChecked"/>
          </div>
        </div>
      </div>
    </div>

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

    <div class="tile is-ancestor">
      <div class="tile is-parent is-8 is-vertical">
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
          <a class="pagination-previous pagi-button" @click="handlePreviousandNext(true)">Trang trước</a>
          <a class="pagination-next pagi-button" @click="handlePreviousandNext(false)">Trang sau</a>

          <!-- for example 1 2 3 4 ... 10 11 12 13-->
          <ul class="pagination-list" v-if="isPaginationReStyle === 0">
            <li v-for="page in Array.from(Array(Math.ceil(this.total_count/this.per_page)).keys()).slice(0,4)"
            @click="handlePageChange(page+1)">
              <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (page+1)">
                {{page + 1}}
              </a>
            </li>
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-for="page in Array.from(Array(Math.ceil(this.total_count/this.per_page)).keys()).slice(Math.max(this.total_count - 4, 1))"
            @click="handlePageChange(page)">
              <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (page+1)">
                {{page + 1}}
              </a>
            </li>
          </ul>

          <!-- for example 1 ... 4 5 6 7... 10 11 12 13-->
          <ul class="pagination-list" v-if="isPaginationReStyle === 1">
            <li>
              <a class="pagination-link pagi-button" aria-label="Goto page 1">
                1
              </a>
            </li>
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-for="page in Array.from(Array(Math.ceil(this.total_count/this.per_page)).keys()).slice(this.current_page-1,Math.min(this.current_page+3, this.total_count-4))"
            @click="handlePageChange(page+1)">
              <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (page+1)">
                {{page + 1}}
              </a>
            </li>
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-for="page in Array.from(Array(Math.ceil(this.total_count/this.per_page)).keys()).slice(Math.max(this.total_count - 4, 1))"
            @click="handlePageChange(page)">
              <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (page+1)">
                {{page + 1}}
              </a>
            </li>
          </ul>

          <!-- for example 1 ... 9 10 11 12 13-->
          <ul class="pagination-list" v-if="isPaginationReStyle === 2">
            <li>
              <a class="pagination-link pagi-button" aria-label="Goto page 1">
                1
              </a>
            </li>
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>

            <li v-for="page in Array.from(Array(Math.ceil(this.total_count/this.per_page)).keys()).slice(this.current_page-1,this.current_page+4)"
            @click="handlePageChange(page)">
              <a class="pagination-link pagi-button" :aria-label="'Goto page ' + (page+1)">
                {{page + 1}}
              </a>
            </li>
          </ul>

        </nav>
      </div>
    </div>

  </div>

  <div v-else>
    <NuxtError v-bind:error="{statusCode:404, message:'Không tìm thấy từ khóa'}"></NuxtError>
  </div>

</template>

<script>
    import {formatNumber} from "../assets/utils";
    import DropDown from "../components/DropDown";
    import {fields_type} from "../assets/utils";
    import {publication_type} from "../assets/utils";
    import AuthorInfo from "../components/search_page/AuthorInfo";
    import SearchResult from "../components/search_page/SearchResult";
    import NuxtError from "@/components/ErrorPage";
    import {paper_by_title} from "@/API/elastic_api";

    export default {
      name: "search",
      watchQuery: true,
      components: {SearchResult, AuthorInfo, DropDown, NuxtError},
      head() {
        return {
          title: 'DoIT Scholar - Tìm kiếm văn bản học thuật'
        }
      },
      data() {
        return {
          per_page: 1,
          current_page: 1,
          total_count: 0,
          field_sort: null,
          publication_sort: publication_type,
          query_params: null,
          author_info: null,
          search_results: null,
          author_hidden: true,
          msg_hidden: false,
          topic: {
            name: 'Khoa Học Máy Tính',
            description: 'Khoa học máy tính là cách tiếp cận khoa học và thực tiễn để tính toán và các ứng dụng của nó và nghiên cứu có hệ thống về tính khả thi, cấu trúc, biểu hiện và cơ giới hóa các thủ tục (hoặc các thuật toán) cơ bản làm cơ sở cho việc thu thập, đại diện, xử lý, lưu trữ, truyền thông và truy cập thông tin.'
          },
          //Nam added this for dropdown
          checkedCategories: [],
          query_params2: null,

          //Nam added this for pagination
          isPaginationReStyle: 0
        }
      },
      filters: {
        formatNumber(number) {
          return formatNumber(number)
        }
      },
      async asyncData({query, store}) {
        await store.dispatch('search_result/paper_by_title', query)

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
        //Nam added this for dropdown search
        async updateFOSChecked(checkedCategories) {
          this.checkedCategories = checkedCategories
          let query_params = {query: this.$route.query.query,
                              fields_of_study: checkedCategories,
                              fos_is_should: false, //if True then search by OR rule, else then by AND rule
                              return_fos_aggs: true,
                              return_top_author: true,
                              top_author_size: 10,
                              start: 0,
                              size: 10,
                              page: this.current_page}


          await this.$store.dispatch('search_result/paper_by_fos_and_title', query_params).then()
          if(this.$store.state.search_result.search_results.length > 0){
            this.current_page= parseInt(query_params['page']);
            this.search_results= this.$store.state.search_result.search_results;
            this.keyword= query_params['query'];
            this.total_count= this.$store.state.search_result.total;
            this.author_info= this.$store.state.search_result.aggregation.author_count.name.buckets;
            this.field_sort= this.$store.state.search_result.aggregation.fields_of_study.buckets;

            // let router_query = {query: this.keyword,
            //                     fos: query_params["fields_of_study"].join(','),
            //                     start: (this.current_page-1)*this.per_page,
            //                     size: this.per_page,
            //                     return_top_author: true,
            //                     top_author_size: 10,
            //                     page: this.current_page}
            // await this.$router.push({path: 'search', query: router_query})
           }
          else{
            this.current_page= parseInt(query_params['page']);
            this.search_results= this.$store.state.search_result.search_results;
            this.keyword= query_params['query'];
            this.total_count= 0;
            this.author_info= [];
            this.field_sort= [];
          }


        },

        async handlePageChange(current_page){
          if (current_page >=4 && current_page <= this.total_count-5){
            this.isPaginationReStyle = 1
            this.current_page = current_page
          }
          else if (current_page === this.total_count-4){
            this.isPaginationReStyle = 2
            this.current_page = current_page
          }
          else {
            this.isPaginationReStyle = 0
            this.current_page = current_page
          }

          //These commented codes are testing
          // let data = await paper_by_title({query: this.$route.query.query,start: (this.current_page-1)*10,size: 10,})
          // let last_previoud_paper_id = data.hits.hits[-1]._source.corpusID
          // let query_params = {query: this.$route.query.query,start: 0,size: 10,deep_pagination: true,last_paper_id: last_previoud_paper_id,return_top_author: true,top_author_size: 10,return_fos_aggs: true,page: current_page}

          //Nam added this to jump tp random page
          //Cannot jump to more than 10k results
          // let query_params = {
          //                       query: this.$route.query.query,
          //                       start: (this.current_page-1)*this.per_page,
          //                       size: this.per_page,
          //                       return_top_author: true,
          //                       top_author_size: 10,
          //                       return_fos_aggs: true,
          //                       page: current_page
          //                     }
          // await this.$store.dispatch('search_result/paper_by_title', query_params)
          //
          //
          // this.current_page= parseInt(query_params['page']);
          // this.search_results= this.$store.state.search_result.search_results;
          // this.keyword= query_params['query'];
          // this.total_count= this.$store.state.search_result.total;
          // this.author_info= this.$store.state.search_result.aggregation.author_count.name.buckets;
          // this.field_sort= this.$store.state.search_result.aggregation.fields_of_study.buckets;

          let router_query = {query: this.$route.query.query,
                              start: (this.current_page-1)*this.per_page,
                              size: this.per_page,
                              return_top_author: true,
                              top_author_size: 10,
                              page: this.current_page}
          await this.$router.push({name: 'search', query: router_query})


        },

        handlePreviousandNext(isPrevious){
          if(isPrevious){
            this.current_page = Math.max(1, this.current_page-1)
            this.handlePageChange(this.current_page)
          }
          else{
            this.current_page = Math.min(this.current_page+1, this.total_count)
            this.handlePageChange(this.current_page)
          }
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
  .pagi-button:hover {
    text-decoration: none;
  }
</style>
