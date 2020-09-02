<template>
  <div class="container">
    <client-only>
      <vue-pdf
        :src="pdfSrc"
        :page="1"
        @num-pages="page_count = $event"
        @page-loaded="current_page = $event"
      >
      </vue-pdf>
      <div v-if="page_count > 1">
        <div v-for="(pageNum, index) in page_count " :key="index">
          <vue-pdf class="your-pdf-class" :src="pdfSrc" :page="pageNum" v-if="pageNum > 1"></vue-pdf>
          <br>
        </div>
      </div>
    </client-only>
    <div class="nav-menu">
      <input class="input page_nav is-small" type="number" v-model="current_page"> / {{ page_count }}
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
      current_page: 0
    }
  }
}
</script>

<style scoped>
  @import "assets/general_styling.scss";
  .container {
    margin-bottom: 20px;
    background-color: #2e414f;
    padding: 40px 20px;
  }
  .nav-menu {
    text-align: center;
    margin: auto;
    width: 30%;
    height: 100%;
    background-color: #2e414f;
    color: white;
    position: sticky;
    bottom: 30px;
    z-index: 1000;
    padding: 20px;
  }
  .page_nav {
    width: 20%;
  }
</style>
