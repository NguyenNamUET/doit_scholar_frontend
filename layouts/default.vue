<template>
  <client-only>
    <div>
    <div>
      <div id="layout_header" class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="container" id="nav_container">
          <div class="navbar-brand">
            <a class="navbar-item header-icon" href="/">
              <img
                class="logo"
                src="~/static/compasify.png"
                alt="Compasify"
              >
            </a>

            <a
              role="button"
              class="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="nav_content"
              @click="showNav = !showNav"
              :class="{ 'is-active': showNav }"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="nav_content" class="navbar-menu search-area" :class="{ 'is-active': showNav }">
            <div class="navbar-start">
              <div class="navbar-item">
                <SearchBar :placeholder="$t('default_layout.header.search_bar_placeholder')"
                           :current_page="this.localeRoute('search').path"
                           style="min-width: 50vw">
                </SearchBar>
              </div>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="navbar-item has-dropdown is-hoverable">
                  <a class="navbar-link">
                    {{ $t('default_layout.header.lang_switch') }}
                  </a>

                  <div class="navbar-dropdown">
                    <a
                      v-for="(locale,index) in availableLocales"
                      :key="index"
                      class="navbar-item"
                    >
                      <nuxt-link
                        :key="locale.code"
                        :to="switchLocalePath(locale.code)"
                      >
                      <span v-if="locale.code === 'en'">
                        {{$t('general_attribute.lang.en')}}
                      </span>
                        <span v-else-if="locale.code === 'vi'">
                        {{$t('general_attribute.lang.vi')}}
                      </span>
                      </nuxt-link>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="body_container">
      <Nuxt />
    </div>
    <div id="footer">
      <div class="container">
        <div class="columns">
          <div class="column">
            <p>
              <i class="fas fa-map-marker-alt"></i>
              <b>{{ $t('default_layout.footer.address') }} </b>
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
  </client-only>
</template>

<script>
import SearchBar from "../components/function_components/SearchBar";
export default {
  components: {SearchBar},
  head() {
    return this.$nuxtI18nSeo();
  },
  data() {
    return {
      showNav: false
    }
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code)
    }
  },
  methods: {
    toggleBurger() {
      document.querySelector('.navbar-menu').classList.toggle('is-active');
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'assets/general_styling.scss';
  a:hover {
    text-decoration: none;
  }
  .logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  #nav_container {
    padding-left: 20px;
  }
  #footer {
    a {
      color: white
    }
    p {
      margin-top: 10px;
    }
    background: #4e54c8;
    height: 35vh;
    color: white;
    padding: 40px 40px 40px 80px;
  }
  @media only screen and (max-width: 1022px){
    .search-area {
      margin-top: 50px;
      width: 96%;
    }
  }
</style>


