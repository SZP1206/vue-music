<template>
  <div class="allplaylist">
    <div class="playlist-item" v-for="item in playlists" :key="item.id">
      <div class="resource-item">
        <div class="tooltip">
          <i class="iconfont icon-erji"></i>
          {{ item.playCount }}
        </div>
        <div class="copywriter">{{ item.creator.nickname }}</div>
        <div class="resource-img">
          <el-image class="img" :src="item.coverImgUrl"> </el-image>
          <div class="play">
            <i class=" iconfont icon-icon_play"></i>
          </div>
        </div>
        <span class="resource-text">{{ item.name }}</span>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        ref="pagination"
        background
        :current-page="page"
        :page-count="page"
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getplaylist } from "@/api/index.js";
export default {
  name: "AllPlaylist",
  components: {},
  props: {
    labelname: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      theme: "",
      userInfo: "",
      playlists: "", //歌单列表
      total: 0, // 总页数
      page: 1,
      limit: 50
    };
  },
  computed: {},
  watch: {
    labelname() {
      this.page = 1;
      this.getplaylist();
    }
  },
  created() {
    this.getplaylist();
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  mounted() {},
  methods: {
    async getplaylist() {
      const { data } = await getplaylist({
        cat: this.labelname,
        limit: this.limit,
        offset: (this.page - 1) * this.limit
      });
      // console.log(data);
      this.playlists = data.playlists;
      this.total = data.total;
      this.playlists.forEach(value => {
        if (value.playCount >= 100000) {
          value.playCount = parseInt(value.playCount / 10000) + "万";
        }
      });
    }, // 分页
    currentChange(index) {
      this.page = index;
      this.getplaylist();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 1.25rem;
  flex-wrap: wrap;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 0.25rem;
}

.allplaylist {
  margin-bottom: 6.25rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  // box-sizing: border-box;
  background: unset;

  .playlist-item {
    width: 20%;
    box-sizing: border-box;
    // flex: 20%;
    padding: 0.9375rem 0.625rem;
    cursor: pointer;

    .resource-item {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      box-sizing: border-box;
      overflow: hidden;

      .tooltip {
        box-sizing: border-box;
        position: absolute;
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
        transition: all 0.6s;
      }

      .copywriter {
        box-sizing: border-box;
        position: absolute;
        top: -3.125rem;
        left: 0;
        width: 100%;
        background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.4));
        z-index: 1;
        transition: all 0.6s;
        color: #fff;
        padding: 0.3125rem;
      }

      .resource-img {
        position: relative;
        width: 100%;
        // background: red;

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

        .el-image {
          width: 100%;
          height: 100%;
        }
      }

      .resource-text {
        line-height: 1.875rem;
        text-align: left;
        margin: 0 auto;
        font-size: 1rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }

  .playlist-item:hover .resource-item .tooltip {
    top: -1.875rem;
  }

  .playlist-item:hover .resource-item .copywriter {
    top: 0;
  }

  .playlist-item:hover .resource-item .resource-img .play {
    opacity: 1;
  }
  .pagination {
    text-align: center;
  }
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 0.25rem;
  height: 15rem;

  .resource-img {
    width: 100%;
    height: 100%;
  }
}

.row-bg {
  padding: 0.625rem 0;
  background-color: #f9fafc;
}

.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 6.25rem;
  margin: 0;
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #bcd2ee;
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #bcd2ee;
}
</style>
