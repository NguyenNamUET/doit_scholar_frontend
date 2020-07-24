<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <div class="tile is-child">
        <nuxt-link
          class="is-size-4"
          :to="'/paper/' + formatTitle(this.search_result.title) + '-' + this.search_result.id"
        >
          {{this.search_result.title}}
        </nuxt-link>
        <div class="has-text-weight-light is-size-6">
          <a v-for="author in this.search_result.authors">{{author}}, </a>
          |
          <span v-for="topic in this.search_result.topics">{{topic}}, </span>
          |
          <span v-for="publication in this.search_result.publications">{{publication}}, </span>
        </div>
        <p>
          {{this.search_result.intro}}
        </p>
        <nav class="level is-mobile">
          <div class="level-left is-small has-text-weight-light ">
            <a class="level-item">
              <span><i class="fas fa-reply"></i>Xem tại nguồn</span>
            </a>
            <a class="level-item">
              <span><i class="fas fa-retweet"></i>Xem trích dẫn</span>
            </a>

          </div>
        </nav>
      </div>
      <div>

      </div>
      <div class="tile is-child">

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
      methods: {
        formatTitle(title) {
          return formatTitle(title)
        }
      }
    }
</script>

<style scoped>

</style>
