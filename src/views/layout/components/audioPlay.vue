<template>
  <div class="audioplay">
    <div
      class="audio-box"
      :class="[
        { 'light-footer-color': theme == 'light' },
        { 'dark-footer-color': theme == 'dark' },
        { 'green-footer-color': theme == 'green' }
      ]"
    >
      <div class="image">
        <div class="avatar">
          <img
            src="https://p1.music.126.net/mtSae3jtLn08Q4JgI42rpg==/109951165406982846.jpg"
            alt=""
          />
          <div class="avatar-mask">
            <i class="iconfont icon-kuoda"></i>
          </div>
        </div>
        <div class="user">
          <p>别让自己太过消沉</p>
          <p>Ariana Grande</p>
        </div>
      </div>
      <div class="audio-paly">
        <div class="audio-play-shang play-item">
          <i
            class="iconfont icon-shangyishoushangyige"
            :style="{ color: theme == 'green' ? '#449e60' : '' }"
          ></i>
        </div>
        <div class="audio-play-zhanti play-item">
          <i
            class="iconfont"
            :class="[
              { 'icon-bofang3': audio.playing == false },
              { 'icon-bofang2': audio.playing == true }
            ]"
            :style="{ color: theme == 'green' ? '#449e60' : '' }"
            @click="startPlayOrPause"
          ></i>
        </div>
        <div class="audio-play-xia play-item">
          <i
            class="iconfont icon-xiayigexiayishou"
            :style="{ color: theme == 'green' ? '#449e60' : '' }"
          ></i>
        </div>
      </div>
      <div class="paly-date">
        <p>
          {{
            audio.currentime != "" ? audio.currentime : "00:00" | formatSecond
          }}
        </p>
        <el-slider
          v-model="value"
          ref="slider"
          :format-tooltip="formatProcessToolTip"
          @change="progressChange"
        ></el-slider>
        <p>
          {{ audio.duration != "" ? audio.duration : "00:00" | formatSecond }}
        </p>
      </div>
      <div class="audio-volume">
        <i class="iconfont icon-laba" @click="mute" v-if="!audio.muted"></i>
        <i
          class="iconfont icon-jingyin"
          @click="cancelMute"
          v-if="audio.muted"
        ></i>
        <el-slider
          ref="volume"
          v-model="volume"
          :format-tooltip="formatVolumeToolTip"
          @change="onVolumeChange"
        ></el-slider>
      </div>
      <div class="audio-tool">
        <div class="tool-item">
          <i class="iconfont icon-suiji"></i>
        </div>
        <div class="tool-item">
          <i class="iconfont icon-geciweidianji"></i>
        </div>
        <div class="tool-item">
          <i class="iconfont icon-gedan1"></i>
        </div>
      </div>
    </div>
    <audio
      ref="audio"
      src="https://webfs.yun.kugou.com/202010261615/3f2d05aef27d797c6604a656eb70efd1/G242/M08/00/11/Mg4DAF-Tv1iAKeLPAD5esCfJN08223.mp3"
      @timeupdate="updateTime"
      @pause="onPause"
      @play="onPlay"
      @loadedmetadata="getDuration"
    ></audio>
  </div>
</template>

