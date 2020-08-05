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
            ID văn bản: {{this.paper_detail.corpusID}}
          </p>
          <h1 class="title">
            {{this.paper_detail.title}}
          </h1>
          <div class="is-size-6 mb-4">
            <a
              :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
              v-for="author in this.paper_detail.authors"
            >
              {{author.name}},
            </a>
            |
            <span>{{this.paper_detail.year}} </span>
            |
            <span v-for="topic in this.paper_detail.fieldsOfStudy">{{topic}} </span>
            |
            <span>{{this.paper_detail.venue}}</span>
          </div>
          <p class="subtitle is-size-6">
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

      <div class="tile is-parent is-4 ">
        <div class="tile is-child">
          <article class="message is-info mt-6">
            <div class="message-body">
              <a
                href="#citations"
                class="is-size-6"
              >
                {{this.paper_detail.citations.length}} trích dẫn từ văn bản khác
              </a>
              <br>
              <a href="#citations">Ảnh hưởng lớn đến {{this.paper_detail.influentialCitationCount}} văn bản khác</a>
            </div>
          </article>
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

    <div id="topic" class="navigate"></div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <p class="title">Chủ đề được đề cập trong văn bản</p>
        <div class="tile is-child box">
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

    <div id="citations" class="navigate"></div>

    <div class="tile is-ancestor is-vertical">
      <div class="tile is-parent ">
        <div class="tile is-child">
          <p class="title">Trích dẫn</p>
          <p class="subtitle">Các văn bản có nhắc tới văn bản này</p>
        </div>
      </div>

      <div class="tile is-parent">
        <div class="tile is-child is-8 pr-5">
          <div class="control">
            <div class="select">
              <select>
                <option>Tất cả loại trích dẫn</option>
                <option>Trích dẫn kết quả</option>
                <option>Trích dẫn phương pháp</option>
                <option>Trích dẫn lý lịch</option>
              </select>
            </div>

            <div class="select">
              <select>
                <option>Sắp xếp theo độ liên quan</option>
                <option>Sắp xếp theo ảnh hưởng</option>
                <option>Sắp xếp theo thời gian</option>
              </select>
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
          <article class="message is-info">
            <div class="message-header">
              <p>Số trích dẫn theo năm</p>
            </div>
            <div class="message-body">
             <CitationBar v-bind:dataset="this.chart_data" v-bind:labels="this.chart_labels"></CitationBar>
            </div>
          </article>
          <article class="message is-info">
            <div class="message-header">
              <p>Tình trạng về trích dẫn</p>
            </div>
            <div class="message-body">
              <p>
                Trung bình được trích dẫn {{this.paper_detail.citationVelocity}} lần từ {{this.paper_detail.year}} đến nay
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div id="references" class="navigate"></div>

    <div class="tile is-ancestor is-vertical">
      <div class="tile is-parent ">
        <div class="tile is-child">
          <p class="title">Tham chiếu</p>
          <p class="subtitle">Các văn bản được nhắc tới trong văn bản này</p>
        </div>
      </div>

      <div class="tile is-parent">
        <div class="tile is-child is-8 pr-5">
          <div class="control">
            <div class="select">
              <select>
                <option>Tất cả loại trích dẫn</option>
                <option>Trích dẫn kết quả</option>
                <option>Trích dẫn phương pháp</option>
                <option>Trích dẫn lý lịch</option>
              </select>
            </div>

            <div class="select">
              <select>
                <option>Sắp xếp theo độ liên quan</option>
                <option>Sắp xếp theo ảnh hưởng</option>
                <option>Sắp xếp theo thời gian</option>
              </select>
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
    import CitationBar from "../../components/search_page/CitationBar";
    import {chart_prep} from "../../assets/utils";
    import {chartColors} from "../../assets/utils";
    import {paper_detail} from "@/API/elastic_api";

    export default {
      name: "_paper_detail",
      components: {CitationBar},
      head() {
        return {
          title: this.paper_detail.title + ' | DoIT Scholar'
        }
      },
      data() {
        return {
          chartColors: chartColors,
          paper_id: null,
          paper_detail: null,
          chart_labels: null,
          chart_data: null,
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
        let data = await paper_detail(paper_id)
        console.log('page', data)
        let data_dict = chart_prep(data.citations)
        return {
          chart_labels: Object.keys(data_dict),
          chart_data: Object.values(data_dict),
          paper_id: paper_id[0],
          paper_detail: data
        }
      }
    }
</script>

<style scoped>
  .tile.is-child.box {
    background-color: #f7f8fb;
  }
  .sticky{
    background-color: #f7f8fb;
    overflow: hidden;
    position: sticky;
    top: 0;
    z-index: 1000;
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
  .navigate {
    height:8vh;
  }
</style>
