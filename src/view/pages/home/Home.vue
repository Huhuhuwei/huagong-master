
<template>
  <!-- 最外层页面于窗口同宽，使聊天面板居中 -->
  <div class="home-view">
    <!-- 整个聊天面板 -->
    <div class="chat-panel">
      <!-- 左侧的会话列表 -->
      <div class="session-panel">
        <div class="title">化工大模型问答助手</div>
        <div class="description">构建你的AI助手</div>
        <div class="session-list">
          <!-- for循环遍历会话列表用会话组件显示，并监听点击事件和删除事件。点击时切换到被点击的会话，删除时从会话列表中提出被删除的会话。 -->
          <!--  -->
          <SessionItem
              v-for="(session, index) in sessionList"
              :key="session.id"
              :active="session.id === activeSession.id"
              :session="sessionList[index]"
              class="session"
              @click="handleSessionSwitch(session)"
              @delete="handleDeleteSession"
          ></SessionItem>
        </div>
        <div class="button-wrapper">
          <div class="new-session">
            <el-button @click="handleCreateSession">
              <el-icon :size="15" class="el-icon--left">
                <CirclePlus />
              </el-icon>
              新建聊天
            </el-button>
          </div>
        </div>
      </div>
      <!-- 右侧的消息记录 -->
      <div class="message-panel">
        <!-- 会话名称 -->
        <div class="header">
          <div class="front" style="padding: 15px">
            <!-- 如果处于编辑状态则显示输入框让用户去修改 -->
            <div v-if="isEdit" class="title">
              <!-- 按回车代表确认修改 -->
              <el-input
                  v-model="activeSession.topic"
                  @keydown.enter="handleUpdateSession"
              ></el-input>
            </div>
            <br>
            <!-- 否则正常显示标题 -->
<!--            <div v-else class="title">{{ activeSession.topic }}</div>-->
<!--            <div class="description1">llama2</div>-->
          </div>
          <!-- 尾部的编辑按钮 -->
          <div class="rear">
            <el-icon class="el-icon-custom" :size="20">
              <!-- 不处于编辑状态显示编辑按钮 -->
              <EditPen v-if="!isEdit" @click="isEdit = true" />
              <!-- 处于编辑状态显示取消编辑按钮 -->
              <Close v-else @click="isEdit = false"></Close>
            </el-icon>
          </div>
        </div>

        <div class="message-list">
          <!-- 过渡效果 -->
          <transition-group name="list">
            <message-row
                v-for="(message, index) in activeSession.messages"
                :key="message.createdAt + index"
                :avatar="activeSession.createdBy.avatar"
                :message="message"
            ></message-row>
          </transition-group>
        </div>
        <!-- 监听发送事件 -->
        <message-input @send="handleSendMessage"></message-input>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  display: flex;
  /* 与窗口同宽 */
  width: 100vw;
  /* 水平方向上剧中 */
  justify-content: center;

  .chat-panel {
    /* 聊天面板flex布局，让会话列表和聊天记录左右展示 */
    display: flex;
    /* 让聊天面板圆润一些 */
    border-radius: 20px;
    background-color: #E6DDF8;
    /* 给一些阴影 */
    box-shadow: 0 0 50px 10px rgba(black, 0.05);
    /* 与上方增加一些间距 */
    margin-top: 70px;
    /* 左侧聊天会话面板*/
    .session-panel {
      background-color: #F9F9FB;
      width: 250px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      padding: 20px;
      position: relative;
      border-right: 1px solid rgba(black, 0.07);
      /* 标题*/
      .title {
        margin-top: 20px;
        font-size: 20px;
      }

      /* 描述*/
      .description {
        color: rgba(black, 0.6);
        font-size: 15px;
        margin-top: 10px;
      }
      .description1 {
        font-size: 24px; /* 设置字体大小为24px，你可以根据需要调整 */
        opacity: 0.5; /* 设置透明度为0.5，你可以根据需要调整 */
      }
      .session-list {
        .session {
          /* 每个会话之间留一些间距 */
          margin-top: 20px;
        }
      }

      .button-wrapper {
        /* session-panel是相对布局，这边的button-wrapper是相对它绝对布局 */
        position: absolute;
        bottom: 20px;
        left: 0;
        display: flex;
        /* 让内部的按钮显示在右侧 */
        justify-content: flex-end;
        /* 宽度和session-panel一样宽*/
        width: 100%;

        /* 按钮于右侧边界留一些距离 */
        .new-session {
          margin-right:10px;
        }
      }

    }

    /* 右侧消息记录面板*/
    .message-panel {
      width: 1200px;
      height:820px;
    }

  }
  .head-pic {
    float: left;
  }
}
.message-list {
  height: 575px;
  padding: 15px;
  background: url('../../../../src/assets/ai-1.png') center/cover no-repeat;
  // 消息条数太多时，溢出部分滚动
 // overflow-y: scroll;
  // 当切换聊天会话时，消息记录也随之切换的过渡效果
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}

.chatInputs {
  width: 100%;
  position: absolute;
  bottom: 0;
  margin: 3%;
  display: flex;
  background-color: #f1f1f1;

  .boxinput {
    width: 50px;
    height: 50px;
    background-color: rgb(50, 54, 68);
    border-radius: 15px;
    border: 1px solid rgb(80, 85, 103);
    box-shadow: 0px 0px 5px 0px rgb(0, 136, 255);
    position: relative;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .emoji {
    transition: 0.3s;
    width: 50px;
    min-width: 50px;
  }


  .inputs {
    width: 95%;
    height: 50px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px #fff;
    padding: 10px;
    box-sizing: border-box;
    transition: 0.2s;
    font-size: 20px;
    color: #fff;
    font-weight: 100;
    margin: 0 20px;

    &:focus {
      outline: none;
    }
  }

  .send {
    background-color: rgb(42, 166, 218);
    border: 0;
    transition: 0.3s;
    box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);

    &:hover {
      box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
    }
  }
  .el-icon-custom {
    font-family: 'YourCustomIconFont'; /* 替换为实际的图标字体 */
  }
  .el-col {
    border-radius: 4px;
  }
}
</style>
<script>
import MessageInput from "@/view/pages/components/MessageInput.vue";
import SessionItem from "@/view/pages/home/SessionItem.vue";
export default {
  components: {MessageInput, SessionItem},
  data() {
    return {
      isEdit: false,
      activeSession: { messages: [] },
      sessionList: [],
    };
  },
  methods: {
    async handleSessionSwitch(session) {
      this.activeSession = session;
    },
    handleDeleteSession(session) {
      const index = this.sessionList.findIndex((value) => value.id === session.id);
      this.sessionList.splice(index, 1);
    },
    async handleCreateSession() {
      const res = await this.$api.chatSession.saveChatSession({ topic: "新建聊天" });
      this.sessionList.unshift((await this.$api.chatSession.findChatSessionById(res.result)).result);
    },
  },
};
</script>
