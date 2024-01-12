<template>
  <div class="message-input">
    <div class="input-wrapper">
      <!-- 按回车键发送，输入框高度三行 -->
      <el-input
          v-model="message"
          :autosize="{ minRows: 2, maxRows: 3 }"
          class="input"
          type="textarea"
          @keyup.enter.native="sendMessage"
      >
      </el-input>
      <div class="button-wrapper">
        <el-button type="primary" @click="sendMessage">
          <el-icon class="el-icon--left">
            <el-icon-position />
          </el-icon>
          发送
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineEmits } from 'vue'

export default {
  setup() {
    // 发送消息消息事件


    // 输入框内的消息
    const message = ref('')
    const sendMessage = () => {
      emit('send', message.value)
      // 发送完清除
      message.value = ''
    }

    return {
      message,
      sendMessage
    }
  }
}
</script>

<style lang="scss" scoped>
.message-input {
  padding: 20px;
  border-top: 1px solid rgba(black, 0.07);
  border-left: 0px solid rgba(black, 0.07);
  border-right: 0px solid rgba(black, 0.07);
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
</style>
