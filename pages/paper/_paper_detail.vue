<template>
  <div v-if="Object.keys(this.paper_detail).length !== 0" class="container" id="abstract">
<!--    {{this.gg_scholar_meta}}-->
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
              &nbsp{{ $t('general_attribute.less') }}
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

            <!--------------------------------------- View pdf -------------------------------------------->
            <nav
              class="level is-mobile"
              style="margin-top: 0.5rem;"
              v-if="paper_detail.pdf_url !== null && paper_detail.pdf_url !== undefined && paper_detail.pdf_url.endsWith('.pdf')"
            >
              <div class="level-left is-small has-text-weight-light ">
                <a
                  class="level-item button is-warning"
                  v-if="!show_pdf"
                  v-on:click="handlePDF(true)"
                >
                  <span><i class="fas fa-file-pdf"></i> {{ $t('general_attribute.show') }} PDF</span>
                </a>

                <a
                  class="level-item button is-warning"
                  v-if="show_pdf"
                  v-on:click="handlePDF(false)"
                >
                  <span><i class="fas fa-file-pdf"></i> {{ $t('general_attribute.hide') }} PDF</span>
                </a>
              </div>
            </nav>
            <!--------------------------------------- View pdf -------------------------------------------->
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child top_citation" v-if="citation_length > 0">
            <p>
              <i18n
                tag="span"
                path="paper_detail_page.highlight_citation_box.title"
              >
                <template v-slot:number>
                  <span>3</span>
                </template>
                <template v-slot:total>
                  <span>{{citation_length | formatNumber}}</span>
                </template>
              </i18n>
              <a
                class="button is-light is-small"
                style="float: right"
                v-on:click="$refs.citation_box.click()"
              >
                {{ $t('general_attribute.more') }}
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
            {{citation_length | formatNumber}} {{ $t('general_attribute.citation') }}
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
        <p class="content_title">{{ $t('general_attribute.topic') }}</p>
        <article class="tile is-child content_box">
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
                <template
                  v-slot:end
                >
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
                  v-for="result in citation_data"
                  v-bind:search_result="result"
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
                  {{chart_labels}}
                  {{chart_data}}
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
      <div class="tile is-parent" v-if="ref_data.length > 0">
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
              <template
                v-slot:end
              >
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
                v-for="result in ref_data"
                v-bind:search_result="result"
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
    <div class="tile is-ancestor" v-if="paper_detail.fieldsOfStudy" id="suggestion_box">
      <div class="tile is-parent">
        <div class="tile is-child">
          <p class="content_title">{{ $t('paper_detail_page.related_paper') }}</p>
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
import {chartColors, formatNumber, formatTitle, host} from "assets/utils";
import SearchResult from "@/components/search_page/SearchResult";

