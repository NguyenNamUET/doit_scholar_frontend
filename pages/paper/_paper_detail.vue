<template>
  <div v-if="Object.keys(this.paper_detail).length !== 0" class="container" id="abstract">
    <div class="tile is-ancestor is-vertical" id="abstract_box" style="flex-wrap: wrap">
      <div class="tile">
        <div class="tile is-parent is-7">
          <div class="tile is-child">
            <!------------------------------------------ Source  ------------------------------------------->
            <p
              class="text-class-3"
            >
              DOI:
              <a
                v-if="paper_detail.doi !== undefined && paper_detail.doi !== null"
                :href="'https://doi.org/' + paper_detail.doi"
                class="link-class-3"
                style="font-size: 14px;"
              >
                {{paper_detail.doi}}
              </a>
              <span v-else>
              <i>Chưa có thông tin</i>
            </span>
              |
              ID văn bản: {{this.paper_detail.corpusId}}
            </p>
            <h1 class="title" style="color: #4E4B4B">
              <b>{{this.paper_detail.title}}</b>
            </h1>
            <!------------------------------------------ Source  ------------------------------------------->
            <div style="margin-bottom: 1rem;">
              <!------------------------------------------ Authors  ------------------------------------------->
              <span
                v-if="!author_hidden"
                v-for="(author, index) in paper_detail.authors"
                :key="author.authorId"
              >
              <a
                :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
                class="link-class-3 secondary_description"
                style="font-size: 14px;"
              >
                {{author.name}}
              </a>
              <span v-if="index < paper_detail.authors.length - 1">, </span>
            </span>
              <span class="text-class-3 less-more-button"
                    v-if="!author_hidden"
                    @click="author_hidden = true"
              >
              &nbspRút gọn
            </span>

              <span
                v-if="author_hidden"
                v-for="(author, index) in paper_detail.authors.slice(0,3)"
                :key="author.authorId"
              >
              <a
                class="link-class-3 secondary_description"
                style="font-size: 14px;"
                :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
              >
                {{author.name}}
              </a>
              <span v-if="index < paper_detail.authors.slice(0,3).length-1">, </span>
            </span>
              <span class="text-class-3 less-more-button"
                    v-if="author_hidden && paper_detail.authors.length - 3 > 0"
                    @click="author_hidden = false"
              >
              &nbsp+ {{paper_detail.authors.length - 3}} tác giả
            </span>
              <!------------------------------------------ Authors  ------------------------------------------->
              |
              <span class="color-class-3">{{paper_detail.year}} </span>

              <span v-if="paper_detail.year !== undefined">|</span>

              <!------------------------------------ Fields of study ---------------------------------------->
              <span v-if="paper_detail.fieldsOfStudy">
              <span class="text-class-3 color-class-3"
                    v-if="!field_hidden">
                {{this.full_fos}}
              </span>
              <span class="text-class-3 less-more-button"
                    v-if="!field_hidden"
                    @click="field_hidden = true"
              >
                &nbspRút gọn
              </span>

              <span class="text-class-3 color-class-3"
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

              <span v-if="paper_detail.venue.length !== 0"
                    class="text-class-3 color-class-3">
              | {{paper_detail.venue}}
            </span>
            </div>
            <!------------------------------------------ Abstract  ------------------------------------------->
            <div v-if="paper_detail.abstract">
              <div v-if="!abstract_hidden" class="content">
                <p class="text-class-2">
                  {{paper_detail.abstract}}
                  <a class="text-class-3" @click="abstract_hidden = true">...Ẩn bớt</a>
                </p>
              </div>
              <div v-else class="content">
                <p class="text-class-2">
                  {{paper_detail.abstract.slice(0, 700)}}
                  <a class="text-class-3" v-if="paper_detail.abstract.length > 700" @click="abstract_hidden = false">...Xem thêm</a>
                </p>
              </div>
            </div>
            <div v-else>
              <p class="is-size-6"><i>Không có thông tin về Tóm tắt</i></p>
            </div>
            <!------------------------------------------ Abstract  ------------------------------------------->

            <!--------------------------------------- View pdf -------------------------------------------->
            <nav class="level is-mobile" style="margin-top: 0.5rem;" v-if="paper_detail.pdf_url !== null">
              <div class="level-left is-small has-text-weight-light ">
                <a
                  class="level-item button is-warning"
                  v-if="!show_pdf"
                  v-on:click="handlePDF(true)"
                >
                  <span><i class="fas fa-file-pdf"></i> Xem PDF</span>
                </a>

                <a
                  class="level-item button is-warning"
                  v-if="show_pdf"
                  v-on:click="handlePDF(false)"
                >
                  <span><i class="fas fa-file-pdf"></i> Ẩn PDF</span>
                </a>
              </div>
            </nav>
            <!--------------------------------------- View pdf -------------------------------------------->
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child top_citation" v-if="citation_length > 0">
            <p>
              3 văn bản nổi bật trong {{citation_length | formatNumber}} trích dẫn
              <a
                class="button is-light is-small"
                style="float: right"
                v-on:click="$refs.citation_box.click()"
              >
                Xem tất cả
              </a>
            </p>

            <PaperCard
              v-for="result in citation_data.slice(0,3)"
              :paper_detail="result"
            >
            </PaperCard>
          </div>
        </div>
      </div>
      <div class="tile is-parent" id="pdf_section">
        <div class="tile is-child" v-if="show_pdf">
          <a
            class="delete is-medium close_pdf"
            v-on:click="handlePDF(false)"
          ></a>
          <iframe
            :src="'http://docs.google.com/gview?url=' + this.paper_detail.pdf_url +'&embedded=true'"
            id="pdf_container"
          >
          </iframe>
        </div>
      </div>
    </div>
    <!-------------------------------------------- Navigation Bar ------------------------------------------------->
    <div
      class="tabs sticky-nav is-centered is-fullwidth"
      v-if="paper_detail.references.length > 0 || paper_detail.topics.length > 0 || paper_detail.citations.length > 0"
    >
      <ul>
        <li>
          <a
            class="nav-item"
            v-scroll-to="{el: '#abstract_box', offset: -100}"
            :class="{'in-view': scroll_position < abstract_height}"
            ref="abstract_box"
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
            ref="topic_box"
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
            ref="citation_box"
          >
            {{citation_length | formatNumber}} trích dẫn
          </a>
        </li>
        <li v-if="ref_length > 0">
          <a
            class="nav-item"
            v-scroll-to="{el: '#reference_box', offset: -100}"
            :class="{'in-view': scroll_position > (abstract_height + topic_height + citation_height)}"
            ref="reference_box"
          >
            {{ref_length | formatNumber}} tham chiếu
          </a>
        </li>
