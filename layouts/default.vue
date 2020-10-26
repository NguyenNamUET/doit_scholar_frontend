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
                alt="DoIT Scholar"
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
                <SearchBar :placeholder="$t('default_layout.header.search_bar_placeholder')" style="min-width: 50vw"></SearchBar>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <b-dropdown aria-role="list">
                <button class="button is-light" slot="trigger" slot-scope="{ active }">
                  <span>{{ $t('default_layout.header.lang_switch') }}</span>
                  <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
                </button>

                <b-dropdown-item
                  v-for="locale in availableLocales"
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
</template>

<script>
import moment from 'moment';
import SearchBar from "../components/function_components/SearchBar";
export default {
  components: {SearchBar},
  chart_data() {
    return {
    }
  },
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
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    toggleBurger() {
      document.querySelector('.navbar-menu').classList.toggle('is-active');
    }
  }
}
</script>

<style lang="scss">
  @import 'assets/general_styling.scss';
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
    height: 180px;
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


