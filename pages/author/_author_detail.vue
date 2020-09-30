<template>
    <div v-if="Object.keys(author_detail).length !== 0" class="container" ref="top" id="top">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child">
            <div class="columns is-5">
              <div class="column is-one-quarter">
                <div class="card_wrapper">
                  <div class="content_box">
                    <p class="author_name">
                      <b>{{author_detail.name}}</b>
                    </p>
                    <table style="width: 100%">
                      <tr v-if="author_detail.papers.length !== undefined">
                        <td style="width: 90%">
                          <span class="text-class-3 color-class-3">Số văn bản đã xuất bản </span>
                        </td>
                        <td>
                      <span
                        class="author_stat"
                      >
                      {{author_detail.papers.length | formatNumber}}
                      </span>
                        </td>
                      </tr>
                      <tr v-if="author_detail.influentialCitationCount !== undefined">
                        <td>
                          <span class="text-class-3 color-class-3">Số trích dẫn có ảnh hưởng lớn</span>
                        </td>
                        <td>
                      <span
                        class="author_stat"
                      >{{author_detail.influentialCitationCount | formatNumber}}</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="tabs">
                  <ul>
                    <li v-bind:class="{'is-active' : current_tab === 'publication'}">
                      <a
                        @click="current_tab = 'publication'"
                        class="tab_title"
                        style="text-decoration: none;"
                      >
                        <span><i class="fas fa-newspaper"></i> Tất cả xuất bản</span>
                      </a>
                    </li>
                    <li v-bind:class="{'is-active' : current_tab === 'influence'}">
                      <a
                        @click="current_tab = 'influence'"
                        class="tab_title"
                        style="text-decoration: none;"
                      >
                        <span><i class="fas fa-project-diagram"></i> Biểu đồ sức ảnh hưởng</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="tab-content">
                  <div v-if="this.current_tab === 'publication'">
                    <div id="sort_section">
                      <div style="display: inline-block">
                        <div class="field has-addons">
                          <div class="control is-expanded">
                            <input
                              v-on:keyup.enter="submitQuery"
                              v-model="search_query"
                              class="input"
                              type="text"
                              placeholder="Tìm kiếm xuất bản"
                            >
                          </div>
                          <div class="control">
                            <p class="button is-warning" v-on:click="submitQuery">
                              <i class="fas fa-search"></i>Tìm kiếm
                            </p>
                          </div>
                        </div>
                      </div>
                      <DropDown :dd_data="{msg:'Lĩnh vực', fields: this.fos_list}" @update-fos-checked="updateFOSChecked"/>
                      <DropDown :dd_data="{msg:'Tác giả', fields: this.authors_list}" @update-authors-checked="updateAuthorsChecked"/>
                      <DropDown :dd_data="{msg:'Hội nghị', fields: this.venue_list}" @update-venues-checked="updateVenuesChecked"/>
                    </div>
                    <br>
                    <div>
                      <p class="text-class-3">
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
                      <PaperTable
                        v-for="result in paper_data"
                        v-bind:search_result="result"
                      >
                      </PaperTable>
                      <!--                  <b-table-->
                      <!--                    :data="paper_data"-->
                      <!--                    :hoverable="true"-->
                      <!--                    :mobile-cards="true"-->
                      <!--                    :default-sort-direction="'desc'"-->
                      <!--                    :loading="is_loading"-->
                      <!--                  >-->

                      <!--                    <template slot-scope="props">-->
                      <!--                      <b-table-column field="title" label="Tiêu đề">-->
                      <!--                        <nuxt-link-->
                      <!--                          :to="'/paper/' + formatTitle(props.row.title) + '.p' + '-' + props.row.paperId"-->
                      <!--                        >-->
                      <!--                          {{props.row.title}}-->
                      <!--                        </nuxt-link>-->
                      <!--                      </b-table-column>-->

                      <!--                      <b-table-column v-if="props.row.authors !== undefined" field="name" label="Tác giả" >-->
                      <!--                        <ul>-->
                      <!--                          <li v-for="author in props.row.authors">-->
                      <!--                            <a :href="'/author/' + formatTitle(author.name) + '-' + author.authorId ">-->
                      <!--                              {{author.name}}-->
                      <!--                            </a>-->
                      <!--                          </li>-->
                      <!--                        </ul>-->
                      <!--                      </b-table-column>-->

                      <!--                      <b-table-column field="year" label="Năm" numeric sortable >-->
                      <!--                        {{ props.row.year }}-->
                      <!--                      </b-table-column>-->
                      <!--                    </template>-->

                      <!--                    <template slot="empty">-->
                      <!--                      <section class="section">-->
                      <!--                        <div class="content has-text-grey has-text-centered">-->
                      <!--                          <p>Không có dữ liệu :(</p>-->
                      <!--                        </div>-->
                      <!--                      </section>-->
                      <!--                    </template>-->
                      <!--                  </b-table>-->
                      <Pagination
                        style="margin-top: 10px;"
                        v-model="current_paper_page"
                        :page-count="Math.ceil(paper_length / per_page)"
                        :click-handler="updatePaper"
                        :page-range="3"
                        :margin-pages="1"
                        :is-small="true"
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
      </div>
      <a
        v-show="false"
        class="button"
        v-scroll-to="{el: '#top', offset: -60, cancelable: false}"
        ref="jumpPage"
      >
      </a>
    </div>

    <!--Error page-->
    <div v-else>
      <NuxtError v-bind:error="{statusCode:404, message:'Không tìm thấy tác giả'}"></NuxtError>
    </div>
    <!--Error page-->
</template>

<script>
import {formatNumber, formatTitle} from "assets/utils";
    import {author_by_id, author_papers, paper_citation} from "@/API/elastic_api";
    import Influence_graph from "@/components/influence_graph/influence_graph";
    import PaperTable from "@/components/function_components/PaperTable";
    import NuxtError from "@/components/static_components/ErrorPage";
import SearchResult from "@/components/search_page/SearchResult";
import Pagination from "@/components/function_components/Pagination";
import SearchBar from "@/components/function_components/SearchBar";

    export default {
      name: "_author_detail",
      components: {SearchBar, Pagination, SearchResult, PaperTable, Influence_graph, NuxtError},
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
          is_loading: false,
          search_query: ''
        }
      },
      filters: {
        formatNumber(value) {
          return formatNumber(value)
        }
      },
      methods: {
        submitQuery() {
          console.log(this.search_query)
        },
        goToPage() {
          this.$refs.jumpPage.click()
        },
        formatTitle(title) {
          return formatTitle(title)
        },
        async updatePaper(page_num) {
          this.is_loading = true
          let result = await author_papers({
            author_id: this.author_id,
            start: (page_num - 1) * this.per_page,
            size: this.per_page
          })
          this.goToPage()
          this.current_paper_page = page_num
          this.paper_data = result
          this.is_loading = false
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
    padding: 40px 20px;
    min-height: 100vh;
  }

  .author_name {
    font-size: 24px;
    font-weight: 600;
  }

  .author_stat {
    font-weight: 700;
    color: #dc710f;
    font-size: 14px;
  }

  .tab_title {
    text-decoration: none;
    color: #756c6c;
  }

  #sort_section {
    padding: 0 10px 10px 10px;
    border-bottom: 1px solid #d9dadb;
    width: 100%;
  }
</style>
