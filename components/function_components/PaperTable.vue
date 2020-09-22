<template>
      <div class="tile is-child is-vertical py-2">
        <a
          class="text-class-1 has-text-weight-medium"
          :href="'/paper/' + formatTitle(search_result.title) + '.p' + '-' + search_result.paperId"
        >
          {{search_result.title}}
        </a>

        <!----------------------------------------------------------------------------------------------->
        <div class="has-text-weight-light is-size-6">
          <!----------------------------------------- Authors ------------------------------------------->
          <span v-if="search_result.authors !== undefined">
            <span
              v-if="!author_hidden"
              v-for="(author, index) in search_result.authors"
              :key="author.authorId"
            >
              <a
                :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
                class="link-class-3 secondary_description"
              >
                {{author.name}}
              </a>
              <span v-if="index < search_result.authors.length - 1">, </span>
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
              v-for="(author, index) in search_result.authors.slice(0,3)"
              :key="author.authorId"
            >
              <a
                :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
                class="link-class-3 secondary_description"
              >
                {{author.name}}
              </a>
              <span v-if="index < search_result.authors.slice(0,3).length-1">,</span>
            </span>
            <span
              class="less-more-button"
              v-if="author_hidden && search_result.authors.length - 3 > 0"
              v-on:click="author_hidden = false"
            >
              + {{search_result.authors.length - 3}} tác giả
            </span>
          </span>
          <!----------------------------------------- Authors ------------------------------------------->
          <span
            v-if="search_result.venue !== '' && search_result.venue !== undefined"
            class="text-class-3 color-class-3"
          >
            | {{search_result.venue}}
            </span>
          <span v-if="search_result.year !== undefined" class="text-class-3 color-class-3"> | {{search_result.year}}</span>
          <br>
          <span
            class="tag is-warning is-small"
            v-if="search_result.isInfluential"
          >
            <span><i class="fas fa-fire"></i> Ảnh hưởng lớn</span>
          </span>
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
  .tile{
    background-color: white;
    border-bottom: 1px solid #E2E3E4;
  }
  .text-class-2:hover {
    text-decoration: underline;
  }
</style>
