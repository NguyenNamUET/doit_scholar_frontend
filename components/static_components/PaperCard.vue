<template>
  <div class="card_wrapper">
    <div class="content_box">
      <a
        class="text-class-2 has-text-weight-medium"
        :href="'/paper/' + formatTitle(paper_detail.title) + '.p' + '-' + paper_detail.paperId"
      >
        {{paper_detail.title}}
      </a>
      <br>
      <span v-if="paper_detail.authors !== undefined">
      <span
        v-if="!author_hidden"
        v-for="(author, index) in paper_detail.authors"
        :key="author.authorId"
      >
        <a
          :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
          class="link-class-3 secondary_description"
        >
          {{author.name}}
        </a>
        <span v-if="index < paper_detail.authors.length - 1">, </span>
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
        v-for="(author, index) in paper_detail.authors.slice(0,3)"
        :key="author.authorId"
      >
        <a
          :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
          class="link-class-3 secondary_description"
        >
          {{author.name}}
        </a>
        <span v-if="index < paper_detail.authors.slice(0,3).length-1">,</span>
      </span>
      <span
        class="less-more-button"
        v-if="author_hidden && paper_detail.authors.length - 3 > 0"
        v-on:click="author_hidden = false"
      >
        + {{paper_detail.authors.length - 3}} tác giả
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
    margin: 10px 20px;
  }
</style>
