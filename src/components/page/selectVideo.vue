<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>查询视频</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="video_created_time" label="日期" sortable width="150"  :formatter="formatter">
                </el-table-column>
                <el-table-column prop="video_name" label="视频名称" width="120">
                </el-table-column>
                <el-table-column prop="video_url" label="地址链接">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="姓名">
                    <el-input v-model="form.video_name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.video_url"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import * as adminAPi from '@/utils/adminAPi.js'
    export default {
        name: 'selectVideo',
        data() {
            return {
                url: './vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    video_name: '',
                    video_url: ''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                // return this.tableData.filter((d) => {
                //     let is_del = false;
                //     for (let i = 0; i < this.del_list.length; i++) {
                //         if (d.name === this.del_list[i].name) {
                //             is_del = true;
                //             break;
                //         }
                //     }
                //     if (!is_del) {
                //         if (d.address.indexOf(this.select_cate) > -1 &&
                //             (d.name.indexOf(this.select_word) > -1 ||
                //                 d.address.indexOf(this.select_word) > -1)
                //         ) {
                //             return d;
                //         }
                //     }
                // })
                return this.tableData
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            // getData() {
            //     // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
            //     if (process.env.NODE_ENV === 'development') {
            //         this.url = '/ms/table/list';
            //     };
            //     this.$axios.post(this.url, {
            //         page: this.cur_page
            //     }).then((res) => {
            //         this.tableData = res.data.list;
            //     })
            // },
            async getData() {
                try {
                    const data = await adminAPi.selectVideoAll(this)
                    this.tableData = data
                    console.log(this.tableData)
                } catch (e) {
                    console.log(e)
                }
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column, cellValue, index) {
                console.log(cellValue)
                var d = new Date(cellValue);
                var formatter = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                return formatter;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            async handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    video_name: item.video_name,
                    video_url: item.video_url
                }
                this.editVisible = true;
            },
            async handleDelete(index, row) {
                // this.idx = index;
                // this.delVisible = true;
                console.log(index)
                console.log(row)
                // TODO call deleteAPI
                try{
                    const data = await adminAPi.deleteVideo(this.tableData[index].video_source_id, this)
                    this.$message('删除成功');
                    this.tableData.splice(index, 1)

                } catch (e) {
                    console.log(e)
                    this.$message(e.msg);
                }
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            async saveEdit() {
                this.$set(this.form);
                // this.editVisible = false;
                // this.$message.success(`修改第 ${this.idx+1} 行成功`);
                try {
                    await adminAPi.updateVideo({
                        video_source_id: this.tableData[this.idx].video_source_id,
                        video_name: this.form.video_name,
                        video_url: this.form.video_url,
                        video_zone_tags_id: null,
                        video_zone_tags_name: null
                    }, this)
                    this.$message('更新成功');
                    this.tableData = await adminAPi.selectVideoAll(this)
                    this.editVisible = false;
                } catch (e) {
                    console.log(e)
                    this.$message.error(e.msg);
                }
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
