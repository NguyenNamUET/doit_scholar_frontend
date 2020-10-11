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
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input
                    v-on:keyup.enter="submitQuery"
                    v-model="search_query"
                    class="input"
                    type="text"
                    :placeholder="$t('general_attribute.search_bar_placeholder')"
                  >
                </div>
                <div class="control">
                  <p class="button is-warning" v-on:click="submitQuery">
                    <i class="fas fa-search"></i>{{ $t('general_attribute.search') }}
                  </p>
                </div>
              </div>
            </div>
            <DropDown :dd_data="{msg: $t('general_attribute.fos'), fields: this.fos_list}" @update-fos-checked="updateFOSChecked"/>
            <DropDown :dd_data="{msg: $t('general_attribute.author'), fields: this.authors_list}" @update-authors-checked="updateAuthorsChecked"/>
            <DropDown :dd_data="{msg: $t('general_attribute.venue'), fields: this.venue_list}" @update-venues-checked="updateVenuesChecked"/>
          </div>
          <!-------------------------------------------------------------------------->
          <SearchResult
            v-for="result in search_results"
            v-bind:search_result="result._source"/>
          <Pagination
            style="margin-top: 10px;"
            v-model="current_page"
            :page-count="Math.ceil(total_paper / per_page)"
            :click-handler="updatePaper"
            :page-range="3"
            :margin-pages="1"
            :is-small="true"
          >
          </Pagination>
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

export default {
  name: "_journal_detail",
  components: {LineGraph, SearchResult},
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
      total_paper: 10000,
      datacollection: null
    }
  },
  methods: {
    formatTitle(title) {
      return formatTitle(title)
    }
  },
  async asyncData({query, route}) {
    let journal_name = route.params.journal_detail.replace(/-/g, ' ')
    let data = {}
    if (isDictEmpty(query)) {
      data = await paper_by_venue({
        venues: Array(journal_name),
        start: 0,
        size: 10
      })
      // console.log(data)
    }
    else {
      data = await paper_by_venue(query)
    }
    return {
      journal_name: journal_name,
      search_results: data
    }
  }
}
</script>

<style scoped>
.container {
  padding: 40px 20px;
}
</style>
