<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <div class="tile is-child content_box">
        <a
          class="text-class-1"
          :href="'/paper/' + formatTitle(search_result._source.title) + '.p' + '-' + search_result._id"
        >
          <b>{{ search_result._source.title }}</b>
        </a>
        <!----------------------------------------------------------------------------------------------->
        <div class="has-text-weight-light">
          <!------------------------------------ Fields of study ---------------------------------------->
          <p v-if="search_result._source.fieldsOfStudy">
            <span class="small_icon"><i class="fas fa-book-open"></i></span>
            <a
              class="link-class-3 secondary_description"
            >
              <b>INFOCOM (International Conference on Computer Communications)</b>
            </a>
            <span>&sdot;</span>
            <a
              v-if="!field_hidden"
              class="link-class-3"
              v-for="(fos,index) in search_result._source.fieldsOfStudy"
            >
              {{ fos }}
              <span v-if="index < search_result._source.fieldsOfStudy.length - 1">,</span>
            </a>
            <span
              class="less-more-button"
              v-if="!field_hidden"
              v-on:click="field_hidden = true"
            >
              &nbspRút gọn
            </span>

            <a
              v-if="field_hidden"
              class="link-class-3"
            >
              {{ search_result._source.fieldsOfStudy[0] }}
            </a>
            <span
              v-if="field_hidden && search_result._source.fieldsOfStudy.length - 1 > 0"
              class="link-class-3 less-more-button"
              v-on:click="field_hidden = false"
            >
              + {{ search_result._source.fieldsOfStudy.length - 1 }} lĩnh vực
            </span>
          </p>
          <!------------------------------------ Fields of study ---------------------------------------->

          <!------------------------------------------ Topics ------------------------------------------->
          <p v-if="search_result._source.topics.length > 0">
            <span class="small_icon"><i class="fas fa-sticky-note"></i></span>
            <span
              v-if="!topic_hidden"
              v-for="(topic, index) in search_result._source.topics"
              :key="topic.topicId"

            >
              <a
                :href="'/topic/' + formatTitle(topic.topic) + '-' + topic.topicId"
                class="link-class-3"
              >
                {{ topic.topic }}
              </a>
              <span v-if="index < search_result._source.topics.length - 1">,</span>
            </span>
            <span
              class="less-more-button"
              v-if="!topic_hidden"
              v-on:click="topic_hidden = true"
            >
            &nbspRút gọn
            </span>

            <span
              v-if="topic_hidden"
              v-for="(topic, index) in search_result._source.topics.slice(0,5)"
            >
              <a
                :href="'/topic/' + formatTitle(topic.topic) + '-' + topic.topicId"
                class="link-class-3"
              >
                {{ topic.topic }}
              </a>
              <span v-if="index < search_result._source.topics.slice(0,5).length - 1">,</span>
          </span>
            <span
              v-if="topic_hidden && search_result._source.topics.length > 5"
              class="less-more-button"
              v-on:click="topic_hidden = false"
            >
            + {{ search_result._source.topics.length - 5 }} chủ đề
          </span>
          </p>
          <!------------------------------------------ Topics ------------------------------------------->

          <!----------------------------------------- Authors ------------------------------------------->
          <div>
            <span class="small_icon"><i class="fas fa-user-alt"></i></span>
            <span style="display: inline-block; vertical-align: top;">
              <p
                v-if="author_hidden"
                v-for="(author, index) in search_result._source.authors.slice(0,3)"
                :key="author.authorId"
              >
                <a
                  :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
                  class="link-class-3 secondary_description"
                >
                  <b>{{ author.name }}</b>
                </a>
              </p>
              <span
                class="less-more-button"
                v-if="author_hidden && search_result._source.authors.length - 3 > 0"
                v-on:click="show_author_modal = true"
              >
                Xem tất cả {{ search_result._source.authors.length }} tác giả
              </span>
            </span>
          </div>

          <!----------------------------------------- Authors Modal ------------------------------------------->
          <div class="modal" v-bind:class="{ 'is-active': show_author_modal }">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">
                  <b>Tác giả ({{search_result._source.authors.length}})</b>
                </p>
                <button class="delete" aria-label="close" @click="show_author_modal = false"></button>
              </header>
              <section class="modal-card-body">
