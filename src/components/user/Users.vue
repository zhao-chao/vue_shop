<template>
  <div>
    <h3>用户列表组件</h3>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容"
                    v-model="queryInfo.query"
                    clearable
                    @clear="getUserList">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表(表格)区域 -->
      <el-table :data="userList"
                border
                stripe>
        <el-table-column type="index"
                         label="#"></el-table-column>
        <el-table-column label="姓名"
                         prop="username"></el-table-column>
        <el-table-column label="邮箱"
                         prop="email"></el-table-column>
        <el-table-column label="电话"
                         prop="mobile"></el-table-column>
        <el-table-column label="角色"
                         prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"
                       @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="180px">
          <template slot-scope="scope">
            <!-- 修改 -->

            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"></el-button>
            <!-- 删除 -->
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"></el-button>
            <!-- 分配角色 -->
            <el-tooltip class="item"
                        effect="dark"
                        content="分配角色"
                        placement="top"
                        :enterable="false">
              <el-button type="warning"
                         icon="el-icon-setting"
                         size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页导航区域
        @size-change(pagesize改变时触发)
        @current-change(页码发生改变时触发)
        :current-page(设置当前页码)
        :page-size(设置每页的数据条数)
        :total(设置总页数) -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[1, 2, 5, 10]"
                     :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //获取查询用户信息的参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      // 保存请求回来的用户列表数据
      userList: [],
      total: 0,
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      //发送请求获取用户列表数据
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo,
      })
      //如果返回状态为异常状态则报错并返回
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }

      //如果返回状态正常，将请求的数据保存在data中
      this.userList = res.data.users
      this.total = res.data.total
    },
    handleSizeChange(a) {
      this.queryInfo.pagesize = a
      this.getUserList()
    },
    handleCurrentChange(a) {
      this.queryInfo.pagenum = a
      this.getUserList()
    },
    async userStateChanged(row) {
      //发送请求进行状态修改
      const { data: res } = await this.$http.put(
        `users/${row.id}/state/${row.mg_state}`
      )
      //如果返回状态为异常状态则报错并返回
      if (res.meta.status !== 200) {
        row.mg_state = !row.mg_state
        return this.$message.error('修改状态失败')
      }
      this.$message.success('更新状态成功')
    },
  },
}
</script>


<style lang="less" scoped>
</style>