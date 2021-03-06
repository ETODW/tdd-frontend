import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("./components/Home");
const VideoHome = () => import("./components/VideoHome");
const VideoDetail = () => import("./components/VideoDetail");
const SprintHome = () => import("./components/SprintHome");
const SprintVideoDetail = () => import("./components/SprintVideoDetail");
const SprintDailyHome = () => import("./components/SprintDailyHome");
const SprintDailyDetail = () => import("./components/SprintDailyDetail");
const ToolHome = () => import("./components/tool/ToolHome");
const DateCalc = () => import("./components/tool/DateCalc");
const BiliApi = () => import("./components/tool/BiliApi");
const ZkCalc = () => import("./components/tool/ZkCalc");
const AboutHome = () => import("./components/about/AboutHome");
const UpdateLog = () => import("./components/about/UpdateLog");
const NotFound = () => import("./components/NotFound");

Vue.use(VueRouter);

const SITE_NAME = '天钿Daily';
const STIE_NAME_LONG = '天钿Daily - VC数据交流与分享';

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home,
      meta: {
        title: STIE_NAME_LONG
      }
    }, {
      path: "/index.html",
      redirect: "/"
    }, {
      path: "/video",
      component: VideoHome,
      meta: {
        title: '所有视频 - ' + SITE_NAME,
        keepAlive: true
      }
    }, {
      path: "/video/av:aid",
      component: VideoDetail,
      meta: {
        title: '视频详情 - ' + SITE_NAME
      }
    }, {
      path: "/sprint",
      component: SprintHome,
      meta: {
        title: '传说助攻 - ' + SITE_NAME,
        keepAlive: true
      }
    }, {
      path: "/sprint/av:aid",
      component: SprintVideoDetail,
      meta: {
        title: '助攻详情 - ' + SITE_NAME
      }
    }, {
      path: "/sprint/daily",
      component: SprintDailyHome,
      meta: {
        title: '助攻日报 - ' + SITE_NAME
      }
    }, {
      path: "/sprint/daily/:date",
      component: SprintDailyDetail,
      meta: {
        title: '助攻日报 - ' + SITE_NAME
      }
    }, {
      path: "/tool",
      component: ToolHome,
      meta: {
        title: '辅助工具 - ' + SITE_NAME
      }
    }, {
      path: "/tool/datecalc",
      component: DateCalc,
      meta: {
        title: '耗时计算 - ' + SITE_NAME
      }
    }, {
      path: "/tool/biliapi",
      component: BiliApi,
      meta: {
        title: 'Bilibili API传送门 - ' + SITE_NAME
      }
    }, {
      path: "/tool/zkcalc",
      component: ZkCalc,
      meta: {
        title: '周刊算分 - ' + SITE_NAME
      }
    }, {
      path: "/about",
      component: AboutHome,
      meta: {
        title: '关于 - ' + SITE_NAME
      }
    }, {
      path: "/about/updatelog",
      component: UpdateLog,
      meta: {
        title: '更新日志 - ' + SITE_NAME
      }
    }, {
      path: "*",
      component: NotFound,
      meta: {
        title: '404 - ' + SITE_NAME
      }
    }
  ]
});