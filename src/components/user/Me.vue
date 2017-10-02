<template>

    <el-row class="content" >
        <el-col :xs="24" :sm="{span: 6,offset: 9}">
            用户名:  {{user.username}}
            <p class="line">统计信息</p>
            动态
            <hr>
            几时添加了一条链接

        </el-col>
    </el-row>

</template>


<script>

import store from '@/store'

export default {
    name: 'Me',
    data() {
        return {
            name: 'World',
            user: this.$store.state.user
        }
    },
    methods: {

    },
    store
}

</script>

<style media="screen">
.line {
    padding: 0 20px 0;
    margin: 20px 0;
    line-height: 1px;
    border-left: 100% solid #ddd;
    border-right: 200px solid #ddd;
    text-align: center;
}
</style>
