<template>
  <div class="card_wrapper">
    <div class="content_box">
      <a
        class="text-class-2 has-text-weight-medium"
        :href="'/paper/' + formatTitle(paper_detail.title) + '.p' + '-' + paper_detail.paperId"
        :title="paper_detail.title"
      >
        {{paper_detail.title.slice(0,35)}}
        <span v-if="paper_detail.title.length > 30">...</span>
      </a>
      <br>
      <p
        :title="paper_detail.abstract"
        v-if="paper_detail.abstract !== undefined && paper_detail.abstract !== null"
      >
        {{paper_detail.abstract.slice(0,60)}}
        <span v-if="paper_detail.abstract.length > 60">...</span>
      </p>
      <span v-if="paper_detail.authors !== undefined">
        <span
        v-for="(author, index) in paper_detail.authors.slice(0,1)"
        v-bind:key="author.authorId"
        >
          <a
            :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
            class="link-class-3 secondary_description"
          >
            {{author.name}}
          </a>
        </span>
      </span>
      <span
        v-if="paper_detail.venue !== '' && paper_detail.venue !== undefined"
        class="text-class-3 color-class-3"
      >
      | {{paper_detail.venue}}
      </span>
      <span v-if="paper_detail.year !== undefined" class="text-class-3 color-class-3"> | {{paper_detail.year}}</span>
      <div>
        <nuxt-link :to="'/paper/' + formatTitle(paper_detail.title) + '.p' + '-' + paper_detail.paperId"
          class="button is-info is-small is-light is-outlined"
        >
          {{ paper_detail.citations_count }} {{ $t('general_attribute.citation') }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import {formatTitle} from "assets/utils";

export default {
  name: "PaperCard",
  props: ['paper_detail'],
  data() {
    return {
      author_hidden: true,
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
  .content_box {
    max-height: 250px;
  }
  .text-class-2 {
    color: #0352ba;
  }
</style>
