<template>
  <div v-if="Object.keys(this.paper_detail).length !== 0" class="container">
    <div class="tile is-ancestor is-vertical" id="abstract_box">
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
              <i>{{ $t('general_attribute.unavailable') }}</i>
            </span>
              |
              {{ $t('paper_detail_page.paper_id') }}: {{this.paper_detail.corpusId}}
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
                :key="index"
              >
              <span
                class="link-class-3 secondary_description"
                style="font-size: 14px;"
              >
                {{author.name}}
              </span>
              <span v-if="index < paper_detail.authors.length - 1">, </span>
            </span>
              <span class="text-class-3 less-more-button"
                    v-if="!author_hidden"
                    @click="author_hidden = true"
              >
              &nbsp{{ $t('general_attribute.less') }}
            </span>

              <span
                v-if="author_hidden"
                v-for="(author, index) in paper_detail.authors.slice(0,3)"
                :key="index"
              >
              <span
                class="link-class-3 secondary_description"
                style="font-size: 14px;"
              >
                {{author.name}}
              </span>
              <span v-if="index < paper_detail.authors.slice(0,3).length-1">, </span>
            </span>
              <span class="text-class-3 less-more-button"
                    v-if="author_hidden && paper_detail.authors.length - 3 > 0"
                    @click="author_hidden = false"
              >
              &nbsp+ {{paper_detail.authors.length - 3}} {{ $t('general_attribute.author') }}
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
                &nbsp{{ $t('general_attribute.less') }}
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
                &nbsp+ {{paper_detail.fieldsOfStudy.length - 1}} {{ $t('general_attribute.fos') }}
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
                  <a class="text-class-3" @click="abstract_hidden = true">...{{ $t('general_attribute.less') }}</a>
                </p>
              </div>
              <div v-else class="content">
                <p class="text-class-2">
                  {{paper_detail.abstract.slice(0, 700)}}
                  <a
                    class="text-class-3"
                    v-if="paper_detail.abstract.length > 700"
                    @click="abstract_hidden = false"
                  >...{{ $t('general_attribute.more') }}</a>
                </p>
              </div>
            </div>
            <div v-else>
              <p class="is-size-6"><i>{{ $t('general_attribute.unavailable') }}</i></p>
            </div>
            <!------------------------------------------ Abstract  ------------------------------------------->
          </div>
        </div>

<!--        <div class="tile is-parent is-hidden-touch">-->
<!--          <div class="tile is-child top_citation" v-if="citation_length > 0">-->
<!--            <p>-->
<!--              <i18n-->
<!--                tag="span"-->
<!--                path="paper_detail_page.highlight_citation_box.title"-->
<!--              >-->
<!--                <template v-slot:number>-->
<!--                  <span>3</span>-->
<!--                </template>-->
<!--                <template v-slot:total>-->
<!--                  <span>{{citation_length | formatNumber}}</span>-->
<!--                </template>-->
<!--              </i18n>-->
<!--              <a-->
<!--                class="button is-light is-small"-->
<!--                style="float: right"-->
<!--                v-on:click="$refs.citation_box.click()"-->
<!--              >-->
<!--                {{ $t('general_attribute.more') }}-->
<!--              </a>-->
<!--            </p>-->

