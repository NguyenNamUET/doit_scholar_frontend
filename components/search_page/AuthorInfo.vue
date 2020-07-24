<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
          <a>
            <strong>{{this.author_info.name}}</strong>
          </a>
          <p>{{this.author_info.publication}} xuất bản | {{this.author_info.citation}} trích dẫn</p>
      </div>
    </div>
  </article>
</template>

<script>
    export default {
      name: "AuthorInfo",
      props: ['author_info']
    }
</script>

<style scoped>

</style>
