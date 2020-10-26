<template>
  <div class="exclusive">
    <div class="title">
      <i class="iconfont icon-circleyuanquan" style="color: red;"></i>
      <h3 style="margin-left: 0.625rem">独家放送</h3>
    </div>
    <div class="exclusive-box">
      <div class="exclusive-item" v-for="item in exclusives" :key="item.id">
        <div class="exclusive-img">
          <el-image :src="item.picUrl"></el-image>
        </div>
        <div class="play">
          <i class=" iconfont icon-luxiang"></i>
        </div>
        <span class="exclusive-text">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getExclusive } from "@/api/index.js";
export default {
  name: "Exclusive",
  components: {},
  props: {},
  data() {
    return {
      exclusives: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getExclusive();
  },
  mounted() {},
  methods: {
    async getExclusive() {
      const data = await getExclusive();
      this.exclusives = data.data.result;
      // console.log(data)
    }
  }
};
</script>

<style lang="scss" scoped>
.exclusive {
  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 6.25rem;
    margin: 0;
  }

  .exclusive-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.875rem;
    cursor: pointer;

    .exclusive-item {
      position: relative;
      width: 33.33%;
      box-sizing: border-box;
      padding: 0.3125rem 0.625rem;

      .el-image {
        width: 100%;
        height: 100%;
      }

      .exclusive-text {
        font-size: 1rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      .play {
        width: 1.875rem;
        height: 1.875rem;
        border-radius: 50%;
        position: absolute;
        background: rgba(0, 0, 0, 0.2);
        top: 0.625rem;
        left: 0.9375rem;
        z-index: 1;
        text-align: center;
        line-height: 3.125rem;
        font-size: 1.875rem;

        .icon-luxiang {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1rem;
          color: #fff;
        }
      }
    }
  }
}
</style>
