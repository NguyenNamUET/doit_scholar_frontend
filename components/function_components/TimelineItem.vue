<template>
    <div class="timeline-item is-primary">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <p class="text-class-3">{{paper.year}}</p>
        <div>
          <a
              :href="'/paper/' + formatTitle(paper.title) + '.p' + '-' + paper.corpusID"
              class="text-class-1"
          >
            {{paper.title}}
          </a>
          <div>
            <span
                v-if="!author_hidden"
                v-for="(author, index) in paper.authors" class="author-timeline"
            >
              <a
                  :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
                  class="link-class-3 secondary_description"
              >
                {{author.name}}
              </a>
              <span v-if="index < paper.authors.length - 1">, </span>
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
                v-for="(author, index) in paper.authors.slice(0,3)"
                :key="author.authorId"

            >
            <a
                :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
                class="link-class-3 secondary_description"
            >
              {{author.name}}
            </a>
            <span v-if="index < paper.authors.slice(0,3).length-1">, </span>
          </span>
            <span
                class="less-more-button"
                v-if="author_hidden && paper.authors.length - 3 > 0"
                v-on:click="author_hidden = false"
            >
            + {{paper.authors.length - 3}} tác giả
          </span>
          </div>
          <div v-if="paper.abstract !== null">
            <p v-if="!abstract_hidden" class="text-class-2">
              {{paper.abstract}}
              <a class="text-class-3" v-on:click="abstract_hidden = true">...Ẩn bớt</a>
            </p>
            <p v-else class="text-class-2">
              {{paper.abstract.slice(0, 150)}}
              <a class="text-class-3" v-on:click="abstract_hidden = false">...Xem thêm</a>
            </p>
          </div>
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
          abstract: this.paper.abstract,
          author_hidden: true,
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
</style>
