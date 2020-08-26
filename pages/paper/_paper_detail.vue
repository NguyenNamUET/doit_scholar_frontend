<template>
  <div v-if="Object.keys(this.paper_detail).length !== 0" class="container" id="abstract">
    <div  class="tile is-ancestor" id="abstract_box">
      <div class="tile is-parent is-7">
        <div class="is-child">
          <p class="is-size-6">
            DOI:
            <a v-if="paper_detail.doi !== undefined && paper_detail.doi !== null" :href="'https://doi.org/' + paper_detail.doi">
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
            <span
              class="text-class-3 less-more-button"
              v-if="!author_hidden"
              v-on:click="author_hidden = true"
            >
              &nbsprút gọn
            </span>

            <a
              v-if="author_hidden"
              class="text-class-3"
              :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
              v-for="(author, index) in paper_detail.authors.slice(0,3)"
            >
              {{author.name}}
              <span v-if="index < paper_detail.authors.length - 1">,</span>
            </a>
            <span
              class="text-class-3 less-more-button"
              v-if="author_hidden && paper_detail.authors.length - 3 > 0"
              v-on:click="author_hidden = false"
            >
              &nbsp+ {{paper_detail.authors.length - 3}} tác giả
            </span>
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
            <span
              class="text-class-3 less-more-button"
              v-if="!field_hidden"
              v-on:click="field_hidden = true"
            >
              &nbsprút gọn
            </span>

            <span
              v-if="field_hidden"
              v-for="(field, index) in paper_detail.fieldsOfStudy.slice(0,1)"
            >
            {{field}}
            <span v-if="index < paper_detail.fieldsOfStudy.length - 1">,</span>
          </span>
            <span
              v-if="field_hidden && paper_detail.fieldsOfStudy.length - 1 > 0"
              class="text-class-3 less-more-button"
              v-on:click="field_hidden = false"
            >
              &nbsp+ {{paper_detail.fieldsOfStudy.length - 1}} lĩnh vực
            </span>
          </div>
          <div v-if="paper_detail.abstract">
            <p v-if="!abstract_hidden" class="is-size-6">
              {{paper_detail.abstract}}
              <a class="text-class-3" v-on:click="abstract_hidden = true">...Ẩn bớt</a>
            </p>
            <p v-else class="is-size-6">
                        {{paper_detail.abstract.slice(0, paper_detail.abstract.length*0.5)}}
              <a class="text-class-3" v-on:click="abstract_hidden = false">...Xem thêm</a>
            </p>
          </div>
          <div v-else>
            <p class="is-size-6">Không có thông tin về Tóm tắt</p>
          </div>

          <nav class="level is-mobile mt-2">
            <div class="level-left is-small has-text-weight-light ">
              <button class="level-item button is-info">Xem PDF</button>
              <a
                :href="'http://doi.org/' + paper_detail.doi"
                class="level-item button are-small has-text-link"
                v-if="paper_detail.doi !== undefined && paper_detail.doi !== null"
              >
                Doi.org
              </a>
            </div>
          </nav>
        </div>
      </div>

      <div class="tile is-parent is-4">
        <div class="is-child">
          <article class="message is-info" v-if="this.chart_data.length > 0">
            <div class="message-header">
              <p>Số trích dẫn theo năm</p>
            </div>
            <div class="message-body">
              <CitationBar v-bind:dataset="this.chart_data" v-bind:labels="this.chart_labels"></CitationBar>
            </div>
          </article>

          <article class="message is-info" v-if="paper_detail.citationVelocity !== undefined">
            <div class="message-header">
              <p>Tình trạng về trích dẫn</p>
            </div>
            <div class="message-body">
              <p  style="color: black;">
                Trung bình được trích dẫn {{paper_detail.citationVelocity}} lần từ {{this.paper_detail.year}} đến nay
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
            v-scroll-to="{el: '#abstract_box', offset: -100}"
            :class="{'in-view': scroll_position < abstract_height}"
          >
            Tóm tắt
          </a>
        </li>
        <li v-if="paper_detail.topics.length > 0">
          <a
            class="nav-item"
            v-scroll-to="{el: '#topic_box', offset: -100}"
            :class="{'in-view': scroll_position > abstract_height
            && scroll_position < (abstract_height + topic_height)}"
          >
            Chủ đề
          </a>
        </li>
        <li v-if="paper_detail.citations.length > 0">
          <a
            class="nav-item"
            v-scroll-to="{el: '#citation_box', offset: -100}"
            :class="{'in-view': scroll_position > (abstract_height + topic_height)
            && scroll_position < (abstract_height + topic_height + citation_height)}"
          >
            Trích dẫn
          </a>
        </li>
        <li v-if="paper_detail.references.length > 0">
          <a
            class="nav-item"
            v-scroll-to="{el: '#reference_box', offset: -100}"
            :class="{'in-view': scroll_position > (abstract_height + topic_height + citation_height)}"
          >
            Tham chiếu
          </a>
        </li>
      </ul>
    </div>

    <div class="tile is-ancestor" id="topic_box">
      <div class="tile is-parent is-vertical" v-if="paper_detail.topics.length > 0">
        <div class="tile is-child content_box">
          <p class="title content_title">Chủ đề được đề cập trong văn bản</p>
          <div>
            <ul>
              <li
                class="topic_list"
                v-for="item in paper_detail.topics"
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

    <div class="tile is-ancestor is-vertical" id="citation_box">
      <div class="tile is-parent" v-if="paper_detail.citations.length > 0">
        <div class="tile is-child pr-5 content_box">
          <p class="title">Trích dẫn</p>
          <p class="subtitle content_title">Các văn bản có nhắc tới văn bản này</p>
          <p class="is-size-6">Bạn đang xem 1-10 trong {{this.paper_detail.citations.length}} trích dẫn</p>
          <PaperTable v-bind:paper_data="paper_detail.citations" v-bind:is_empty="is_citation_empty"></PaperTable>
        </div>
      </div>
    </div>

    <div class="tile is-ancestor is-vertical" id="reference_box">
      <div class="tile is-parent" v-if="paper_detail.references.length > 0">
        <div class="tile is-child content_box">
          <p class="title">Tham chiếu</p>
          <p class="subtitle content_title">Các văn bản được nhắc tới trong văn bản này</p>
          <p class="is-size-6">Bạn đang xem 1-10 trong {{this.paper_detail.references.length}} tham chiếu</p>
          <PaperTable v-bind:paper_data="paper_detail.references" v-bind:is_empty="is_ref_empty"></PaperTable>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <NuxtError v-bind:error="{statusCode:404, message:'Không tìm thấy văn bản'}"></NuxtError>
  </div>
