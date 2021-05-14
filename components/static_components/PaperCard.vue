<template>
  <div class="card_wrapper">
    <div class="content_box">
      <a v-if="Object.keys(paper_detail).includes('title')"
        class="text-class-2 has-text-weight-medium"
        :href="'/paper/' + formatTitle(paper_detail.title) + '.p' + '-' + paper_detail.paperId"
        :title="paper_detail.title"
      >
        {{paper_detail.title.slice(0,35)}}
        <span v-if="paper_detail.title.length > 30">...</span>
      </a>
      <br>
      <p v-if="Object.keys(paper_detail).includes('abstract') &&
               paper_detail.abstract !== undefined && paper_detail.abstract !== null"
         :title="paper_detail.abstract"
      >
        {{paper_detail.abstract.slice(0,60)}}
        <span v-if="paper_detail.abstract.length > 60">...</span>
      </p>
      <span v-if="Object.keys(paper_detail).includes('authors')">
        <span
        v-for="(author, index) in paper_detail.authors.slice(0,1)"
        v-bind:key="author.authorId"
        >
          <span
            class="link-class-3 secondary_description"
          >
            {{author.name}}
          </span>
        </span>
      </span>
      <span v-if="Object.keys(paper_detail).includes('venue') &&
                  paper_detail.venue !== '' && paper_detail.venue !== undefined"
            class="text-class-3 color-class-3"
      >
      | {{paper_detail.venue}}
      </span>
      <span v-if="Object.keys(paper_detail).includes('year')"
            class="text-class-3 color-class-3"> | {{paper_detail.year}}</span>
      <div v-if="Object.keys(paper_detail).includes('citations_count')">
<!--        <button-->
<!--          class="button is-info is-small is-light is-outlined"-->
<!--        >-->
<!--          {{ paper_detail.citations.length }} {{ $t('general_attribute.citation') }}-->
<!--        </button>-->
      </div>
    </div>
  </div>
</template>

<script>
import {formatTitle} from "assets/utils";
import {paper_detail} from "@/API/elastic_api";

export default {
  name: "PaperCard",
  props: ['data'],
  data() {
    return {
      author_hidden: true,
      paper_detail: null,
    }
  },
  methods: {
    formatTitle(title) {
      return formatTitle(title)
    }
  },
  mounted() {
    this.paper_detail = this.data
    console.log(this.paper_detail)
    // if (Object.keys(this.data).includes('title')) this.paper_detail['title'] = this.data.title
    // if (Object.keys(this.data).includes('paper_id')) this.paper_detail['paperId'] = this.data.paper_id
    // if (Object.keys(this.data).includes('year')) this.paper_detail['year'] = this.data.year
    // if (Object.keys(this.data).includes('fieldsOfStudy')) this.paper_detail['fieldsOfStudy'] = this.data.mag_field_of_study
    // if (Object.keys(this.data).includes('venue')) this.paper_detail['venue'] = this.data.venue
    // if (Object.keys(this.data).includes('journal')) this.paper_detail['journal'] = this.data.journal
    // if (Object.keys(this.data).includes('authors')) this.paper_detail['authors'] = this.data.authors
    // if (Object.keys(this.data).includes('abstract')) this.paper_detail['abstract'] = this.data.abstract
    // if (Object.keys(this.data).includes('doi')) this.paper_detail['doi'] = this.data.doi
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
