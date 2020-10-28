<template>
  <div
    v-if="this.search_results.length !== 0"
    class="container"
    id="page_container"
  >
    <div class="tile is-ancestor">
      <div class="tile is-parent is-8 is-vertical">
        <p class="content_title">{{ $t('general_attribute.author') }}</p>
        <div class="tile is-child" v-if="author_hidden">
          <div class="columns is-multiline is-1">
            <div
              class="column"
              v-for="author in author_info.slice(0,3)"
              :key="author.authorId"
            >
              <AuthorCard
                class="content_box author_card"
                v-bind:author_info="author"
              >
              </AuthorCard>
            </div>

            <a class="column is-full link-class-3" v-on:click="author_hidden = false">
              {{ $t('search_page.see_all_author') }}
            </a>
          </div>
        </div>

        <div class="tile is-child columns is-multiline" v-else>
          <div class="columns is-multiline is-1">
            <div
              class="column"
              v-for="author in author_info"
              :key="author.authorId"
            >
              <AuthorCard
                class="content_box"
                v-bind:author_info="author"
              >
              </AuthorCard>
            </div>

            <a class="column is-full link-class-3" v-on:click="author_hidden = true">
              {{ $t('search_page.see_fewer_author') }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!------------------------      AUTHORS CARD HERE   --------------------------->
    <div class="tile is-ancestor">
      <div class="tile is-parent is-8 is-vertical">
        <div class="tile is-child">
          <p class="content_title">
            {{ $t('general_attribute.publication') }}
          </p>
          <br>
          <!------------------------      DROPDOWN HERE   --------------------------->
          <div class="content_box filter_section">
            <FilterBoxMulti :type="'author'"
                            :whichpage="current_route"
            ></FilterBoxMulti>
            <FilterBoxMulti :type="'venue'"
                            :whichpage="current_route"
            ></FilterBoxMulti>
            <FilterBoxMulti :type="'fos'"
                            :whichpage="current_route"
            ></FilterBoxMulti>
            <FilterBoxChart :type="'year'"
                            :chart_data="year_list"
                            :whichpage="current_route"
            ></FilterBoxChart>
            <span>
              <nuxt-link
                :to="{
                  path: this.$route.path,
                  query: {
                    query: query_params.query,
                    start:0,
                    size:this.per_page,
                    page:1
                  }
                }"
                class="button is-danger is-light"
              >
                Clear
              </nuxt-link>
            </span>

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
import {filteredKeys_v2, formatNumber, publication_type} from "../assets/utils";
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
          title: 'DoIT Scholar - Tìm kiếm văn bản học thuật'
        }
      },
      data() {
        return {
          search_results: null,
          publication_sort: publication_type,
          query_params: null,
          author_info: null,
          venue_info: null,
          fos_info: null,
          year_info: null,

          author_hidden: true,
          msg_hidden: false,

          //24/08/2020: Nam changed this for pagination
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
        fos_list: function (){
          let fos_res = []
          let fos_checked = filteredKeys_v2(Object.assign({},this.$route.query), /fos\d+/)
          this.fos_info.forEach(item => {
            if (fos_checked.length>0 && fos_checked.includes(item.key.trim())){
              fos_res.push({fos:item.key.trim()!=="" ? item.key.trim() : "Unknown",
                            count:item.doc_count, checked:true})
            }
            else{
              fos_res.push({fos:item.key.trim()!=="" ? item.key.trim() : "Unknown",
                            count:item.doc_count, checked:false})
            }
          })
          return fos_res
        },
        authors_list: function (){
          let author_res = []
          let authors_checked = filteredKeys_v2(Object.assign({},this.$route.query), /author\d+/)
          this.author_info.forEach(item => {
            if (authors_checked.length>0 && authors_checked.includes(item.name.buckets[0].key.trim())){
              author_res.push({author:item.name.buckets[0].key.trim()!=="" ? item.name.buckets[0].key.trim() : "John Doe",
                               count:item.doc_count, checked:true})
            }
            else{
              author_res.push({author:item.name.buckets[0].key.trim()!=="" ? item.name.buckets[0].key.trim() : "John Doe",
                               count:item.doc_count, checked:false})
            }
          })
          return author_res
        },
        venue_list: function (){
          let venue_res = []
          let venue_checked = filteredKeys_v2(Object.assign({},this.$route.query), /venue\d+/)
          this.venue_info.forEach(item => {
            if (!!venue_checked && venue_checked.includes(item.key.trim())){
              venue_res.push({venue:item.key.trim()!=="" ? item.key.trim() : "Anonymous",
                              count:item.doc_count, checked:true})
            }
            else{
              venue_res.push({venue:item.key.trim()!=="" ? item.key.trim() : "Anonymous",
                              count:item.doc_count, checked:false})
            }
          })
          return venue_res
        },
        year_list: function (){
          let year_res = {label: [], data:[]}
          this.year_info.forEach(item => {
            year_res.label.push(item.key)
            year_res.data.push(item.doc_count)
          })
          return year_res
        }
      },
      async asyncData({query, store, route}) {
        await store.dispatch('search_result/paper_by_title', query)
        if(store.state.search_result.search_results.length > 0) {
          return {
             query_params: query,
             current_page: parseInt(query['page']),
             current_route: route.fullPath,
             search_results: store.state.search_result.search_results,
             keyword: query['query'],
             total_count: store.state.search_result.total,

             //maybe I will delete these three since computed for these are not necessary/////
             author_info: store.state.search_result.aggregation.author_count.name.buckets,
             fos_info: store.state.search_result.aggregation.fos_count.buckets,
             venue_info: store.state.search_result.aggregation.venue_count.buckets,
             year_info: store.state.search_result.aggregation.year_count.buckets,
             ////////////////////////////////////////////////////////////////////////////////
             last_paper_id: store.state.search_result.last_paper_id,
          }
        }
        else{
           return {
             query_params: query,
             current_page: parseInt(query['page']),
             current_route: route.fullPath,
             search_results: store.state.search_result.search_results,
             keyword: query['searchContent'],
             total_count: 0,
             author_info: [],
             venue_info: [],
             fos_info: [],
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
