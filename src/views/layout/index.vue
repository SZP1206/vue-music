<template>
  <div class="layout" :style="[{ background: themeColor }]">
    <el-container direction="vertical">
      <el-header :style="{ background: headerColor }" height="5rem">
        <Header @theme="themes" />
      </el-header>
      <el-container>
        <el-aside width="18%">
          <el-menu
            default-active="/"
            class="el-menu-vertical-demo"
            :class="[
              { 'is-active1': theme == 'white' },
              { 'is-active2': theme == 'black' },
              { 'is-active3': theme == 'green' }
            ]"
            :active-text-color="is_active"
            router
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="/" :class="[{ is_color: theme == 'black' }]">
              <i class="iconfont icon-yinle1"></i>
              <span slot="title">个性化推荐</span>
            </el-menu-item>
            <el-menu-item
              index="/playlist"
              :class="{ is_color: theme === 'black' }"
            >
              <i class=" iconfont icon-gedan"></i>
              <span class="title" slot="title">歌单</span>
            </el-menu-item>
            <el-menu-item index="4" :class="{ is_color: theme === 'black' }">
              <i class="iconfont icon-paihangbang--"></i>
              <span class="title" slot="title">排行榜</span>
            </el-menu-item>
            <el-menu-item index="5" :class="{ is_color: theme === 'black' }">
              <i class="iconfont icon-yonghu1"></i>
              <span class="title" slot="title">歌手</span>
            </el-menu-item>
            <el-menu-item index="6" :class="{ is_color: theme === 'black' }">
              <i class="iconfont icon-luxiang1"></i>
              <span class="title" slot="title">MV</span>
            </el-menu-item>
            <el-menu-item index="7" :class="{ is_color: theme === 'black' }">
              <i class="iconfont icon-14"></i>
              <span class="title" slot="title">最新音乐</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main
            :style="[
              { color: theme == 'black' ? '#ffffff' : '#000000' },
              { background: theme !== 'black' ? '#ffffff' : '#16181c' }
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
      theme: "",
      textColor: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getTheme();
  },
  mounted() {},
  methods: {
    themes(val) {
      // console.log(val);
      if (val.theme == "green") {
        // this.headerColor = val.back;
        // this.themeColor = "#f9f9f9";
        localStorage.setItem("themeColor", "#f9f9f9");
        localStorage.setItem("headerColor", val.back);
        localStorage.setItem("is_active", val.back);
        localStorage.setItem("theme", val.theme);
      } else if (val.theme == "black") {
        localStorage.setItem("themeColor", val.back);
        localStorage.setItem("headerColor", val.back);
        localStorage.setItem("is_active", "#b82525");
        localStorage.setItem("textColor", val.textColor);
        localStorage.setItem("theme", val.theme);
      } else {
        // this.themeColor = val.back;
        // this.header = val.back;
        localStorage.setItem("themeColor", val.back);
        localStorage.setItem("headerColor", val.back);
        localStorage.setItem("theme", val.theme);
        localStorage.setItem("is_active", "	#EED2EE");
      }
      this.getTheme();
    },
    getTheme() {
      //   console.log(this.headerColor);
      //   this.headerColor = localStorage.getItem("headerColor");
      //   this.themeColor = localStorage.getItem("themeColor");
      //   console.log(this.themeColor);
      if (
        localStorage.getItem("themeColor") == "" ||
        localStorage.getItem("headerColor") == ""
      ) {
        this.themeColor = "#f9f9f9";
        this.headerColor = "#f9f9f9";
      } else {
        this.themeColor = localStorage.getItem("themeColor");
        // console.log(this.themeColor);
        this.headerColor = localStorage.getItem("headerColor");
        this.textColor = localStorage.getItem("textColor");
        this.is_active = localStorage.getItem("is_active");
        this.theme = localStorage.getItem("theme");
      }
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

.el-aside[data-v-038e7047] {
  background-color: unset;
  text-align: unset;
}

/deep/.el-aside {
  // background-color: #D3DCE6;
  color: #333;

  line-height: 12.5rem;
  width: 21.875rem;

  .el-menu-vertical-demo {
    height: 100%;
    background-color: unset;
  }

  .el-menu-vertical-demo .el-menu {
    text-align: unset;
    padding: 0;
    padding-left: 1.25rem;
  }

  .el-menu-item {
    padding: 0;
    font-size: 1rem;

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
  background-color: #d3dce6;
  color: #333;
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
