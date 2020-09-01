<template>
  <div class="section">
    <div v-if="Object.keys(author_detail).length !== 0" class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child is-4 pr-5">
            <article class="message is-info">
              <div class="message-header">
                <p class="is-size-4">{{author_detail.name}}</p>
                <button class="button is-link is-rounded">Theo dõi</button>
              </div>
              <div class="message-body">
                <span>Số văn bản đã xuất bản</span>
                <span
                  class="has-text-right"
                  v-if="author_detail.papers.length !== undefined"
                >
                  {{author_detail.papers.length}}
                </span>
                <br>
                <span>Số trích dẫn có ảnh hưởng lớn {{author_detail.influentialCitationCount}}</span>
              </div>
            </article>
          </div>
          <div class="tile is-child is-8">
            <div class="tabs">
              <ul>
                <li v-bind:class="{'is-active' : current_tab === 'publication'}">
                  <a
                    @click="current_tab = 'publication'"
                    style="text-decoration: none"
                  >
                    Tất cả xuất bản
                  </a>
                </li>
                <li v-bind:class="{'is-active' : current_tab === 'influence'}">
                  <a
                    @click="current_tab = 'influence'"
                    style="text-decoration: none"
                  >
                    Biểu đồ sức ảnh hưởng
                  </a>
                </li>
              </ul>
            </div>
            <div class="tab-content">
              <div v-if="this.current_tab === 'publication'">
  <!--              <div-->
  <!--                class="paper_content"-->
  <!--                v-for="paper in this.author_detail.papers">-->
  <!--                <nuxt-link-->
  <!--                  :to="'/paper/' + formatTitle(paper.title) + '-' + paper.corpusID"-->
  <!--                >-->
  <!--                  {{paper.title}}-->
  <!--                </nuxt-link>-->

  <!--                <div class="ml-2 has-text-weight-light is-size-6">-->
  <!--                  <span>{{paper.year}} </span>-->
  <!--                </div>-->
  <!--              </div>-->
                <b-table
                  :data="author_detail.papers"
                  :hoverable="true"
                  :mobile-cards="true"
                  :default-sort-direction="'desc'"
                  style="box-shadow: 0 0 6px rgba(2,20,31,0.1);"
                >

                  <template slot-scope="props">
                    <b-table-column field="title" label="Tiêu đề" searchable>
                      <nuxt-link
                        :to="'/paper/' + formatTitle(props.row.title) + '.p' + '-' + props.row.corpusID"
                      >
                        {{props.row.title}}
                      </nuxt-link>
                    </b-table-column>

                    <b-table-column v-if="props.row.authors !== undefined" field="name" label="Tác giả" >
                      <ul>
                        <li v-for="author in props.row.authors">
                          <a :href="'/author/' + formatTitle(author.name) + '-' + author.authorId ">
                            {{author.name}}
                          </a>
                        </li>
                      </ul>
                    </b-table-column>

                    <b-table-column field="year" label="Năm" numeric sortable >
                      {{ props.row.year }}
                    </b-table-column>
                  </template>

                  <template slot="empty">
                    <section class="section">
                      <div class="content has-text-grey has-text-centered">
                        <p>Không có dữ liệu :(</p>
                      </div>
                    </section>
                  </template>
                </b-table>
              </div>
              <div v-if="this.current_tab === 'influence'">
                <influence_graph></influence_graph>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Error page-->
    <div v-else>
      <NuxtError v-bind:error="{statusCode:404, message:'Không tìm thấy tác giả'}"></NuxtError>
    </div>
    <!--Error page-->
  </div>
</template>

<script>
    import {formatTitle} from "assets/utils";
    import {author_by_id} from "@/API/elastic_api";
    import Influence_graph from "@/components/influence_graph/influence_graph";
    import PaperTable from "@/components/function_components/PaperTable";
    import NuxtError from "@/components/static_components/ErrorPage";

    export default {
      name: "_author_detail",
      components: {PaperTable, Influence_graph, NuxtError},
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
        let data = await author_by_id(author_id)
        if (Object.keys(data).length !== 0){
          return {
            author_id: author_id,
            author_detail: data,
          }
        }
        else{
          return {
            author_id: author_id,
            author_detail: {}
          }
        }
      }
    }
</script>

<style scoped>
  @import "assets/general_styling.scss";
  .container {
    padding: 40px 20px;
    min-height: 100vh;
  }
</style>
