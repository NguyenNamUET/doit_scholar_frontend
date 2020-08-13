<template>
  <div class="container" id="page_container">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child">
          <h1 class="text-class-1">
            <strong>Tìm được {{this.total_count | formatNumber}} kết quả</strong>
          </h1>
          <div id="sort_section">
            <DropDown v-bind:msg="this.field_sort" @update-fos-checked="updateFOSChecked"/>
<!--            <DropDown v-bind:msg="this.publication_sort"/>-->
          </div>
        </div>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-8 is-vertical">
        <div class="tile is-child" v-if="author_hidden">
          <AuthorInfo
            v-for="author in author_info.slice(0,3)"
            v-bind:author_info="author"
          >
          </AuthorInfo>
          <a class="text-class-3" v-on:click="author_hidden = false">Xem thêm tác giả</a>
        </div>

        <div class="tile is-child" v-else>
          <AuthorInfo
            v-for="author in this.author_info"
            v-bind:author_info="author"
          >
          </AuthorInfo>
          <a class="text-class-3" v-on:click="author_hidden = true">Ẩn bớt tác giả</a>
        </div>

        <div class="tile is-child">
          <SearchResult v-for="result in this.search_results" v-bind:search_result="result"></SearchResult>

          <b-pagination
            :total="total_count"
            :current.sync="current_page"
            :range-before="4"
            :range-after="4"
            :order="'is-centered'"
            :per-page="per_page"
            :icon-prev="'chevron-left'"
            :icon-next="'chevron-right'"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
          >
            <b-pagination-button
              slot-scope="props"
              :page="props.page"
              :id="`page${props.page.number}`"
              >
              <span v-on:click="handlePageChange(props.page.number)">{{props.page.number}}</span>
            </b-pagination-button>
          </b-pagination>
        </div>
      </div>

      <div class="tile is-parent is-4 is-vertical">
        <div class="tile is-child">
          <article class="message is-info">
            <div class="message-header clickable">
              <nuxt-link :to="'/topic' + '/Computer-science'" class="text-class-2">{{topic.name}}</nuxt-link>
              <i class="fas fa-chevron-right"></i>
            </div>
            <div class="message-body">
              <div v-if="msg_hidden">
                <p>{{topic.description}}</p>
                <a class="text-class-3" v-on:click="msg_hidden = false">Ẩn bớt</a>
              </div>

              <div v-else>
                <p>{{topic.description.slice(0, topic.description.length*0.4)}}</p>
                <a class="text-class-3" v-on:click="msg_hidden = true">Xem thêm</a>
              </div>
            </div>
          </article>
          <article class="message is-info">
            <div class="message-header">
              <span>Các chủ đề liên quan</span>
            </div>
            <div class="message-body">
              <ul>
                <li>
                  <a>Khoa học dữ liệu</a>
                </li>
                <li>
                  <a>Công nghệ thông tin</a>
                </li>
                <li>
                  <a>Trí tuệ nhân tạo</a>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {formatNumber} from "../assets/utils";
    import DropDown from "../components/DropDown";
    import {fields_type} from "../assets/utils";
    import {publication_type} from "../assets/utils";
    import AuthorInfo from "../components/search_page/AuthorInfo";
    import SearchResult from "../components/search_page/SearchResult";
    import {paper_by_fos_and_title} from "@/API/elastic_api";


    export default {
      name: "search",
      watchQuery: true,
      components: {SearchResult, AuthorInfo, DropDown},
      head() {
        return {
          title: 'DoIT Scholar - Tìm kiếm văn bản học thuật'
        }
      },
      data() {
        return {
          per_page: 10,
          current_page: 1,
          total_count: 100000,
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
          checkedCategories: []
        }
      },
      filters: {
        formatNumber(number) {
          return formatNumber(number)
        }
      },
      async asyncData({query, store}) {
        await store.dispatch('search_result/paper_by_title', query)
        return {
          query_params: query,
          current_page: parseInt(query['page']),
          search_results: store.state.search_result.search_results,
          keyword: query['searchContent'],
          total_count: store.state.search_result.total,
          author_info: store.state.search_result.aggregation.author_count.name.buckets,
          field_sort: store.state.search_result.aggregation.fields_of_study.buckets,
        }
      },
      methods: {
        handlePageChange(page_num) {
          let query_params = this.query_params
          query_params.start = (page_num * this.per_page) - this.per_page
          query_params.page = page_num
          console.log(query_params)
          this.$router.push({name: 'search', query: query_params})
        },
        //Nam added this for dropdown search
        async updateFOSChecked(checkedCategories) {
          this.checkedCategories = checkedCategories
          let query_params = {search_content: this.$route.query.query,
                              fields_of_study: checkedCategories,
                              fos_is_should: true, //if True then search by OR rule, else then by AND rule
                              return_fos_aggs: false,
                              return_top_author: true,
                              top_author_size: 10,
                              start: 0,
                              size: 10}
          try{
            const data = await paper_by_fos_and_title(query_params)
            console.log(data.hits.hits)
          }catch (e) {
            console.log(e)
          }
          // let data = await paper_by_fos_and_title()
          console.log(this.$route.query.query)
          console.log("from paprent: ", this.checkedCategories)
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
</style>
