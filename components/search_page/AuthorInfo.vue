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
            :href="'/author/' + formatTitle(this.author_info.key) + '-' + this.author_info.authorId"
          >
            <strong>{{this.author_info.key}}</strong>
          </a>
          <p>{{this.author_info.doc_count}} xuất bản liên quan đến từ khóa</p>
      </div>
    </div>
  </article>
</template>

<script>
    import {formatTitle} from 'assets/utils';
    export default {
      name: "AuthorInfo",
      props: ['author_info'],
      methods: {
        formatTitle(title) {
          return formatTitle(title)
        }
      }
    }
</script>

<style scoped>

</style>
