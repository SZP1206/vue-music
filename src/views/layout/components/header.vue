<template>
  <div class="header">
    <div class="left">
      <div class="tag">
        <el-tag type="success">C</el-tag>
        <el-tag type="info">L</el-tag>
        <el-tag type="warning">Y</el-tag>
        <el-tag type="danger">Y</el-tag>
      </div>
      <div class="history">
        <i class="iconfont icon-ziyuan26"></i>
        <i class="iconfont icon-ziyuan25"></i>
      </div>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
    <div class="rigth">
      <el-avatar
        :src="userInfo.avatarUrl"
        icon="el-icon-user-solid"
        @click.native="tologin"
      ></el-avatar>
      <span class="nickname" :style="{ color: textColor }">{{
        userInfo.nickname
      }}</span>
      <el-dialog title="用户登录" :visible.sync="dialogVisible" width="20%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="login-form"
          label-width="3.4375rem"
          class="demo-ruleForm"
          v-loading="loading"
        >
          <el-form-item label="手机" prop="phone">
            <el-input
              type="text"
              v-model="ruleForm.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onLogin">登录</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div class="right-icon" :style="{ color: textColor }">
        <el-popover
          placement="bottom"
          width="200"
          trigger="manual"
          v-model="visible"
        >
          <h3 class="title" style="margin: 0">主题</h3>
          <div
            class="theme"
            style=" cursor: pointer; display: flex; line-height: 4.375rem; color: #ffffff; text-align: center; line-height:"
          >
            <div
              class="white"
              style="width: 4.16625rem; height: 4.375rem; background: #f9f9f9; color: #292c32;"
              @click="themeSwitch('white')"
            >
              经典白
            </div>
            <div
              class="black"
              style="width: 4.16625rem; height: 4.375rem; background: #292c32;"
              @click="themeSwitch('black')"
            >
              炫酷黑
            </div>
            <div
              class="green"
              style="width: 4.16625rem; height: 4.375rem; background: #449e60;"
              @click="themeSwitch('green')"
            >
              清新绿
            </div>
          </div>
          <i
            class="iconfont icon-pifu1"
            style=" cursor: pointer;"
            slot="reference"
            @click="visible = !visible"
          ></i>
        </el-popover>

        <i class="iconfont icon-github"></i>
        <i class="iconfont icon-gitee-fill-round" slot="reference"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/api/index.js";
// import {
//     mapState
// } from 'vuex'
export default {
  name: "Header",
  components: {},
  props: {},
  data() {
    return {
      input: "",
      visible: false,
      background: "",
      border: "",
      textColor: "",
      dialogVisible: false,
      labelPosition: "right",
      loading: false,
      userInfo: "",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      ruleForm: {
        pass: "",
        phone: ""
      },
      rules: {
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getHeader();
    this.getUser();
  },
  mounted() {},
  methods: {
    getUser() {
      let data = JSON.parse(localStorage.getItem("userInfo"));
      //   console.log(data);
      if (data !== null) {
        this.userInfo = data.profile;
      }
    },
    tologin() {
      let data = localStorage.getItem("userInfo");
      // console.log(data)
      if (data === null) {
        this.dialogVisible = true;
        return;
      }
      this.$message({
        message: "请不要重复登录！！",
        type: "warning"
      });
    },
    async login() {
      this.loading = true;
      const data = await userLogin({
        phone: this.ruleForm.phone,
        password: this.ruleForm.pass
      });
      // console.log(data);
      if (data.data.code == 502) {
        this.$message.error(data.data.msg);
        this.loading = false;
        this.dialogVisible = true;
      } else if (data.data.code == 200) {
        this.loading = false;
        this.$store.commit("handleUser", data.data);
        this.getUser();
        // let data = localStorage.getItem('userIfo')
        // this.userInfo = data.profile
        // console.log(data)
        this.$message({
          message: "登录成功！",
          type: "success"
        });
        this.dialogVisible = false;
        this.ruleForm.phone = "";
        this.ruleForm.pass = "";
      }
      // console.log(newdata)
    },
    onLogin() {
      this.$refs["login-form"].validate(valid => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    themeSwitch(theme) {
      if (theme == "white") {
        this.background = "#f9f9f9";
        // console.log(theme, this.background);
        let back = this.background;
        this.textColor = "#292c32";
        localStorage.setItem("textColor", this.textColor);
        this.getHeader();
        this.$emit("theme", {
          theme,
          back
        });
      } else if (theme == "black") {
        this.background = "#292c32";
        this.textColor = "#ffffff";
        // console.log(this.textColor)
        let back = this.background;
        let textColor = this.textColor;
        localStorage.setItem("textColor", this.textColor);
        this.getHeader();
        this.$emit("theme", {
          theme,
          back,
          textColor
        });
      } else if (theme == "green") {
        this.background = "#449e60";
        this.textColor = "#ffffff";
        let back = this.background;
        localStorage.setItem("textColor", this.textColor);
        this.getHeader();
        this.$emit("theme", {
          theme,
          back
        });
      }
    },
    getHeader() {
      if (localStorage.getItem("textColor") !== "") {
        this.textColor = localStorage.getItem("textColor");
      } else {
        this.textColor = "#292c32";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  /deep/.el-input {
    width: 16.25rem;

    .el-input__inner {
      width: 16.25rem;
    }
  }

  .avatar {
    width: 6.25rem;
  }

  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 43.75rem;

    .tag {
      // width: 12.5rem;

      .el-tag {
        width: 2.1875rem;
        margin-left: 0.3125rem;
      }
    }

    .history {
      .icon-ziyuan26 {
        width: 1.875rem;
        height: 1.875rem;
        margin-right: 0.625rem;
        border-radius: 50%;
        padding: 0.625rem;
        cursor: pointer;
      }

      .icon-ziyuan25 {
        width: 1.875rem;
        height: 1.875rem;
        margin-left: 0.625rem;
        border-radius: 50%;
        padding: 0.625rem;
        cursor: pointer;
      }
    }

    .icon-ziyuan26:hover {
      background: rgba(190, 185, 185, 0.6);
    }

    .icon-ziyuan25:hover {
      background: rgba(190, 185, 185, 0.6);
    }
  }

  .rigth {
    width: 43.75rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .right-icon {
      width: 12.5rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-left: 3.125rem;

      .iconfont {
        font-size: 1.5rem;
      }

      /deep/.el-popover {
        .title {
          margin: 0;
        }
      }
    }

    .theme {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nickname {
      font-size: 1rem;
      margin-left: 0.9375rem;
    }
  }
}
</style>
