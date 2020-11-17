<template>
  <div class="container">
    <div class="tile is-ancestor is-vertical">
      <div class="tile is-parent">
        <div class="tile is-child is-8">
          <h1 class="title" style="color: #4E4B4B">
            <b>{{ journal_name }}</b>
          </h1>
        </div>
        <div class="tile is-child is-4">
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child is-8">
          <div>
            <p class="content_title">
              {{ $t('general_attribute.publication') }}
            </p>
            <p class="text-class-3">
              <i18n
                tag="span"
                path="general_attribute.list_label"
              >
                <template v-slot:start>
                  <span>
                      {{ (current_page-1)*per_page + 1}}
                  </span>
                </template>
                <template
                  v-slot:end
                >
                  <span v-if="(current_page-1)*per_page + per_page < total_paper">
                      {{ (current_page-1)*per_page + per_page}}
                  </span>
                  <span v-else>
                      {{total_paper}}
                  </span>
                </template>
                <template v-slot:total>
                  <span>
                      {{total_paper | formatNumber}}
                  </span>
                </template>
              </i18n>
            </p>
            <br>
          </div>
          <!-----------------------      DROPDOWN HERE   --------------------------->
          <div class="content_box filter_section">
            <div>
              <SearchBar
                style="width: 100%"
               :placeholder="$t('general_attribute.search_bar__filter.venue')"
               :authors="null"
               :venues="Array(journal_name)"></SearchBar>
              <FilterBoxMulti :type="'author'"
                              :data="authors_list"
                              :whichpage="current_route"
                              :checked="checked_authors_list"
              ></FilterBoxMulti>
              <FilterBoxMulti :type="'fos'"
                              :data="fos_list"
                              :whichpage="current_route"
                              :checked="checked_fos_list"
              ></FilterBoxMulti>
              <!--------------------- SORT BUTTON ------------------------->
              <SortButton class="filter_button" :whichpage="current_route"></SortButton>
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
          <!-------------------------------------------------------------------------->
          <SearchResult
            v-for="result in search_results"
            :key="result._source.paperId"
            :search_result="result._source">
          </SearchResult>

          <PaginationV2
            :is-small="true"
            :page-count="Math.ceil(total_paper / this.per_page)"
            :page-range="3"
            :margin-pages="2"
            :per-page="this.per_page"
            :whichpage="current_route"
            :query="['page','start','size']">
          </PaginationV2>
        </div>
<!--        <div class="tile is-child is-4">-->
<!--          <LineGraph-->
<!--            :dataset="datacollection"-->
<!--            :title="$t('journal_detail_page.publication_chart.title')"-->
<!--          ></LineGraph>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import {formatNumber, formatTitle} from "assets/utils";

export default {
  name: "journal_detail",
  watchQuery: true,
  head() {
    return {
      title: this.journal_name + ' | ' + 'DoIT Scholar'
    }
  },
  filters: {
    formatNumber(num) {
      return formatNumber(num)
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
      },
  data() {
    return {
      journal_name: null,
      search_results: null,
      current_page: 1,
      per_page: 10,
      total_paper: 0,
      datacollection: null,
      current_route: null
    }
  },
  methods: {
    formatTitle(title) {
      return formatTitle(title)
    }
  },
  async asyncData({store, query, route}) {
    let journal_name = route.params.journal_detail.replace(/-/g, ' ')
    query["venue"] = Array(journal_name)
    if(query.author){
      query['author'] = query['author'].map(str => _.last(_.split(str,'-')))
    }
    if(query.fos){
      query['fos'] = query['fos'].map(str => str.replace(/-/g, ' '))
    }

    console.log("venues query", query)
    await store.dispatch('search_result/paper_by_venue', query)
    if (store.state.search_result.search_results.hits.hits.length > 0){
      return {
        journal_name: journal_name,
        search_results: store.state.search_result.search_results.hits.hits,
        total_paper: store.state.search_result.total,
        current_route: route.fullPath,
        current_page: route?.query?.page ?? 1
      }
    }

  }
}
</script>

<style scoped>
.container {
  padding: 40px 20px;
}
</style>