<!--            <li v-if="paper_detail.fieldsOfStudy">-->
<!--              <a-->
<!--                class="nav-item"-->
<!--                v-scroll-to="{el: '#suggestion_box', offset: -100}"-->
<!--                :class="{'in-view': scroll_position > (abstract_height + topic_height + citation_height + reference_height)}"-->
<!--                ref="suggestion_box"-->
<!--              >-->
<!--                Văn bản liên quan-->
<!--              </a>-->
<!--            </li>-->
          </ul>

    </div>
    <!-------------------------------------------- Navigation Bar ------------------------------------------------->

    <!---------------------------------------------- Topics ------------------------------------------------------->
    <div class="tile is-ancestor" id="topic_box">
      <div class="tile is-parent is-vertical " v-if="paper_detail.topics.length > 0" >
        <article class="tile is-child content_box">
          <p class="content_title">Chủ đề được đề cập trong văn bản</p>
          <br>
          <div>
            <ul
              v-bind:style="{ maxHeight: paper_detail.topics.length*1.5 + 'vh' }"
            >
              <li
                class="topic_list"
                v-for="item in paper_detail.topics"

              >
                <a
                  :href="'/topic/' + formatTitle(item.topic) + '-' + item.topicId "
                >
                  {{item.topic}}
                </a>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
    <!---------------------------------------------- Topics ------------------------------------------------------->

    <!------------------------------------------ Citations Table -------------------------------------------------->
    <div class="tile is-ancestor" id="citation_box" >
      <div class="tile" v-if="citation_length > 0">
        <div class="tile is-parent">
          <article class="tile is-child content_box">
            <p class="content_title">
              Trích dẫn
              <b-tooltip
                label="Các văn bản có nhắc tới văn bản này"
                position="is-right"
                type="is-light"
              >
                <span class="text-class-3"><i class="fas fa-exclamation-circle"></i></span>
              </b-tooltip>
            </p>
            <br>
            <p class="text-class-3" style="margin-left: 10px;">
              Bạn đang xem
              <span v-if="(current_citation_page-1)*per_page + per_page < citation_length">
                {{ (current_citation_page-1)*per_page + 1}}-{{ (current_citation_page-1)*per_page + per_page}}
                trong {{citation_length | formatNumber}} trích dẫn
              </span>
              <span v-else>
                {{ (current_citation_page-1)*per_page + 1}}-{{citation_length}}
                trong {{citation_length | formatNumber}} trích dẫn
              </span>
            </p>
            <div class="tile is-parent">
              <div class="tile is-child is-8" style="padding-right: 0.5rem;">
                <PaperTable
                  v-for="result in citation_data"
                  v-bind:search_result="result"
                >
                </PaperTable>
                <Pagination
                  v-model="current_citation_page"
                  :page-count="Math.ceil(citation_length / per_page)"
                  :click-handler="updateCitation"
                  :page-range="3"
                  :margin-pages="2"
                  :isSmall="true">
                </Pagination>
              </div>
              <div class="tile is-child is-4">
                <div v-if="this.chart_data.length > 0">
                  <CitationBar
                    :dataset="this.chart_data"
                    :labels="this.chart_labels"
                    :width="250" :height="250"
                  >
                  </CitationBar>
                </div>
                <div
                  v-if="paper_detail.citationVelocity !== undefined && paper_detail.citationVelocity > 0"
                  style="text-align: center"
                >
                  <p class="text-class-3 color-class-3">
                    Trung bình được trích dẫn
                    <span style="text-decoration: underline">{{paper_detail.citationVelocity}}</span>
                    lần từ {{this.paper_detail.year}} đến nay
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <!------------------------------------------ Citations Table -------------------------------------------------->

    <!----------------------------------------- References Table -------------------------------------------------->
    <div class="tile is-ancestor is-vertical " id="reference_box">
      <div class="tile is-parent" v-if="ref_data.length > 0">
        <div class="tile is-child content_box">
          <p class="content_title">
            Tham chiếu
            <b-tooltip
              label="Các văn bản được nhắc tới trong văn bản này"
              type="is-light"
              position="is-right"
            >
              <span class="text-class-3"><i class="fas fa-exclamation-circle"></i></span>
            </b-tooltip>
          </p>
          <br>
          <p class="text-class-3" style="margin-left: 10px;">
            Bạn đang xem
            <span v-if="(current_ref_page-1)*per_page + per_page < ref_length">
              {{ (current_ref_page-1)*per_page + 1}}-{{ (current_ref_page-1)*per_page + per_page}}
              trong {{ref_length | formatNumber}} tham chiếu
            </span>
            <span v-else>
              {{ (current_ref_page-1)*per_page + 1}}-{{ref_length}}
              trong {{ref_length | formatNumber}} tham chiếu
            </span>
          </p>
          <div class="tile is-parent">
            <div class="tile is-child">
              <PaperTable
                v-for="result in ref_data"
                v-bind:search_result="result"
              >
              </PaperTable>
              <Pagination
                v-model="current_ref_page"
                :page-count="Math.ceil(ref_length / per_page)"
                :click-handler="updateReference"
                :page-range="3"
                :margin-pages="2"
                :isSmall="true">
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!----------------------------------------- References Table -------------------------------------------------->
    <div class="tile is-ancestor" v-if="paper_detail.fieldsOfStudy" id="suggestion_box">
      <div class="tile is-parent">
        <div class="tile is-child">
          <p class="content_title">Văn bản liên quan</p>
          <b-carousel
            :pause-hover="true"
            :pause-info="false"
            :arrow="false"
            :indicator-mode="'hover'"
            :indicator-style="'is-lines'"
          >
            <b-carousel-item
              style="margin-bottom: 10px;"
              v-for="page in Math.round(suggestion_data.length / 3)"
            >
              <div class="columns is-1">
                <div
                  class="column is-one-third"
                  v-for="result in suggestion_data.slice((page-1)*carousel_size,(page-1)*carousel_size+3)"
                >
                  <PaperCard
                    :paper_detail="result._source"
                  >
                  </PaperCard>
                </div>
              </div>
            </b-carousel-item>
          </b-carousel>
        </div>
      </div>
    </div>
  </div>

  <!--Error page-->
  <div v-else>
    <NuxtError v-bind:error="{statusCode:404, message:'Không tìm thấy văn bản'}"></NuxtError>
  </div>
  <!--Error page-->