<!--            <PaperCard-->
<!--              v-for="result in citation_data.slice(0,3)"-->
<!--              :data="result"-->
<!--              :key="result.paperId"-->
<!--            >-->
<!--            </PaperCard>-->
<!--          </div>-->
<!--        </div>-->
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
            {{ $t('general_attribute.abstract') }}
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
            {{ $t('general_attribute.topic') }}
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
            {{ (citation_length | 0) | formatNumber}} {{ $t('general_attribute.citation') }}
          </a>
        </li>
        <li v-if="ref_length > 0">
          <a
            class="nav-item"
            v-scroll-to="{el: '#reference_box', offset: -100}"
            :class="{'in-view': scroll_position > (abstract_height + topic_height + citation_height)}"
            ref="reference_box"
          >
            {{ref_length | formatNumber}} {{ $t('general_attribute.reference') }}
          </a>
        </li>
      </ul>
    </div>
    <!-------------------------------------------- Navigation Bar ------------------------------------------------->

    <!---------------------------------------------- Topics ------------------------------------------------------->
    <div class="tile is-ancestor" id="topic_box">
      <div class="tile is-parent is-vertical " v-if="paper_detail.topics.length > 0" >
        <p class="content_title">{{ $t('general_attribute.topic') }}</p>
        <article class="tile is-child content_box">
          <div>
            <ul
              v-bind:style="{ maxHeight: paper_detail.topics.length*1.5 + 'vh' }"
            >
              <li
                class="topic_list"
                v-for="item in paper_detail.topics"
                :key="item.topicId"
              >
                <span
                >
                  {{item.topic}}
                </span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
    <!---------------------------------------------- Topics ------------------------------------------------------->

    <!------------------------------------------ Citations Table -------------------------------------------------->
    <div class="tile is-ancestor" id="citation_box" >
      <div v-if="this.is_loading_citation" class="tile">
        <div class="tile is-parent">
          <i class="fas fa-spinner fa-pulse"></i>
          <p>Loading</p>
        </div>
      </div>
      <div class="tile" v-else-if="citation_length > 0 && !this.is_loading_citation">
        <div class="tile is-parent">
          <article class="tile is-child">
            <p class="content_title">
              {{ $t('general_attribute.citation') }}
              <b-tooltip
                :label="$t('paper_detail_page.citation_tooltip')"
                position="is-right"
                type="is-light"
              >
                <span class="text-class-3"><i class="fas fa-exclamation-circle"></i></span>
              </b-tooltip>
            </p>
            <p class="text-class-3">
              <i18n
                tag="span"
                path="general_attribute.list_label"
              >
                <template v-slot:start>
                  <span>
                      {{ (current_citation_page-1)*per_page + 1}}
                  </span>
                </template>
                <template v-slot:end>
                  <span v-if="(current_citation_page-1)*per_page + per_page < citation_length">
                      {{ (current_citation_page-1)*per_page + per_page}}
                  </span>
                  <span v-else>
                      {{citation_length}}
                  </span>
                </template>
                <template v-slot:total>
                  <span>
                      {{citation_length | formatNumber}}
                  </span>
                </template>
              </i18n>
            </p>
            <div class="tile is-parent">
              <div class="tile is-child is-8" style="padding-right: 0.5rem;">
                <SearchResult
                  v-for="result in citations"
                  :key="result.paperId"
                  :data="result"
                >
                </SearchResult>
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
                <div v-if="this.chart_data.length > 0" class="content_box">
                  <CitationBar
                    :dataset="this.chart_data"
                    :labels="this.chart_labels"
                    :width="250"
                    :height="250"
                    :title="$t('paper_detail_page.citation_chart_title')"
                  >
                  </CitationBar>
                </div>
                <div
                  v-if="paper_detail.citationVelocity !== undefined && paper_detail.citationVelocity > 0"
                  style="text-align: center"
                  class="text-class-3 color-class-3"
                >
<!--                  <p class="text-class-3 color-class-3">-->
<!--                    Trung bình được trích dẫn-->

<!--                    lần từ {{this.paper_detail.year}} đến nay-->
<!--                  </p>-->
                  <i18n
                    tag="p"
                    path="paper_detail_page.citation_velocity"
                  >
                    <template v-slot:count>
                      <span style="text-decoration: underline">{{paper_detail.citationVelocity}}</span>
                    </template>
                    <template v-slot:year>
                      <span>
                          {{paper_detail.year}}
                      </span>
                    </template>
                  </i18n>
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
      <div v-if="this.is_loading_ref" class="tile">
        <div class="tile is-parent">
          <i class="fas fa-spinner fa-pulse"></i>
          <p>Loading</p>
        </div>
      </div>
      <div class="tile is-parent" v-else-if="ref_length > 0 && !this.is_loading_ref">
        <div class="tile is-child">
          <p class="content_title">
            {{ $t('general_attribute.reference') }}
            <b-tooltip
              :label="$t('paper_detail_page.reference_tooltip')"
              type="is-light"
              position="is-right"
            >
              <span class="text-class-3"><i class="fas fa-exclamation-circle"></i></span>
            </b-tooltip>
          </p>
          <p class="text-class-3">
            <i18n
              tag="span"
              path="general_attribute.list_label"
            >
              <template v-slot:start>
                  <span>
                      {{ (current_ref_page-1)*per_page + 1}}
                  </span>
              </template>
              <template v-slot:end>
                  <span v-if="(current_ref_page-1)*per_page + per_page < ref_length">
                      {{ (current_ref_page-1)*per_page + per_page}}
                  </span>
                <span v-else>
                      {{ref_length}}
                  </span>
              </template>
              <template v-slot:total>
                  <span>
                      {{ref_length | formatNumber}}
                  </span>
              </template>
            </i18n>
          </p>
          <div class="tile is-parent">
            <div class="tile is-child is-8">
              <SearchResult
                v-for="result in references"
                :key="result.paperId"
                :data="result"
              >
              </SearchResult>
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

