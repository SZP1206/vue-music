<template>
  <div class="playlist">
    <playlist-style @labelname="labelname($event)" />
    <all-playlist :labelname="name" />
  </div>
</template>

<script>
import PlaylistStyle from "./components/playliststyle";
import AllPlaylist from "./components/allplaylist";
export default {
  name: "",
  components: {
    PlaylistStyle,
    AllPlaylist
  },
  props: {},
  data() {
    return {
      name: "" //标签名称
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    labelname(e) {
      this.name = e;
      console.log(e);
    }
  }
};
</script>

<style scoped lang="scss"></style>
