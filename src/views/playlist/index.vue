<template>
  <div class="playlist">
    <label for="file">上传</label>
    <input type="file" ref="file" id="file" @change="getFile" hidden />
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getFile() {
      const image = window.URL.createObjectURL(this.$refs.file.files[0]);
      console.log(image);
    }
  }
};
</script>

<style scoped lang="scss"></style>
