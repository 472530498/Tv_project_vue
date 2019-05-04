<template>
    <div style="display: flex;">
        <schart class="schart" canvasId="bar" :data="schartList" type="bar" :options="schartOptions"></schart>
        <div style="width: 11px"></div>
        <el-button>视频库中类别数目状况</el-button>
        <el-button @click="showChart(showChartType[1])">收看量统计</el-button>
        <el-button @click="showChart(showChartType[2])">收藏率统计</el-button>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import * as adminAPi from '@/utils/adminAPi.js'
    export default {
        name: "chartsToSystem",
        components: {
            Schart
        },
        data: () => ({
            showChartType: [
                '视频库中类别数目状况',
                '收看量统计',
                '收藏率统计'
            ],
            constanse: {
                '1': '电影预告',
                '2': '正片',
                '3': '直播',
                '499': '电视剧'
            },
            constanseMath: {
                '1': 0,
                '2': 0,
                '3': 0,
                '499': 0
            },
            schartList: [],
            schartOptions: {
                title: '视频库中类别数目状况',
                autoWidth: true,   // 设置宽高自适应
                showValue: false,
                bgColor: '#F9EFCC',
                fillColor: '#409EFF',
                contentColor: 'rgba(46,199,201,0.3)',
                yEqual: 7
            },
            vData: ''
        }),
        methods: {
            showChart (type) {
                if (type === '收看量统计') {
                    this.$message({
                        message: '开发人员努力中..',
                        type: 'warning',
                        duration: 500
                    });
                } else if (type === '收藏率统计') {
                    this.$message({
                        message: '开发人员努力中..',
                        type: 'warning',
                        duration: 500
                    });
                }
            }
        },
        async created () {
            this.vData = await adminAPi.selectVideoAll(this)
            // console.log(this.vData)
            this.vData.forEach(item => {
                this.constanseMath[item.video_zone_tags_id] += 1
            })
            for (let key in this.constanse) {
                this.schartList.push({
                    name: this.constanse[key],
                    value: this.constanseMath[key]
                })
            }
        }
    }
</script>

<style scoped>
    .schart{
        width: 500px;
        height: 700px;
    }
</style>
