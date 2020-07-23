<template>
  <div class="_container">
    <section class="hero is-medium">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item" style="font-size: x-large">
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
                <a class="navbar-item is-active">
                  Trang chủ
                </a>
                <a class="navbar-item">
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
          <h1 class="title">
            Tra cứu dữ liệu học thuật
          </h1>
          <SearchBar/>
        </div>
      </div>

      <!-- Hero footer: will stick at the bottom -->
      <div class="hero-foot">
        <div class="columns is-centered">
          <div class="column is-mobile is-half">
            <p class="bd-notification is-primary">
              <code class="html">is-half</code><br>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar";
export default {
  components: {SearchBar}
}
</script>

<style lang="scss" scoped>
  @import "assets/home.scss";
</style>
