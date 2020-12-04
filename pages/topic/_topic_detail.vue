<template>
  <div class="container">
    <div class="tile is-ancestor is-vertical">
      <div class="tile is-parent">
        <div class="tile is-child is-8">
          <h1 class="title" style="color: #4E4B4B">
            <b>{{ topic_name }}</b>
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
                :placeholder="$t('general_attribute.search_bar__filter.topic')"
                :authors="null"
                :topics="Array(topic_id)"></SearchBar>
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
            v-for="result in papers"
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
    import {paper_by_topic} from "@/API/elastic_api";
    //import {wiki_summary} from "@/API/elastic_api";
    export default {
      name: "topic_detail",
      watchQuery: true,
      head() {
        return {
          title: this.topic_name + ' | Compasify'
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
          papers: null,
          topic_id: null,
          topic_name: null,
          topics_size: 10, year_size:10,
          current_page: 1,
          per_page: 10,
          total_paper: 0,
          current_route: null,
          current_paper_page: null
        }
      },
      async asyncData({route, query, store}) {
        let topic_id = /[0-9]+$/g.exec(route.params.topic_detail)
        let topic_name = /.+(?=\-[0-9]+$)/g.exec(route.params.topic_detail)

        query['topics'] = Array(topic_id[0])
        query['topics_size'] = 10
        query['year_size'] = 10
        if(query.author){
          if(typeof query.author === "string")
            query['author'] = Array(query['author']).map(str => _.last(_.split(str,'-')))
          else
            query['author'] = query['author'].map(str => _.last(_.split(str,'-')))
        }
        if(query.venue){
          if(typeof query.venue === "string")
            query['venue'] = Array(query['venue']).map(str => str.replace(/-/g, ' '))
          else
            query['venue'] = query['venue'].map(str => str.replace(/-/g, ' '))
        }
        if(query.fos){
          if(typeof query.fos === "string")
            query['fos'] = Array(query['fos']).map(str => str.replace(/-/g, ' '))
          else
            query['fos'] = query['fos'].map(str => str.replace(/-/g, ' '))
        }
        console.log("topic query", query)
        await store.dispatch('search_result/paper_by_topic', query)

        if (store.state.search_result.search_results.hits.hits.length > 0){
          return {
            topic_id: topic_id[0],
            topic_name: topic_name[0].replace(/-/g, ' '),
            papers: store.state.search_result.search_results.hits.hits,
            total_paper: store.state.search_result.total,
            current_route: route.fullPath,
            current_paper_page: route?.query?.page ?? 1
          }
        }
        else{
          return {
            topic_id: topic_id,
            topic_name: topic_name[0].replace(/-/g, ' '),
            papers: null,
            total_paper: 0,
            current_route: route.fullPath,
            current_paper_page: route?.query?.page ?? 1
          }
        }
      }
    }
</script>

<style scoped>
  .container {
    padding: 40px 20px;
  }
  .title {
    color: #2e414f;
  }
</style>
