<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
          <a
            :href="'/author/' + formatTitle(author_name) + '-' + author_id"
          >
            <strong class="text-class-2">{{author_name}}</strong>
          </a>
          <p class="text-class-3">{{doc_count}} xuất bản liên quan đến từ khóa</p>
      </div>
    </div>
  </article>
</template>

<script>
    import {formatTitle} from 'assets/utils';
    export default {
      name: "AuthorInfo",
      props: ['author_info'],
      data() {
        return {
          author_id: this.author_info.key,
          doc_count: this.author_info.doc_count,
          author_name: this.author_info.name.buckets[0].key
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
</style>
