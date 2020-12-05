<template>
  <div class="container">
    <div class="tile is-ancestor">
      <div class="tile is-parent is-3">
        <div class="tile is-child">
          <div class="column has-text-centered content_box">
            <DoughnutGraph
              :dataset="fos_chart_data"
              :title="$t('home_page.chart.paper_by_fos_chart')"
              style="height: 200px; width: 200px; display: inline-block"
            ></DoughnutGraph>
            <DoughnutGraph
              :dataset="venue_chart_data"
              :title="$t('home_page.chart.paper_by_venue_chart')"
              style="height: 200px; width: 200px; display: inline-block"
            ></DoughnutGraph>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child">
          <div class="content_box has-text-centered">
            <LineGraph
              :title="$t('home_page.chart.trending_topics')"
              :dataset="line_data"
            ></LineGraph>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child">
          <p class="content_title">{{ $t('home_page.page_stat.site_status') }}</p>
          <div class="info_container content_box">
            <div class="columns is-3">
              <div class="column has-text-centered">
                <div>
                  <client-only>
                    <number
                      class="number_status"
                      ref="author_count"
                      :from="0"
                      :to=author_count
                      :duration="1.5"
                      :format="formatNumber"
                    />
                  </client-only>
                  <br>
                  <span class="status_description">{{$t('home_page.page_stat.author_count')}}</span>
                </div>
                <div>
                  <client-only>
                    <number
                      class="number_status"
                      ref="doc_count"
                      :from="0"
                      :to=paper_count
                      :format="formatNumber"
                      :duration="1.5"
                    />
                  </client-only>
                  <br>
                  <span class="status_description">{{$t('home_page.page_stat.paper_count')}}</span>
                </div>
                <div>
                  <client-only>
                    <number
                      class="number_status"
                      ref="field_count"
                      :from="0"
                      :to=fos_count
                      :format="formatNumber"
                      :duration="1.5"
                    />
                  </client-only>
                  <br>
                  <span class="status_description">{{$t('home_page.page_stat.fos_count')}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tile is-ancestor">
      <!---------------------------------------- Left side bar --------------------------------------->
      <div class="tile is-parent is-vertical is-3">
<!--        <div class="tile is-child">-->
<!--          <p class="content_title">Authors</p>-->
<!--          <div class="content_box">-->
<!--            {{highlight_authors}}-->
<!--          </div>-->
<!--        </div>-->
        <div class="tile is-child">
          <p class="content_title">{{ $t('home_page.papers_content.famous_journals') }}</p>
          <div class="content_box">
            <ul>
              <li v-for="item in highlight_venues">
                <nuxt-link class="link-class-3"
                  :to="{path: '/journal/' + formatTitle(item),
                        query: {start: 0, size: 10, page: 1, sort: 'score'}}"
                  >
                  {{item}}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!----------------------------------------- Center content -------------------------------------->
      <div class="tile is-parent is-vertical is-6">
        <div class="tile is-child">
          <p class="content_title">{{ $t('home_page.papers_content.latest_papers') }}</p>
          <SearchResult
            v-for="item in most_recent_papers"
            :key="item._source.paperId"
            :search_result="item._source"
          ></SearchResult>
        </div>
        <div class="tile is-child">
          <p class="content_title">{{ $t('home_page.papers_content.most_cited_papers') }}</p>
          <SearchResult
            v-for="item in most_cited_papers"
            :key="item._source.paperId"
            :search_result="item._source"
          ></SearchResult>
        </div>
      </div>
      <!------------------------------------------- Right side bar ----------------------------------->
      <div class="tile">
        <div class="tile is-parent is-vertical">
          <div class="tile is-child">
            <p class="content_title">{{ $t('home_page.chart.trending_topics') }}</p>
            <div class="content_box">
              <ul>
                <li v-for="item in highlight_topics">
                  <nuxt-link class="link-class-3"
                             :to="{path: '/topic/' + formatTitle(item.name) + '-' + item.id,
                                   query: {start: 0, size: 10, page: 1, sort: 'score'}}"
                  >
                    {{item.name}}
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="tile is-child">
            <p class="content_title">{{ $t('general_attribute.fos') }}</p>
            <div class="content_box">
              <ul>
                <li v-for="item in highlight_fos">
                  <nuxt-link class="link-class-3"
                    :to="{path: 'search',
                    query: {query: '', start: 0, size: 10, page: 1, fos: item}}"
                  >
                    {{item}}
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  home_papers, home_status_count, home_status_graph
} from "@/API/elastic_api";
import {doughnut_chart_prep, formatNumber, formatTitle, line_chart_prep} from "assets/utils";
import DoughnutGraph from "../components/static_components/DoughnutGraph";
import LineGraph from "../components/static_components/LineGraph";

export default {
  name: "home",
  layout: 'default',
  components: {
    DoughnutGraph, LineGraph
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

      line_data: {
        labels: [2015, 2016, 2017, 2018],
        datasets: [
          {
            label: 'Algorithm',
            borderColor: '#ffe502',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Neoplasms',
            borderColor: '#2948c3',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: 'Diethylstilbestrol',
            borderColor: '#bf5611',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    }
  },
  async asyncData({route}) {
    let results = null
    let fos_chart_data = null
    let venue_chart_data = null
    let topics_chart_data = null

    await Promise.all(
      [
        home_status_graph({
          fos_graph: true,
          venues_graph: true,
          topics_graph: true,
          size: 50,
          topics_size: 50,
          year_size: 5
        }),
        home_status_count({
          is_papers_count: true,
          is_authors_count: true,
          is_fos_count: true,
          is_topics_count: true
        }),
        home_papers({
          size: 3,
          topics_size: 10,
          order_by_citations_count: true,
          order_by_year: true,
        })
      ]
    ).then((res) => {
      results = res
      console.log(results)
      fos_chart_data = doughnut_chart_prep(results[0].fos_chart)
      venue_chart_data = doughnut_chart_prep(results[0].venues_chart)
      // topics_chart_data = line_chart_prep(results[0].topics_chart)
    })
    return {
      author_count: results[1].authors_count,
      paper_count: results[1].papers_count,
      fos_count: results[1].fos_count,

      highlight_topics: results[0].topics_chart,
      highlight_authors: null,
      highlight_venues: Object.keys(results[0].venues_chart),
      highlight_fos: Object.keys(results[0].fos_chart),

      fos_chart_data: fos_chart_data,
      venue_chart_data: venue_chart_data,
      topics_chart_data: topics_chart_data,

      most_cited_authors: results[3],
      most_cited_papers: results[2].most_cited_papers,
      most_recent_papers: results[2].most_recent_paper,
      most_cited_fos: results[5],
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
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
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
.number_status {
  font-size: 3.5rem;
  font-weight: 600;
  color: #f0a500;
}
.status_description {
  font-size: 1.5rem;
  color: #2e414f;
}
ul {
  list-style-type: circle;
  padding: 10px;
}
</style>
