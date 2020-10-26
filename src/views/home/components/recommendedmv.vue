<template>
  <div class="recommendedmv">
    <div class="title">
      <i class="iconfont icon-circleyuanquan" style="color: red;"></i>
      <h3 style="margin-left: 0.625rem">推荐MV</h3>
    </div>
    <div class="recommendedmv-box">
      <div class="recommendedmv-item" v-for="item in mvs" :key="item.id">
        <div class="img-box">
          <div class="tooltip">
            <i class="iconfont icon-luxiang"></i>
            {{ item.playCount }}
          </div>
          <div class="play">
            <i class=" iconfont icon-icon_play"></i>
          </div>
          <el-image :src="item.picUrl"></el-image>
        </div>
        <p>{{ item.name }}</p>
        <p class="name">{{ item.artistName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getMv } from "@/api/index.js";
export default {
  name: "RecommendedMv",
  components: {},
  props: {},
  data() {
    return {
      mvs: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getMv();
  },
  mounted() {},
  methods: {
    async getMv() {
      const data = await getMv();
      this.mvs = data.data.result;
      this.mvs.forEach(value => {
        if (value.playCount >= 10000) {
          value.playCount = parseInt(value.playCount / 10000) + "万";
        }
      });
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.recommendedmv {
  margin-bottom: 5rem;

  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 6.25rem;
    margin: 0;
  }

  .recommendedmv-box {
    display: flex;
    flex-wrap: wrap;

    .recommendedmv-item {
      position: relative;
      box-sizing: border-box;
      width: 25%;
      height: 14.375rem;
      padding: 0.625rem 0.9375rem;
      cursor: pointer;

      .img-box {
        position: relative;
        width: 100%;
        height: 10.9375rem;

        .el-image {
          width: 100%;
          height: 100%;
          border-radius: 0.3125rem;
        }

        .tooltip {
          box-sizing: border-box;
          position: absolute;
          // border-radius: 0.625rem;
          top: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.4));
          height: 1.875rem;
          z-index: 2;
          text-align: right;
          line-height: 1.875rem;
          color: #fff;
          padding: 0 0.625rem;

          // transition: all 0.6s;
          .icon-luxiang {
            font-size: 1.25rem;
          }
        }

        .play {
          width: 3.125rem;
          height: 3.125rem;
          border-radius: 50%;
          position: absolute;
          background: rgba(255, 255, 255, 0.5);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          text-align: center;
          line-height: 3.125rem;
          font-size: 1.875rem;
          transition: all 0.6s;
          opacity: 0;

          .icon-icon_play {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.25rem;
            color: rgb(232, 60, 60);
          }
        }
      }

      p {
        margin: 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }

      .name {
        color: #666666;
      }
    }
  }

  .recommendedmv-item:hover .img-box .play {
    opacity: 1;
  }
}
</style>
