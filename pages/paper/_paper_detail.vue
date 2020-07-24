<template>
  <div class="container">
    <div id="abstract" class="tile is-ancestor">
      <div class="tile is-parent is-8">
        <div class="is-child">
          <p class="is-size-6">
            DOI:
            <a :href="'https://doi.org/' + this.paper_detail.doi">
              {{this.paper_detail.doi}}
            </a>
            |
            ID văn bản: {{this.paper_detail.corpusId}}
          </p>
          <h1 class="title">
            {{this.paper_detail.title}}
          </h1>
          <div class="is-size-6 mb-4">
            <a v-for="author in this.paper_detail.authors">{{author.name}}, </a>
            |
            <span>{{this.paper_detail.year}} </span>
            |
            <span v-for="topic in this.paper_detail.fieldsOfStudy">{{topic}} </span>
            |
            <span>{{this.paper_detail.venue}}</span>
          </div>
          <p class="subtitle">
            {{this.paper_detail.abstract}}
          </p>
          <nav class="level is-mobile">
            <div class="level-left is-small has-text-weight-light ">
              <button class="level-item button is-info">Xem tại nguồn</button>
              <button class="level-item button are-small has-text-link">Doi.org</button>
            </div>
          </nav>
        </div>
      </div>

      <div class="tile is-parent is-4">
        <div class="tile is-child box">
          <p class="is-size-5">{{this.paper_detail.citations.length}} trích dẫn từ văn bản khác</p>
          <p>Ảnh hưởng lớn đến {{this.paper_detail.influentialCitationCount}} văn bản khác</p>
        </div>
      </div>
    </div>

    <div class="tabs is-centered is-fullwidth sticky">
      <ul>
        <li>
          <a class="has-text-link" href="#abstract">Tóm tắt</a>
        </li>
        <li>
          <a class="has-text-link" href="#topic">Chủ đề</a>
        </li>
        <li>
          <a class="has-text-link" href="#citations">{{this.paper_detail.citations.length}} trích dẫn</a>
        </li>
        <li>
          <a class="has-text-link" href="#references">{{this.paper_detail.references.length}} tham chiếu</a>
        </li>
      </ul>
    </div>

    <div id="topic" class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child">
          <p class="title">Chủ đề được đề cập trong văn bản</p>

          <div>
            <ul>
              <li
                class="topic_list"
                v-for="item in this.paper_detail.topics"
              >
                <a
                  class="has-text-link"
                  :href="'/topic/' + formatTitle(item.topic) + '/' + item.topicId "
                >
                  {{item.topic}}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div id="citations" class="tile is-ancestor is-vertical">
      <div class="tile is-parent ">
        <div class="tile is-child">
          <p class="title">Trích dẫn</p>
          <p class="subtitle">Các văn bản có nhắc tới văn bản này</p>
        </div>
      </div>

      <div class="tile is-parent">
        <div class="tile is-child is-8">
          <div class="columns">
            <div class="column">
              <div class="select">
                <select>
                  <option>Tất cả loại trích dẫn</option>
                  <option>Trích dẫn kết quả</option>
                  <option>Trích dẫn phương pháp</option>
                  <option>Trích dẫn lý lịch</option>
                </select>
              </div>
            </div>

            <div class="column">
              <div class="select">
                <select>
                  <option>Sắp xếp theo độ liên quan</option>
                  <option>Sắp xếp theo ảnh hưởng</option>
                  <option>Sắp xếp theo thời gian</option>
                </select>
              </div>
            </div>
          </div>

          <p class="is-size-6">Bạn đang xem 1-10 trong {{this.paper_detail.citations.length}} trích dẫn</p>

          <div
            class="citation_content"
            v-for="citation in this.paper_detail.citations">
            <nuxt-link
              :to="'/paper/' + formatTitle(citation.title) + '-' + citation.paperId"
            >
              {{citation.title}}
            </nuxt-link>

            <div class="ml-2 has-text-weight-light is-size-6">
              <a v-for="author in citation.authors"> {{author.name}}, </a>
              |
              <span>{{citation.year}} </span>
              |
              <span>{{citation.venue}}</span>
            </div>
          </div>
        </div>

        <div class="tile is-child is-4">
          <div>
            <p class="subtitle">Lọc trích dẫn theo năm</p>

          </div>
          <div>
            <p class="subtitle">Tình trạng về trích dẫn</p>
          </div>
        </div>
      </div>
    </div>

    <div id="reference" class="tile is-ancestor is-vertical">
      <div class="tile is-parent ">
        <div class="tile is-child">
          <p class="title">Tham chiếu</p>
          <p class="subtitle">Các văn bản được nhắc tới trong văn bản này</p>
        </div>
      </div>

      <div class="tile is-parent">
        <div class="tile is-child is-8">
          <div class="columns">
            <div class="column">
              <div class="select">
                <select>
                  <option>Tất cả loại trích dẫn</option>
                  <option>Trích dẫn kết quả</option>
                  <option>Trích dẫn phương pháp</option>
                  <option>Trích dẫn lý lịch</option>
                </select>
              </div>
            </div>

            <div class="column">
              <div class="select">
                <select>
                  <option>Sắp xếp theo độ liên quan</option>
                  <option>Sắp xếp theo ảnh hưởng</option>
                  <option>Sắp xếp theo thời gian</option>
                </select>
              </div>
            </div>
          </div>

          <p class="is-size-6">Bạn đang xem 1-10 trong {{this.paper_detail.references.length}} tham chiếu</p>

          <div
            class="citation_content"
            v-for="ref in this.paper_detail.references">
            <nuxt-link
              :to="'/paper/' + formatTitle(ref.title) + '-' + ref.paperId"
            >
              {{ref.title}}
            </nuxt-link>

            <div class="ml-2 has-text-weight-light is-size-6">
              <a v-for="author in ref.authors"> {{author.name}}, </a>
              |
              <span>{{ref.year}} </span>
              |
              <span>{{ref.venue}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {formatTitle} from "../../assets/utils";

    export default {
      name: "_paper_detail",
      head() {
        return {
          title: this.paper_detail.title + ' | DoIT Scholar'
        }
      },
      data() {
        return {
          paper_id: null,
          paper_detail: null,
        }
      },
      methods: {
        formatTitle(title) {
          return formatTitle(title)
        }
      },
      async asyncData({route, $axios}) {
        let id_pattern = /[0-9a-z]+$/g
        let paper_id = id_pattern.exec(route.params.paper_detail)
        let data = await $axios.$get('https://api.semanticscholar.org/v1/paper/' + paper_id[0])
        return {
          paper_id: paper_id[0],
          paper_detail: data
        }
      }
    }
</script>

<style scoped>
  .sticky{
    background-color: #f7f8fb;
    overflow: hidden;
    position: sticky;
    top: 0;
  }
  .topic_list {
    display:inline-block;
    margin: 10px;
  }
  .citation_content {
    margin-bottom: 20px;
    padding: 5px;
    border-bottom: 1px solid;
  }
  .select {
    z-index: -1;
  }
</style>
