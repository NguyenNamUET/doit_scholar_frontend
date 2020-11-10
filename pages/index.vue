<template>
  <div>
    <section class="hero is-medium" id="content">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-end">
              <div class="navbar-item">
                <b-dropdown aria-role="list">
                  <button class="button is-light" slot="trigger" slot-scope="{ active }">
                    <span>{{ $t('default_layout.header.lang_switch') }}</span>
                    <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
                  </button>

                  <b-dropdown-item
                    v-for="(locale,index) in availableLocales"
                    :key="index"
                  >
                    <nuxt-link
                      :key="locale.code"
                      :to="switchLocalePath(locale.code)"
                    >
                    <span v-if="locale.name === 'English'">
                      Tiếng Anh
                    </span>
                      <span v-else>
                      {{ locale.name }}
                    </span>
                    </nuxt-link>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <img
            class="logo"
            src="~/static/logo.png"
            alt="DoIT Scholar"
          >
          <div class="subtitle has-text-black">
            {{$t('home_page.title')}}
          </div>
          <SearchBar
            :placeholder="$t('default_layout.header.search_bar_placeholder')"
            :current_page="this.localeRoute('search').path"
            style="box-shadow: 0 5px 8px 1px #C5C8C9;"
          />
        </div>
        <!---------------------------------------- CAROUSEL --------------------------------------------->
        <div class="container carousel_container">
          <b-carousel
            :pause-hover="true"
            :pause-info="false"
            :arrow="true"
            :indicator-mode="'hover'"
            :indicator-style="'is-lines'"
            :autoplay="false"
          >
            <b-carousel-item>
              <p
                class="content_title"
              >
                {{$t('home_page.author_carousel.title')}}
              </p>
              <div class="columns is-1">
                <div
                  class="column is-one-third"
                  v-for="result in most_cited_authors"
                  :key="result.authorId"
                >
                  <div class="card_wrapper">
                    <div class="content_box">
                      <a
                        class="author_name"
                        :href="'/author/' + formatTitle(result.name) + '-' + result.authorId"
                      >
                        <b>{{result.name}}</b>
                      </a>
                      <table style="width: 100%">
                        <tr v-if="result.aggregations.citationsCount.value !== undefined">
                          <td style="width: 90%">
                            <span class="text-class-3 color-class-3">
                              {{$t('home_page.author_carousel.citation')}}
                            </span>
                          </td>
                          <td>
                            <span
                              class="author_stat"
                            >
                              {{result.aggregations.citationsCount.value | formatNumber}}
                            </span>
                          </td>
                        </tr>
                        <tr v-if="result.aggregations.totalPapers.value !== undefined">
                          <td style="width: 90%">
                            <span class="text-class-3 color-class-3">
                              {{$t('home_page.author_carousel.publication')}}
                            </span>
                          </td>
                          <td>
                            <span
                              class="author_stat"
                            >
                            {{result.aggregations.totalPapers | formatNumber}}
                            </span>
                          </td>
                        </tr>
                        <tr v-if="result.aggregations.influentialCitationCount.value !== undefined">
                          <td>
                            <span class="text-class-3 color-class-3">
                              {{$t('home_page.author_carousel.highlighted_citation')}}
                            </span>
                          </td>
                          <td>
                            <span
                              class="author_stat"
                            >{{result.aggregations.influentialCitationCount.value | formatNumber}}</span>
                          </td>
                        </tr>
                        <tr v-if="result.h_index !== undefined">
                          <td>
                            <span class="text-class-3 color-class-3">
                              H_Index
                            </span>
                          </td>
                          <td>
                            <span
                              class="author_stat"
                            >{{result.h_index | formatNumber}}</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </b-carousel-item>

            <b-carousel-item>
              <p
                class="content_title"
              >
                {{$t('home_page.paper_carousel.title')}}
              </p>
              <div class="columns is-1">
                <div
                  class="column is-one-third"
                  v-for="result in most_cited_papers"
                  :key="result._source.paperId"
                >
                  <PaperCard
                    :paper_detail="result._source"
                  >
                  </PaperCard>
                </div>
              </div>
            </b-carousel-item>

            <b-carousel-item>
              <p
                class="content_title"
              >
                {{$t('home_page.fos_carousel.title')}}
              </p>
              <div class="columns is-1">
                <div
                  class="column is-one-third"
                  v-for="(value, key, index) in most_cited_fos"
                  :key="index"
                >
                  <div class="card_wrapper">
                    <div class="content_box">
                      <a
                        class="text-class-2 has-text-weight-medium"
                      >
                        {{key}}
                      </a>
                      <p>{{$t('home_page.fos_carousel.count')}}: {{value}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </b-carousel-item>
          </b-carousel>
        </div>
        <!---------------------------------------- CAROUSEL --------------------------------------------->

        <div class="info_container container">
          <div class="columns is-1">
            <div class="column has-text-centered is-half">
              <div>
                <client-only>
                  <number
                    class="number_status"
                    ref="author_count"
                    :from="0"
                    :to=author_count
                    :duration="5"
                    :format="formatNumber"
                  />
                </client-only>
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
                    :duration="5"
                  />
                </client-only>
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
                <span class="status_description">{{$t('home_page.page_stat.fos_count')}}</span>
              </div>

            </div>
            <div class="column has-text-centered is-half content_box">
              <DoughnutGraph
                :dataset="fos_chart_data"
                :title="$t('home_page.chart.paper_by_fos_chart')"
                style="height: 250px; width: 250px; display: inline-block"
              ></DoughnutGraph>
              <DoughnutGraph
                :dataset="venue_chart_data"
                :title="$t('home_page.chart.paper_by_venue_chart')"
                style="height: 250px; width: 250px; display: inline-block"
              >

              </DoughnutGraph>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-foot">
        <div id="footer">
          <div class="container">
            <div class="columns">
              <div class="column">
                <p>
                  <i class="fas fa-map-marker-alt"></i>
                  <b>{{ $t('default_layout.footer.address') }}: </b>
                  {{ $t('default_layout.footer.address_value') }}
                </p>
                <p>
                  <i class="fas fa-envelope"></i>
                  <b>Email: </b>
                  <a href="mailto:doit@vnu.edu.vn">doit@vnu.edu.vn</a>
                </p>
                <p>
                  <i class="fab fa-facebook-f"></i>
                  <b>Facebook: </b>
                  <a href="https://facebook.com/doitvn">DoIT</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {doughnut_chart_prep, formatNumber} from "assets/utils";
  import {
    all_author,
    all_field,
    all_paper,
    fos_graph_data,
    most_cited_authors,
    most_cited_papers, venue_graph_data
  } from "@/API/elastic_api";
  import DoughnutGraph from "@/components/static_components/DoughnutGraph";
  import AuthorCard from "@/components/search_page/AuthorCard";
  import PaperCard from "@/components/static_components/PaperCard";
  import {formatTitle} from 'assets/utils';

export default {
  components: {PaperCard, AuthorCard, DoughnutGraph},
  layout: 'home_layout',
  head() {
    return {
      title: 'DoIT Scholar - Your trusty academic search engine',
      meta: [
        {
          hid: 'info',
          name: 'info',
          content: 'Hệ thống tra cứu văn bản học thuật cập nhật nhất'
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
      most_cited_authors: null,
      most_cited_papers: null,
      most_cited_fos: null,
    }
  },
  async asyncData() {
    let results = null
    let fosChartData = null
    let venueChartData = null
    await Promise.all(
      [
        all_author(), all_paper(), all_field(),
        most_cited_authors(), most_cited_papers(), fos_graph_data({size: 3}),
        fos_graph_data({size: 1000}), venue_graph_data()
      ]
    ).then((res) => {
      results = res
      fosChartData = doughnut_chart_prep(results[6])
      venueChartData = doughnut_chart_prep(results[7])
    })
    return {
      author_count: results[0],
      paper_count: results[1],
      fos_count: results[2],

      fos_chart_data: fosChartData,
      venue_chart_data: venueChartData,

      most_cited_authors: results[3],
      most_cited_papers: results[4],
      most_cited_fos: results[5]
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

<style lang="scss" scoped>
  ._container {
    //background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    //background-size: 400% 400%;
    //animation: gradient 20s ease infinite;
    //background-color: #e8e8e8;
    min-height: 100vh;
    background: rgb(252,244,244);
    background: linear-gradient(45deg, rgba(252,244,244,1) 55%, rgba(255,255,255,1) 100%);
  }
  .info_container {
    margin-top: 40px;
    margin-bottom: 40px;
    min-height: 200px;
  }
  .status_container {
    background: #4e54c8;
    color: white;
    div {
      padding: 20px;
    }
  }
  .author_name {
    font-size: 24px;
    font-weight: 600;
  }
  .carousel_container {
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .author_stat {
    font-weight: 700;
    color: #dc710f;
    font-size: 14px;
  }
  #footer {
    a {
      color: white
    }
    p {
      margin-top: 10px;
    }
    background: #4e54c8;
    height: 180px;
    color: white;
    padding: 40px 40px 40px 80px;
  }
  .column.has-text-centered.is-half.content_box {
    border-radius: 10px 10px 10px 10px;
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
  .text-class-2 {
    color: #0352ba;
  }
</style>