<script>
function realFormatSecond(second) {
  var secondType = typeof second;

  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);

    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;

    return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
  } else {
    return "00:00";
  }
}
export default {
  name: "AudioPaly",
  components: {},
  props: {},
  data() {
    return {
      thems: "",
      slider: "",
      volumeref: "",
      sliderdian: "",
      volumerefdian: "",
      scheduleColor: "",
      volume: 25, // 音量大小
      value: 0, // 音乐时间长度
      isvolume: true, // 控制音量
      changevolume: "", // 改变音量
      audio: {
        playing: false, // 控制播放
        muted: false,
        duration: "", // 音乐时长
        currentime: "" //当前播放音乐时长
      },
      cacheCurrent: 0 //
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
    // 改变进度条颜色
    theme() {
      this.themes = this.$store.state.theme;
      let color =
        this.themes == "dark"
          ? "#b82525"
          : this.themes == "light"
          ? "#EED2EE"
          : "#449e60";
      // console.log(color)
      this.scheduleColor = color;
      localStorage.setItem("scheduleColor", color);
      this.scheduleColor = localStorage.getItem("scheduleColor");
      this.slider.style.background = this.scheduleColor;
      this.volumeref.style.background = this.scheduleColor;
      this.sliderdian.style.border = `2px solid ${this.scheduleColor}`;
      this.volumerefdian.style.border = `2px solid ${this.scheduleColor}`;
      // console.log(this.scheduleColor);
      // console.log(this.theme);
    }
  },
  created() {
    // 改变进度条颜色
    this.getTheme();
    // console.log(this.scheduleColor)
  },
  mounted() {
    // 改变进度条颜色
    this.slider = this.$refs.slider.$refs.slider.childNodes[0];
    this.sliderdian = this.$refs.slider.$refs.slider.childNodes[1].firstChild;
    this.volumeref = this.$refs.volume.$refs.slider.childNodes[0];
    this.volumerefdian = this.$refs.volume.$refs.slider.childNodes[1].firstChild;
    // console.log(this.sliderdian)
    this.slider.style.background = this.scheduleColor;
    this.sliderdian.style.border = `2px solid ${this.scheduleColor}`;
    this.volumerefdian.style.border = `2px solid ${this.scheduleColor}`;
    this.volumeref.style.background = this.scheduleColor;
  },
  methods: {
    // 进度条
    formatProcessToolTip(index = 0) {
      index = parseInt((this.audio.duration / 100) * index);
      return "进度: " + realFormatSecond(index);
    },
    // 音量调
    formatVolumeToolTip(index) {
      return "音量: " + index;
    },
    // 改变进度条颜色
    getTheme() {
      this.themes = this.theme;
      this.scheduleColor = localStorage.getItem("scheduleColor");
      console.log(this.theme);
      // console.log(this.themes);
    },
    // 拖动音量滚动条
    // voiceChange() {
    //     this.cancelMute(false);
    //     if (this.volume === 0) {
    //         this.mute(false)
    //     }
    //     this.$refs.audio.volume = this.volume
    //     console.log(this.volume)
    //     console.log(this.$refs.audio.volume)
    // },
    // 静音
    mute() {
      if (this.volume != 0) {
        this.volume = 0;
      }
      this.audio.muted = true;
      this.$refs.audio.muted = true;
    }, //取消静音
    cancelMute() {
      this.volume = this.changevolume;
      this.audio.muted = false;
      this.$refs.audio.muted = false;
    },
    // 音量进度条
    onVolumeChange(index = 0) {
      this.$refs.audio.volume = index / 100;
      this.volume = index;
      this.changevolume = index;
      // this.$refs.audio.volume = this.audio.volume;
      // console.log(e)
    }, // 时间进度条
    progressChange(index) {
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.duration
      );
    },
    // inputChange(index) {
    //     console.log(index)
    //     this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.duration)
    // },
    // mouseupChangeTime() {
    //     this.progressChange(this.cacheCurrent);
    // },
    // 控制播放和暂停
    startPlayOrPause() {
      return this.audio.playing ? this.pause() : this.play();
    }, // 播放
    play() {
      this.$refs.audio.play();
    }, // 暂停音频
    pause() {
      this.$refs.audio.pause();
    },
    // 当音频播放
    onPlay() {
      this.audio.playing = true;
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
    }, // 获取音乐时长
    getDuration(res) {
      // let time;
      // let value = this.$refs.audio.duration;
      // let h = parseInt(value / 3600);
      // let m = parseInt((value % 3600) / 60);
      // let s = parseInt((value % 3600) % 60);
      // if (h > 0) {
      //     h = h < 10 ? "0" + h : h;
      //     time += h + ":";
      // }
      // m = m < 10 ? "0" + m : m;
      // s = s < 10 ? "0" + s : s;
      // time = m + ":" + s;
      this.audio.duration = parseInt(res.target.duration);

      // console.log(time);
      // console.log(this.$refs.audio.duration);
    },
    realFormatSecond(second) {
      this.cacheCurrent = second;
      return realFormatSecond(second);
    },
    updateTime(e) {
      // let time;
      // let value = e.target.currentTime;
      // // let h = parseInt(value / 3600);
      // let m = parseInt((value % 3600) / 60);
      // let s = parseInt((value % 3600) % 60);
      // if (h > 0) {
      //     h = h < 10 ? "0" + h : h;
      //     time += h + ":";
      // }
      // m = m < 10 ? "0" + m : m;
      // s = s < 10 ? "0" + s : s;
      // time = m + ":" + s;
      this.audio.currentime = e.target.currentTime;
      this.value = parseInt(
        (this.audio.currentime / this.audio.duration) * 100
      );
      // console.log(time);
    }
  },
  filters: {
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second);
    }
  }
};
</script>

