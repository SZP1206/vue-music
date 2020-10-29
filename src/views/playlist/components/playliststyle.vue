<template>
  <div class="playliststyle">
    <div>
      <el-popover
        placement="bottom-start"
        :popper-class="allplaylist"
        width="500"
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
          >全部歌单</el-button
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
                  <li v-for="(item, index) in languages" :key="index">
                    {{ item }}
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
                  <li v-for="(item, index) in musicstyle" :key="index">
                    {{ item }}
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
                  <li v-for="(item, index) in scenario" :key="index">
                    {{ item }}
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
                  <li v-for="(item, index) in emotional" :key="index">
                    {{ item }}
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
                  <li v-for="(item, index) in playtheme" :key="index">
                    {{ item }}
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
          @click="alllabel = !alllabel"
        >
          全部
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      index: "",
      themes: "",
      alllabel: false,
      allplaylist: "allplaylist",
      languages: ["华语", "欧美", "日语", "韩语", "粤语"],
      musicstyle: [
        "流行",
        "摇滚",
        "民谣",
        "电子",
        "舞曲",
        "说唱",
        "轻音乐",
        "爵士",
        "乡村",
        " R&B/Soul",
        "舞曲",
        "说唱",
        "古典",
        "民族",
        "英伦",
        " 金属",
        "朋克",
        "蓝调",
        "雷鬼",
        "世界音乐",
        "拉丁",
        "New Age",
        "古风",
        "后摇",
        "BossaNova"
      ],
      scenario: [
        "清晨",
        "夜晚",
        "学习",
        "工作",
        "午休",
        "下午茶",
        "地铁",
        "驾车",
        "运动",
        "旅行",
        "散步",
        "酒吧"
      ],
      emotional: [
        "怀旧",
        "清新",
        "浪漫",
        "伤感",
        "治愈",
        "放松",
        "孤独",
        "感动",
        "兴奋",
        "快乐",
        "安静",
        "思念"
      ],
      playtheme: [
        "综艺",
        "影视原声",
        "ACG",
        "儿童",
        "70后",
        "80后",
        "90后",
        "00后",
        "网络歌曲",
        "KTV",
        "经典",
        "翻唱",
        "吉他",
        "钢琴",
        "乐器",
        "榜单"
      ]
    };
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    }
  },
  watch: {
    theme() {
      this.themes = this.$store.state.theme;
      this.allplaylist =
        this.themes == "light"
          ? "allplaylist allplaylist2"
          : this.themes == "dark"
          ? "allplaylist1 allplaylist2"
          : "allplaylist3 allplaylist2";
      console.log(this.themes);
    }
  },
  created() {
    this.getTheme();
  },
  mounted() {},
  methods: {
    getTheme() {
      this.themes = this.theme;
      this.themes = localStorage.getItem("theme");
      this.allplaylist =
        this.themes == "light"
          ? "allplaylist allplaylist2"
          : this.themes == "dark"
          ? "allplaylist1 allplaylist2"
          : "allplaylist3 allplaylist2";
      console.log(this.themes);
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
    border-radius: 0.3125rem;
    box-shadow: 0 0 0.07143rem var(--border-tint);
    cursor: pointer;
    outline: none;
  }

  .all-label-dark {
    background: var(--dark-block-bg-color);
    box-shadow: 0 0 0.07143rem var(--border);
    color: #dcdde4;
    cursor: pointer;
  }
}

.allplaylist2 {
  .classification {
    height: 2.8125rem;
    line-height: 45px;

    // border-bottom: 1px solid #fff;
  }

  .all-btn {
    margin-bottom: 1.25rem;
  }
  .playlist-box {
    height: 21.42857rem;
    overflow-y: auto;
    .playlist-item {
      // box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      // align-items: center;
      margin-bottom: 1.25rem;

      .playlist-left {
        // width: 4.625rem;
        // height: 1.875rem;
        // line-height: 1.875rem;
        display: flex;
        justify-content: space-between;
        // align-items: center;
        box-sizing: border-box;
        .iconfont {
          box-sizing: border-box;
          font-size: 1.375rem;
          margin-right: 0.625rem;
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
            //    flex-wrap: wrap;
            // box-sizing: border-box;
            width: 4.8125rem;
            height: 2.1875rem;
            line-height: 2.1875rem;
            text-align: center;
            border: 1px solid #ccc;
            cursor: pointer;
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
  // background: unset !important;
  // background-color: red;

  .all-btn {
    width: 100%;
    // color: red;
    // height: 2.1875rem;
    // line-height: 2.1875rem;
    color: #000;
    text-align: center;
    border-radius: 0.625rem;

    border: 1px solid var(--border);
  }

  .all-btn2 {
    width: 100%;
    // color: red;
    // height: 2.1875rem;
    // line-height: 2.1875rem;
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
  // background: unset !important;
  // background-color: red;

  .all-btn1 {
    width: 100%;
    // color: red;
    // height: 2.1875rem;
    // line-height: 2.1875rem;
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
