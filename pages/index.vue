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
            <div class="has-text-white is-size-1">91,016,667</div>
            <div class="has-text-white is-size-3">Tác Giả</div>
          </div>
          <div class="column has-text-centered">
            <div class="has-text-white is-size-1">188,942,513</div>
            <div class="has-text-white is-size-3">Văn Bản</div>
          </div>
          <div class="column has-text-centered">
            <div class="has-text-white is-size-1">720,885</div>
            <div class="has-text-white is-size-3">Lĩnh Vực</div>
          </div>
        </div>
      </div>
    </section>
    <BackgroundEffect/>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar";
import BackgroundEffect from "../components/BackgroundEffect";
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
        },
      ]
    }
  },
  data() {
    return {
      total_authors: 91016667,
      total_documents: 188942513,
      total_fields: 720885,
    }
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
</style>
