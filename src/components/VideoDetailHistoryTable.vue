<template>
  <a-table
      :columns="columns"
      :rowKey="record => record.added"
      :dataSource="videoRecordsWithSpeed"
      :pagination="pagination"
      :scroll="{ x: 700 }"
      size="small"
  >
    <template slot="added" slot-scope="added">
      {{ $util.tsToDateString(added) }}
    </template>
  </a-table>
</template>

<script>
  export default {
    name: 'VideoDetailHistoryTable',
    props: {
      videoRecords: {
        type: Array,
        required: true
      }
    },
    data: function () {
      return {
        columns: [
          {
            title: '时间',
            dataIndex: 'added',
            scopedSlots: { customRender: 'added' },
            sorter: (a, b) => a.added - b.added,
            defaultSortOrder: 'descend',
            width: '168px',
            fixed: 'left',
          }, {
            title: '播放',
            dataIndex: 'view',
          }, {
            title: '播放小时增速',
            dataIndex: 'speed',
          }, {
            title: '弹幕',
            dataIndex: 'danmaku',
          }, {
            title: '评论',
            dataIndex: 'reply',
          }, {
            title: '收藏',
            dataIndex: 'favorite',
          }, {
            title: '硬币',
            dataIndex: 'coin',
          }, {
            title: '分享',
            dataIndex: 'share',
          }, {
            title: '点赞',
            dataIndex: 'like',
          }
        ],
        pagination: {
          size: 'big',
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条记录`
        }
      }
    },
    computed: {
      videoRecordsWithSpeed: function () {
        let list = [];
        for (let i = 1; i < this.videoRecords.length; i++) {
          let view_diff = this.videoRecords[i].view - this.videoRecords[i - 1].view;
          let added_diff = this.videoRecords[i].added - this.videoRecords[i - 1].added;
          let record = this.videoRecords[i];
          record.speed = Math.round(view_diff / added_diff * 60 * 60); // view per hour
          list.push(record);
        }
        return list;
      }
    }
  }
</script>

<style scoped>

</style>