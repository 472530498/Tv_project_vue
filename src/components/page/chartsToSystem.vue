<template>
    <div class="schart-box">
        <schart class="schart" canvasId="bar" :data="data1" type="bar" :options="options1"></schart>
    </div>
</template>

<script>
    import Schart from 'vue-schart';

    export default {
        name: "chartsToSystem",
        components: {
            Schart
        },
        data: () => ({
            data1: [
                {name: '电影预告', value: 100},
                {name: '正片', value: 12},
                {name: '直播', value: 12},
                {name: '电视剧', value: 44},
                {name: '动漫', value: 79},
                {name: '广告片', value: 90}
            ],
            options1: {
                title: '视频库中类别数目状况',
                autoWidth: true,   // 设置宽高自适应
                showValue: false,
                bgColor: '#F9EFCC',
                fillColor: '#00887C',
                contentColor: 'rgba(46,199,201,0.3)',
                yEqual: 7
            }
        })
    }
</script>

<style scoped>
    .schart{
        width: 500px;
        height: 700px;
    }
</style>
