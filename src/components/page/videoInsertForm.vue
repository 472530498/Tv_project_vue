<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="填写视频名称">
                        <el-input v-model="form.sourceName"></el-input>
                    </el-form-item>
                    <el-form-item label="填写视频地址源">
                        <el-input v-model="form.sourceUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="选择视频种类">
                        <el-select v-model="form.sourceTypeId" placeholder="请选择">
                            <el-option v-for="item in sourceTypeArray"
                                       :key="item.id"
                                       :label="item.value"
                                       :value="item.id">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit(form)">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    import * as adminAPi from '@/utils/adminAPi.js'

    export default {
        name: 'videoInsertFrom',
        data: function () {
            return {
                form: {
                    sourceName: '',
                    sourceUrl: '',
                    sourceTypeId: '',
                    sourceTypeName: ''
                },
                sourceTypeArray: [
                    {
                        id: '1',
                        value: '电视剧'
                    },
                    {
                        id: '2',
                        value: '电影'
                    },
                    {
                        id: '3',
                        value: '综艺'
                    },
                    {
                        id: '4',
                        value: '纪录片'
                    },
                    {
                        id: '5',
                        value: '资讯'
                    },
                    {
                        id: '6',
                        value: '体育'
                    },
                    {
                        id: '7',
                        value: '旅游'
                    },
                    {
                        id: '8',
                        value: '文化'
                    },
                    {
                        id: '9',
                        value: '时尚'
                    },
                    {
                        id: '10',
                        value: '游戏'
                    },
                    {
                        id: '11',
                        value: '动漫'
                    },
                    {
                        id: '12',
                        value: '电视剧'
                    }

                ]
            }
        },
        methods: {
            getSourceTypeName(sourceTypeId) {
                let temp = ''
                this.sourceTypeArray.forEach((item) => {
                    if (sourceTypeId === item.id) {
                        temp = item.value
                    }
                })
                return temp
            },
            async onSubmit(form) {
                this.$message.success('提交成功！');
                form.sourceTypeName = this.getSourceTypeName(form.sourceTypeId)
                console.log(form)
                try {
                    const data = await adminAPi.insertVideoInfo(form.sourceName, form.sourceUrl, form.sourceTypeId, form.sourceTypeName, this)
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>
