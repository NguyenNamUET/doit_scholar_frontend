<template>
  <a class="media content_box"
     :href="'/author/' + formatTitle(author_name) + '-' + author_id"
  >
    <figure class="media-left">
      <p
        style="font-size: 24px; color: #688cf5"
      >
<!--        <img src="https://bulma.io/images/placeholders/128x128.png">-->
        <i class="fas fa-user-circle" ></i>
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <a
          :href="'/author/' + formatTitle(author_name) + '-' + author_id"
        >
          <strong class="text-class-2">{{author_name}}</strong>
        </a>
        <p class="text-class-3">{{doc_count}} {{ $t('general_attribute.publication') }}</p>
      </div>
    </div>
  </a>
</template>

<script>
    import {formatTitle} from 'assets/utils';
    export default {
      name: "AuthorCard",
      props: ['author_info'],
      data() {
        return {
          author_id: this.author_info.author_id,
          doc_count: this.author_info.count,
          author_name: this.author_info.author
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
  a {
    color: #2e414f;
  }
  a:hover {
    text-decoration: underline;
  }
  .text-class-3:hover {
    text-decoration: none;
  }
  .text-class-2 {
    color: #0352ba;
  }
</style>
