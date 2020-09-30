<template>
  <div class="card_wrapper">
    <div class="content_box">
      <a
        class="text-class-2 has-text-weight-medium"
        :href="'/paper/' + formatTitle(paper_detail.title) + '.p' + '-' + paper_detail.paperId"
        :title="paper_detail.title"
      >
        {{paper_detail.title.slice(0,60)}}...
      </a>
      <p>
<!--        {{paper_detail.abstract.slice(0,80)}}-->
      </p>
      <span v-if="paper_detail.authors !== undefined">
      <span
        v-for="(author, index) in paper_detail.authors.slice(0,1)"
        :key="author.authorId"
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
  @import "assets/general_styling.scss";
  .card_wrapper {
    margin-bottom: 15px;
    margin-top: 15px;
  }
  .content_box {
    max-height: 250px;
  }
</style>
