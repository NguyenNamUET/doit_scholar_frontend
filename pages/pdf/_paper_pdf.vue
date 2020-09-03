<template>
  <div class="container">
    <div class="pdf_container">
      <vue-pdf
        :src="pdfSrc"
        :page="1"
        :key="1"
        v-bind:id="'in-view-' + 1"
        @num-pages="page_count = $event"
        ref="inview"
      >
      </vue-pdf>
      <div v-if="page_count > 1">
        <div v-for="(pageNum, index) in page_count ">
          <span style="color:white;" v-if="pageNum > 1">{{pageNum}}</span>
          <vue-pdf
            v-bind:id="'in-view-' + pageNum"
            :src="pdfSrc"
            :page="index+1"
            v-if="pageNum > 1"
          >
          </vue-pdf>
        </div>
      </div>
    </div>

    <div class="nav-menu">
      <div class="columns">
        <div class="column">
          <a
            class="button is-fullwidth nav_button"
            v-scroll-to="{el: '#in-view-' + in_view, offset: -60, cancelable: false}"
            v-on:click="in_view > 1 ? in_view-- : in_view"
          >
            <i class="fas fa-arrow-left"></i> Trang trước
          </a>
        </div>
        <div class="column is-one-fifth nav_page">
          <input
            class="input is-small page_box"
            type="number"
            v-model="in_view"
            v-on:keypress.enter="goToPage"
          >
          <span style="font-size: larger">/ {{ page_count }}</span>
          <a
            v-show="false"
            class="button"
            v-scroll-to="{el: '#in-view-' + in_view, offset: -60, cancelable: false}"
            ref="jumpPage"
          >
          </a>
        </div>
        <div class="column">
          <a
            class="button is-fullwidth nav_button"
            v-scroll-to="{el: '#in-view-' + in_view, offset: -60, cancelable: false}"
            v-on:click="in_view < page_count ? in_view++ : in_view"
          >
            Trang sau <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "_paper_pdf",
  head() {
    return {
      title: 'DoIT Scholar'
    }
  },
  data() {
    return {
      pdfSrc: '/pdf.pdf',
      page_count: 0,
      in_view: 1,
      pdf_height: 0,
      scroll_position: 0,
    }
  },
  methods: {
    goToPage() {
      this.$refs.jumpPage.click()
    },
    getComponentHeight() {
      console.log(document.getElementById('in-view-1').offsetTop)
      return document.getElementById('in-view-1').offsetTop
    },
    updateScrollPosition() {
      this.scroll_position = window.scrollY
    },
    updatePageOnScroll() {
      let page = Math.floor(this.scroll_position / this.pdf_height) + 1
      if (1 <= page && page <= this.page_count) this.in_view = page
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScrollPosition);
    window.addEventListener('scroll', this.updatePageOnScroll);
    this.pdf_height = 1400
  }
}
</script>

<style scoped>
  @import "assets/general_styling.scss";
  .container {
    padding: 40px 20px;
  }
  .nav-menu {
    text-align: center;
    margin: auto;
    color: white;
    position: sticky;
    bottom: 0;
    z-index: 1000;
  }
  .nav_page {
    background-color: #bd9493;
  }
  .nav_button {
    background-color: #767676;
  }
  .page_box {
    width: 30%;
    margin: 2px;
  }
  a {
    color: white;
  }
  a:hover {
    color: white;
    text-decoration: none;
  }
  .pdf_container {
    margin-bottom: 20px;
  }
</style>
