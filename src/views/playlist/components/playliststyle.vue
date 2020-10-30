<template>
  <div class="playliststyle">
    <div>
      <el-popover
        placement="bottom-start"
        :popper-class="allplaylist"
        width="500"
        ref="popover"
      >
        <div class="classification">全部歌单分类</div>
        <el-button
          class="all-btn"
          :class="[
            { 'all-btn1': themes == 'light' },
            { 'all-btn2': themes == 'dark' },
            { 'all-btn3': themes == 'green' }
          ]"
          plain
          round
          @click="allClick"
          >{{ all.name }}</el-button
        >
        <div class="playlist-box">
          <!-- 语言 -->
          <div>
            <div class="playlist-item">
              <div class="playlist-left">
                <i class="iconfont icon-yuyan"></i>
                <h2>语言</h2>
              </div>
              <div class="playlist-right">
                <ul>
                  <li
                    v-for="(item, index) in languages"
                    :key="index"
                    @click="onlabelClick(item.name)"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- 风格 -->
            <div class="playlist-item">
              <div class="playlist-left">
                <i class="iconfont icon-yinle2"></i>
                <h2>风格</h2>
              </div>
              <div class="playlist-right">
                <ul>
                  <li
                    v-for="(item, index) in musicstyle"
                    :key="index"
                    @click="onlabelClick(item.name)"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- 场景 -->
            <div class="playlist-item">
              <div class="playlist-left">
                <i class="iconfont icon-kafei"></i>
                <h2>场景</h2>
              </div>
              <div class="playlist-right">
                <ul>
                  <li
                    v-for="(item, index) in scenario"
                    :key="index"
                    @click="onlabelClick(item.name)"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- 情感 -->
            <div class="playlist-item">
              <div class="playlist-left">
                <i class="iconfont icon-qinggan"></i>
                <h2>情感</h2>
              </div>
              <div class="playlist-right">
                <ul>
                  <li
                    v-for="(item, index) in emotional"
                    :key="index"
                    @click="onlabelClick(item.name)"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- 主题 -->
            <div class="playlist-item">
              <div class="playlist-left">
                <i class="iconfont icon-huatizhuti"></i>
                <h2>主题</h2>
              </div>
              <div class="playlist-right">
                <ul>
                  <li
                    v-for="(item, index) in playtheme"
                    :key="index"
                    @click="onlabelClick(item.name)"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          class="all-label"
          slot="reference"
          :class="[
            { 'el-icon-arrow-down': alllabel == false },
            { 'el-icon-arrow-up': alllabel == true },
            { 'all-label-dark': themes == 'dark' }
          ]"
          :style="[
            { 'border-color': themes == 'dark' ? '#23262c' : '#767676' }
          ]"
          @click="alllabelClick"
        >
          {{ labelname !== "" ? labelname : "全部" }}
        </div>
      </el-popover>
    </div>
    <!-- 热门标签 -->
    <div class="hotlabel">
      <span>热门标签:</span>
      <span
        class="hot-item"
        :class="[
          { 'hot-active': index == hotindex && themes == 'light' },
          { 'hot-active1': index == hotindex && themes == 'dark' },
          { 'hot-active2': index == hotindex && themes == 'green' }
        ]"
        v-for="(item, index) in hotlabel"
        :key="index"
        @click="hotLabel(item, index)"
        >{{ item }}</span
      >
    </div>
  </div>
</template>

<script>
import { getcatlist, gethot } from "@/api/index.js";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      themes: "", //主题
      alllabel: false,
      allplaylist: "allplaylist", // 主题类
      categories: "", //主题分类
      all: "",
      languages: [], // 语言
      musicstyle: [], // 风格
      scenario: [], // 场景
      emotional: [], // 情感
      playtheme: [], // 主题
      hotlabel: ["全部"], //热门
      hotindex: "",
      labelname: ""
    };
  },
  computed: {
    // 主题
    theme() {
      return this.$store.state.theme;
    }
  },
  watch: {
    // 主题
    theme() {
      this.themes = this.$store.state.theme;
      this.allplaylist =
        this.themes == "light"
          ? "allplaylist allplaylist2"
          : this.themes == "dark"
          ? "allplaylist1 allplaylist2"
          : "allplaylist3 allplaylist2";
      // console.log(this.themes);
    }
  },
  created() {
    // 主题
    this.getTheme();
    // 获取歌单分类
    this.getcatlist();
    // 获取热门歌单分类
    this.gethot();
  },
  mounted() {},
  methods: {
    // 主题
    getTheme() {
      this.themes = this.theme;
      this.themes = localStorage.getItem("theme");
      this.allplaylist =
        this.themes == "light"
          ? "allplaylist allplaylist2"
          : this.themes == "dark"
          ? "allplaylist1 allplaylist2"
          : "allplaylist3 allplaylist2";
      // console.log(this.themes);
    },
    alllabelClick() {
      this.alllabel = !this.alllabel;
    }, // 获取歌单分类
    async getcatlist() {
      const { data } = await getcatlist();
      // console.log(data)
      this.categories = data.categories;
      this.all = data.all;
      data.sub.forEach(val => {
        if (val.category == 0) {
          this.languages.push(val);
        }
        if (val.category == 1) {
          this.musicstyle.push(val);
        }
        if (val.category == 2) {
          this.scenario.push(val);
        }
        if (val.category == 3) {
          this.emotional.push(val);
        }
        if (val.category == 4) {
          this.playtheme.push(val);
        }
      });
    },
    // 获取热门歌单分类
    async gethot() {
      const { data } = await gethot();
      data.tags.forEach(val => {
        this.hotlabel.push(val.name);
      });

      // console.log(data)
    },
    // 热门标签
    hotLabel(name, index) {
      this.hotindex = index;
      this.labelname = name;
      this.$emit("labelname", name);
    }, // 全部标签
    onlabelClick(name) {
      this.labelname = name;
      this.$refs.popover.doClose();
      this.$emit("labelname", name);
    },
    allClick() {
      this.$emit("labelname", "");
    }
  }
};
</script>

