<template>
  <div class="audioplay">
    <div
      class="audio-box"
      :style="[
        { background: theme == 'black' ? '#292c32' : '#f9f9f9' },
        { color: theme == 'black' ? '#fff' : '#000' }
      ]"
    >
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
        <p>00.00</p>
        <el-slider v-model="value" ref="slider"></el-slider>
        <p>00.00</p>
      </div>
      <div class="audio-volume">
        <i
          class="iconfont "
          :class="[
            { 'icon-laba': isvolume == true },
            { 'icon-jingyin': isvolume == false }
          ]"
          @click="onVolume"
        ></i>
        <el-slider
          ref="volume"
          v-model="volume"
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
      @pause="onPause"
      @play="onPlay"
    ></audio>
  </div>
</template>

<script>
export default {
  name: "AudioPaly",
  components: {},
  props: {
    theme: {
      type: String,
      defaule: "white"
    }
  },
  data() {
    return {
      slider: "",
      volumeref: "",
      sliderdian: "",
      volumerefdian: "",
      scheduleColor: "",
      volume: 100, // 音量大小
      value: 100, // 音乐时间长度
      isvolume: true, // 控制音量
      changevolume: "", // 改变音量
      audio: {
        playing: false // 控制播放
      }
    };
  },
  computed: {},
  watch: {
    // 改变进度条颜色
    theme() {
      let color =
        this.theme == "black"
          ? "#b82525"
          : this.theme == "white"
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
    this.getSchedule();
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
    formatTooltip(val) {
      return val / 100;
    },
    // 改变进度条颜色
    getSchedule() {
      this.scheduleColor = localStorage.getItem("scheduleColor");
      // console.log(this.scheduleColor)
    }, // 音量控制
    onVolume() {
      if (this.volume !== 0) {
        this.volume = 0;
      } else if (this.volume == 0) {
        this.volume = this.changevolume;
      }
      this.isvolume = !this.isvolume;
    }, // 音量进度条
    onVolumeChange(e) {
      this.changevolume = e;
      // console.log(e)
    }, // 控制播放和暂停
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

    .audio-paly {
      box-sizing: border-box;
      width: 18%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1.25rem;
      cursor: pointer;

      .play-item {
        // height: 100%;

        .iconfont {
          font-size: 2.1875rem;
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

      /deep/.el-slider {
        width: 80%;

        /deep/.el-slider__runway {
          width: 100%;
          // background-color: red;

          .el-slider__bar {
            box-sizing: unset;
            // background: red;
          }
        }

        .el-slider__button-wrapper {
          display: none;
        }
      }
    }

    /deep/.el-slider__runway:hover .el-slider__button-wrapper {
      display: block;
    }

    .audio-volume {
      width: 8%;
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

      /deep/.el-slider {
        width: 80%;
        // padding: 0 0.9375rem;

        /deep/.el-slider__runway {
          width: 100%;

          .el-slider__bar {
            box-sizing: unset;
          }
        }

        .el-slider__button-wrapper {
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
          font-size: 1.75rem;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
