<template>
  <a-drawer
      placement="left"
      :closable="false"
      :visible="this.$store.state.isMenuSliderVisible"
      width="200px"
      @close="drawerCloseHandler"
  >
    <div class="menu-wrapper">
      <a-menu
          theme="light"
          mode="inline"
          :style="{ lineHeight: '64px' }"
          :selectedKeys="selectedKeys"
          @click="handleMenuClick"
      >
        <a-menu-item key="1">首页</a-menu-item>
        <a-menu-item key="2">所有视频</a-menu-item>
        <a-menu-item key="3">传说助攻</a-menu-item>
        <a-menu-item key="4">辅助工具</a-menu-item>
        <a-menu-item key="5">关于</a-menu-item>
      </a-menu>
    </div>
  </a-drawer>
</template>

<script>
export default {
  name: "TddMenuSlider",
  computed: {
    selectedKeys: function() {
      let path = this.$route.fullPath;
      let keys = [];
      if (path === '/') {
        keys = ['1'];
      } else if (path.startsWith('/video')) {
        keys = ['2'];
      } else if (path.startsWith('/sprint')) {
        keys = ['3'];
      } else if (path.startsWith('/tool')) {
        keys = ['4'];
      } else if (path.startsWith('/about')) {
        keys = ['5'];
      }
      return keys;
    }
  },
  methods: {
    drawerCloseHandler: function() {
      this.$store.commit('changeMenuSliderVisibility');
    },
    handleMenuClick(e) {
      switch (e.key) {
        case "1":
          this.$router.push("/");
          break;
        case "2":
          this.$router.push("/video");
          break;
        case "3":
          this.$router.push("/sprint");
          break;
        case "4":
          this.$router.push("/tool");
          break;
        case "5":
          this.$router.push("/about");
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style>
  .menu-wrapper {
    margin-left: -24px;
  }
</style>