<template>
  <a-drawer
      placement="right"
      :closable="true"
      :visible="this.$store.state.isLoginSliderVisible"
      :width="this.$store.state.clientWidth > 320 ? '320px' : this.$store.state.clientWidth + 'px'"
      @close="drawerCloseHandler"
  >
    <div>
      <a-menu v-model="currentKeys" mode="horizontal">
        <a-menu-item key="login">
          登录
        </a-menu-item>
        <a-menu-item key="register">
          注册
        </a-menu-item>
      </a-menu>
      <div v-if="currentKeys.indexOf('login') !== -1">
        其实...登录注册功能还没有做好Orz...<br>
        可以来QQ群：<a target="_blank" href="https://jq.qq.com/?_wv=1027&k=588s7nw">537793686</a>催更（跑
      </div>
      <div v-if="currentKeys.indexOf('register') !== -1">
        其实...登录注册功能还没有做好Orz...<br>
        可以来QQ群：<a target="_blank" href="https://jq.qq.com/?_wv=1027&k=588s7nw">537793686</a>催更（跑
      </div>
    </div>
  </a-drawer>
</template>

<script>
  export default {
    name: 'TddLoginSlider',
    data: function () {
      return {
        currentKeys: ['login']
      }
    },
    methods: {
      drawerCloseHandler: function() {
        this.$store.commit('changeLoginSliderVisibility');
      }
    }
  }
</script>