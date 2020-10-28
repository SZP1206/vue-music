<template>
  <div class="playlist">
    <el-popover placement="bottom-start" width="400" trigger="click">
      <div>45656</div>
      <div>45656</div>
      <div>45656</div>
      <div>45656</div>
      <div>45656</div>
      <div>45656</div>
      <div
        class="all-label"
        slot="reference"
        :class="[
          { 'el-icon-arrow-down': alllabel == false },
          { 'el-icon-arrow-up': alllabel == true }
        ]"
        @click="alllabel = !alllabel"
        :style="[
          { background: theme == 'black' ? '#4f4f4f' : '#fff' },
          { 'border-color': theme == 'black' ? '#dcdfe6' : '#767676' }
        ]"
      >
        全部
      </div>
    </el-popover>
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
      theme: "",
      alllabel: false
    };
  },
  computed: {},
  watch: {
    theme() {
      this.getTheme();
    }
  },
  created() {
    this.getTheme();
  },
  mounted() {},
  methods: {
    getTheme() {
      this.theme = localStorage.getItem("theme");
      console.log(this.theme);
    }
  }
};
</script>

<style lang="scss" scoped>
.playlist {
  .all-label {
    width: 6.25rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    border-radius: 0.3125rem;
    border: 1px solid #767676;
    cursor: pointer;
    color: var(--dark-border-active-color);
  }
}
</style>
