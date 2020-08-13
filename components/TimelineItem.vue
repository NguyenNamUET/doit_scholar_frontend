<template>
    <div class="timeline-item is-primary">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <p class="title is-5">{{paper.year}}</p>
        <div class="custom-timeline-conent">
          <h1 class="title">
              <a :href="'/paper/' + formatTitle(paper.title) + '-' + paper.corpusID"
              style="color: #1f6de2">
                {{paper.title}}
              </a>
          </h1>
          <div v-for="(author, index) in paper.authors" class="author-timeline">
            <a :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
            style="color: #8c9296">
              {{author.name}}
              <span v-if="index < paper.authors.length - 1">,</span>
            </a>
          </div>
          <p v-if="!abstract_hidden" class="is-size-6">
            {{paper.abstract}}
            <a class="text-class-3" v-on:click="abstract_hidden = true">...Ẩn bớt</a>
          </p>
          <p v-else class="is-size-6">
            <a class="text-class-3" v-on:click="abstract_hidden = false">...Xem thêm</a>
          </p>
        </div>
      </div>
    </div>

</template>

<script>
    import {formatTitle} from "assets/utils";

    export default {
        name: "TimelineItem",
        data(){
          return{
            abstract_hidden: true,
            abstract: this.paper.abstract
          }
        },
        props: {
                paper: {
                    type: Object
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
.author-timeline{
  display:inline;
}
.custom-timeline-conent{
    background-color: white;
    margin-bottom: 30px;
    box-shadow: 0 0 6px rgba(2,20,31,0.1);
    padding: 10px
}
</style>
