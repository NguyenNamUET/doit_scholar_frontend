<template>
      <div class="tile is-child is-vertical py-2">
        <nuxt-link
          class="text-class-2 has-text-weight-medium"
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

</style>
