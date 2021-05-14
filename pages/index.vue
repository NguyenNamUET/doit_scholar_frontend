<template>
  <div class="container">
    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <div class="tile is-child is-flex is-align-items-center is-vertical">
          <img src="../static/compasify.png" height="128" width="128"/>
          <h1 class="page_title">Compasify</h1>
        </div>

        <div class="tile is-child pt-6">
          <SearchBar
            class="w"
            :placeholder="$t('default_layout.header.search_bar_placeholder')"
            :current_page="this.localeRoute('search').path"
          />
        </div>
      </div>
    </div>
<!--    <div class="tile is-ancestor">-->
<!--      &lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; Left side bar -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--      <div class="tile is-parent is-vertical is-3">-->
<!--        <div class="tile is-child">-->
<!--          <p class="content_title">{{ $t('home_page.papers_content.famous_journals') }}</p>-->
<!--          <div class="content_box">-->
<!--            <ul>-->
<!--              <li v-for="(item, index) in highlight_venues" :key="index">-->
<!--                <nuxt-link class="link-class-3"-->
<!--                  :to="{path: '/journal/' + formatTitle(item),-->
<!--                        query: {start: 0, size: 10, page: 1, sort: 'score'}}"-->
<!--                  >-->
<!--                  {{item}}-->
<!--                </nuxt-link>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      &lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; Center content &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--      <div class="tile is-parent is-vertical is-6">-->
<!--        <div class="tile is-child">-->
<!--          <p class="content_title">{{ $t('home_page.papers_content.latest_papers') }}</p>-->
<!--          <SearchResult-->
<!--            v-for="item in most_recent_papers"-->
<!--            :key="item._source.paperId"-->
<!--            :search_result="item._source"-->
<!--          ></SearchResult>-->
<!--        </div>-->
<!--        <div class="tile is-child">-->
<!--          <p class="content_title">{{ $t('home_page.papers_content.most_cited_papers') }}</p>-->
<!--          <SearchResult-->
<!--            v-for="item in most_cited_papers"-->
<!--            :key="item._source.paperId"-->
<!--            :search_result="item._source"-->
<!--          ></SearchResult>-->
<!--        </div>-->
<!--      </div>-->
<!--      &lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; Right side bar -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--      <div class="tile">-->
<!--        <div class="tile is-parent is-vertical">-->
<!--          <div class="tile is-child">-->
<!--            <p class="content_title">{{ $t('home_page.chart.trending_topics') }}</p>-->
<!--            <div class="content_box">-->
<!--              <ul>-->
<!--                <li v-for="(item, index) in highlight_topics" :key="index">-->
<!--                  <nuxt-link class="link-class-3"-->
<!--                             :to="{path: '/topic/' + formatTitle(item.name) + '-' + item.id,-->
<!--                                   query: {start: 0, size: 10, page: 1, sort: 'score'}}"-->
<!--                  >-->
<!--                    {{item.name}}-->
<!--                  </nuxt-link>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="tile is-child">-->
<!--            <p class="content_title">{{ $t('general_attribute.fos') }}</p>-->
<!--            <div class="content_box">-->
<!--              <ul>-->
<!--                <li v-for="(item, index) in highlight_fos" :key="index">-->
<!--                  <nuxt-link class="link-class-3"-->
<!--                    :to="{path: 'search',-->
<!--                    query: {query: '', start: 0, size: 10, page: 1, fos: item}}"-->
<!--                  >-->
<!--                    {{item}}-->
<!--                  </nuxt-link>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import {
  home_papers, home_status_count, home_status_graph
} from "@/API/elastic_api";
import {doughnut_chart_prep, formatNumber, formatTitle, line_chart_prep} from "assets/utils";
import DoughnutGraph from "../components/static_components/DoughnutGraph";
import LineGraph from "../components/static_components/LineGraph";
import SearchResult from "@/components/search_page/SearchResult";
import SearchBar from "@/components/function_components/SearchBar";

export default {
  name: "index",
  layout: 'home_layout',
  components: {
    SearchBar,
    DoughnutGraph, LineGraph, SearchResult
  },
  head() {
    return {
      title: 'Compasify - Your trusty academic search engine',
      meta: [
        {
          hid: 'info',
          name: 'info',
          content: 'The most updated academic search engine - ever!'
        }
      ]
    }
  },
  data() {
    return {
      author_count: null,
      paper_count: null,
      fos_count: null,

      fos_chart_data: null,
      venue_chart_data: null,
      topics_chart_data: null,

      most_cited_authors: null,
      most_cited_papers: null,
      most_recent_papers: null,
      most_cited_fos: null,

      highlight_topics: null,
      highlight_authors: null,
      highlight_venues: null,
      highlight_fos: null,
    }
  },
  filters: {
    formatNumber(number) {
      return formatNumber(number)
    }
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    formatNumber(number) {
      return formatNumber(number)
    },
    formatTitle(title) {
      return formatTitle(title)
    }
  },
}
</script>

<style scoped>
.container {
  padding: 40px 20px;
}
.page_title {
  font-size: 3rem;
  color: #36361F;
  font-weight: 600;
}
</style>
