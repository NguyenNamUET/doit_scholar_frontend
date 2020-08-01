<template>
  <div class="container">
    <div class="tile is-ancestor" style="margin-top: 15px;">
      <div class="tile is-parent">
        <div class="tile is-child">
          <h1 class="is-size-3">
            Tìm được {{this.total_count | formatNumber}} kết quả
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
        <div class="tile is-child">
          <AuthorInfo v-for="author in this.author_info" v-bind:author_info="author"></AuthorInfo>
        </div>

        <div class="tile is-child">
          <SearchResult v-for="result in this.search_results" v-bind:search_result="result"></SearchResult>
        </div>
      </div>

      <div class="tile is-parent is-4 is-vertical">
        <div class="tile is-child">
          <article class="message is-info">
            <div class="message-header">
              <p>Khoa Học Máy Tính</p>
            </div>
            <div class="message-body">
              Khoa học máy tính là cách tiếp cận khoa học và thực tiễn để tính toán và các ứng dụng của nó và nghiên cứu có hệ thống về tính khả thi, cấu trúc, biểu hiện và cơ giới hóa các thủ tục (hoặc các thuật toán) cơ bản làm cơ sở cho việc thu thập, đại diện, xử lý, lưu trữ, truyền thông và truy cập thông tin.
            </div>
          </article>
        </div>

        <div class="tile is-child">
          <article class="message is-info">
            <div class="message-header">
              <p>Các chủ đề liên quan</p>
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
        }
      },
      filters: {
        formatNumber(number) {
          return formatNumber(number)
        }
      },
      async asyncData({query, store}) {
        await store.dispatch('search_result/paper_by_title', query)
        console.log('page', store.state.search_result.aggregation.author_count.buckets)
        return {
          query_params: query,
          current_page: parseInt(query['start']),
          search_results: store.state.search_result.search_results,
          keyword: query['searchContent'],
          total_count: store.state.search_result.total,
          author_info: store.state.search_result.aggregation.author_count.buckets,
          field_sort: store.state.search_result.aggregation.fields_of_study.buckets,
        }
      }
    }
</script>

<style scoped>
  .container {
    margin-bottom: 5px;
  }
  #sort_section {
    border-top: 1px solid;
    padding: 5px;
    border-bottom: 1px solid;
  }
</style>