<style lang="scss">
.playliststyle {
  .all-label {
    width: 6.25rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    font-size: 0.875rem;
    border-radius: 0.3125rem;
    box-shadow: 0 0 0.07143rem var(--border-tint);
    cursor: pointer;
    outline: none;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .all-label-dark {
    background: var(--dark-block-bg-color);
    box-shadow: 0 0 0.07143rem var(--border);
    color: #dcdde4;
    cursor: pointer;
  }
  .hotlabel {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.125rem;
    align-items: center;
    margin: 1.25rem 0;
    .hot-item {
      display: inline-block;
      width: 5rem;
      height: 1.875rem;
      line-height: 1.875rem;
      text-align: center;
      cursor: pointer;
    }
    .hot-active {
      color: #eed2ee;
    }
    .hot-active1 {
      color: var(--dark-active-color);
    }
    .hot-active2 {
      color: var(--green-active-color);
    }
  }
}

.allplaylist2 {
  .classification {
    height: 2.8125rem;
    line-height: 45px;
  }

  .all-btn {
    margin-bottom: 1.25rem;
  }
  .playlist-box {
    height: 21.42857rem;
    overflow-y: auto;
    .playlist-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.25rem;

      .playlist-left {
        display: flex;
        justify-content: space-between;

        box-sizing: border-box;
        .iconfont {
          box-sizing: border-box;
          font-size: 1.375rem;
          margin-right: 0.625rem;
          line-height: 1.875rem;
        }
      }

      .playlist-right {
        ul {
          width: 25rem;
          box-sizing: border-box;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          list-style: none;
          flex: 5;
          li {
            width: 4.8125rem;
            height: 2.1875rem;
            line-height: 2.1875rem;
            text-align: center;
            border: 1px solid #ccc;
            cursor: pointer;
            font-size: 0.875rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
        }
      }
    }
  }
}

.allplaylist1 {
  background-color: #2d2f33;
  width: 32.5rem;
  color: #fff;

  .all-btn {
    width: 100%;
    color: #000;
    text-align: center;
    border-radius: 0.625rem;

    border: 1px solid var(--border);
  }

  .all-btn2 {
    width: 100%;
    color: #fff;
    text-align: center;
    border-radius: 0.625rem;
    border: 1px solid var(--border);
    background: var(--dark-block-bg-color);
  }

  .all-btn2:hover {
    background-color: var(--dark-block-bg-color);
    color: #b82525;
    border: 1px solid var(--border);
  }
  .all-btn2:focus {
    border-color: var(--border);
    outline: none;
    color: #fff;
    background-color: unset;
  }
  .playlist-right ul li:hover {
    color: #b82525;
  }
}

.allplaylist {
  width: 32.5rem;
  background-color: #fff;

  .all-btn1 {
    width: 100%;
    color: #000;
    text-align: center;
    border-radius: 0.625rem;
    border: 1px solid var(--border);
  }
  .all-btn1:focus {
    border-color: var(--border);
    outline: none;
    color: #000;
  }

  .all-btn1:hover {
    background-color: unset;
    color: #eed2ee;
    border: 1px solid var(--border);
  }

  .playlist-right ul li:hover {
    color: #eed2ee;
  }
}

.allplaylist3 {
  width: 32.5rem;
  background-color: #fff;

  .all-btn3 {
    width: 100%;

    color: #000;
    text-align: center;
    border-radius: 0.625rem;
    border: 1px solid var(--border);
  }
  .all-btn3:focus {
    border-color: var(--border);
    outline: none;
    color: #000;
  }
  .all-btn3:hover {
    background-color: unset;
    color: #3eb874;
    border: 1px solid var(--border);
  }

  .playlist-right ul li:hover {
    color: #3eb874;
  }
}
</style>
