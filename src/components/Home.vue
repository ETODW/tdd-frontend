<template>
  <div style="height: auto !important;height: 100%; margin: 0 auto -120px;">
    <div class="tdd-breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-carousel autoplay >
      <div class="carousel-page">
        <div class="carousel-page-container">
          <div class="carousel-p1-text">
            <h1>天钿Daily</h1>
            <p>致力于推动VC相关数据交流，定期抓取VC相关数据，选取有意义的纬度展示。</p>
            <div style="margin-top: 20px">
              <a-button type="primary" @click="() => this.$router.push('/about')">了解更多</a-button>
              <a-popover title="联系我们" trigger="hover" placement="bottom">
                <div slot="content">
                  QQ群：<a target="_blank" href="https://jq.qq.com/?_wv=1027&k=588s7nw">537793686</a><a-icon type="qrcode" style="margin-left: 8px; margin-right: 4px"/><a target="_blank" :href="qqgroup_qrcode">二维码</a><br/>
                  个人邮箱：<a href="mailto:bunnyxt@outlook.com">bunnyxt@outlook.com</a>
                </div>
                <a-button style="margin-left: 8px">联系我们</a-button>
              </a-popover>
            </div>
          </div>
          <div class="carousel-p1-image">
            <img :src="logo_max" alt="logo" />
          </div>
        </div>
      </div>
      <div class="carousel-page">
        <div class="carousel-page-container">
          <template v-if="this.$store.getters.clientMode === 'MOBILE'">
            <div style="overflow: hidden">
              <div class="carousel-p2-mobile-row1-col">
                <a-statistic title="收录视频" :value="latestVideoCount">
                  <template v-slot:suffix>
                    个
                  </template>
                </a-statistic>
              </div>
              <div class="carousel-p2-mobile-row1-col">
                <a-statistic title="覆盖P主" :value="latestMemberCount">
                  <template v-slot:suffix>
                    位
                  </template>
                </a-statistic>
              </div>
            </div>
            <a-statistic title="数据记录" :value="latestVideoRecordCount">
              <template v-slot:suffix>
                条
              </template>
            </a-statistic>
          </template>
          <template v-else>
            <div style="overflow: hidden">
              <div class="carousel-p2-col">
                <div id="video-count-chart"></div>
                <a-statistic title="收录视频" :value="latestVideoCount" style="padding: 8px 20px 0 20px">
                  <template v-slot:suffix>
                    个
                  </template>
                </a-statistic>
              </div>
              <div class="carousel-p2-col">
                <div id="member-count-chart"></div>
                <a-statistic title="覆盖P主" :value="latestMemberCount" style="padding: 8px 20px 0 20px">
                  <template v-slot:suffix>
                    位
                  </template>
                </a-statistic>
              </div>
              <div class="carousel-p2-col">
                <div id="video-record-count-chart"></div>
                <a-statistic title="数据记录" :value="latestVideoRecordCount" style="padding: 8px 20px 0 20px">
                  <template v-slot:suffix>
                    条
                  </template>
                </a-statistic>
              </div>
            </div>
          </template>
          <div style="text-align: right; color: rgba(0, 0, 0, 0.45); margin-top: 8px">
            <p>*截至{{ latestStatDailyTimeStr }}</p>
          </div>
        </div>
      </div>
      <div class="carousel-page">
        <div class="carousel-page-container">
          <h1>更新动态</h1>
          <div class="carousel-p3-timeline-container">
            <a-timeline>
              <a-timeline-item
                  v-for="updateLog in updateLogList"
                  :key="updateLog.added"
                  :color="getTimelineItemColor(updateLog.type)"
              >
                <b>{{ $util.tsToDateString(updateLog.added, 'yyyy-MM-dd') }}</b> {{ updateLog.content }}
              </a-timeline-item>
              <a-button slot="pending" type="link" @click="() => this.$router.push('/about/updatelog')">查看更多...</a-button>
            </a-timeline>
          </div>
        </div>
      </div>
    </a-carousel>
    <div class="section-separator"></div>
    <div class="section-block">
      <div style="overflow: hidden">
        <div style="float: left">
          <h1>所有视频</h1>
        </div>
        <div style="float: right; margin-top: 8px">
          <a-button size="small" @click="fetchRandomVideoList(6)"><a-icon type="reload" />{{ refreshString }}</a-button>
          <a-button size="small" @click="() => this.$router.push('/video')" style="margin-left: 8px">{{ moreString }}<a-icon type="arrow-right" /></a-button>
        </div>
      </div>
      <p>本站收录的所有视频，包括B站UV分区下的所有视频和部分其他分区中的VC视频。</p>
      <a-spin :spinning="isLoadingRandomVideoList">
        <tdd-video-list
            :video-list="randomVideoList.slice(0, listColNum)"
            mode="grid"
            @item-clicked="randomVideoListItemClickedHandler"
        ></tdd-video-list>
      </a-spin>
    </div>
    <div class="section-separator"></div>
    <div class="section-block">
      <div style="overflow: hidden">
        <div style="float: left">
          <h1>传说助攻</h1>
        </div>
        <div style="float: right; margin-top: 8px">
          <a-button size="small" @click="getSprintVideoListFiltered"><a-icon type="reload" />{{ refreshString }}</a-button>
          <a-button size="small" @click="() => this.$router.push('/sprint')" style="margin-left: 8px">{{ moreString }}<a-icon type="arrow-right" /></a-button>
        </div>
      </div>
      <p>VC传说冲刺曲目助攻计划，收录B站接近<a href="https://zh.moegirl.org/Vocaloid中文传说曲" target="_blank">中文VOCALOID传说曲</a>要求的曲目视频，记录播放、收藏等数据变化，提供传说助攻参考。</p>
      <a-spin :spinning="isLoadingSprintVideoList">
        <tdd-video-list
            :video-list="sprintVideoListFiltered.slice(0, listColNum)"
            mode="grid"
            :show-stat-bar="false"
            :show-mobile-view="false"
            :show-sprint-board="true"
            @item-clicked="sprintVideoListItemClickedHandler"
        ></tdd-video-list>
      </a-spin>
    </div>
    <div class="section-separator"></div>
    <div class="section-block">
      <div style="overflow: hidden">
        <div style="float: left">
          <h1>辅助工具</h1>
        </div>
        <div style="float: right; margin-top: 8px">
          <a-button size="small" @click="() => this.$router.push('/tool')">{{ moreString }}<a-icon type="arrow-right" /></a-button>
        </div>
      </div>
      <p>泛VC数据记录与分享相关所需要的辅助工具。</p>
      <ul>
        <li>
          <router-link to="/tool/datecalc">耗时计算</router-link>：输入起止时间，计算所消耗的时间长度，可用于计算曲目传说/殿堂耗时。
        </li>
        <li>
          <router-link to="/tool/biliapi">Bilibili API传送门</router-link>：常用Bilibili API传送门。
        </li>
        <li>
          <router-link to="/tool/zkcalc">周刊算分</router-link>：周刊VOCALOID中文排行榜计分规则计算器。
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import TddVideoList from "./common/TddVideoList"
import logo_max from '../assets/img/logo_max.png'
import qqgroup_qrcode from '../assets/img/qrcode_1580391374617.jpg'

