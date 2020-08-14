<template>
  <div class="container" id="abstract">
    <div  class="tile is-ancestor" id="abstract_box">
      <div class="tile is-parent is-7">
        <div class="is-child">
          <p class="is-size-6">
            DOI:
            <a v-if="paper_detail.doi !== undefined" :href="'https://doi.org/' + paper_detail.doi">
              {{paper_detail.doi}}
            </a>
            <span v-else>
              Chưa có thông tin
            </span>
            |
            ID văn bản: {{this.paper_detail.corpusID}}
          </p>
          <h1 class="title">
            {{this.paper_detail.title}}
          </h1>
          <div class="is-size-6 mb-4">
<!--            <a-->
<!--              :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"-->
<!--              v-for="author in this.paper_detail.authors"-->
<!--            >-->
<!--              {{author.name}},-->
<!--            </a>-->
<!--            |-->

<!--            |-->
<!--            <span v-for="topic in this.paper_detail.fieldsOfStudy">{{topic}} </span>-->
<!--            |-->
<!--            <span>{{this.paper_detail.venue}}</span>-->
            <a
              v-if="!author_hidden"
              class="text-class-3"
              :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
              v-for="(author, index) in paper_detail.authors"
            >
              {{author.name}}
              <span v-if="index < paper_detail.authors.length - 1">,</span>
            </a>
            <a
              class="text-class-3"
              v-if="!author_hidden"
              v-on:click="author_hidden = true"
            >
              rút gọn
            </a>

            <a
              v-if="author_hidden"
              class="text-class-3"
              :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
              v-for="(author, index) in paper_detail.authors.slice(0,3)"
            >
              {{author.name}}
              <span v-if="index < paper_detail.authors.length - 1">,</span>
            </a>
            <a
              class="text-class-3"
              v-if="author_hidden && paper_detail.authors.length - 3 > 0"
              v-on:click="author_hidden = false"
            >
              + {{paper_detail.authors.length - 3}} tác giả
            </a>
            |
            <span>{{paper_detail.year}} </span>

            <span v-if="paper_detail.year !== undefined">|</span>

            <span
              v-if="!field_hidden"
              v-for="(field, index) in paper_detail.fieldsOfStudy"
            >
            {{field}}
            <span v-if="index < paper_detail.fieldsOfStudy.length - 1">,</span>
          </span>
            <a
              class="text-class-3"
              v-if="!field_hidden"
              v-on:click="field_hidden = true"
            >
              rút gọn
            </a>

            <span
              v-if="field_hidden"
              v-for="(field, index) in paper_detail.fieldsOfStudy.slice(0,1)"
            >
            {{field}}
            <span v-if="index < paper_detail.fieldsOfStudy.length - 1">,</span>
          </span>
            <a
              v-if="field_hidden && paper_detail.fieldsOfStudy.length - 1 > 0"
              class="text-class-3"
              v-on:click="field_hidden = false"
            >
              + {{paper_detail.fieldsOfStudy.length - 1}} lĩnh vực
            </a>
          </div>
          <p v-if="!abstract_hidden" class="is-size-6">
            {{paper_detail.abstract}}
            <a class="text-class-3" v-on:click="abstract_hidden = true">...Ẩn bớt</a>
          </p>
          <p v-else class="is-size-6">
                      {{paper_detail.abstract.slice(0, paper_detail.abstract.length*0.5)}}
            <a class="text-class-3" v-on:click="abstract_hidden = false">...Xem thêm</a>
          </p>
          <nav class="level is-mobile mt-2">
            <div class="level-left is-small has-text-weight-light ">
              <button class="level-item button is-info">Xem PDF</button>
              <a
                :href="'http://doi.org/' + paper_detail.doi"
                class="level-item button are-small has-text-link"
              >
                Doi.org
              </a>
            </div>
          </nav>
        </div>
      </div>

      <div class="tile is-parent is-4">
        <div class="is-child ">
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
              <p v-if="paper_detail.citationVelocity !== undefined" style="color: black;">
                Trung bình được trích dẫn {{paper_detail.citationVelocity}} lần từ {{this.paper_detail.year}} đến nay
              </p>
              <p v-else style="color: black;">
                Chưa có thông tin
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div class="tabs is-centered is-fullwidth sticky-nav">
      <ul>
        <li>
          <a
            class="nav-item"
            href="#abstract"
            :class="{'in-view': scroll_position < abstract_height}"
          >
            Tóm tắt
          </a>
        </li>
        <li>
          <a
            class="nav-item"
            href="#topic"
            :class="{'in-view': scroll_position > abstract_height
            && scroll_position < (abstract_height + topic_height + 200)}"
          >
            Chủ đề
          </a>
        </li>
        <li>
          <a
            class="nav-item"
            href="#citations"
            :class="{'in-view': scroll_position > (abstract_height + topic_height + 200)
            && scroll_position < (abstract_height + topic_height + citation_height + 200)}"
          >
            {{this.paper_detail.citations.length}} trích dẫn
          </a>
        </li>
        <li>
          <a
            class="nav-item"
            href="#references"
            :class="{'in-view': scroll_position > (abstract_height + topic_height + citation_height + 200)}"
          >
            {{this.paper_detail.references.length}} tham chiếu
          </a>
        </li>
      </ul>
    </div>

    <div id="topic" class="navigate"></div>

    <div class="tile is-ancestor" id="topic_box">
      <div class="tile is-parent is-vertical">
        <div class="tile is-child content_box">
          <p class="title content_title">Chủ đề được đề cập trong văn bản</p>
          <div>
            <ul>
              <li
                class="topic_list"
                v-for="item in this.paper_detail.topics"
              >
                <a
                  class="has-text-link"
                  :href="'/topic/' + formatTitle(item.topic) + '-' + item.topicId "
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

    <div class="tile is-ancestor is-vertical" id="citation_box">
      <div class="tile is-parent">
        <div class="tile is-child pr-5 content_box">
          <p class="title">Trích dẫn</p>
          <p class="subtitle content_title">Các văn bản có nhắc tới văn bản này</p>
          <p class="is-size-6">Bạn đang xem 1-10 trong {{this.paper_detail.citations.length}} trích dẫn</p>
          <PaperTable v-bind:paper_data="paper_detail.citations" v-bind:is_empty="is_citation_empty"></PaperTable>
        </div>
      </div>
    </div>

    <div id="references" class="navigate"></div>

    <div class="tile is-ancestor is-vertical"id="reference_box">
      <div class="tile is-parent">
        <div class="tile is-child content_box">
          <p class="title">Tham chiếu</p>
          <p class="subtitle content_title">Các văn bản được nhắc tới trong văn bản này</p>
          <p class="is-size-6">Bạn đang xem 1-10 trong {{this.paper_detail.references.length}} tham chiếu</p>
          <PaperTable v-bind:paper_data="paper_detail.references" v-bind:is_empty="is_ref_empty"></PaperTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {formatTitle} from "assets/utils";
    import CitationBar from "../../components/search_page/CitationBar";
    import {chart_prep} from "assets/utils";
    import {chartColors} from "assets/utils";
    import {paper_detail} from "@/API/elastic_api";
    import PaperTable from "@/components/PaperTable";
    export default {
      name: "_paper_detail",
      components: {PaperTable, CitationBar},
      validate({route, redirect}) {
        if(/.p-[0-9]+$/g.test(route.params.paper_detail)) {
          return true
        }
        else
          redirect('/')
      },
      head() {
        return {
          title: this.paper_detail.title + ' | DoIT Scholar'
        }
      },
      data() {
        return {
          abstract_height: null,
          topic_height: null,
          citation_height: null,
          reference_height: null,
          scroll_position: null,
          is_citation_empty: true,
          is_ref_empty: true,
          chartColors: chartColors,
          paper_id: null,
          paper_detail: null,
          chart_labels: null,
          chart_data: null,
          author_hidden: true,
          field_hidden: true,
          navigate: '',
          abstract_hidden: true,
          currentPage:0,
          pageCount: 0
        }
      },
      methods: {
        formatTitle(title) {
          return formatTitle(title)
        },
        updateScrollPosition() {
          this.scroll_position = window.scrollY
        },
        getComponentHeight() {
          return [
            document.getElementById('abstract_box').offsetHeight,
            document.getElementById('topic_box').offsetHeight,
            document.getElementById('citation_box').offsetHeight,
            document.getElementById('reference_box').offsetHeight
          ]
        }
      },
      mounted() {
        window.addEventListener('scroll', this.updateScrollPosition);
        let heights = this.getComponentHeight()
        console.log(heights)
        this.abstract_height = heights[0]
        this.topic_height = heights[1]
        this.citation_height = heights[2]
        this.reference_height = heights[3]
      },
      async asyncData({route, $axios}) {
        let paper_id = /[0-9]+$/g.exec(route.params.paper_detail)
        let data = await paper_detail(paper_id)
        let data_dict = {}
        let is_citation_empty = true
        let is_ref_empty = true
        if (data !== null) {
          if (data.citations.length > 0)
            data_dict = chart_prep(data.citations)
          is_citation_empty = false
          if (data.references.length > 0)
            is_ref_empty = false
          return {
            is_citation_empty: is_citation_empty,
            is_ref_empty: is_ref_empty,
            chart_labels: Object.keys(data_dict),
            chart_data: Object.values(data_dict),
            paper_id: paper_id[0],
            paper_detail: data
          }
        } else {
          return {
            is_citation_empty: is_citation_empty,
            is_ref_empty: is_ref_empty,
            chart_labels: {},
            chart_data: {},
            paper_id: paper_id[0],
            paper_detail: {}
          }
        }
      }
    }
</script>

<style scoped>
  @import "assets/general_styling.scss";
  .content_title {
    border-bottom: 1px solid #d9dadb;
    padding-bottom: 5px;
  }
  .content_box {
    padding: 20px;
    background-color: white;
    box-shadow: 0 0 6px rgba(2,20,31,0.1);
  }
  .nav-item:hover {
    text-decoration: none;
    color: #4e54c8;
  }
  .container {
    padding: 40px 20px;
  }
  .in-view {
    background-color: antiquewhite;
  }
  .sticky-nav {
    background-color: rgb(242, 247, 242);
    overflow: hidden;
    position: sticky;
    top: 60px;
    z-index: 1000;
  }
  .topic_list {
    display:inline-block;
    margin: 10px;
  }
  .navigate {
    height:16vh;
  }
</style>