<!--    &lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; Suggestion  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--    <div class="tile is-ancestor" v-if="paper_detail.fieldsOfStudy" id="suggestion_box">-->
<!--      <div class="tile is-parent">-->
<!--        <div class="tile is-child">-->
<!--          <p class="content_title">{{ $t('paper_detail_page.related_paper') }}</p>-->
<!--          <b-carousel-->
<!--              :pause-hover="true"-->
<!--              :pause-info="false"-->
<!--              :arrow="false"-->
<!--              :indicator-mode="'hover'"-->
<!--              :indicator-style="'is-lines'"-->
<!--            >-->
<!--              <b-carousel-item-->
<!--                style="margin-bottom: 10px;"-->
<!--                v-for="page in Math.round(suggestion_data.length / 3)"-->
<!--                :key="page"-->
<!--              >-->
<!--                <div class="columns is-1">-->
<!--                  <div-->
<!--                    class="column is-one-third"-->
<!--                    v-for="result in suggestion_data.slice((page-1)*carousel_size,(page-1)*carousel_size+3)"-->
<!--                    :key="result._source.paperId"-->
<!--                  >-->
<!--                    <PaperCard-->
<!--                      :paper_detail="result._source"-->
<!--                    >-->
<!--                    </PaperCard>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </b-carousel-item>-->
<!--            </b-carousel>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    &lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; Suggestion  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
  </div>
  <!--Error page-->
  <div v-else>
    <NuxtError v-bind:error="{statusCode:404, message:'Không tìm thấy văn bản'}"></NuxtError>
  </div>
  <!--Error page-->
</template>

<script>
import {paper_by_fos, paper_citation, paper_detail, paper_references} from "@/API/elastic_api";
import {chartColors, formatNumber, formatTitle, host} from "assets/utils";
import SearchResult from "~/components/search_page/SearchResult";
import Pagination from "~/components/function_components/Pagination";
import PaperCard from "~/components/static_components/PaperCard";
import NuxtError from "~/components/static_components/ErrorPage";
import CitationBar from "~/components/search_page/CitationBar";
import {getDocById, getInboundCitations, getOutboundCitations} from "@/API/lucene_api";
import axios from "axios";

