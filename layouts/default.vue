<template>
  <div>
    <div>
      <nav id="layout_header" class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="container" id="nav_container">
          <div class="navbar-brand">
            <a class="navbar-item header-icon" href="/">
              <img
                class="logo"
                src="~/static/logo.png"
                alt="DoIT Scholar: Tra cứu văn bản học thuật"
              >
            </a>

            <a
              role="button"
              class="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="layout_search_bar"
              @click="showNav = !showNav"
              :class="{ 'is-active': showNav }"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div class="navbar-menu search-area" :class="{ 'is-active': showNav }">
            <div class="navbar-start">
              <div class="navbar-item">
                <SearchBar style="min-width: 50vw"></SearchBar>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div id="body_container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar";
export default {
  components: {SearchBar},
  chart_data() {
    return {
    }
  },
  data() {
    return {
      showNav: false
    }
  },
  methods: {
    toggleBurger() {
      document.querySelector('.navbar-menu').classList.toggle('is-active');
    }
  }
}
</script>

<style>
  @import 'assets/general_styling.scss';
  .logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  #nav_container {
    padding-left: 20px;
  }
  @media only screen and (max-width: 1022px){
    .search-area {
      margin-top: 50px;
      width: 96%;
    }
  }
</style>


