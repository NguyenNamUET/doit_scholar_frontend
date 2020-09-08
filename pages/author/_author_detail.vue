<template>
  <div class="section">
    <div v-if="Object.keys(author_detail).length !== 0" class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child is-4 pr-5">
            <article class="message is-info">
              <div class="message-header">
                <p class="is-size-4">{{author_detail.name}}</p>
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
                <div class="content_box">
                  <p class="title">Tất cả xuất bản</p>
                  <p class="is-size-6">
                    Bạn đang xem
                    <span v-if="(current_paper_page-1)*per_page + per_page < paper_length">
              {{ (current_paper_page-1)*per_page + 1}}-{{ (current_paper_page-1)*per_page + per_page}}
              trong {{paper_length}} xuất bản
            </span>
                    <span v-else>
              {{ (current_paper_page-1)*per_page + 1}}-{{paper_length}}
              trong {{paper_length}} xuất bản
            </span>
                  </p>
                  <b-table
                    :data="paper_data"
                    :hoverable="true"
                    :mobile-cards="true"
                    :default-sort-direction="'desc'"
                  >

                    <template slot-scope="props">
                      <b-table-column field="title" label="Tiêu đề">
                        <nuxt-link
                          :to="'/paper/' + formatTitle(props.row.title) + '.p' + '-' + props.row.paperId"
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
                  <Pagination
                    style="margin-left: 10%; margin-top: 10px;"
                    v-model="current_paper_page"
                    :page-count="Math.ceil(paper_length / per_page)"
                    :click-handler="updatePaper"
                    :page-range="3"
                    :margin-pages="1"
                  >
                  </Pagination>
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

    <!--Error page-->
    <div v-else>
      <NuxtError v-bind:error="{statusCode:404, message:'Không tìm thấy tác giả'}"></NuxtError>
    </div>
    <!--Error page-->
  </div>
</template>

<script>
    import {formatTitle} from "assets/utils";
    import {author_by_id, paper_by_author, paper_citation} from "@/API/elastic_api";
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
          current_paper_page: 1,
          per_page: 5,
          paper_length: null,
          paper_data: null,
        }
      },
      methods: {
        formatTitle(title) {
          return formatTitle(title)
        },
        async updatePaper(page_num) {
          let result = await paper_by_author({
            author_id: this.author_id,
            start: (page_num - 1) * this.per_page,
            size: this.per_page
          })
          console.log('here', (page_num - 1) * this.per_page, result)
          this.current_paper_page = page_num
          this.paper_data = result
        }
      },
      async asyncData({route, $axios}) {
        let id_pattern = /[0-9]+$/g
        let author_id = id_pattern.exec(route.params.author_detail)
        let data = await author_by_id(author_id)
        console.log(data.papers)
        if (Object.keys(data).length !== 0){
          return {
            author_id: author_id,
            author_detail: data,
            paper_length: data.totalPapers,
            paper_data: data.papers
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
    min-height: 100vh;
  }
  .content_box {
    padding: 20px;
    background-color: white;
    box-shadow: 0 0 6px rgba(2,20,31,0.1);
  }
</style>