export default {
      name: "paper_detail",
      components: {SearchResult},
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
          title: this.paper_detail.title + ' | DoIT Scholar',
          meta: this.all_meta
        }
      },
      jsonld() {
        let json_schema = []
        json_schema.push(this.breadcrumb_schema)
        json_schema.push(this.article_schema)
        return {
          "@context": "https://schema.org",
          "@graph" : json_schema
        }
      },
      computed: {
        full_fos: function () {
          return _.join(this.paper_detail.fieldsOfStudy, ', ')
        },
        all_meta: function () {
          let local_meta = [
            {
              hid: 'description',
              name: 'description',
              content: this.paper_detail.abstract
            }
          ]
          return local_meta.concat(this.twitter_meta, this.og_meta, this.gg_scholar_meta)
        },
        twitter_meta: function() {
          return [
            {
              hid: 'twitter:title',
              property: 'twitter:title',
              content: this.paper_detail.title
            },
            {
              hid: 'twitter:image',
              property: 'twitter:image',
              content: 'http://doit.uet.vnu.edu.vn/img/logo.png'
            },
            {
              hid: 'twitter:image:alt',
              property: 'twitter:image:alt',
              content: 'DoIT Scholar'
            },
            {
              hid: 'twitter:card',
              property: 'twitter:card',
              content: 'summary_large_image'
            },
            {
              hid: 'twitter:url',
              property: 'twitter:url',
              content: host + this.$route.path
            },
            {
              hid: 'twitter:description',
              property: 'twitter:description',
              content: this.paper_detail.abstract
            }
          ]
        },
        og_meta: function() {
          return [
            {
              hid: 'og:title',
              property: 'og:title',
              content: this.paper_detail.title
            },
            {
              hid: 'og:image',
              property: 'og:image',
              content: 'http://doit.uet.vnu.edu.vn/img/logo.png'
            },
            {
              hid: 'og:type',
              property: 'og:type',
              content: 'website'
            },
            {
              hid: 'og:site_name',
              property: 'og:site_name',
              content: 'DoIT Scholar'
            },
            {
              hid: 'og:url',
              property: 'og:url',
              content: host + this.$route.path
            },
            {
              hid: 'og:description',
              property: 'og:description',
              content: this.paper_detail.abstract
            }
          ]
        },
        gg_scholar_meta: function () {
          let meta = [
            {
              hid: 'citation_title',
              name: 'citation_title',
              content: this.paper_detail.title
            },
            {
              hid: 'citation_abstract_html_url',
              name: 'citation_abstract_html_url',
              content: host + this.$route.path
            },
            {
              hid: 'citation_fulltext_html_url',
              name: 'citation_fulltext_html_url',
              content: host + this.$route.path
            },
            {
              hid: 'citation_publication_date',
              name: 'citation_publication_date',
              content: this.paper_detail.year
            }
          ]
          this.paper_detail.authors.forEach(function (author) {
            meta.push({
                hid: 'citation_author',
                name: 'citation_author',
                content: author.name
            })
          })
          if (this.paper_detail.doi !== undefined && this.paper_detail.doi !== null)
            meta.push({
              hid: 'citation_doi',
              name: 'citation_doi',
              content: this.paper_detail.doi
            })
          if (this.paper_detail.venue.length !== 0)
            meta.push({
              hid: 'citation_journal_title',
              name: 'citation_journal_title',
              content: this.paper_detail.venue
            })
          if (this.paper_detail.pdf_url !== null && this.paper_detail.pdf_url !== undefined && this.paper_detail.pdf_url.endsWith('.pdf'))
            meta.push({
              hid: 'citation_pdf_url',
              name: 'citation_pdf_url',
              content: this.paper_detail.pdf_url
            })
          return meta
        },
        breadcrumb_schema: function() {
          return {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                "@type":"ListItem",
                "position":1,
                "item":{
                  "@id": host,
                  "name":"Home"
                }
              },
              {
                "@type":"ListItem",
                "position": 2,
                "item":{
                  "@id": host + this.$route.path,
                  "name": "Papers"
                }
              }
            ]
          }
        },
        article_schema: function () {
          let schema = {
            '@type': 'ScholarlyArticle',
            'name': this.paper_detail.title,
            'headline': this.paper_detail.title,
            'mainEntityOfPage': host + this.$route.path,
            'description': this.paper_detail.abstract,
            'copyrightYear': this.paper_detail.year,
            'datePublished': this.paper_detail.year,
            'author': []
          }
          this.paper_detail.authors.forEach(function (author) {
            schema['author'].push({
              '@type': 'Person',
              'name': author.name,
              'mainEntityOfPage': host + '/author/' + formatTitle(author.name) + '-' + author.authorId
            })
          })
          if (this.paper_detail.pdf_url !== null && this.paper_detail.pdf_url !== undefined && this.paper_detail.pdf_url.endsWith('.pdf'))
            schema['about'] = Array({
              '@type': 'DigitalDocument',
              'url': this.paper_detail.pdf_url
            })
          return schema
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
          // console.log(data)
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
