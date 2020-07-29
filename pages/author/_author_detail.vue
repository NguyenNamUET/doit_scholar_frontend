<template>
  <div class="container">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child is-4 pr-5">
          <article class="message is-info">
            <div class="message-header">
              <p class="is-size-4">{{this.author_detail.name}}</p>
              <button class="button is-link is-rounded">Theo dõi</button>
            </div>
            <div class="message-body">
              <span>Số văn bản đã xuất bản</span>
              <span class="has-text-right">{{this.author_detail.papers.length}}</span>
              <br>
              <span>Số trích dẫn có ảnh hưởng lớn {{this.author_detail.influentialCitationCount}}</span>
            </div>
          </article>
        </div>
        <div class="tile is-child is-8">
          <div class="tabs">
            <ul>
              <li v-bind:class="{'is-active' : current_tab === 'publication'}">
                <a
                  @click="current_tab = 'publication'"
                >
                  Tất cả xuất bản
                </a>
              </li>
              <li v-bind:class="{'is-active' : current_tab === 'influence'}">
                <a
                  @click="current_tab = 'influence'"
                >
                  Biểu đồ sức ảnh hưởng
                </a>
              </li>
            </ul>
          </div>
          <div class="tab-content">
            <div v-if="this.current_tab === 'publication'">
              <div
                class="paper_content"
                v-for="paper in this.author_detail.papers">
                <nuxt-link
                  :to="'/paper/' + formatTitle(paper.title) + '-' + paper.paperId"
                >
                  {{paper.title}}
                </nuxt-link>

                <div class="ml-2 has-text-weight-light is-size-6">
                  <span>{{paper.year}} </span>
                </div>
              </div>
            </div>
            <div v-if="this.current_tab === 'influence'">
              <influence_graph></influence_graph>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {formatTitle} from "assets/utils";
    import Influence_graph from "@/components/influence_graph/influence_graph";

    export default {
      name: "_author_detail",
      components: {Influence_graph},
      head() {
        return {
          title: this.author_detail.name + ' | DoIT Scholar'
        }
      },
      data() {
        return {
          author_id: null,
          author_detail: null,
          current_tab: 'publication',
        }
      },
      methods: {
        formatTitle(title) {
          return formatTitle(title)
        }
      },
      async asyncData({route, $axios}) {
        let id_pattern = /[0-9]+$/g
        let author_id = id_pattern.exec(route.params.author_detail)
        let data = await $axios.$get('https://api.semanticscholar.org/v1/author/' + author_id[0])
        return {
          author_id: author_id,
          author_detail: data,
        }
      }
    }
</script>

<style scoped>

</style>
