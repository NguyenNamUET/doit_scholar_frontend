<template>
  <div>
    <section class="hero is-medium" id="content">
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <img
            class="logo"
            src="~/static/logo.png"
            alt="DoIT Scholar: Tra cứu văn bản học thuật"
          >
          <div class="subtitle has-text-black">
            Tra Cứu Dữ Liệu Học Thuật
          </div>
          <SearchBar style="box-shadow: 0 5px 8px 1px #C5C8C9;"/>
        </div>
        <div class="container carousel_container">
          <b-carousel
            :pause-hover="true"
            :pause-info="false"
            :arrow="false"
            :indicator-mode="'hover'"
            :indicator-style="'is-lines'"
          >
            <b-carousel-item>
              <p
                class="content_title"
              >
                Tác giả được trích dẫn nhiều nhất
              </p>
              <div class="columns is-1">
                <div
                  class="column is-one-third"
                  v-for="result in most_cited_authors"
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
                        <tr v-if="result.citationsCount !== undefined">
                          <td style="width: 90%">
                            <span class="text-class-3 color-class-3">Số lần được trích dẫn </span>
                          </td>
                          <td>
                            <span
                              class="author_stat"
                            >
                              {{result.citationsCount | formatNumber}}
                            </span>
                          </td>
                        </tr>
                        <tr v-if="result.totalPapers !== undefined">
                          <td style="width: 90%">
                            <span class="text-class-3 color-class-3">Số văn bản đã xuất bản </span>
                          </td>
                          <td>
                            <span
                              class="author_stat"
                            >
                            {{result.totalPapers | formatNumber}}
                            </span>
                          </td>
                        </tr>
                        <tr v-if="result.influentialCitationCount !== undefined">
                          <td>
                            <span class="text-class-3 color-class-3">Số trích dẫn có ảnh hưởng lớn</span>
                          </td>
                          <td>
                            <span
                              class="author_stat"
                            >{{result.influentialCitationCount | formatNumber}}</span>
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
                Văn bản được trích dẫn nhiều nhất</p>
              <div class="columns is-1">
                <div
                  class="column is-one-third"
                  v-for="result in most_cited_papers"
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
                Lĩnh vực nhiều văn bản nhất
              </p>
              <div class="columns is-1">
                <div
                  class="column is-one-third"
                  v-for="(value, key) in most_cited_fos"
                >
                  <div class="card_wrapper">
                    <div class="content_box">
                      <a
                        class="text-class-2 has-text-weight-medium"
                      >
                        {{key}}
                      </a>
                      <p>Tổng số văn bản: {{value}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </b-carousel-item>
          </b-carousel>
        </div>
        <div class="info_container container">
          <div class="columns is-1">
            <div class="column has-text-centered is-half">
              <div>
                <number
                  class="number_status"
                  ref="author_count"
                  :from="0"
                  :to=author_count
                  :duration="1.5"
                  :format="formatNumber"
                />
                <span class="status_description">Tác giả</span>
              </div>
              <div>
                <number
                  class="number_status"
                  ref="doc_count"
                  :from="0"
                  :to=paper_count
                  :format="formatNumber"
                  :duration="1.5"
                />
                <span class="status_description">Văn bản</span>
              </div>
              <div>
                <number
                  class="number_status"
                  ref="field_count"
                  :from="0"
                  :to=fos_count
                  :format="formatNumber"
                  :duration="1.5"
                />
                <span class="status_description">Lĩnh vực</span>
              </div>

<!--              <ul class="Words">-->
<!--                <li class="Words-line">-->
<!--                  <p class="text_effect">&nbsp;</p>-->
<!--                  <p class="text_effect">-->
<!--                    <number-->
<!--                    class="number_status"-->
<!--                    ref="author_count"-->
<!--                    :from="0"-->
<!--                    :to=author_count-->
<!--                    :duration="1.5"-->
<!--                    :format="formatNumber"/>-->
<!--                  </p>-->
<!--                </li>-->
<!--                <li class="Words-line">-->
<!--                  <p class="text_effect">-->
<!--                    <number-->
<!--                      class="number_status"-->
<!--                      ref="author_count"-->
<!--                      :from="0"-->
<!--                      :to=author_count-->
<!--                      :duration="1.5"-->
<!--                      :format="formatNumber"/>-->
<!--                  </p>-->
<!--                  <p class="text_effect">Tác giả</p>-->
<!--                </li>-->
<!--                <li class="Words-line">-->
<!--                  <p class="text_effect">Tác giả</p>-->
<!--                  <p class="text_effect">-->
<!--                    <number-->
<!--                      class="number_status"-->
<!--                      ref="doc_count"-->
<!--                      :from="0"-->
<!--                      :to=paper_count-->
<!--                      :format="formatNumber"-->
<!--                      :duration="1.5"-->
<!--                    />-->
<!--                  </p>-->
<!--                </li>-->
<!--                <li class="Words-line">-->
<!--                  <p class="text_effect">-->
<!--                    <number-->
<!--                      class="number_status"-->
<!--                      ref="doc_count"-->
<!--                      :from="0"-->
<!--                      :to=paper_count-->
<!--                      :format="formatNumber"-->
<!--                      :duration="1.5"-->
<!--                    />-->
<!--                  </p>-->
<!--                  <p class="text_effect">Văn bản</p>-->
<!--                </li>-->
<!--                <li class="Words-line">-->
<!--                  <p class="text_effect">Văn bản</p>-->
<!--                  <p class="text_effect">-->
<!--                    <number-->
<!--                      class="number_status"-->
<!--                      ref="field_count"-->
<!--                      :from="0"-->
<!--                      :to=fos_count-->
<!--                      :format="formatNumber"-->
<!--                      :duration="1.5"-->
<!--                    />-->
<!--                  </p>-->
<!--                </li>-->
<!--                <li class="Words-line">-->
<!--                  <p class="text_effect">-->
<!--                    <number-->
<!--                      class="number_status"-->
<!--                      ref="field_count"-->
<!--                      :from="0"-->
<!--                      :to=fos_count-->
<!--                      :format="formatNumber"-->
<!--                      :duration="1.5"-->
<!--                    />-->
<!--                  </p>-->
<!--                  <p class="text_effect">-->
<!--                    Lĩnh vực-->
<!--                  </p>-->
<!--                </li>-->
<!--                <li class="Words-line">-->
<!--                  <p class="text_effect">-->
<!--                    Lĩnh vực-->
<!--                  </p>-->
<!--                  <p class="text_effect">-->
<!--                    &nbsp;-->
<!--                  </p>-->
<!--                </li>-->
<!--              </ul>-->
            </div>
            <div class="column has-text-centered is-half content_box">
              <DoughnutGraph
                :dataset="fos_chart_data"
                :title="'Văn bản theo lĩnh vực'"
                style="height: 250px; width: 250px; display: inline-block"
              ></DoughnutGraph>
              <DoughnutGraph
                :dataset="venue_chart_data"
                :title="'Văn bản theo hội nghị'"
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
                  <b>Địa chỉ: </b>
                  Phòng 320 - E3 Trường đại học Công nghệ - Đại học Quốc gia Hà Nội
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
      title: 'Trang chủ | DoIT Scholar - Hệ thống tra cứu văn bản học thuật',
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
    let author_count = await all_author()
    let paper_count = await all_paper()
    let fos_count = await all_field()

    let most_cited_author = await most_cited_authors()
    let most_cited_paper = await most_cited_papers()
    let most_cited_fos = await fos_graph_data({size: 3})
    let fos_data = await fos_graph_data({size: 1000})
    let venue_data = await venue_graph_data()
    let fosChartData = doughnut_chart_prep(fos_data)
    let venueChartData = doughnut_chart_prep(venue_data)
    return {
      fos_chart_data: fosChartData,
      venue_chart_data: venueChartData,
      most_cited_fos: most_cited_fos,
      most_cited_authors: most_cited_author,
      most_cited_papers: most_cited_paper,
      author_count: author_count,
      paper_count: paper_count,
      fos_count: fos_count
    }
  },
  filters: {
    formatNumber(number) {
      return formatNumber(number)
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
