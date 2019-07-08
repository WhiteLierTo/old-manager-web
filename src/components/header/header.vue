<template>
  <div class="navbaer">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item style=" margin:0px 10% 0px 40px;  font-size:18px">老人服务资源网（生产）</el-menu-item>
      <el-submenu index="1">
        <template slot="title">机构管理</template>
        <router-link :to="{name:'merchant-list'}">
          <el-menu-item index="1-1">商家列表</el-menu-item>
        </router-link>
        <router-link :to="{name:'merchant-type-list'}">
          <el-menu-item index="1-2">类型列表</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">消息管理</template>
        <router-link :to="{name:'information-list'}">
          <el-menu-item index="2-1">消息列表</el-menu-item>
        </router-link>
        <router-link :to="{name:'message-list'}">
          <el-menu-item index="2-2">资讯列表</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">用户管理</template>
        <router-link :to="{name:'personal-list'}">
          <el-menu-item index="3-1">个人列表</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">图片管理</template>
        <router-link :to="{name:'slideshow'}">
          <el-menu-item index="4-1">轮播图管理</el-menu-item>
        </router-link>
        <router-link :to="{name:'slogan'}">
          <el-menu-item index="4-2">宣传语管理</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">商品管理</template>
        <router-link :to="{name:'goods'}">
          <el-menu-item index="5-1">商品管理</el-menu-item>
        </router-link>
        <router-link :to="{name:'goodsCollect'}">
          <el-menu-item index="5-2">收藏管理</el-menu-item>
        </router-link>
        <router-link :to="{name:'goodsType'}">
          <el-menu-item index="5-4">类型管理</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">订单管理</template>
        <router-link :to="{name:'orderEntry'}">
          <el-menu-item index="6-1">订单录入</el-menu-item>
        </router-link>
        <router-link :to="{name:'orderTracking'}">
          <el-menu-item index="6-2">订单跟踪</el-menu-item>
        </router-link>
        <router-link :to="{name:'orderList'}">
          <el-menu-item index="6-3">订单列表</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">服务管理</template>
        <router-link :to="{name:'serviceList'}">
          <el-menu-item index="7-1">服务详情</el-menu-item>
        </router-link>
        <router-link :to="{name:'serviceRecord'}">
          <el-menu-item index="7-2">服务录入</el-menu-item>
        </router-link>
      </el-submenu>
      <el-menu-item style="position:absolute;right:5%;">
        欢迎回来：
        <el-dropdown>
          <span class="el-dropdown-link" style="color:#fff;margin-left:10px;font-size:15px">
            {{userName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link :to="{name:'personal-center'}">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <div @click="exit">
              <el-dropdown-item>注销</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex2: "1",
      userName: ""
    };
  },

  mounted() {
    this.userName = sessionStorage.getItem("username");
  },
  methods: {
    /*personal() {
      this.$router.push({ path: "/user-manage" });
    },*/
    exit() {
      /*sessionStorage.removeItem("username");
      sessionStorage.removeItem("type");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("headImg");
      this.$router.push({ path: "/" });*/
    }
  }
};
</script>
<style scoped>
.navbaer {
  margin: 0;
}
</style>
