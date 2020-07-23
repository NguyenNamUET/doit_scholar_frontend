<template>
  <nav class="navbar columns is-vcentered" role="navigation" aria-label="main navigation">
    <div class="navbar-brand column is-2" style="display: flex">
      <a class="navbar-item header-icon" href="/">
        <img src="logo.png">
      </a>

      <div role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
      onclick="document.querySelector('.navbar-menu').classList.toggle('is-active');">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
    </div>

    <div class="navbar-item column ">
      <SearchBar></SearchBar>
    </div>

    <div class="navbar-menu column is-3">
      <div class="navbar-start"></div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Đăng ký</strong>
            </a>
            <a class="button is-light">
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
.header{
  padding: 4px 14px;
  position: relative;
  z-index: 600;
}
</style>
<script>
  import SearchBar from "../components/SearchBar";
  export default {
    components: {SearchBar},
    data() {
      return {
      }
    }
  }
</script>