</template>

<script>
    import {citation_chart_data, paper_by_fos, paper_citation, paper_detail, paper_references} from "@/API/elastic_api";
    import {formatTitle} from "assets/utils";
    import {formatNumber} from "assets/utils";
    import {chartColors} from "assets/utils";

    export default {
      name: "_paper_detail",
      // components: {PaperCard, PaperPDF, PaperTable, CitationBar, NuxtError, Pagination},
      validate({route, redirect}) {
        if(/.p-\w+$/g.test(route.params.paper_detail)) {
          return true
        }
        else{
          redirect('/')
        }
      },
      // watch: {
      //   scroll_position: async function (old_value, new_value) {
      //     if (new_value > (this.abstract_height + this.topic_height)) {
      //       let data = await citation_chart_data(this.paper_id)
      //       console.log(data)
      //       this.chart_labels = Object.keys(data.citations_chart)
      //       this.chart_data = Object.values(data.citations_chart)
      //     }
      //   }
      // },
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
          per_page: 10,
          current_citation_page: 1,
          current_ref_page: 1,

          abstract_height: null,
          topic_height: null,
          citation_height: null,
          reference_height: null,
          suggestion_height: null,
          scroll_position: null,
          is_citation_empty: true,
          is_ref_empty: true,
          is_loading_citation: false,
          is_loading_ref: false,

          chartColors: chartColors,
          chart_data: null,
          chart_labels: null,

          paper_id: null,
          paper_detail: null,
          suggestion_data: null,

          author_hidden: true,
          field_hidden: true,
          navigate: '',
          abstract_hidden: true,
          show_pdf: false,
          carousel_size: 3,
        }
      },
      filters: {
        formatNumber(number) {
          return formatNumber(number)
        }
      },
      methods: {
        handlePDF(show_pdf) {
          this.show_pdf = show_pdf
          if (show_pdf === true) {
            this.$nuxt.$loading.start()
            setTimeout(() => this.$nuxt.$loading.finish(), 3000)
          }
        },
        async updateCitation(page_num) {
          this.is_loading_citation = true
          let result = await paper_citation({
            paper_id: this.paper_id,
            start: (page_num - 1) * this.per_page,
            size: this.per_page
          })
          this.$refs.citation_box.click()
          this.current_citation_page = page_num
          this.citation_data = result
          this.citation_height = document.getElementById('citation_box').offsetHeight
          this.is_loading_citation = false
        },
        async updateReference(page_num) {
          this.is_loading_ref = true
          let result = await paper_references({
            paper_id: this.paper_id,
            start: (page_num - 1) * this.per_page,
            size: this.per_page
          })
          this.$refs.reference_box.click()
          this.current_ref_page = page_num
          this.ref_data = result
          this.reference_height = document.getElementById('reference_box').offsetHeight
          this.is_loading_ref = false
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

        let suggestion_data = []
        if(data?.fieldsOfStudy){
          suggestion_data = await paper_by_fos({
            fields_of_study: data.fieldsOfStudy,
            size: 15
          })
        }
        if (Object.keys(data).length !== 0) {
          if (data.citations_count > 0) {
            let data = await citation_chart_data(paper_id)
            data_dict = data.citations_chart
            is_citation_empty = false
          }
          // console.log(data_dict)
          if (data.references_count > 0) {
            is_ref_empty = false
          }
          //Sort topics alphabetically
          data.topics.sort(function(a,b){
            return a.topic.localeCompare(b.topic);
          })
          return {
            suggestion_data: suggestion_data,
            is_citation_empty: is_citation_empty,
            is_ref_empty: is_ref_empty,
            chart_labels: Object.keys(data_dict),
            chart_data: Object.values(data_dict),
            paper_id: paper_id[0],
            paper_detail: data,
            citation_data: data.citations,
            ref_data: data.references,
            citation_length: data.citations_count,
            ref_length: data.references_count
          }
        }
        else {
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
      flex-direction: column;
      flex-wrap: wrap;
      display: flex;
      list-style-type: disc;
      list-style-position: inside;
    }
    li {
      font-size: 14px;
      margin: 5px;
    }
  }

  .sticky-nav {
    background-color: #f0f1f2;
    overflow: auto;
    position: sticky;
    top: 60px;
    z-index: 1;
  }

  .nav-item{
    color: #4e54c8;
    border-right: 1px solid #E2E3E4;
    border-left: 1px solid #E2E3E4;
  }

  .nav-item:hover {
    background-color: #f9f9fa;
    text-decoration: none
  }

  .in-view {
    background-color: #f9f9fa;
    font-weight: 600;
    color: #054CA8;
  }

  .container {
    padding: 40px 20px;
  }

  .button:hover {
    text-decoration: none;
  }

  #pdf_container {
    position:fixed;
    top:60px;
    left:0;
    bottom:0;
    right:0;
    width:100%;
    height:90%;
    border:none;
    margin:0;
    padding:0;
    overflow:hidden;
    z-index:2;
  }

  .close_pdf {
    position: fixed;
    top: 80px;
    right: 60px;
    z-index: 4;
  }

  .related_content {
    height: 250px;
  }

  .top_citation {
    max-height: 550px;
    border: 1px solid #d9dadb;
    background-color: #f9f9fa;
    padding: 10px;
    p {
      font-weight: 500;
      font-size: 18px;
    }
  }
</style>
