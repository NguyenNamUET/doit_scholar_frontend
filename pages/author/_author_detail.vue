<!-- 150080110 -->
<template>
    <div v-if="paper_detail.length !== 0" class="container" ref="top" id="top">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child is-vertical">
            <div class="columns is-5">
              <!--------------------------------------------- AUTHOR INFO ------------------------------------------------>
              <div class="column is-one-quarter">
                <div class="tile is-vertical">
                  <AuthorInfoCard :name="name"
                                  :influential-citation-count="paper_agg.influentialCitationCount!== undefined ? paper_agg.influentialCitationCount.value : 0"
                                  :paper_length="paper_length"
                                  :h-index="h_index">
                  </AuthorInfoCard>
                  <div v-if="this.chart_labels.length > 0" class="content_box">
                    <CitationBar
                      :dataset="this.chart_data"
                      :labels="this.chart_labels"
                      :width="250"
                      :height="250"
                      :title="$t('paper_detail_page.citation_chart_title')">
                    </CitationBar>
                  </div>
                  <div
                    v-if="this.coauthors.length > 0"
                    class="tile is-vertical"
                  >
                    <p class="content_title">{{ $t('author_detail_page.co_author') }}</p>
                    <div class="content_box">
                      <table>
                        <tr v-for="coauthor in this.coauthors" :key="coauthor.author_id">
                          <td style="width: 90%; padding-left: 5px">
                            <a class="text-class-3 color-class-3"
                               :href="'/author/' + formatTitle(coauthor.author) + '-' + coauthor.author_id">
                              {{coauthor.author}}
                            </a>
                          </td>
                          <td>
                          <span class="icon">
                            <a :href="'/author/' + formatTitle(coauthor.author) + '-' + coauthor.author_id">
                              <i class="fas fa-angle-right"></i>
                            </a>
                          </span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <!--------------------------------------------- AUTHOR INFO ------------------------------------------------>

              <!--------------------------------------------- NAV BAR ---------------------------------------------------->
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
                      <i18n tag="span" path="general_attribute.list_label">
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
                      <div>
                        <!--------------------------- SEARCH BAR ------------------------->
                        <SearchBar
                          :placeholder="$t('general_attribute.search_bar__filter.paper')"
                          :current_page="this.$route.path"
                          :authors="this.author_id"
                        ></SearchBar>

                        <!--------------------------- SEARCH BAR ------------------------->

                        <!------------------------ FILTER DROPDOWNS ------------------------>
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
                        <!------------------------ FILTER DROPDOWNS ------------------------>

                        <!--------------------- SORT BUTTON ------------------------->
                        <SortButton :whichpage="current_route" class="filter_button"></SortButton>
                        <!--------------------- SORT BUTTON ------------------------->

                        <!--------------------------------- ClEAR FILTERS BUTTON ------------------------->
                        <span>
                        <nuxt-link class="button is-danger is-light filter_button"
                                   :to="{path: this.$route.path,
                                query: {start:0, size:this.per_page, page:1}}">
                          Clear
                        </nuxt-link>
                      </span>
                        <!--------------------------------- ClEAR FILTERS BUTTON ------------------------->
                      </div>
                    </div>
                    <div class="tile is-ancestor">
                      <div class="tile is-parent">
                        <div class="tile is-child">
                          <SearchResult
                            v-for="result in paper_detail"
                            :key="result.paperId"
                            :search_result="result._source"
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
              <!--------------------------------------------- NAV BAR ------------------------------------------------>
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
      components: {SearchBar, PaginationV2, FilterBoxMulti, SortButton,
                   SearchResult, PaperTable, Influence_graph, NuxtError},
      head() {
        return {
          title: this.name + ' | DoIT Scholar'
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
          this.$store.state.search_result.filters.authors_checked?.forEach(selected => {
            for (let item of this.authors_list) {
              if (selected === item.author_id) {
                checked_authors_list.push(item)
                break
              }
            }
          })
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
          return this.paper_agg?.totalPapers ?? this.paper_detail.totalPapers
        },
        coauthors: function (){
          let res = []
          this.authors_list.forEach(item => {
            if(item.author_id !== this.author_id){
              res.push(item)
            }
          })
          return res
        }

      },
      data() {
        return {
          author_id: null,
          name: null,
          h_index: null,
          paper_detail: null,
          paper_agg: null,
          chart_data: null,
          chart_labels: null,
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
        let author_id = /[0-9]+$/g.exec(route.params.author_detail)
        query["author_id"] = author_id
        query['author'] = Array(author_id)
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

        if (store.state.search_result.search_results.hits.hits.length > 0){
          return {
            author_id: author_id[0],
            h_index: store.state.search_result.search_results.h_index,
            name: store.state.search_result.search_results.name,
            paper_detail: store.state.search_result.search_results.hits.hits,
            paper_agg: store.state.search_result.aggregation,

            chart_labels: Object.keys(store.state.search_result.aggregation.citations_chart),
            chart_data: Object.values(store.state.search_result.aggregation.citations_chart),
            current_route: route.fullPath,
            current_paper_page: route?.query?.page ?? 1
          }
        }
        else{
          return {
            author_id: author_id[0],
            paper_detail: {},
            h_index: 0,
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
  .tab_title {
    color: #756c6c;
  }
  button:hover {
    cursor: pointer;
  }
  a:hover {
    text-decoration: none;
  }
</style>
