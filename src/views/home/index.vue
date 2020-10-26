<template>
  <div class="Home">
    <div class="banner">
      <el-carousel
        :interval="4000"
        type="card"
        height="12.5rem"
        indicator-position="none"
      >
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <el-image :src="item.imageUrl" style="height: 100%"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="hot">
      <hot-recommended />
    </div>
    <div class="exclusive">
      <exc-lusive />
    </div>
    <div class="newmusic">
      <new-music />
    </div>
    <div class="recommendedmv">
      <recommended-mv />
    </div>
  </div>
</template>

<script>
import { getShuffling } from "@/api";
import HotRecommended from "./components/hotRecommended.vue";
import ExcLusive from "./components/exclusive.vue";
import NewMusic from "./components/newmusic.vue";
import RecommendedMv from "./components/recommendedmv.vue";
export default {
  name: "Home",
  components: {
    HotRecommended,
    ExcLusive,
    NewMusic,
    RecommendedMv
  },
  props: {},
  data() {
    return {
      banners: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getShuffling();
  },
  mounted() {},
  methods: {
    async getShuffling() {
      const data = await getShuffling({
        type: 0
      });
      this.banners = data.data.banners;
      // console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.Home {
  .hot {
    margin-top: 3.125rem;
  }
}
</style>