<style lang="scss" scoped>
.audioplay {
  width: 100%;
  height: 4.28571rem;

  .audio-box {
    width: 100%;
    height: 100%;
    display: flex;

    // background-color: #ccc;
    .image {
      position: absolute;
      top: -4.28571rem;
      width: 15%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 0.875rem;

      .avatar {
        position: relative;
        width: 3.75rem;
        height: 3.75rem;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          border-radius: 0.3125rem;
        }

        .avatar-mask {
          position: absolute;
          top: 0;
          width: 3.75rem;
          height: 3.75rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 0.3125rem;
          opacity: 0;
          transition: all 1s;

          .icon-kuoda {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.875rem;
            color: #fff;
          }
        }
      }

      .avatar:hover .avatar-mask {
        opacity: 1;
      }

      .user {
        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }
    }

    .audio-paly {
      box-sizing: border-box;
      width: 18%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 1.25rem;
      cursor: pointer;

      .play-item {
        // height: 100%;

        .iconfont {
          font-size: 1.75rem;
          // color: #000;
          padding: 0 0.625rem;
        }
      }
    }

    .paly-date {
      width: 55%;
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 0.9375rem;

      .el-slider {
        width: 80%;

        .el-slider__runway {
          width: 100%;
          // background-color: red;

          .el-slider__bar {
            box-sizing: unset;
            // background: red;
          }
        }

        /deep/.el-slider__button-wrapper {
          display: none;
        }
      }
    }

    /deep/.el-slider__runway:hover .el-slider__button-wrapper {
      display: block;
    }

    .audio-volume {
      width: 10%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      cursor: pointer;

      .iconfont {
        width: 1.875rem;
        height: 1.875rem;
        font-size: 1.375rem;
        line-height: 1.875rem;
      }

      .icon-laba {
        margin-right: 0.9375rem;
      }

      .icon-jingyin {
        margin-right: 0.9375rem;
      }

      .el-slider {
        width: 80%;
        // padding: 0 0.9375rem;

        .el-slider__runway {
          width: 100%;

          .el-slider__bar {
            box-sizing: unset;
          }
        }

        /deep/.el-slider__button-wrapper {
          display: none;
        }
      }

      /deep/.el-slider__runway:hover .el-slider__button-wrapper {
        display: block;
      }
    }

    .audio-tool {
      width: 19%;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .tool-item {
        .iconfont {
          font-size: 1.5rem;
          cursor: pointer;
        }
      }
    }
  }

  .light-footer-color {
    background: var(--light-footer-bg-color);
    color: var(--light-text-color);
  }

  .dark-footer-color {
    background: var(--dark-footer-bg-color);
    color: var(--dark-text-color);
  }

  .green-footer-color {
    background: var(--green-footer-bg-color);
    color: #16181c;
  }
}
</style>
