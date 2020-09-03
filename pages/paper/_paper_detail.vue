<template>
  <div v-if="Object.keys(this.paper_detail).length !== 0" class="container" id="abstract">
    <div class="tile is-ancestor" id="abstract_box" style="flex-wrap: wrap">
      <div class="tile is-parent is-7">
        <div class="is-child">
          <!------------------------------------------ Source  ------------------------------------------->
          <p class="is-size-6">
            DOI:
            <a v-if="paper_detail.doi !== undefined && paper_detail.doi !== null" :href="'https://doi.org/' + paper_detail.doi">
              {{paper_detail.doi}}
            </a>
            <span v-else>
              <i>Chưa có thông tin</i>
            </span>
            |
            ID văn bản: {{this.paper_detail.corpusId}}
          </p>
          <h1 class="title">
            {{this.paper_detail.title}}
          </h1>
          <!------------------------------------------ Source  ------------------------------------------->
          <div class="is-size-6 mb-4">
            <!------------------------------------------ Authors  ------------------------------------------->
            <a class="text-class-3"
               v-if="!author_hidden"
               v-for="(author, index) in paper_detail.authors"
               :key="author.authorId"
               :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
            >
              {{author.name}}
              <span v-if="index < paper_detail.authors.length - 1">,</span>
            </a>
            <span class="text-class-3 less-more-button"
                  v-if="!author_hidden"
                  @click="author_hidden = true"
            >
              &nbspRút gọn
            </span>

            <a class="text-class-3"
               v-if="author_hidden"
               v-for="(author, index) in paper_detail.authors.slice(0,3)"
               :key="author.authorId"
               :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
            >
              {{author.name}}
              <span v-if="index < paper_detail.authors.slice(0,3).length-1">,</span>
            </a>
            <span class="text-class-3 less-more-button"
                  v-if="author_hidden && paper_detail.authors.length - 3 > 0"
                  @click="author_hidden = false"
            >
              &nbsp+ {{paper_detail.authors.length - 3}} tác giả
            </span>
            <!------------------------------------------ Authors  ------------------------------------------->
            |
            <span>{{paper_detail.year}} </span>

            <span v-if="paper_detail.year !== undefined">|</span>

            <!------------------------------------ Fields of study ---------------------------------------->
            <span v-if="paper_detail.fieldsOfStudy">
              <span class="text-class-3"
                    v-if="!field_hidden">
                {{this.full_fos}}
              </span>
              <span class="text-class-3 less-more-button"
                    v-if="!field_hidden"
                    @click="field_hidden = true"
              >
                &nbspRút gọn
              </span>

              <span class="text-class-3"
                    v-if="field_hidden"
              >
                {{paper_detail.fieldsOfStudy[0]}}
              </span>
              <span class="text-class-3 less-more-button"
                    v-if="field_hidden && paper_detail.fieldsOfStudy.length - 1 > 0"
                    @click="field_hidden = false"
              >
                &nbsp+ {{paper_detail.fieldsOfStudy.length - 1}} lĩnh vực
              </span>
            </span>
            <!------------------------------------ Fields of study ---------------------------------------->
            |
            <span v-if="paper_detail.venue.length !== 0"
                  class="text-class-3">
              <i>{{paper_detail.venue}}</i>
            </span>
          </div>
          <!------------------------------------------ Abstract  ------------------------------------------->
          <div v-if="paper_detail.abstract">
            <p v-if="!abstract_hidden" class="is-size-6">
              {{paper_detail.abstract}}
              <a class="text-class-3" @click="abstract_hidden = true">...Ẩn bớt</a>
            </p>
            <p v-else class="is-size-6">
              {{paper_detail.abstract.slice(0, paper_detail.abstract.length*0.5)}}
              <a class="text-class-3" @click="abstract_hidden = false">...Xem thêm</a>
            </p>
          </div>
          <div v-else>
            <p class="is-size-6"><i>Không có thông tin về Tóm tắt</i></p>
          </div>
          <!------------------------------------------ Abstract  ------------------------------------------->

          <!--------------------------------------- View pdf -------------------------------------------->
          <nav class="level is-mobile mt-2">
            <div class="level-left is-small has-text-weight-light ">
              <a
                class="level-item button is-info"
                :href="'/pdf/' + formatTitle(paper_detail.title) + '.p-' + paper_id"
                target="_blank"
              >
                Xem PDF
              </a>
              <a
                :href="'http://doi.org/' + paper_detail.doi"
                class="level-item button are-small has-text-link"
                v-if="paper_detail.doi !== undefined && paper_detail.doi !== null"
              >
                Doi.org
              </a>
            </div>
          </nav>
          <!--------------------------------------- View pdf -------------------------------------------->
        </div>
      </div>

      <!--------------------------------------- Citations Chart ------------------------------------------------->
      <div class="tile is-parent is-5">
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
              <p style="color: black;">
                Trung bình được trích dẫn {{paper_detail.citationVelocity}} lần từ {{this.paper_detail.year}} đến nay
              </p>
            </div>
          </article>
        </div>
      </div>
      <!--------------------------------------- Citations Chart ------------------------------------------------->

    </div>

    <!-------------------------------------------- Navigation Bar ------------------------------------------------->
    <div
      class="tabs is-centered is-fullwidth sticky-nav"
      v-if="paper_detail.references.length > 0 || paper_detail.topics.length > 0 || paper_detail.citations.length > 0"
    >
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
        <li v-if="citation_length > 0">
          <a
            class="nav-item"
            v-scroll-to="{el: '#citation_box', offset: -100}"
            :class="{'in-view': scroll_position > (abstract_height + topic_height)
            && scroll_position < (abstract_height + topic_height + citation_height)}"
          >
            Trích dẫn
          </a>
        </li>
        <li v-if="ref_length > 0">
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
    <!-------------------------------------------- Navigation Bar ------------------------------------------------->

    <!---------------------------------------------- Topics ------------------------------------------------------->
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
    <!---------------------------------------------- Topics ------------------------------------------------------->

    <!------------------------------------------ Citations Table -------------------------------------------------->
    <div class="tile is-ancestor is-vertical" id="citation_box">
      <div class="tile is-parent" v-if="citation_length > 0">
        <div class="tile is-child pr-5 content_box">
          <p class="title">Trích dẫn</p>
          <p class="subtitle content_title">Các văn bản có nhắc tới văn bản này</p>
          <p class="is-size-6">
            Bạn đang xem
            <span v-if="(current_citation_page-1)*per_page + per_page < citation_length">
              {{ (current_citation_page-1)*per_page + 1}}-{{ (current_citation_page-1)*per_page + per_page}}
              trong {{citation_length}} trích dẫn
            </span>
            <span v-else>
              {{ (current_citation_page-1)*per_page + 1}}-{{citation_length}}
              trong {{citation_length}} trích dẫn
            </span>
          </p>
          <PaperTable v-bind:paper_data="citation_data" v-bind:is_empty="is_citation_empty"></PaperTable>
          <Pagination
            style="margin-left: 20%; margin-top: 10px;"
            v-model="current_citation_page"
            :page-count="Math.ceil(citation_length / per_page)"
            :click-handler="updateCitation"
            :page-range="3"
            :margin-pages="2">
          </Pagination>
        </div>
      </div>
    </div>
    <!------------------------------------------ Citations Table -------------------------------------------------->

    <!----------------------------------------- References Table -------------------------------------------------->
    <div class="tile is-ancestor is-vertical" id="reference_box">
      <div class="tile is-parent" v-if="ref_length > 0">
        <div class="tile is-child content_box">
          <p class="title">Tham chiếu</p>
          <p class="subtitle content_title">Các văn bản được nhắc tới trong văn bản này</p>
          <p class="is-size-6">
            Bạn đang xem
            <span v-if="(current_ref_page-1)*per_page + per_page < ref_length">
              {{ (current_ref_page-1)*per_page + 1}}-{{ (current_ref_page-1)*per_page + per_page}}
              trong {{paper_detail.references.length}} tham chiếu
            </span>
            <span v-else>
              {{ (current_ref_page-1)*per_page + 1}}-{{ref_length}}
              trong {{ref_length}} tham chiếu
            </span>
          </p>
          <PaperTable v-bind:paper_data="ref_data" v-bind:is_empty="is_ref_empty"></PaperTable>
          <Pagination
            style="margin-left: 20%; margin-top: 10px;"
            v-model="current_ref_page"
            :page-count="Math.ceil(ref_length / per_page)"
            :click-handler="updateReference"
            :page-range="3"
            :margin-pages="2">
          </Pagination>
        </div>
      </div>
    </div>
    <!----------------------------------------- References Table -------------------------------------------------->
  </div>

  <!--Error page-->
  <div v-else>
    <NuxtError v-bind:error="{statusCode:404, message:'Không tìm thấy văn bản'}"></NuxtError>
  </div>
  <!--Error page-->
