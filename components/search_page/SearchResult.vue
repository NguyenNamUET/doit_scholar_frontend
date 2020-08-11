<template>
  <div id="search_result_container" class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <div class="tile is-child">
        <nuxt-link
          class="text-class-1"
          :to="'/paper/' + formatTitle(search_result._source.title) + '-' + search_result._id"
        >
          {{search_result._source.title}}
        </nuxt-link>
        <div class="has-text-weight-light is-size-6">
          <a
            v-if="!author_hidden"
            class="text-class-3"
            :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
            v-for="(author, index) in search_result._source.authors"
          >
            {{author.name}}
            <span v-if="index < search_result._source.authors.length - 1">,</span>
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
            v-for="(author, index) in search_result._source.authors.slice(0,3)"
          >
            {{author.name}}
            <span v-if="index < search_result._source.authors.length - 1">,</span>
          </a>
          <a
            class="text-class-3"
            v-if="author_hidden && search_result._source.authors.length - 3 > 0"
            v-on:click="author_hidden = false"
          >
            + {{search_result._source.authors.length - 3}} tác giả
          </a>
          |
          <a
            v-if="!topic_hidden"
            class="text-class-3"
            v-for="(topic, index) in search_result._source.topics"
            :href="'/topic/' + formatTitle(topic.topic)"
          >
            {{topic.topic}}
            <span v-if="index < search_result._source.topics.length - 1">,</span>
          </a>
          <a
            class="text-class-3"
            v-if="!topic_hidden"
            v-on:click="topic_hidden = true"
          >
            rút gọn
          </a>

          <a
            v-if="topic_hidden"
            class="text-class-3"
            v-for="(topic, index) in search_result._source.topics.slice(0,1)"
            :href="'/topic/' + formatTitle(topic.topic)"
          >
            {{topic.topic}}
            <span v-if="index < search_result._source.topics.length - 1">,</span>
          </a>
          <a
            v-if="topic_hidden && search_result._source.topics.length - 1 > 0"
            class="text-class-3"
            v-on:click="topic_hidden = false"
          >
            + {{search_result._source.topics.length - 1}} chủ đề
          </a>

          <span v-if="search_result._source.topics.length !== 0">
          |
          </span>

          <span
            v-if="!field_hidden"
            v-for="(field, index) in search_result._source.fieldsOfStudy"
          >
            {{field}}
            <span v-if="index < search_result._source.fieldsOfStudy.length - 1">,</span>
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
            v-for="(field, index) in search_result._source.fieldsOfStudy.slice(0,1)"
          >
            {{field}}
            <span v-if="index < search_result._source.fieldsOfStudy.length - 1">,</span>
          </span>
          <a
            v-if="field_hidden && search_result._source.fieldsOfStudy.length - 1 > 0"
            class="text-class-3"
            v-on:click="field_hidden = false"
          >
            + {{search_result._source.fieldsOfStudy.length - 1}} lĩnh vực
          </a>
        </div>
        <p v-if="!abstract_hidden" class="is-size-6">
          {{search_result._source.abstract}}
          <a class="text-class-3" v-on:click="abstract_hidden = true">Ẩn bớt</a>
        </p>
        <p v-else class="is-size-6">
<!--          {{search_result._source.abstract.slice(0, search_result._source.abstract.length*0.4)}}-->
          <a class="text-class-3" v-on:click="abstract_hidden = false">Xem thêm</a>
        </p>
        <nav class="level is-mobile">
          <div class="level-left is-small has-text-weight-light ">
            <a class="level-item">
              <span class="text-class-3"><i class="fas fa-reply"></i> Xem tại nguồn</span>
            </a>
            <a class="level-item">
              <span class="text-class-3"><i class="fas fa-retweet"></i> Xem trích dẫn</span>
            </a>

          </div>
        </nav>
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
      methods: {
        formatTitle(title) {
          return formatTitle(title)
        }
      }
    }
</script>

<style scoped>
  @import "assets/general_styling.scss";
  #search_result_container {
    background-color: white;
    margin-bottom: 30px;
    box-shadow: 0 0 6px rgba(2,20,31,0.1);
  }
</style>
