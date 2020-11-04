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
                      <tr v-if="author_agg.influentialCitationCount !== undefined">
                        <td>
                          <span class="text-class-3 color-class-3">{{ $t('author_detail_page.author_info.highlighted_citation') }}</span>
                        </td>
                        <td>
                      <span
                        class="author_stat"
                      >{{author_agg.influentialCitationCount | formatNumber}}</span>
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
                      <FilterBoxMulti :type="'author'"
                            :data="authors_list"
                            :whichpage="current_route"
                            :checked="checked_authors_list"
                      ></FilterBoxMulti>
                      <FilterBoxMulti :type="'venue'"
                                      :data="venue_list"
                                      :whichpage="current_route"
                                      :checked="checked_venue_list"
                      ></FilterBoxMulti>
                      <FilterBoxMulti :type="'fos'"
                                      :data="fos_list"
                                      :whichpage="current_route"
                                      :checked="checked_fos_list"
                      ></FilterBoxMulti>
                      <SortButton :whichpage="current_route"></SortButton>
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
                            :page-count="Math.ceil(this.paper_length / per_page)"
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
    import Influence_graph from "@/components/influence_graph/influence_graph";
    import PaperTable from "@/components/function_components/PaperTable";
    import NuxtError from "@/components/static_components/ErrorPage";
    import SearchResult from "@/components/search_page/SearchResult";
    import PaginationV2 from "@/components/function_components/PaginationV2";
    import SearchBar from "@/components/function_components/SearchBar";
    import FilterBoxMulti from "@/components/function_components/FilterBoxMulti";
    import SortButton from "@/components/function_components/SortButton";

    export default {
      name: "author_detail",
      watchQuery: true,
      components: {SearchBar, PaginationV2, FilterBoxMulti, SortButton, SearchResult, PaperTable, Influence_graph, NuxtError},
      head() {
        return {
          title: this.author_detail.name + ' | DoIT Scholar'
        }
      },
      computed: {
        // all of the following 7 variables are needed in order for the dropdowns filters to work properly
        fos_list: function (){
          let fos_res = []
          this.$store.state.search_result.aggregation.fos_count.buckets.forEach(item => {
            fos_res.push({fos:item.key.trim()!=="" ? item.key.trim() : "Unknown",
              count:item.doc_count, checked:false})
          })
          return fos_res
        },
        authors_list: function (){
          let author_res = []
          this.$store.state.search_result.aggregation.author_count.name.buckets.forEach(item => {
            author_res.push({author:item.name.buckets[0].key.trim()!=="" ? item.name.buckets[0].key.trim() : "John Doe",
              author_id: item.key,
              count:item.doc_count, checked:false})
          })
          return author_res
        },
        venue_list: function (){
          let venue_res = []
          this.$store.state.search_result.aggregation.venue_count.buckets.forEach(item => {
            venue_res.push({venue:item.key.trim()!=="" ? item.key.trim() : "Anonymous",
              count:item.doc_count, checked:false})
          })
          return venue_res
        },
        checked_fos_list: function() {
          let checked_fos_list = []
          this.$store.state.search_result.filters.fos_checked?.forEach(selected => {
            for (let item of this.fos_list) {
              if (selected === item.fos) {
                checked_fos_list.push(item)
                break
              }
            }
          })
          return checked_fos_list
        },
        checked_authors_list: function() {
          let checked_authors_list = []
          console.log("authors_checked", this.$store.state.search_result.filters.authors_checked)
          console.log("this.authors_list", this.authors_list)
          this.$store.state.search_result.filters.authors_checked?.forEach(selected => {
            for (let item of this.authors_list) {
              if (selected === item.author_id) {
                checked_authors_list.push(item)
                break
              }
            }
          })
          console.log("checked_authors_list", checked_authors_list)
          return checked_authors_list
        },
        checked_venue_list: function() {
          let checked_venue_list = []
          this.$store.state.search_result.filters.venue_checked?.forEach(selected => {
            for (let item of this.venue_list) {
              if (selected === item.venue) {
                checked_venue_list.push(item)
                break
              }
            }
          })
          return checked_venue_list
        },
        checked_year_range: function () {
          let checked_year_range = []
          checked_year_range.push(this.$store.state.search_result.filters.year_check.start)
          checked_year_range.push(this.$store.state.search_result.filters.year_check.end)
          return checked_year_range
        },
        year_list: function (){
          let year_res = {label: [], data:[]}
          this.year_info.forEach(item => {
            year_res.label.push(item.key)
            year_res.data.push(item.doc_count)
          })
          return year_res
        },
        paper_length: function (){
          return this.author_agg?.totalPapers ?? this.author_detail.totalPapers
        },

      },
      data() {
        return {
          author_id: null,
          author_detail: null,
          author_agg: null,
          current_tab: 'publication',
          current_paper_page: 1,
          per_page: 5,
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
      async asyncData({store, query, route}) {
        console.log("query before", query)
        let id_pattern = /[0-9]+$/g
        let author_id = id_pattern.exec(route.params.author_detail)
        query["author_id"] = author_id
        if(query.author){
         query['author'] = query['author'].map(str => _.last(_.split(str,'-')))
        }
        if(query.venue){
          query['venue'] = query['venue'].map(str => str.replace(/-/g, ' '))
        }
        if(query.fos){
          query['fos'] = query['fos'].map(str => str.replace(/-/g, ' '))
        }
        console.log("query after", query)
        await store.dispatch('search_result/author_filter', query)

        if (store.state.search_result.search_results.length > 0){
          return {
            author_id: author_id,
            author_detail: store.state.search_result.search_results,
            author_agg: store.state.search_result.aggregation,
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
