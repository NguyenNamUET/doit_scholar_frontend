<template>
  <div>
    <span class="small_icon"><i class="fas fa-user-alt"></i></span>
    <span style="display: inline-block; vertical-align: top;">
      <p
        v-if="author_hidden"
        v-for="(author, index) in authors.slice(0,3)"
        :key="author.authorId"
      >
        <a
          :href="'/author/' + formatTitle(author.name) + '-' + author.authorId"
          class="link-class-3 secondary_description"
        >
          <b>{{ author.name }}</b>
        </a>
      </p>
      <span
        class="less-more-button"
        v-if="author_hidden && authors.length - 3 > 0"
        v-on:click="show_author_modal = true"
      >
        Xem tất cả {{ authors.length}}  tác giả
      </span>
    </span>

    <div class="modal" v-bind:class="{ 'is-active': show_author_modal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-weight-semibold">
            Tác giả ({{authors.length}})
          </p>
          <button class="delete" aria-label="close" @click="show_author_modal = false"></button>
        </header>
        <section class="modal-card-body">
          <div class="container">
            <div class="author_detail" v-for="author in authors">
              <a :href="'/author/' + formatTitle(author.name) + '-' + author.authorId">
                <span class="author_modal_name has-text-weight-semibold">
                  {{author.name}}
                </span>
                <span class="author_modal_workspace has-text-weight-semibold">
                  Nơi công tác
                </span>
                <span class="author_modal_hindex">
                  h-index
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import {formatTitle} from "../../assets/utils";
export default {
  name: "AuthorModal",
  props: ["authors"],
  data() {
    return {
      author_hidden: true,
      show_author_modal: false
    }
  },
  methods: {
    formatTitle(title) {
      return formatTitle(title)
    },
  }
}
</script>

<style scoped>
.author_modal_name{
  display: inline-block;
  vertical-align: top;
  width: 200px;
}
.author_modal_workspace{
  display: inline-block;
  vertical-align: top;
  margin-left: 20px;
  width: 200px;
}
.author_modal_hindex{
  display: inline-block;
  vertical-align: top;
  margin-left: 20px;
}
.author_detail > a:hover {
  text-decoration: none;
}
.author_detail {
  padding: 8px 12px 8px 8px;
  border-bottom: 1px solid #d8dde7;
}
.author_detail:hover {
  background-color: rgb(242, 247, 242);
}
.author_detail > a {
  color: #1e2a35;
}
</style>
