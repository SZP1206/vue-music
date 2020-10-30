<template>
  <div
    class="layout"
    :class="[
      { 'light-bg-color': theme == 'light' },
      { 'dark-bg-color': theme == 'dark' },
      { 'green-bg-color': theme == 'green' }
    ]"
    :style="[{ '--scrollbar-thumb-color': theme == 'light' ? 'red' : 'green' }]"
  >
    <el-container direction="vertical">
      <el-header
        :class="[
          { 'green-bg-color': theme == 'green' },
          { 'dark-bg-color': theme == 'dark' },
          { 'light-bg-color': theme == 'light' }
        ]"
        height="5rem"
      >
        <Header />
      </el-header>
      <el-container>
        <el-aside
          width="18%"
          :class="[
            { 'light-aside-color': theme == 'light' },
            { 'dark-aside-color': theme == 'dark' },
            { 'green-aside-color': theme == 'green' }
          ]"
        >
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            :class="[
              { 'is-active1': theme == 'light' },
              { 'is-active2': theme == 'drak' },
              { 'is-active3': theme == 'green' }
            ]"
            :active-text-color="is_active"
            router
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="/" :class="[{ is_color: theme == 'dark' }]">
              <i class="iconfont icon-yinle1"></i>
              <span slot="title">个性化推荐</span>
            </el-menu-item>
            <el-menu-item
              index="/playlist"
              :class="{ is_color: theme === 'dark' }"
            >
              <i class=" iconfont icon-gedan"></i>
              <span class="title" slot="title">歌单</span>
            </el-menu-item>
            <el-menu-item index="4" :class="{ is_color: theme === 'dark' }">
              <i class="iconfont icon-paihangbang--"></i>
              <span class="title" slot="title">排行榜</span>
            </el-menu-item>
            <el-menu-item index="5" :class="{ is_color: theme === 'dark' }">
              <i class="iconfont icon-yonghu1"></i>
              <span class="title" slot="title">歌手</span>
            </el-menu-item>
            <el-menu-item index="6" :class="{ is_color: theme === 'dark' }">
              <i class="iconfont icon-luxiang1"></i>
              <span class="title" slot="title">MV</span>
            </el-menu-item>
            <el-menu-item index="7" :class="{ is_color: theme === 'dark' }">
              <i class="iconfont icon-14"></i>
              <span class="title" slot="title">最新音乐</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main
            :class="[
              { 'light-main-color': theme == 'light' },
              { 'dark-main-color': theme == 'dark' },
              { 'green-main-color': theme == 'green' }
            ]"
          >
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <div class="audio">
      <audio-play :theme="theme" :themeColor="themeColor" />
    </div>
  </div>
</template>

<script>
// import { set } from "vue/types/umd";
import Header from "./components/header";
import AudioPlay from "./components/audioPlay";
// import { mapState } from "vuex";
export default {
  name: "Layout",
  components: {
    Header,
    AudioPlay
  },
  props: {},
  data() {
    return {
      themeColor: "",
      color: "",
      headerColor: "",
      is_active: "",
      themes: "",
      textColor: ""
    };
  },
  computed: {
    theme() {
      return this.$store.state.theme;
      // return
      // ...mapState(["theme"])
    }
  },
  watch: {
    theme() {
      this.themes = this.$store.state.theme;
      this.is_active =
        this.themes == "light"
          ? "#EED2EE"
          : this.themes == "dark"
          ? "#b82525"
          : "#3eb874";
      // console.log(this.is_active);
      // console.log(this.themes);
      // this.getTheme();
    }
  },
  created() {
    // this.getTheme();
    // this.theme = this.$store.state.theme
    this.getTheme();
  },
  mounted() {},
  methods: {
    getTheme() {
      this.themes = this.theme;
      this.is_active =
        this.themes == "light"
          ? "#EED2EE"
          : this.themes == "dark"
          ? "#b82525"
          : "#3eb874";

      // this.themes == "green" ?

      // "#2d8cf0";
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
  // background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 3.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hdaderColor {
  background: var(--green-bg-color);
}

.el-aside[data-v-038e7047] {
  // background-color: unset;
  text-align: unset;
}

.el-aside {
  // color: #333;

  line-height: 12.5rem;
  width: 21.875rem;

  .el-menu-vertical-demo {
    height: 100%;
    // background-color: unset;
  }

  .el-menu {
    text-align: unset;
    padding: 0;
    padding-left: 1.25rem;
    background-color: unset;
  }

  .el-menu-item {
    padding: 0;
    font-size: 1rem;
    // color: unset;

    .iconfont {
      padding-right: 0.3125rem;
    }

    // padding-left: 0 !important;
  }

  .is-active1 {
    border-right: 0.0625rem solid #e6e6fa;
  }

  .is-active2 {
    border-right: 0.0625rem solid #b82525;
  }

  .is-active3 {
    border-right: 0.0625rem solid #449e60;
  }

  .is_color {
    color: #fff;
  }

  .is_color2 {
    color: #292c32;
  }
}

.el-main {
  // background-color: #E9EEF3;
  color: #333;
  padding: 1.25rem 6.25rem;
  margin-bottom: 3.125rem;
}

.light-bg-color {
  background: var(--light-bg-color);
  color: var(--light-text-color);
}

.dark-bg-color {
  background: var(--dark-header-bg-color);
  color: var(--dark-text-color);
}

.green-bg-color {
  background: var(--green-bg-color);
  color: var(--green-text-color);
}

.light-aside-color {
  background: var(--light-aside-bg-color);
  color: var(--light-text-color);
}

.dark-aside-color {
  background: var(--dark-aside-bg-color);
  color: var(--dark-text-color) !important;
}

.green-aside-color {
  background: var(--green-aside-bg-color);
  color: var(--green-text-color);
}

.light-main-color {
  background: #fff;
  color: var(--light-text-color);
}

.dark-main-color {
  background: var(--dark-bg-color);
  color: var(--dark-text-color);
}

.green-main-color {
  background: #fff;
  color: var(--light-text-color);
}

body > .el-container {
  margin-bottom: 2.5rem;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 16.25rem;
}

.el-container:nth-child(7) .el-aside {
  line-height: 20rem;
}

.el-container {
  height: 100%;
}

.el-aside {
  // background-color: #d3dce6;
  // color: #333;
  text-align: center;
  line-height: 100vh;
}

.layout {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f9f9f9;

  .audio {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 100;
  }
}
</style>
