<template>
  <div class="_container">
    <section class="hero is-medium" id="content">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item" style="font-size: x-large" href="/">
                DoIT Scholar
              </a>
              <span class="navbar-burger burger" data-target="navbarMenuHeroA">
            <span></span>
            <span></span>
            <span></span>
          </span>
            </div>
          </div>
        </nav>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="title has-text-white is-size-1">
            Tra Cứu Dữ Liệu Học Thuật
          </div>
          <SearchBar :home="true"/>
        </div>
      </div>

      <!-- Hero footer: will stick at the bottom -->
      <div class="hero-foot">
        <div class="columns is-primary">
          <div class="column has-text-centered">
            <number
              class="has-text-white is-size-1"
              ref="author_count"
              :from="0"
              :to=author_count
              :duration="1.5"
              :format="formatNumber"
            />
            <div class="has-text-white is-size-3">Tác Giả</div>
          </div>
          <div class="column has-text-centered">
            <number
              class="has-text-white is-size-1"
              ref="doc_count"
              :from="0"
              :to=paper_count
              :format="formatNumber"
              :duration="1.5"
            />
            <div class="has-text-white is-size-3">Văn Bản</div>
          </div>
          <div class="column has-text-centered">
            <number
              class="has-text-white is-size-1"
              ref="field_count"
              :from="0"
              :to=fos_count
              :format="formatNumber"
              :duration="1.5"
            />
            <div class="has-text-white is-size-3">Lĩnh Vực</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SearchBar from "../components/function_components/SearchBar";
import {formatNumber} from "assets/utils";
import {all_author, all_field, all_paper} from "@/API/elastic_api";

export default {
  components: {BackgroundEffect, SearchBar},
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
      parent_height: 0
    }
  },
  async asyncData({query, store}) {
    let author_count = await all_author()
    let paper_count = await all_paper()
    let fos_count = await all_field()
    return {
      author_count: author_count,
      paper_count: paper_count,
      fos_count: fos_count
    }
  },
  methods: {
    formatNumber(number) {
      return formatNumber(number)
    },
    get_height() {
      return document.getElementById('content').offsetHeight
    }
  },
  beforeUpdate() {
    this.parent_height = this.get_height() + 'px'
  }
}
</script>

<style lang="scss" scoped>
  @import "assets/home.scss";
  ._container {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 20s ease infinite;
    min-height: 100vh;
    }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
