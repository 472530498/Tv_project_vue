<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>增加管理成员</el-breadcrumb-item>
                <el-breadcrumb-item>请填写视频信息然后提交</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <h1>指引</h1>
            <div style="color: blue">
                <div>1.点击添加成员按钮,生成一个管理员账号,如:< 1welb3m64hts00 ></div>
                <div>2.请谨记账号,建议复制账号到记事本保存并使用密码锁保存账号</div>
                <div>3.初次生成的账号默认密码为六个零< 000000 ></div>
                <div>4.使用生成的账号登录系统,选择管理员个人模块可以更改账号或密码,更改的账号不能与系统现有的账号相同</div>
                <div>5.生成的账号请尽快登录系统,更改密码,系统定期清理注册了但又无用账号</div>
                <div>6.操作系统某些功能需要权限,请联系超级管理员给予权限</div>
            </div>
        </div>
        <div>
            <el-checkbox v-model="read"></el-checkbox><span>已阅读指引说明</span>
        </div>
        <el-button type="primary" :disabled = !read @click="insertAdmin">添加成员</el-button>
        <div style="margin:0 auto;width: 100%;text-align:center;color: red" v-if="adminUserName !== null">
            <h1>登录账号: {{adminUserName}}</h1>
            <h1>密码: 000000</h1>
        </div>

    </div>
</template>

<script>
    import * as adminAPi from '@/utils/adminAPi.js'

    export default {
        name: 'insertAdmin',
        data: function () {
            return {
                read: false,
                adminUserName: null
            }
        },
        methods: {
            async insertAdmin() {
                try {
                    const data = await adminAPi.insertAdmin(this)
                    this.$message.success('增加成功');
                    this.adminUserName = data.admin_rid

                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>
