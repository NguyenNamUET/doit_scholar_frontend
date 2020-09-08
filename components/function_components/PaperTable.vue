<template>
  <div id="search_result_container" class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <div class="tile is-child">
        <nuxt-link
          class="text-class-1"
          :to="'/paper/' + formatTitle(search_result.title) + '.p' + '-' + search_result.paperId"
        >
          {{search_result.title}}
        </nuxt-link>

        <!----------------------------------------------------------------------------------------------->
        <div class="has-text-weight-light is-size-6">
          <!----------------------------------------- Authors ------------------------------------------->
          <a
            v-if="!author_hidden"
            class="text-class-3 secondary_description"
            v-for="(author, index) in search_result.authors"
            :key="author.authorId"
            :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
          >
            {{author.name}}
            <span v-if="index < search_result.authors.length - 1">,</span>
          </a>
          <span
            class="less-more-button"
            v-if="!author_hidden"
            v-on:click="author_hidden = true"
          >
            &nbspRút gọn
          </span>

          <a
            v-if="author_hidden"
            class="text-class-3 secondary_description"
            v-for="(author, index) in search_result.authors.slice(0,3)"
            :key="author.authorId"
            :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
          >
            {{author.name}}
            <span v-if="index < search_result.authors.slice(0,3).length-1">,</span>
          </a>
          <span
            class="less-more-button"
            v-if="author_hidden && search_result.authors.length - 3 > 0"
            v-on:click="author_hidden = false"
          >
            + {{search_result.authors.length - 3}} tác giả
          </span>
          |
          <!----------------------------------------- Authors ------------------------------------------->
        </div>

        <!-------------------------------------- Action Buttons --------------------------------------->
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
        <!-------------------------------------- Action Buttons --------------------------------------->
      </div>
    </div>
  </div>
</template>

<script>
    import CitationBar from "../search_page/CitationBar";
    import {formatTitle} from "assets/utils";

    export default {
      name: "PaperTable",
      components: {CitationBar},
      props: ['search_result'],
      data() {
        return {
          author_hidden: true
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
  a:hover {
    text-decoration: none;
  }
</style>
