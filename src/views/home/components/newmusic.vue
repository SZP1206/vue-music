<template>
  <div class="newmusic">
    <div class="title">
      <i class="iconfont icon-circleyuanquan" style="color: red;"></i>
      <h3 style="margin-left: 0.625rem">最新音乐</h3>
    </div>
    <div class="newmusic-box">
      <div
        class="newmusic-item"
        v-for="(item, index) in newsongs"
        :key="item.id"
      >
        <span class="num">{{ index + 1 }}</span>
        <div class="img">
          <el-image :src="item.picUrl"></el-image>
          <i class="iconfont icon-bofang"></i>
        </div>
        <div>
          <p>{{ item.name }}</p>
          <p>{{ item.song.artists[0].name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsong } from "@/api/index.js";
export default {
  name: "NewMusic",
  components: {},
  props: {},
  data() {
    return {
      newsongs: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getNewsong();
  },
  mounted() {},
  methods: {
    async getNewsong() {
      const data = await getNewsong();
      this.newsongs = data.data.result;
      // console.log(data)
    }
  }
};
</script>

<style lang="scss" scoped>
.newmusic {
  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 6.25rem;
    margin: 0;
  }

  .newmusic-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.875rem;
    flex-wrap: wrap;
    margin-bottom: 1.875rem;

    .newmusic-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      box-sizing: border-box;
      width: 49%;
      height: 5.625rem;
      box-sizing: border-box;
      padding: 0.3125rem 0.625rem;
      cursor: pointer;

      .num {
        width: 1.25rem;
        height: 1.25rem;
        text-align: center;
      }

      .img {
        position: relative;
        width: 5rem;
        height: 5rem;
        margin: 0 0.9375rem;

        .el-image {
          height: 100%;
          width: 100%;
        }

        .icon-bofang {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.25rem;
          color: #fff;
        }
      }
    }

    .newmusic-item:hover {
      background: rgba(249, 249, 249, 0.8);
    }
  }
}
</style>