export default {
  name: "Home",
  components: {
    TddVideoList
  },
  data: function () {
    return {
      logo_max: logo_max,
      qqgroup_qrcode: qqgroup_qrcode,
      isLoadingStatDailyList: false,
      statDailyList: [],
      statDailyTotalCount: 0,
      isLoadingUpdateLogList: false,
      updateLogList: [],
      isLoadingRandomVideoList: false,
      randomVideoList: [],
      isLoadingSprintVideoList: false,
      sprintVideoList: [],
      sprintVideoListFiltered: []
    }
  },
  computed: {
    _storeClientMode: function() {
      return this.$store.getters.clientMode;
    },
    latestStatDaily: function () {
      let length = this.statDailyList.length;
      if (length > 0) {
        return this.statDailyList[length - 1];
      } else {
        return null;
      }
    },
    latestVideoCount: function () {
      if (this.latestStatDaily) {
        return this.latestStatDaily.video_count;
      } else {
        return -1;
      }
    },
    latestMemberCount: function () {
      if (this.latestStatDaily) {
        return this.latestStatDaily.member_count;
      } else {
        return -1;
      }
    },
    latestVideoRecordCount: function () {
      if (this.latestStatDaily) {
        return this.latestStatDaily.video_record_count;
      } else {
        return -1;
      }
    },
    latestStatDailyTimeStr: function () {
      if (this.latestStatDaily) {
        return this.$util.tsToDateString(this.latestStatDaily.added);
      } else {
        return this.$util.tsToDateString(0);
      }
    },
    refreshString: function () {
      if (this.$store.getters.clientMode === 'MOBILE') {
        return '';
      } else {
        return '刷新';
      }
    },
    moreString: function () {
      if (this.$store.getters.clientMode === 'MOBILE') {
        return '';
      } else {
        return '更多';
      }
    },
    listColNum: function () {
      let width = this.$store.state.clientWidth; // TODO bug here, in chrome this will cut scrollbar width, about 15px
      if (width < 576) {
        // return 1;
        return 3;
      } else if (width < 768) {
        return 2;
      } else if (width < 992) {
        return 3;
      } else if (width < 1200) {
        return 3;
      } else if (width < 1600) {
        return 4;
      } else {
        return 6;
      }
    }
  },
  methods: {
    fetchStatDailyList: function () {
      this.isLoadingStatDailyList = true;
      let now = new Date();
      let start_ts = Math.floor(now.valueOf() / 1000) - 30 * 24 * 60 * 60; // 30 days before
      let url = 'statdaily?start_ts=' + start_ts;
      let that = this;
      this.$axios.get(url)
        .then(function (response) {
          that.statDailyList = response.data;
          that.statDailyTotalCount = parseInt(response.headers['x-total-count']);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          that.isLoadingStatDailyList = false;
        });
    },
    drawChart: function () {
      if (this.$store.getters.clientMode === 'MOBILE') {
        return;
      }

      const ds = new DataSet();
      const dv = ds.createView()
        .source(this.statDailyList)
        .transform({
          type: 'rename',
          map: {
            video_count: '收录视频',
            member_count: '覆盖P主',
            video_record_count: '数据记录'
          }
        })
        .transform({
          type: 'map',
          callback(row) {
            row.added = row.added * 1000; // ts_s -> ts_ms
            return row;
          }
        });

      // video count chart
      this.drawOneChart('video-count-chart', dv, '收录视频');
      this.drawOneChart('member-count-chart', dv, '覆盖P主');
      this.drawOneChart('video-record-count-chart', dv, '数据记录');
    },
    drawOneChart: function (container, dv, yLabel) {
      const chart = new G2.Chart({
        container: container,
        forceFit: true,
        height: 100,
        padding: [ 0, 20, 0, 20 ]
      });
      chart.source(dv, {
        added: {
          type: 'time',
          mask: 'YYYY-MM-DD'
        }
      });
      chart.axis('added', {
        label: null
      });
      chart.axis(yLabel, {
        label: null
      });
      chart.line().position('added*'+yLabel);
      chart.render();
    },
    fetchUpdateLogList: function () {
      this.isLoadingUpdateLogList = true;
      let last_count = 3;
      let url = 'updatelog?last_count=' + last_count;
      let that = this;
      this.$axios.get(url)
        .then(function (response) {
          that.updateLogList = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          that.isLoadingUpdateLogList = false;
        });
    },
    getTimelineItemColor: function (type) {
      let timelineItemColorArray = ['blue', 'blue', 'red', 'green'];
      return timelineItemColorArray[type];
    },
    fetchRandomVideoList: function (count) {
      this.isLoadingRandomVideoList = true;
      let url = '/video/random?count=' + count;
      let that = this;
      this.$axios.get(url)
        .then(function (response) {
          that.randomVideoList = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          that.isLoadingRandomVideoList = false;
        });
    },
    fetchSprintVideoList: function () {
      let that = this;
      this.isLoadingSprintVideoList = true;
      fetch(this.$store.state.apiBase + "sprint_video.php?status=processing")
        .then(response => response.json())
        .then(json => this.sprintVideoList = json.data)
        .then(function () {
          // change to new data format
          for (let i = 0; i < that.sprintVideoList.length; i++) {
            that.sprintVideoList[i].pubdate = that.sprintVideoList[i].created;
          }
          that.sprintVideoList.sort((a, b) => b.last_record.view - a.last_record.view);
          that.getSprintVideoListFiltered();
          that.isLoadingSprintVideoList = false;
        });
    },
    getSprintVideoListFiltered: function () {
      let lastAidList = [];
      this.sprintVideoListFiltered.forEach(video => lastAidList.push(video.aid));
      this.sprintVideoListFiltered = [];
      let max = this.sprintVideoList.length;
      let indexList = [];

      while (indexList.length < 6) {
        let index = Math.floor(Math.random() * max);
        if (indexList.indexOf(index) === -1 && lastAidList.indexOf(this.sprintVideoList[index].aid) === -1) {
          indexList.push(index);
          this.sprintVideoListFiltered.push(this.sprintVideoList[index]);
        }
      }
    },
    sprintVideoListItemClickedHandler: function (item) {
      this.$router.push('sprint/av' + item.aid);
    },
    randomVideoListItemClickedHandler: function (item) {
      this.$store.commit('setVideoDetailDrawerVideo', item);
      this.$store.commit('setVideoDetailDrawerVisibility', true);
    }
  },
  watch: {
    _storeClientMode: function() {
      if (this.$store.getters.clientMode !== 'MOBILE') {
        let that = this;
        setTimeout(() => that.drawChart(), 100); // to avoid missing div
      }
    },
    statDailyList: function () {
      this.drawChart();
    }
  },
  created() {
    this.fetchStatDailyList();
    this.fetchUpdateLogList();
    this.fetchRandomVideoList(6);
    this.fetchSprintVideoList();
  }
};
</script>

