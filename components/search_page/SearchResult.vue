<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <div class="tile is-child content_box">
        <!---------------------------------------Title------------------------------------------->
        <a v-if="Object.keys(search_result).includes('title')"
          class="text-class-1"
          :href="'/paper/' + formatTitle(search_result.title) + '.p' + '-' + search_result.paperId"
        >
          <b>{{ search_result.title }}</b>
        </a>
        <!---------------------------------------Title------------------------------------------->
        <div class="has-text-weight-light">
          <!-------------- Year ------------------>
          <p
            class="text-class-3"
            v-if="search_result.year !== '' && search_result.year !== null && search_result.year !== undefined"
          >
            <span class="small_icon"><i class="fas fa-calendar-alt"></i></span>
            {{search_result.year}}
          </p>
          <!-------------- Year ------------------>

          <!------------------------------------ Fields of study ---------------------------------------->
          <p v-if="Object.keys(search_result).includes('fieldsOfStudy') && search_result.fieldsOfStudy">
            <!------------------------------- Venues/Journals --------------------------------->
            <span class="small_icon"><i class="fas fa-book-open"></i></span>
            <nuxt-link  v-if="Object.keys(search_result).includes('venue') && search_result.venue"
                        class="link-class-3 secondary_description"
                        :to="{path:'/journal/' + search_result.venue.replace(' ','-'),
                              query:{start:0, size:10, page:1, sort: 'score'}}">
              <b>{{search_result.venue}}</b>
            </nuxt-link>
            <span
              v-if="Object.keys(search_result).includes('venue') && search_result.venue"
            >&sdot;</span>
            <span
              v-if="!field_hidden"
              class="text-class-3"
              v-for="(fos,index) in search_result.fieldsOfStudy"
            >
              {{ fos }}
              <span v-if="index < search_result.fieldsOfStudy.length - 1">,</span>
            </span>
            <span
              class="less-more-button"
              v-if="!field_hidden"
              v-on:click="field_hidden = true"
            >
              &nbsp{{ $t('general_attribute.less') }}
            </span>

            <span
              v-if="field_hidden"
              class="text-class-3"
            >
              {{ search_result.fieldsOfStudy[0] }}
            </span>
            <span
              v-if="field_hidden && search_result.fieldsOfStudy.length - 1 > 0"
              class="link-class-3 less-more-button"
              v-on:click="field_hidden = false"
            >
              + {{ search_result.fieldsOfStudy.length - 1 }} {{ $t('general_attribute.fos') }}
            </span>
          </p>
          <!------------------------------------ Fields of study ---------------------------------------->

          <!------------------------------------------ Topics ------------------------------------------->
          <p v-if="Object.keys(search_result).includes('topics') && search_result.topics && search_result.topics.length > 0">
            <span class="small_icon"><i class="fas fa-sticky-note"></i></span>
            <span
              v-if="!topic_hidden"
              v-for="(topic, index) in search_result.topics"
              :key="topic.topicId"
            >
             <nuxt-link class="link-class-3"
                        :to="{path: '/topic/' + formatTitle(topic.topic) + '-' + topic.topicId,
                              query: {start: 0, size: 10, page: 1, sort: 'score'}}">
                {{ topic.topic }}
              </nuxt-link>
              <span v-if="index < search_result.topics.length - 1">,</span>
            </span>
            <span
              class="less-more-button"
              v-if="!topic_hidden"
              v-on:click="topic_hidden = true"
            >
            &nbsp{{ $t('general_attribute.less') }}
            </span>

            <span
              v-if="topic_hidden"
              v-for="(topic, index) in search_result.topics.slice(0,5)"
            >
              <nuxt-link class="link-class-3"
                         :to="{path: '/topic/' + formatTitle(topic.topic) + '-' + topic.topicId,
                               query: {start: 0, size: 10, page: 1, sort: 'score'}}">
                {{ topic.topic }}
              </nuxt-link>
              <span v-if="index < search_result.topics.slice(0,5).length - 1">,</span>
            </span>
            <span
              v-if="topic_hidden && search_result.topics.length > 5"
              class="less-more-button"
              v-on:click="topic_hidden = false"
            >
            + {{ search_result.topics.length - 5 }} {{ $t('general_attribute.topic') }}
          </span>
          </p>
          <!------------------------------------------ Topics ------------------------------------------->

          <!----------------------------------------- Authors ------------------------------------------->
          <AuthorModal  v-if="Object.keys(search_result).includes('authors') && search_result.authors"
                        :authors="search_result.authors">
          </AuthorModal>
          <!----------------------------------------- Authors ------------------------------------------->
        </div>

        <!------------------------------------------ Abstract ----------------------------------------->
        <p
          v-if="!abstract_hidden && Object.keys(search_result).includes('abstract') && typeof search_result.abstract !== 'object'"
          class="text-class-2"
        >
          {{ search_result.abstract }}
          <a class="text-class-3" v-on:click="abstract_hidden = true">...{{ $t('general_attribute.less') }}</a>
        </p>
        <p
          v-if="abstract_hidden && Object.keys(search_result).includes('abstract') && typeof search_result.abstract !== 'object'"
          class="text-class-2"
        >
          {{ search_result.abstract.slice(0, 400) }}
          <a
            class="text-class-3"
            v-if="search_result.abstract.length > 400"
            v-on:click="abstract_hidden = false"
          >...{{ $t('general_attribute.more') }}</a>
        </p>
        <br>
        <!------------------------------------------ Abstract ----------------------------------------->

        <!-------------------------------------- Action Buttons --------------------------------------->
        <nav class="level is-mobile util_level">
          <div class="level-left is-small">
            <a class="level-item"
               v-if="Object.keys(search_result).includes('citations_count') && search_result.citations_count > 0">
              <nuxt-link :to="{path:'/paper/' + formatTitle(search_result.title) + '.p' + '-' + search_result.paperId,
                               query:{start:0, size:10, page:1}}"
                class="button is-info is-light is-outlined"
              >
                {{ search_result.citations_count }} {{ $t('general_attribute.citation') }}
              </nuxt-link>
            </a>
            <a
              v-if="Object.keys(search_result).includes('doi') && search_result.doi"
              :href="'https://doi.org/' + search_result.doi"
              target="_blank"
              class="level-item"
            >
              <button
                class="button is-info is-light is-outlined"
              >
                <span>DOI <i class="fas fa-external-link-alt"></i></span>
              </button>
            </a>
            <a
              v-if="Object.keys(search_result).includes('pdf_url') && search_result.pdf_url && !search_result.pdf_url.endsWith('.pdf')"
              :href="search_result.pdf_url"
              target="_blank"
              class="level-item is-hidden-mobile"
            >
              <button class="button is-info is-light is-outlined">
                <span>{{search_result.pdf_url.slice(0,20)}}... <i class="fas fa-external-link-alt"></i></span>
              </button>
            </a>
            <span class="level-item">
              <span
                class="tag is-success is-small"
                v-if="Object.keys(search_result).includes('pdf_url') && search_result.pdf_url && search_result.pdf_url.endsWith('.pdf')"
              >