export default {
      name: "paper_detail",
      components: {
        CitationBar,
        NuxtError,
        SearchResult,
        PaperCard,
        Pagination
      },
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
          title: this.paper_detail.title + ' | Compasify'
        }
      },
      computed: {
        full_fos: function () {
          return _.join(this.paper_detail.fieldsOfStudy, ', ')
        },
      },
      data() {
        return {
          citation_length: null,
          ref_length: null,
          citation_data: null,

          citations: null,
          references: null,

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
          detail_data: null,

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
          this.$refs.citation_box.click()
          // await this.$router.push({
          //   path: this.$route.path + "#citation_box",
          //   query: {cit_page: page_num, ref_page: this.current_ref_page}
          // })
          this.current_citation_page = page_num
          let start = (page_num - 1) * this.per_page
          let end = start + this.per_page
          // let result = await paper_citation({
          //   paper_id: this.paper_id,
          //   start: (page_num - 1) * this.per_page,
          //   size: this.per_page
          // })
          this.citation_data = this.citation_data.slice(start, end)
          this.citation_height = document.getElementById('citation_box').offsetHeight
          this.is_loading_citation = false
        },
        async updateReference(page_num) {
          this.is_loading_ref = true
          this.$refs.reference_box.click()
          // await this.$router.push({
          //   path: this.$route.path + "#reference_box",
          //   query: {cit_page: this.current_citation_page, ref_page: page_num}
          // })
          this.current_ref_page = page_num
          let start = (page_num - 1) * this.per_page
          let end = start + this.per_page
          // let result = await paper_references({
          //   paper_id: this.paper_id,
          //   start: (page_num - 1) * this.per_page,
          //   size: this.per_page
          // })
          this.references = this.ref_data.slice(start, end)
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
        // let paper_id = /(?<=.p-)\w+$/g.exec(route.params.paper_detail)
        let paper_id = /(?<=.p-)[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))$/.exec(route.params.paper_detail)
        let corpusId = /(?<=.p-)[0-9]+$/.exec(route.params.paper_detail)

        let id = ''
        if (paper_id === null) {
          id = corpusId[0]
        }
        else {
          id = paper_id[0]
        }

        // let params = {docId:paper_id[0],
        //               cstart:0, csize:10,
        //               rstart:0, rsize:10}
        // if(Object.keys(route.query).includes('cit_page')){
        //   params.cstart = route.query?.cit_page-1 ?? 0
        //   this.current_citation_page = this.$route.query?.cit_page ?? 1
        // }
        // if(Object.keys(route.query).includes('ref_page')){
        //   params.rstart = route.query?.ref_page-1 ?? 0
        //   this.current_ref_page = this.$route.query?.ref_page ?? 1
        // }

        // let paper_data = await getDocById(params)
        // let detail_data = paper_data.data[0]
        // let paper_detail = {}
        // if (Object.keys(detail_data).includes('title')) paper_detail['title'] = detail_data.title
        // if (Object.keys(detail_data).includes('paper_id')) paper_detail['paperId'] = detail_data.paper_id
        // if (Object.keys(detail_data).includes('year')) paper_detail['year'] = detail_data.year
        // if (Object.keys(detail_data).includes('fieldsOfStudy')) paper_detail['fieldsOfStudy'] = detail_data.mag_field_of_study
        // if (Object.keys(detail_data).includes('venue')) paper_detail['venue'] = detail_data.venue
        // if (Object.keys(detail_data).includes('journal')) paper_detail['journal'] = detail_data.journal
        // if (Object.keys(detail_data).includes('authors')) paper_detail['authors'] = detail_data.authors
        // if (Object.keys(detail_data).includes('abstract')) paper_detail['abstract'] = detail_data.abstract
        // if (Object.keys(detail_data).includes('doi')) paper_detail['doi'] = detail_data.doi
        // console.log(paper_detail)

        let data_dict = {}
        let is_citation_empty = true
        let is_ref_empty = true

        let s2data = null
        if (corpusId === null) {
          s2data = await axios.get("https://api.semanticscholar.org/v1/paper/" + id)
        }
        else {
          s2data = await axios.get("https://api.semanticscholar.org/v1/paper/CorpusID:" + id)
        }

        let paper_detail = s2data.data
        console.log(paper_detail)

        let citations = paper_detail.citations
        let references = paper_detail.references
        // console.log(citations)
        // let suggestion_data = []
        // console.log(citations)
        // if(paper_data?.fieldsOfStudy){
        //   suggestion_data = await paper_by_fos({
        //     fields_of_study: paper_data.fieldsOfStudy,
        //     size: 15
        //   })
        // }
        if (Object.keys(paper_detail).length !== 0) {
          if (citations.length > 0) {
            // data_dict = paper_detail.citations_chart
            is_citation_empty = false
          }
          // console.log(data_dict)
          if (references.length > 0) {
            is_ref_empty = false
          }
          // console.log(data)
          //Sort topics alphabetically
          paper_detail.topics.sort(function(a,b){
            return a.topic.localeCompare(b.topic);
          })
          return {
            // suggestion_data: suggestion_data,
            is_citation_empty: is_citation_empty,
            is_ref_empty: is_ref_empty,
            chart_labels: Object.keys(data_dict),
            chart_data: Object.values(data_dict),
            paper_id: id,
            paper_detail: paper_detail,
            citation_data: citations,
            ref_data: references,
            citations: citations.length > 10 ? citations.slice(0,10) : citations,
            references: references.length > 10 ? references.slice(0,10) : references,
            citation_length: citations.length,
            ref_length: references.length
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

  .top_citation {
    border: 1px solid #d9dadb;
    background-color: #f9f9fa;
    padding: 10px;
    p {
      font-weight: 500;
      font-size: 18px;
    }
  }
</style>
