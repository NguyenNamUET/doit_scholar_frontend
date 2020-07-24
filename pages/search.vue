<template>
  <div class="container">

    <div class="tile is-ancestor" style="margin-top: 15px;">
      <div class="tile is-parent">
        <div class="tile is-child">
          <h1 class="is-size-3">
            Tìm được {{total_count | formatNumber}} kết quả
          </h1>
          <div id="sort_section">
            <DropDown v-bind:msg="field_sort"/>
            <DropDown v-bind:msg="publication_sort"/>
          </div>
        </div>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-8 is-vertical">
        <div class="tile is-child">
          <AuthorInfo v-for="author in author_info" v-bind:author_info="author"></AuthorInfo>
        </div>

        <div class="tile is-child">
          <SearchResult v-for="result in this.search_results" v-bind:search_result="result"></SearchResult>
        </div>
      </div>

      <div class="tile is-parent is-4 is-vertical">
        <div class="tile is-child">
          <article class="message is-dark">
            <div class="message-header">
              <p>Khoa Học Máy Tính</p>
              <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
              Khoa học máy tính là cách tiếp cận khoa học và thực tiễn để tính toán và các ứng dụng của nó và nghiên cứu có hệ thống về tính khả thi, cấu trúc, biểu hiện và cơ giới hóa các thủ tục (hoặc các thuật toán) cơ bản làm cơ sở cho việc thu thập, đại diện, xử lý, lưu trữ, truyền thông và truy cập thông tin.
            </div>
          </article>
        </div>

        <div class="tile is-child box">
          <p class="title">Các chủ đề liên quan</p>
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
      components: {SearchResult, AuthorInfo, DropDown},
      head() {
        return {
          title: 'DoIT Scholar - Tìm kiếm văn bản học thuật'
        }
      },
      data() {
        return {
          total_count: 100000,
          field_sort: fields_type,
          publication_sort: publication_type,
          author_info: [
            {
              name: 'Nguyễn Nam',
              publication: 15,
              citation: 200,
            },
            {
              name: 'Nguyễn Nam',
              publication: 15,
              citation: 200,
            },
            {
              name: 'Nguyễn Nam',
              publication: 15,
              citation: 200,
            },
          ],
          search_results: [
            {
              id: '5f25bd23f91240d1fff357d0e2cf8b9923b31638',
              title: 'A content-based recommender system for computer science publications',
              authors: [
                'Donghui Wang',
                'Yanchun Liang',
                'Dong Xu',
                'Xiaoyue Feng',
                'Renchu Guan'
              ],
              topics: [
                'Computer Science',
                'Knowl. Based Syst'
              ],
              publications: [
                '2018 (First Publication: 1 October 2018)'
              ],
              intro: 'Abstract As computer science and information technology are making broad and deep impacts on our daily lives, more and more papers are being submitted to computer science journals and conferences. To help authors decide where they should submit their manuscripts, we present the Content-based Journals & Conferences Recommender System on computer science, as well as its web service at http://www.keaml.cn/prs/ . This system recommends suitable journals or conferences with a priority order based on the abstract of a manuscript. To follow the fast development of computer science and technology, a web crawler is employed to continuously update the training set and the learning model. To achieve interactive online response, we propose an efficient hybrid model based on chi-square feature selection and softmax regression. Our test results show that, the system can achieve an accuracy of 61.37% and suggest the best journals or conferences in about 5? s on average.'
            }
          ]
        }
      },
      filters: {
        formatNumber(number) {
          return formatNumber(number)
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
