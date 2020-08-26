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
            <div id="navbarMenuHeroA" class="navbar-menu">
              <div class="navbar-end">
                <a class="navbar-item" href="/">
                  Trang chủ
                </a>
                <a class="navbar-item" href="/">
                  Đăng nhập
                </a>
              </div>
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
          <SearchBar/>
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
    <div class="background-effect">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div >
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar";
import BackgroundEffect from "../components/BackgroundEffect";
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
    let author_count = await all_author({start:0, size:0})
    let paper_count = await all_paper({start:0, size:0})
    let fos_count = await all_field({size:0})
    return {
      author_count: author_count.total.value,
      paper_count: paper_count.total.value,
      fos_count: fos_count.fos_unique_count.value
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
  #content {
    width: 100%;
    position: absolute;
    z-index: 100;
  }

  .background-effect{
    background: #4e54c8;
    background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
    width: 100%;
    height: 130vh;
  }

  .circles{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .circles li{
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;

  }

  .circles li:nth-child(1){
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
  }


  .circles li:nth-child(2){
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
  }

  .circles li:nth-child(3){
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
  }

  .circles li:nth-child(4){
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }

  .circles li:nth-child(5){
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
  }

  .circles li:nth-child(6){
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
  }

  .circles li:nth-child(7){
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
  }

  .circles li:nth-child(8){
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }

  .circles li:nth-child(9){
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }

  .circles li:nth-child(10){
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
  }



  @keyframes animate {

    0%{
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }

    100%{
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }

  }
</style>
