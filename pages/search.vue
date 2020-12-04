<template>
  <div
    v-if="this.search_results.length !== 0"
    class="container"
    id="page_container"
  >
    <!------------------------      AUTHORS CARD HERE   --------------------------->
    <div class="tile is-ancestor">
      <div class="tile is-parent is-8 is-vertical">
        <div class="tile is-child">
          <p class="content_title">
            {{ $t('general_attribute.publication') }}
          </p>
          <!------------------------      DROPDOWN HERE   --------------------------->
          <div class="content_box filter_section">
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
            <FilterBoxChart :type="'year'"
                            :checked="checked_year_range"
                            :chart_data="year_list"
                            :whichpage="current_route"
            ></FilterBoxChart>
            <!--------------------- SORT BUTTON ------------------------->
            <SortButton class="filter_button" :whichpage="current_route"></SortButton>
            <!--------------------- SORT BUTTON ------------------------->
            <!--------------------------------- ClEAR FILTERS BUTTON ------------------------->
            <span>
              <nuxt-link class="button is-danger is-light filter_button"
                :to="{path: this.$route.path,
                      query: {query: query_params.query, start:0, size:this.per_page, page:1}}">
                Clear
              </nuxt-link>
            </span>
            <!--------------------------------- ClEAR FILTERS BUTTON ------------------------->
          </div>
          <!-------------------------------------------------------------------------->
        </div>

        <div class="tile is-child">
          <SearchResult v-for="result in this.search_results"
                        :key="result._source.paperId"
                        :search_result="result._source">
          </SearchResult>
        </div>
      </div>
      <div class="tile is-parent is-vertical">
        <p class="content_title">{{ $t('search_page.related_author') }}</p>
        <AuthorCard
          v-for="author in authors_list"
          v-bind:author_info="author"
        >
        </AuthorCard>
      </div>
    </div>
    <!-------------------------------------------------------------------------->


    <!-------------------------   PAGINATION HERE   ---------------------------->
    <PaginationV2
      :is-small="true"
      :page-count="(Math.ceil(this.total_count/this.per_page))"
      :page-range="3"
      :margin-pages="2"
      :per-page="this.per_page"
      :whichpage="current_route"
      :query="['page','start','size']">
    </PaginationV2>
    <!-------------------------------------------------------------------------->
  </div>

  <div v-else>
    <NuxtError v-bind:error="{statusCode:404, message:'Không tìm thấy từ khóa'}"></NuxtError>
  </div>

</template>

<script>
import {formatNumber, publication_type} from "../assets/utils";
import DropDown from "../components/function_components/DropDown";
import AuthorCard from "../components/search_page/AuthorCard";
import SearchResult from "../components/search_page/SearchResult";
import NuxtError from "@/components/static_components/ErrorPage";
import Pagination from "@/components/function_components/Pagination";
import PaginationV2 from "@/components/function_components/PaginationV2";
import FilterBoxMulti from "@/components/function_components/FilterBoxMulti";
import FilterBoxChart from "@/components/function_components/FilterBoxChart";

export default {
      name: "search",
      watchQuery: true,
      components: {FilterBoxMulti, FilterBoxChart, SearchResult, AuthorCard, DropDown, Pagination, NuxtError, PaginationV2},
      head() {
        return {
          title: 'Compasify - Search tool for Knowdlege'
        }
      },
      data() {
        return {
          search_results: null,
          publication_sort: publication_type,
          query_params: null,

          author_hidden: true,
          msg_hidden: false,

          total_count: 0,
          per_page: 10,
          current_route:null
        }
      },
      filters: {
        formatNumber(number) {
          return formatNumber(number)
        }
      },
      computed: {
        // all of the following 7 variables are needed in order for the dropdowns filters to work properly
        fos_list: function (){
          let fos_res = []
          this.$store.state.search_result.aggregation.fos_aggs.buckets.forEach(item => {
            fos_res.push({fos:item.key.trim()!=="" ? item.key.trim() : "Unknown",
              count:item.doc_count, checked:false})
          })
          return fos_res
        },
        authors_list: function (){
          let author_res = []
          this.$store.state.search_result.aggregation.author_aggs.buckets.forEach(item => {
            author_res.push({author:item.name.trim()!=="" ? item.name.trim() : "John Doe",
              author_id: item.id,
              count:item.doc_count, checked:false})
          })
          return author_res
        },
        venue_list: function (){
          let venue_res = []
          this.$store.state.search_result.aggregation.venue_aggs.buckets.forEach(item => {
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
          // console.log("authors_checked", this.$store.state.search_result.filters.authors_checked)
          // console.log("this.authors_list", this.authors_list)
          this.$store.state.search_result.filters.authors_checked?.forEach(selected => {
            for (let item of this.authors_list) {
              if (selected === item.author_id) {
                checked_authors_list.push(item)
                break
              }
            }
          })
          // console.log("checked_authors_list", checked_authors_list)
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
          // console.log("year_info", this.year_info)
          this.year_info.forEach(item => {
            year_res.label.push(item.key)
            year_res.data.push(item.doc_count)
          })
          return year_res
        }
      },
      async asyncData({query, store, route}) {
        if(query.author){
          if(typeof query.author === "string"){
            query['author'] = Array(query['author']).map(str => _.last(_.split(str,'-')))
          }
          else{
            query['author'] = query['author'].map(str => _.last(_.split(str,'-')))
          }
        }
        if(query.venue){
          if(typeof query.venue === "string"){
            query['venue'] = Array(query['venue']).map(str => str.replace(/-/g, ' '))
          }
          else{
            query['venue'] = query['venue'].map(str => str.replace(/-/g, ' '))
          }
        }
        if(query.fos){
          if(typeof query.fos === "string"){
            query['fos'] = Array(query['fos']).map(str => str.replace(/-/g, ' '))
          }
          else{
            query['fos'] = query['fos'].map(str => str.replace(/-/g, ' '))
          }
        }
        await store.dispatch('search_result/paper_by_title', query)

        if(store.state.search_result.search_results.hits.hits.length > 0) {
          return {
            query_params: query,
            current_page: parseInt(query['page']),
            current_route: route.fullPath,
            search_results: store.state.search_result.search_results.hits.hits,
            keyword: query['query'],
            total_count: store.state.search_result.total,
            year_info: store.state.search_result.aggregation.year_aggs.buckets
          }
        }
        else{
           return {
             query_params: query,
             current_page: parseInt(query['page']),
             current_route: route.fullPath,
             search_results: store.state.search_result.search_results.hits.hits,
             keyword: query['searchContent'],
             total_count: 0,
          }
        }
      }
    }
</script>

<style scoped>
  .container {
    padding: 40px 20px;
  }
  p {
    color: black;
  }
  button:hover {
    cursor: pointer;
  }
  a:hover {
    text-decoration: none;
  }
</style>
