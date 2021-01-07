<template>
  <div id="login">
    <div class="login-form">
      <!-- <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item>
          <img class="logo" src="../../assets/image/logo.png" />
          <div class="title">Admin</div>
          <div class="desc">明 湖 区 最 具 影 响 力 的 设 计 规 范 之 一</div>
        </a-form-item>
        <a-form-item v-bind="validateInfos.username">
          <a-input placeholder="账 户 : admin" v-model:value="modelRef.username" />
        </a-form-item>
        <a-form-item v-bind="validateInfos.password">
          <a-input placeholder="密 码 : admin" v-model:value="modelRef.password" type="password"/>
        </a-form-item>
        <a-form-item>
          <a-checkbox :checked="true" @change="onChange">
            记住我
          </a-checkbox>
          <a class="login-form-forgot" href=""> 忘记密码 </a>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 24 }">
          <a-button :loading="loading" style="width: 100%" type="primary" @click="onSubmit">
            登录
          </a-button>
        </a-form-item>
      </a-form> -->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-pandora-decorators';

@Component
export default class extends Vue {
}
</script>
<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  background: url(../../assets/image/background.svg);
  background-size: cover;
  .login-form {
    margin: auto;
    width: 350px;
    min-height: 20px;
    padding-top: 150px;
    .ant-input {
      border-radius: 4px;
      height: 42px;
      line-height: 42px;
    }
    .ant-btn {
      height: 42px;
      line-height: 42px;
    }
  }
  .logo {
    width: 60px !important;
    margin-top: 10px !important;
    margin-bottom: 10px !important;
    margin-left: 20px !important;
    border: none;
    background-color: transparent;
  }

  .title {
    font-size: 30px !important;
    font-weight: 700 !important;
    margin-left: 20px !important;
    width: 300px;
    display: inline-block !important;
    height: 60px !important;
    line-height: 60px !important;
    margin-top: 10px !important;
    position: absolute !important;
  }
  .login-form-forgot {
    float: right;
  }
  .desc {
    width: 100% !important;
    text-align: center !important;
    color: gray !important;
    height: 60px !important;
    line-height: 60px !important;
  }
}
</style>