<style scoped>
  /* home page carousel related */
  .ant-carousel >>> .slick-dots li.slick-active button {
    background: #192c3e;
  }
  .ant-carousel >>> .slick-dots li button {
    background: #364d79;
  }
  .ant-carousel >>> .slick-slide {
    background: #fff;
    height: 300px;
  }

  .carousel-page {
    height: 300px;
    padding: 50px 20px;
    text-align: center;
  }
  .carousel-page-container {
    max-width: 600px;
    text-align: left;
    margin: auto;
    overflow: hidden;
  }

  .carousel-p1-text {
    float: left;
    width: 60%;
  }
  .carousel-p1-image {
    float: left;
    width: 40%;
    text-align: center;
  }
  .carousel-p1-image img {
    margin: auto;
    width: 60%;
  }

  .carousel-p2-col {
    float: left;
    width: 33%;
  }
  .carousel-p2-mobile-row1-col {
    float: left;
    width: 50%;
  }

  .carousel-p3-timeline-container {
    overflow-y: auto;
    height: 140px;
    padding-top: 4px;
  }

  @media only screen and (max-width: 576px) {
    .ant-carousel >>> .slick-slide {
      height: 188px;
    }
    .carousel-page {
      height: 188px;
      padding: 12px 20px;
    }
    .carousel-p1-text {
      width: 100%;
    }
    .carousel-p1-image {
      display: none;
    }
    .carousel-p3-timeline-container {
      height: 100px;
    }
  }
</style>