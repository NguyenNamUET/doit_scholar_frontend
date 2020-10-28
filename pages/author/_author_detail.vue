<template>
    <div v-if="Object.keys(author_detail).length !== 0" class="container" ref="top" id="top">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child is-vertical">
            <div class="columns is-5">
              <div class="column is-one-quarter">
                <div class="card_wrapper">
                  <div class="content_box">
                    <p class="author_name">
                      <b>{{author_detail.name}}</b>
                    </p>
                    <table style="width: 100%">
                      <tr v-if="author_detail.papers !== undefined">
                        <td style="width: 90%">
                          <span class="text-class-3 color-class-3">{{ $t('author_detail_page.author_info.publication') }} </span>
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
                          <span class="text-class-3 color-class-3">{{ $t('author_detail_page.author_info.highlighted_citation') }}</span>
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
                        <span><i class="fas fa-newspaper"></i> {{ $t('author_detail_page.tabs.publication_nav') }}</span>
                      </a>
                    </li>
                    <li v-bind:class="{'is-active' : current_tab === 'influence'}">
                      <a
                        @click="current_tab = 'influence'"
                        class="tab_title"
                        style="text-decoration: none;"
                      >
                        <span><i class="fas fa-project-diagram"></i> {{ $t('author_detail_page.tabs.influence_nav') }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="tab-content">
                  <div v-if="this.current_tab === 'publication'">
                    <p class="text-class-3">
                      <i18n
                        tag="span"
                        path="general_attribute.list_label"
                      >
                        <template v-slot:start>
                          <span>
                            {{ (current_paper_page-1)*per_page + 1}}
                          </span>
                        </template>
                        <template v-slot:end>
                          <span v-if="(current_paper_page-1)*per_page + per_page < paper_length">
                            {{ (current_paper_page-1)*per_page + per_page}}
                          </span>
                          <span v-else>
                            {{paper_length}}
                          </span>
                        </template>
                        <template v-slot:total>
                          <span>
                            {{paper_length | formatNumber}}
                          </span>
                        </template>
                      </i18n>
                    </p>
                    <div class="filter_section content_box">
                      <div style="display: inline-block">
                        <SearchBar
                          :placeholder="$t('general_attribute.search_bar_placeholder')"
                          :authors="Array(this.author_id)"
                          :venues="null"
                        ></SearchBar>
                      </div>
                      <SortButton :whichpage="current_route"></SortButton>
<!--                      <DropDown :dd_data="{msg: $t('general_attribute.fos'), fields: this.fos_list, id: 1}" @update-fos-checked="updateFOSChecked"/>-->
<!--                      <DropDown :dd_data="{msg: $t('general_attribute.author'), fields: this.authors_list, id: 2}" @update-authors-checked="updateAuthorsChecked"/>-->
<!--                      <DropDown :dd_data="{msg: $t('general_attribute.venue'), fields: this.venue_list, id: 3}" @update-venues-checked="updateVenuesChecked"/>-->
                    </div>
                    <div class="tile is-ancestor">
                      <div class="tile is-parent">
                        <div class="tile is-child">
                          <SearchResult
                            v-for="result in paper_data"
                            :key="result.paperId"
                            :search_result="result"
                          >
                          </SearchResult>

                          <PaginationV2
                            :is-small="true"
                            :page-count="Math.ceil(paper_length / per_page)"
                            :page-range="3"
                            :margin-pages="2"
                            :per-page="this.per_page"
                            :whichpage="current_route"
                            :query="['page','start','size']">
                          </PaginationV2>
                        </div>
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
    import PaginationV2 from "@/components/function_components/PaginationV2";
    import SearchBar from "@/components/function_components/SearchBar";
    import SortButton from "@/components/function_components/SortButton";

    export default {
      name: "author_detail",
      watchQuery: true,
      components: {SearchBar, PaginationV2, SortButton, SearchResult, PaperTable, Influence_graph, NuxtError},
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
          search_query: '',

          current_route: null
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
        formatTitle(title) {
          return formatTitle(title)
        },
      },
      async asyncData({route}) {
        let id_pattern = /[0-9]+$/g
        let author_id = id_pattern.exec(route.params.author_detail)
        let params = {
          start: route.query.start,
          size: route.query.size,
          sort_by: route.query?.sort ?? "score"
        }
        let data = await author_by_id(author_id, params)
        if (Object.keys(data).length !== 0){
          return {
            author_id: author_id,
            author_detail: data,
            paper_length: data.totalPapers,
            paper_data: data.papers,
            current_route: route.fullPath,
            current_paper_page: route?.query?.page ?? 1
          }
        }
        else{
          return {
            author_id: author_id,
            author_detail: {},
            current_route: route.fullPath
          }
        }
      }
    }
</script>

<style scoped>
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
    color: #756c6c;
  }
</style>
