<template>
  <div>
    <!-- 触发新建对话框的按钮 -->
    <el-button type="primary" @click="openCreateDialog">新建对话</el-button>

    <!-- 新建对话框 -->
    <el-dialog
        title="新建对话框"
        :visible.sync="createDialogVisible"
        width="30%"
        @close="closeCreateDialog"
    >
      <!-- 对话框内容，包含表单项等 -->
      <el-form label-width="80px">
        <el-form-item label="对话名称">
          <el-input v-model="newSessionName"></el-input>
        </el-form-item>
        <!-- 其他表单项... -->
      </el-form>

      <!-- 对话框底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCreateDialog">取消</el-button>
        <el-button type="primary" @click="handleCreateSession">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createDialogVisible: false,
      newSessionName: '',
      // 其他数据...
    };
  },
  methods: {
    openCreateDialog() {
      // 打开新建对话框
      this.createDialogVisible = true;
    },
    closeCreateDialog() {
      // 关闭新建对话框
      this.createDialogVisible = false;
      // 清空数据
      this.newSessionName = '';
      // 其他数据清空...
    },
    async handleCreateSession() {
      // 处理创建对话的逻辑
      const res = await this.$api.chatSession.saveChatSession({ topic: this.newSessionName });
      this.sessionList.unshift((await this.$api.chatSession.findChatSessionById(res.result)).result);

      // 创建完对话后关闭对话框
      this.closeCreateDialog();
    },
    // 其他方法...
  },
};
</script>

<style scoped>
.dialog-footer {
  text-align: center;
}
</style>