</template>

<script>
    import {formatTitle} from "assets/utils";
    import CitationBar from "../../components/search_page/CitationBar";
    import {chart_prep} from "assets/utils";
    import {chartColors} from "assets/utils";
    import {paper_detail} from "@/API/elastic_api";
    import PaperTable from "@/components/PaperTable";
    import NuxtError from "@/components/ErrorPage";

    export default {
      name: "_paper_detail",
      components: {PaperTable, CitationBar, NuxtError},
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
          if(Object.keys(this.paper_detail).length !== 0){
            return [
            document.getElementById('abstract_box').offsetHeight,
            document.getElementById('topic_box').offsetHeight,
            document.getElementById('citation_box').offsetHeight,
            document.getElementById('reference_box').offsetHeight
          ]
          }
          else{
            return [0,0,0,0]
          }
        }
      },
      mounted() {
        window.addEventListener('scroll', this.updateScrollPosition);
        let heights = this.getComponentHeight()
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
        if (Object.keys(data).length !== 0) {
          if (data.citations.length > 0)
            data_dict = chart_prep(data.citations)
          is_citation_empty = false
          if (data.references.length > 0)
            is_ref_empty = false
          console.log(data.references)
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

<style scoped lang="scss">
  @import "assets/general_styling.scss";
  #topic_box {
  ul {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(132px, 1fr));
    column-gap: 10px;
    row-gap: 15px;
  }

  li {
    text-align: center;
    padding-bottom: 20px;
  }
  }
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
    color: #4e54c8
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
</style>