<!--                {{search_result.pdf_url}}-->
              <span>PDF <i class="fas fa-check"></i></span>
            </span>
            </span>
          </div>
          <div class="level-right is-small">
            <button
              class="level-item button is-info is-light is-outlined"
              @click="handle_cite_button"
            >
              <span><i class="fas fa-quote-left"></i> {{ $t('general_attribute.cite') }}</span>
            </button>
            <div class="modal" v-bind:class="{ 'is-active': show_cite_modal }">
              <div class="modal-background"></div>
              <div class="modal-card">
                <header class="modal-card-head">
                  <p class="modal-card-title">
                    <b>{{ $t('general_attribute.cite') }}</b>
                  </p>
                  <button class="delete" aria-label="close" @click="show_cite_modal = false"></button>
                </header>
                <section class="modal-card-body">
                  <b-tabs
                    v-model="active_cite_tab"
                  >
                    <b-tab-item
                      label="BibTeX"
                    >
                      <div class="tab_container">
                        <p v-html="bibtex"></p>
                        <div
                          class="copy_button"
                          @click="copyBibtex"
                        >
                          <span><i class="fas fa-copy"></i></span>
                        </div>
                      </div>
                    </b-tab-item>
                  </b-tabs>
                </section>
              </div>
            </div>
          </div>
        </nav>
        <!-------------------------------------- Action Buttons --------------------------------------->
      </div>
    </div>
  </div>
</template>

<script>
import {formatTitle, genBibtex} from "assets/utils";

export default {
  name: "SearchResult",
  props: ['search_result'],
  data() {
    return {
      topic_hidden: true,
      field_hidden: true,
      abstract_hidden: true,
      show_cite_modal: false,
      active_cite_tab: 0,
      bibtex: null,
    }
  },
  methods: {
    formatTitle(title) {
      return formatTitle(title)
    },
    handle_cite_button() {
      this.show_cite_modal = true
      this.genBibtex()
    },
    genBibtex() {
      let bibtex_data = {}
      bibtex_data.doi = this.search_result?.doi || ''
      bibtex_data.year = this.search_result?.year || ''
      bibtex_data.author = this.search_result.authors
      bibtex_data.title = this.search_result.title
      bibtex_data.journal = this.search_result?.venue || ''
      this.bibtex = genBibtex(bibtex_data)
    },
    copyBibtex() {
      let htmlToText = require('html-to-text');
      let bibtex_text = htmlToText.fromString(this.bibtex)
      this.$copyText(bibtex_text)
      this.$buefy.toast.open({
        duration: 800,
        message: this.$t('general_attribute.copy'),
        position: 'is-bottom',
        type: 'is-success'
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.util_level {
  border-top: 1px solid #d9dadb;
  padding-top: 10px;
}
.button.is-info.is-light.is-outlined {
  font-size: 14px;
}
.tab_container {
  background-color: #f4f4f5;
  overflow-y: scroll;
  max-height: 250px;
  padding: 20px;
}
.copy_button {
  font-size: 30px;
  float: right;
  width: 20px;
  position: sticky;
}

</style>
