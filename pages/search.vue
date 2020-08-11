<template>
  <div class="container" id="page_container">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child">
          <h1 class="text-class-1">
            <strong>Tìm được {{this.total_count | formatNumber}} kết quả</strong>
          </h1>
          <div id="sort_section">
            <DropDown v-bind:msg="this.field_sort"/>
            <DropDown v-bind:msg="this.publication_sort"/>
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

          <nav class="pagination is-centered" role="navigation" aria-label="pagination">
            <a class="pagination-previous">Trang trước</a>
            <a class="pagination-next">Trang sau</a>
            <ul class="pagination-list">
              <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
              <li><span class="pagination-ellipsis">&hellip;</span></li>
              <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
              <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
              <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
              <li><span class="pagination-ellipsis">&hellip;</span></li>
              <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
            </ul>
          </nav>
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
          }
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
          current_page: parseInt(query['start']),
          search_results: store.state.search_result.search_results,
          keyword: query['searchContent'],
          total_count: store.state.search_result.total,
          author_info: store.state.search_result.aggregation.author_count.name.buckets,
          field_sort: store.state.search_result.aggregation.fields_of_study.buckets,
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
