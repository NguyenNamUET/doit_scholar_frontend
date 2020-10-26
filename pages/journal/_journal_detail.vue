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
            <div style="display: inline-block">
              <SearchBar
               :placeholder="$t('general_attribute.search_bar_placeholder')"
               :authors="null"
               :venues="Array(journal_name)"></SearchBar>
            </div>
            <SortButton :whichpage="current_route"></SortButton>
<!--            <DropDown :dd_data="{msg: $t('general_attribute.fos'), fields: this.fos_list}" @update-fos-checked="updateFOSChecked"/>-->
<!--            <DropDown :dd_data="{msg: $t('general_attribute.author'), fields: this.authors_list}" @update-authors-checked="updateAuthorsChecked"/>-->
<!--            <DropDown :dd_data="{msg: $t('general_attribute.venue'), fields: this.venue_list}" @update-venues-checked="updateVenuesChecked"/>-->
          </div>
          <!-------------------------------------------------------------------------->
          <SearchResult
            v-for="result in search_results"
            v-bind:search_result="result._source">
          </SearchResult>

          <PaginationV2
            :is-small="true"
            :page-count="Math.ceil(total_paper / this.per_page)"
            :page-range="3"
            :margin-pages="2"
            :per-page="this.per_page"
            :whichpage="current_route">
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
import {paper_by_venue} from "@/API/elastic_api";
import {formatNumber, formatTitle, isDictEmpty} from "assets/utils";
import SearchResult from "@/components/search_page/SearchResult";
import LineGraph from "@/components/static_components/LineGraph";
import PaginationV2 from "@/components/function_components/PaginationV2";
import SortButton from "@/components/function_components/SortButton";

export default {
  name: "_journal_detail",
  watchQuery: true,
  components: {LineGraph, SearchResult, PaginationV2, SortButton},
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
  async asyncData({query, route}) {
    let journal_name = route.params.journal_detail.replace(/-/g, ' ')
    let data = await paper_by_venue({
        venues: Array(journal_name),
        start: route.query.start,
        size: route.query.size,
        sort_by: route.query?.sort ?? "score"
    })
    return {
      journal_name: journal_name,
      search_results: data.hits.hits,
      total_paper: data.hits.total.value,
      current_route: route.fullPath,
      current_page: route?.query?.page ?? 1
    }
  }
}
</script>

<style scoped>
.container {
  padding: 40px 20px;
}
</style>