</template>

<script>
    import {paper_citation, paper_detail, paper_references} from "@/API/elastic_api";
    import {formatTitle} from "assets/utils";
    import {chart_prep} from "assets/utils";
    import {chartColors} from "assets/utils";
    import CitationBar from "../../components/search_page/CitationBar";
    import PaperTable from "@/components/function_components/PaperTable";
    import NuxtError from "@/components/static_components/ErrorPage";
    import Pagination from "@/components/function_components/Pagination";

    export default {
      name: "_paper_detail",
      components: {PaperTable, CitationBar, NuxtError, Pagination},
      validate({route, redirect}) {
        if(/.p-\w+$/g.test(route.params.paper_detail)) {
          return true
        }
        else{
          redirect('/')
        }

      },
      head() {
        return {
          title: this.paper_detail.title + ' | DoIT Scholar'
        }
      },
      computed: {
        full_fos: function (){
          return _.join(this.paper_detail.fieldsOfStudy, ', ')
        }
      },
      data() {
        return {
          citation_length: null,
          ref_length: null,
          citation_data: null,
          ref_data: null,
          per_page: 5,
          current_citation_page: 1,
          current_ref_page: 1,

          abstract_height: null,
          topic_height: null,
          citation_height: null,
          reference_height: null,
          scroll_position: null,
          is_citation_empty: true,
          is_ref_empty: true,

          chartColors: chartColors,
          chart_data: null,
          chart_labels: null,

          paper_id: null,
          paper_detail: null,


          author_hidden: true,
          field_hidden: true,
          navigate: '',
          abstract_hidden: true,
        }
      },
      methods: {
        async updateCitation(page_num) {
          let result = await paper_citation({
            paper_id: this.paper_id,
            start: (page_num - 1) * this.per_page,
            size: this.per_page
          })
          // console.log("updateCitation: ", result)
          this.current_citation_page = page_num
          this.citation_data = result
        },
        async updateReference(page_num) {
          let result = await paper_references({
            paper_id: this.paper_id,
            start: (page_num - 1) * this.per_page,
            size: this.per_page
          })
          this.current_ref_page = page_num
          this.ref_data = result
        },
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
        let paper_id = /(?<=.p-)\w+$/g.exec(route.params.paper_detail)

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
          //Sort topics alphabetically
          data.topics.sort(function(a,b){
            return a.topic.localeCompare(b.topic);
          })
          console.log(data.citations, data.references)
          return {
            is_citation_empty: is_citation_empty,
            is_ref_empty: is_ref_empty,
            chart_labels: Object.keys(data_dict),
            chart_data: Object.values(data_dict),
            paper_id: paper_id[0],
            paper_detail: data,
            citation_data: data.citations,
            ref_data: data.references,
            citation_length: data.citations_length,
            ref_length: data.references_length
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
    //overflow: hidden;
    overflow: auto;
    white-space: nowrap;
    position: sticky;
    top: 60px;
    z-index: 1000;
  }
  .topic_list {
    display:inline-block;
    margin: 10px;
  }
  a:hover {
    text-decoration: none;
  }
</style>
