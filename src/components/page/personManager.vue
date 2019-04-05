<!--suppress ALL -->
<template>
    <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="修改密码" name="first">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="旧密码" prop="old">
                    <el-input v-model="ruleForm2.old"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="完善账号信息" name="second">完善账号信息</el-tab-pane>
        <el-tab-pane label="查看权限" name="third">查看权限</el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
    import * as adminAPi from '@/utils/adminAPi.js'
    export default {
        data() {
            var checkOld = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('旧密码不能为空'));
                }
                if (value === this.ruleForm2.checkPass || value === this.ruleForm2.pass) {
                    return callback(new Error('旧密码不能为与新密码相同'));
                }
                callback();
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                activeName: 'first',
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    old: ''
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    old: [
                        { validator: checkOld, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const admin_rid = localStorage.getItem('admin_rid')
                        const updateData = {
                            old: this.ruleForm2.old,
                            admin_password: this.ruleForm2.pass,
                            admin_rid: admin_rid
                        }
                        try {
                            const data = await adminAPi.changeAdminPassword(updateData, this)
                            this.$message.success('修改成功');
                        } catch (e) {
                            this.$message.error('修改失败');
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>

<style scoped>

</style>
