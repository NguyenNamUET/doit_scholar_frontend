<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <div class="tile is-child">
        <a
          class="text-class-1"
          :href="'/paper/' + formatTitle(search_result._source.title) + '.p' + '-' + search_result._id"
        >
          {{search_result._source.title}}
        </a>

        <!----------------------------------------------------------------------------------------------->
        <div class="has-text-weight-light">
          <!----------------------------------------- Authors ------------------------------------------->
          <span
            v-if="!author_hidden"
            v-for="(author, index) in search_result._source.authors"
            :key="author.authorId"
          >
            <a
              :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
              class="link-class-3 secondary_description"
            >
              {{author.name}}
            </a>
            <span v-if="index < search_result._source.authors.length - 1">, </span>
          </span>
          <span
            class="less-more-button"
            v-if="!author_hidden"
            v-on:click="author_hidden = true"
          >
            &nbspRút gọn
          </span>

          <span
            v-if="author_hidden"
            v-for="(author, index) in search_result._source.authors.slice(0,3)"
            :key="author.authorId"

          >
            <a
              :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
              class="link-class-3 secondary_description"
            >
              {{author.name}}
            </a>
            <span v-if="index < search_result._source.authors.slice(0,3).length-1">, </span>
          </span>
          <span
            class="less-more-button"
            v-if="author_hidden && search_result._source.authors.length - 3 > 0"
            v-on:click="author_hidden = false"
          >
            + {{search_result._source.authors.length - 3}} tác giả
          </span>
          |
          <!----------------------------------------- Authors ------------------------------------------->

          <!------------------------------------------ Topics ------------------------------------------->
          <span
            v-if="!topic_hidden"
            v-for="(topic, index) in search_result._source.topics"
            :key="topic.topicId"

          >
            <a
              :href="'/topic/' + formatTitle(topic.topic) + '-' + topic.topicId"
              class="link-class-3"
            >
              {{topic.topic}}
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
            v-for="(topic, index) in search_result._source.topics.slice(0,1)"
          >
            <a
              :href="'/topic/' + formatTitle(topic.topic) + '-' + topic.topicId"
              class="link-class-3"
            >
              {{topic.topic}}
            </a>
          </span>
          <span
            v-if="topic_hidden && search_result._source.topics.length - 1 > 0"
            class="less-more-button"
            v-on:click="topic_hidden = false"
          >
            + {{search_result._source.topics.length - 1}} chủ đề
          </span>

          <span v-if="search_result._source.topics.length !== 0">
          |
          </span>
          <!------------------------------------------ Topics ------------------------------------------->

          <!------------------------------------ Fields of study ---------------------------------------->
          <span v-if="search_result._source.fieldsOfStudy">
            <span v-if="!field_hidden"
                  class="link-class-3"
            >
              {{this.full_fos}}
            </span>
            <span
              class="less-more-button"
              v-if="!field_hidden"
              v-on:click="field_hidden = true"
            >
              &nbspRút gọn
            </span>

            <span v-if="field_hidden"
                  class="link-class-3"
            >
              {{search_result._source.fieldsOfStudy[0]}}
            </span>
            <span
              v-if="field_hidden && search_result._source.fieldsOfStudy.length - 1 > 0"
              class="link-class-3 less-more-button"
              v-on:click="field_hidden = false"
            >
              + {{search_result._source.fieldsOfStudy.length - 1}} lĩnh vực
            </span>
          </span>
        </div>
        <!------------------------------------ Fields of study ---------------------------------------->

        <!------------------------------------------ Abstract ----------------------------------------->
        <p v-if="!abstract_hidden && typeof search_result._source.abstract !== 'object'" class="text-class-2">
          {{search_result._source.abstract}}
          <a class="text-class-3" v-on:click="abstract_hidden = true">...Ẩn bớt</a>
        </p>
        <p v-if="abstract_hidden && typeof search_result._source.abstract !== 'object'" class="text-class-2">
          {{search_result._source.abstract.slice(0, 150)}}
          <a class="text-class-3" v-on:click="abstract_hidden = false">...Xem thêm</a>
        </p>
        <!------------------------------------------ Abstract ----------------------------------------->

        <!-------------------------------------- Action Buttons --------------------------------------->
        <nav class="level is-mobile">
          <div class="level-left is-small has-text-weight-light ">
            <a class="level-item">
              <b-tooltip
                :label="'Số trích dẫn: ' + search_result._source.citations_count + ' | Số tham chiếu: ' + search_result._source.references_count"
                position="is-bottom"
                type="is-light"
              >
                <span class="status_icon"><i class="fas fa-signal"></i> <b>{{search_result._source.citations_count}} trích dẫn</b></span>
              </b-tooltip>
            </a>
            <a
              v-if="search_result._source.doi !== undefined && search_result._source.doi !== null"
              :href="'https://doi.org/' + search_result._source.doi"
              target="_blank"
              class="level-item"
            >
              <span class="link-class-3"><i class="fas fa-reply"></i> Xem tại nguồn</span>
            </a>
            <span class="level-item">
              <span
                class="tag is-warning is-small"
                v-if="search_result._source.pdf_url !== null"
              >
              <span><i class="fas fa-file-pdf"></i> Có PDF</span>
            </span>
            </span>
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
          abstract_hidden: true
        }
      },
      computed:{
        full_fos: function (){
          return _.join(this.search_result._source.fieldsOfStudy, ', ')
        }
      },
      methods: {
        formatTitle(title) {
          return formatTitle(title)
        }
      }
    }
</script>

<style scoped>
  @import "assets/general_styling.scss";
</style>
