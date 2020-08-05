<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <div class="tile is-child">
        <nuxt-link
          class="is-size-4"
          :to="'/paper/' + formatTitle(this.search_result._source.title) + '-' + this.search_result._id"
        >
          {{this.search_result._source.title}}
        </nuxt-link>
        <div class="has-text-weight-light is-size-6">
          <a
            :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
            v-for="author in this.search_result._source.authors"
          >
            {{author.name}},
          </a>
          |
          <span v-for="topic in this.search_result._source.topics">{{topic.topic}}, </span>
          |
          <span v-for="field in this.search_result._source.fieldsOfStudy">{{field}}, </span>
        </div>
        <div v-if="!this.search_result._source.abstract">
          <p>No abstract information</p>
        </div>
        <div v-else class="is-size-6">
          <p v-if="this.isExpanded">
              {{this.abstract}}
              <a @click="collapse()">Collapse</a>
          </p>
          <p v-else>
              {{this.abstract}}
              <a @click="expand()">...Expand</a>
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left is-small has-text-weight-light is-size-6">
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
      props: ['search_result', "isExpand"],
      data(){
        return{
          abstract: ""
        }
      },
      mounted(){
        if(!this.search_result._source.abstract){
          this.abstract = ""
        }
        else{
          this.abstract = this.search_result._source.abstract.slice(0, this.search_result._source.abstract.length*0.2)
        }
      },
      methods: {
        formatTitle(title) {
          return formatTitle(title)
        },
        expand(){
          this.abstract = this.search_result._source.abstract;
          this.isExpanded = true
        },
        collapse(){
          this.abstract = this.search_result._source.abstract.slice(0, this.search_result._source.abstract.length*0.2);
          this.isExpanded = false
        }
      }
    }
</script>

<style scoped>

</style>