<!--                Tìm cách để hover đc cả row và ấn đc cả row, như scinapse-->
                <b-table
                  :data="this.search_result._source.authors"
                  :hoverable="true"
                >
                  <b-table-column field="name" width="40" v-slot="props">
                    {{ props }}
                  </b-table-column>

                  <b-table-column field="WorkPlace">
                    <template v-slot="props">
                      Nơi công tác
                    </template>
                  </b-table-column>

                  <b-table-column field="h-index">
                    <template v-slot="props">
                      h-index
                    </template>
                  </b-table-column>
                </b-table>
              </section>
            </div>
          </div>
          <!----------------------------------------- Authors Modal ------------------------------------------->

          <!----------------------------------------- Authors ------------------------------------------->
        </div>

        <!------------------------------------------ Abstract ----------------------------------------->
        <p
          v-if="!abstract_hidden && typeof search_result._source.abstract !== 'object'"
          class="text-class-2"
        >
          {{ search_result._source.abstract }}
          <a class="text-class-3" v-on:click="abstract_hidden = true">...Ẩn bớt</a>
        </p>
        <p
          v-if="abstract_hidden && typeof search_result._source.abstract !== 'object'"
          class="text-class-2"
        >
          {{ search_result._source.abstract.slice(0, 400) }}
          <a
            class="text-class-3"
            v-if="search_result._source.abstract.length > 400"
            v-on:click="abstract_hidden = false"
          >...Xem thêm</a>
        </p>
        <br>
        <!------------------------------------------ Abstract ----------------------------------------->
        <!-------------------------------------- Action Buttons --------------------------------------->
        <nav class="level is-mobile util_level">
          <div class="level-left is-small">
            <a class="level-item" v-if="search_result._source.citations_count > 0">
              <button
                class="button is-info is-light is-outlined"
              >
                {{ search_result._source.citations_count }} trích dẫn
              </button>
            </a>
            <a
              v-if="search_result._source.doi !== undefined && search_result._source.doi !== null"
              :href="'https://doi.org/' + search_result._source.doi"
              target="_blank"
              class="level-item"
            >
              <button
                class="button is-info is-light is-outlined"
              >
                <span>DOI <i class="fas fa-external-link-alt"></i></span>
              </button>
            </a>
            <span class="level-item">
              <span
                class="tag is-success is-small"
                v-if="search_result._source.pdf_url !== null && search_result._source.pdf_url !== undefined"
              >
              <span>PDF <i class="fas fa-check"></i></span>
            </span>
            </span>
          </div>
          <div class="level-right is-small">

            <button
              class="button is-info is-light is-outlined"
              @click="show_cite_modal = true"
            >
              <span><i class="fas fa-quote-left"></i> Trích dẫn</span>
            </button>
            <div class="modal" v-bind:class="{ 'is-active': show_cite_modal }">
              <div class="modal-background"></div>
              <div class="modal-card">
                <header class="modal-card-head">
                  <p class="modal-card-title">
                    <b>Tác giả ({{search_result._source.authors.length}})</b>
                  </p>
                  <button class="delete" aria-label="close" @click="show_cite_modal = false"></button>
                </header>
                <section class="modal-card-body">
                  <!--                Tìm cách để hover đc cả row và ấn đc cả row, như scinapse-->
                  <b-table
                    :data="this.search_result._source.authors"
                    :hoverable="true"
                  >
                    <b-table-column field="name" width="40" v-slot="props">
                      {{ props }}
                    </b-table-column>

                    <b-table-column field="WorkPlace">
                      <template v-slot="props">
                        Nơi công tác
                      </template>
                    </b-table-column>

                    <b-table-column field="h-index">
                      <template v-slot="props">
                        h-index
                      </template>
                    </b-table-column>
                  </b-table>
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
import CitationBar from "./CitationBar";
import {formatTitle} from "../../assets/utils";

export default {
  name: "SearchResult",
  components: {CitationBar},
  props: ['search_result'],
  data() {
    return {
      author_hidden: true,
      topic_hidden: true,
      field_hidden: true,
      abstract_hidden: true,
      show_author_modal: false,
      show_cite_modal: false
    }
  },
  computed: {
    full_fos: function () {
      return _.join(this.search_result._source.fieldsOfStudy, ', ')
    }
  },
  methods: {
    formatTitle(title) {
      return formatTitle(title)
    },
    seeAllAuthors() {
      console.log('modal')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/general_styling.scss";
.util_level {
  border-top: 1px solid #d9dadb;
  padding-top: 10px;
}
.button.is-info.is-light.is-outlined {
  font-size: 14px;
}
</style>
