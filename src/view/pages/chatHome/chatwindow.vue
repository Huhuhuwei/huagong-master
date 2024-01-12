<template>
  <div class="chat-window">
    <div class="top">
      <el-row style="height: 70px;">

        <!--        头像-->
        <el-col :span="personInfoSpan[0]">
          <div class="head-pic">
<!--            <HeadPortrait :imgUrl="friendInfo.headImg"></HeadPortrait>-->
          </div>
        </el-col>

        <!--        信息和描述-->
        <el-col :span="personInfoSpan[1]">
          <div class="info-detail">
            <div class="name">{{ friendInfo.name }}</div>
            <!--            <div class="detail">{{ friendInfo.detail }}</div>-->
          </div>
        </el-col>
        <el-col :span="personInfoSpan[2]">
<!--          <div class="info-detail" v-if="this.$parent.SettingInfo.KeyMsg">
            <div class="name">余额($)：{{ billingUsage }}</div>
          </div>-->
        </el-col>
      </el-row>

    </div>
    <div v-show="!acqStatus">
      <div class="line"></div>
    </div>

    <div class="botoom" style="background-color:#E6E6FA;">
      <div class="chat-content" id="chat-content" ref="chatContent" @scroll="onScroll">
        <div class="chat-wrapper" v-for="item in chatList" :key="item.id">
          <div class="chat-friend" v-if="item.uid !== 'user'">
            <div class="chat-text" v-if="item.chatType === 0">
              <el-row :gutter="20">
                <el-col :span="2">
                  <svg t="1679666016648" @click="$copy(item.msg, '已复制')" class="icon" viewBox="0 0 1024 1024"
                       version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6241" width="22" height="22">
                    <path
                        d="M661.333333 234.666667A64 64 0 0 1 725.333333 298.666667v597.333333a64 64 0 0 1-64 64h-469.333333A64 64 0 0 1 128 896V298.666667a64 64 0 0 1 64-64z m-21.333333 85.333333H213.333333v554.666667h426.666667v-554.666667z m191.829333-256a64 64 0 0 1 63.744 57.856l0.256 6.144v575.701333a42.666667 42.666667 0 0 1-85.034666 4.992l-0.298667-4.992V149.333333H384a42.666667 42.666667 0 0 1-42.368-37.674666L341.333333 106.666667a42.666667 42.666667 0 0 1 37.674667-42.368L384 64h447.829333z"
                        fill="#909399" p-id="6242"></path>
                  </svg>
                </el-col>
                <el-col :span="21">
                </el-col>
              </el-row>

              <markdown-it-vue-light :content="item.msg"/>
            </div>
            <div class="info-time">
<!--              <img :src="item.headImg" alt=""/>-->
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
          <div class="chat-me" v-else>
            <div class="chat-text" v-if="item.chatType === 0">
              <span style="font-size: 16px; white-space: pre-line;">{{ item.msg }}</span>
            </div>
            <div class="info-time">
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
              <img :src="item.headImg" alt=""/>
            </div>
          </div>
        </div>
      </div>
      <div class="chatInputs">
        <!--输入框-->
        <textarea id="textareaMsg" :placeholder="$t('placeholder.question')" class="inputs" v-autoheight
                  style="z-index: 9999999999;min-height: 50px;max-height:400px;max-width: 100%;min-width: 45%;"
                  maxlength="2048" rows="3" dir autocorrect="off" aria-autocomplete="both" spellcheck="false"
                  autocapitalize="off" autocomplete="off" v-model="inputMsg" @keyup.enter="handleKeyDown"></textarea>
        <!--发送-->
        <div>
          <div class="send boxinput" @click="sendText">
            <img src="@/assets/img/emoji/send.png" alt="发送"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {animation, getNowTime, FormatDate} from "@/util/util";
import HeadPortrait from "@/components/HeadPortrait";
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'
import {AI_HEAD_IMG_URL, USER_HEAD_IMG_URL, USER_NAME} from '@/store/mutation-types'

export default {
  directives: {
    //用于自适应文本框的高度
    autoheight: {
      inserted: function (el) {
        var Msg = document.getElementById("textareaMsg").value;
        if (Msg === "") {
          el.style.height = "26x"
        } else {
          el.style.height = el.scrollHeight + 'px'
        }
      },
      update: function (el) {
        const Msg = document.getElementById("textareaMsg").value;
        if (Msg === "") {
          el.style.height = "26px"
        } else {
          el.style.height = el.scrollHeight + 'px'
        }
      }
    }
  },
  components: {
    HeadPortrait,
    MarkdownItVueLight
  },
  props: {
    storeStatu: Number,
    settingInfo: Object,
    friendInfo: Object,
    default() {
      return {};
    },
  },
  watch: {},
  data() {
    return {
      billingUsage: '0',
      isAutoScroll: true,
      //是否在接收消息中，如果是则true待发送状态，如果是false则是等待消息转圈状态
      acqStatus: true,
      chatList: [],
      inputMsg: "",
      // friendInfo: {},
      // 是否隐藏对话框上方介绍（空间局促时隐藏）
      personInfoSpan: [1, 17, 6],
    };
  },
  created() {
    // 先获取历史变量显示
    /*this.billingUsage = localStorage.getItem('billingUsage');
    const storedKeyMsg = localStorage.getItem('KeyMsg');
    // 更新
    if (storedKeyMsg) {
      this.$parent.getBillingUsage()
    }*/
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleKeyDown(event) {
      if (event.keyCode === 13 && (!event.shiftKey)) {  // 按下回车键，没按shift
        this.sendText()
      }
    },

    //导入当前内容json触发的方法
    importFromJsonArr() {
      this.$refs.onupdateJosnArr.click(); // 触发选择文件的弹框
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const fileContent = reader.result; // 文件内容
        const parsed = JSON.parse(fileContent); // 转换为数组
        this.chatList = this.chatList.concat(parsed)
      };
      reader.readAsText(file);
    },
    //监听窗口的变化
    handleResize() {
      if (window.innerWidth <= 700) {
        this.$nextTick(() => {
          document.querySelectorAll('.chat-content')[0].style.height = '93%';
          var textareaMsg = document.getElementById("textareaMsg");
          textareaMsg.style.marginLeft = "0px";
          this.personInfoSpan = [14, 0, 10];
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
          if (isMobile) {
            document.querySelectorAll('.chatInputs')[0].style.margin = '0%';
          } else {
            document.querySelectorAll('.chatInputs')[0].style.margin = '3%';
          }
        });
      } else {
        this.$nextTick(() => {
          document.querySelectorAll('.chat-content')[0].style.height = '88%';
          this.personInfoSpan = [1, 17, 6];
        });
      }
    },
    //赋值对话列表
    assignmentMesList(msgList) {
      this.chatList = msgList
    },
    //获取对话列表
    getMesList() {
      return this.chatList
    },
    //清除当前对话列表
    clearMsgList() {
      this.chatList = []
    },
    //发送信息
    sendMsg(msgList) {
      this.chatList.push(msgList);
      this.scrollToBottom();
    },
    //发送文字信息
    sendText() {
      this.rows = 1;
      this.$nextTick(() => {
        this.acqStatus = false
      })
      const dateNow = FormatDate();

      if (this.inputMsg) {
        let chatMsg = {
          headImg: USER_HEAD_IMG_URL,
          name: USER_NAME,
          time: dateNow,
          msg: this.inputMsg,
          chatType: 0, //信息类型，0文字，1图片
          uid: "user", //uid
          session: ''
        };
        if (this.chatList.length === 0) {
          chatMsg.session = this.generateUUID()
        }
        this.sendMsg(chatMsg);
        let chatBeforeResMsg = {
          headImg: AI_HEAD_IMG_URL,
          name: this.friendInfo.name,
          time: FormatDate(getNowTime()),
          msg: "",
          chatType: 0, //信息类型，0文字，1图片
          uid: this.friendInfo.id, //uid
        };
        this.sendMsg(chatBeforeResMsg)
        const xhr = new XMLHttpRequest();

        const content = encodeURIComponent(this.inputMsg);
        let url = `http://localhost:9090/chat/streamChat?content=${content}`;

        const token = this.settingInfo.KeyMsg;
        if (token) {
          url += `&token=${encodeURIComponent(token)}`;
        }

        const userToken = this.settingInfo.UserTokenMsg;
        if (userToken) {
          url += `&userToken=${encodeURIComponent(userToken)}`;
        }
        const session = this.chatList[0].session;
        url += `&session=${encodeURIComponent(session)}`;
        xhr.open('GET', url);
        xhr.setRequestHeader('Content-Type', 'text/event-stream');
        // 监听 readyStateChange 事件
        xhr.onreadystatechange = () => {
          const currentResLocation = this.chatList.length - 1
          // 如果 readyState 是 3，表示正在接收数据
          if (xhr.readyState === 3) {
            // 将数据添加到文本框中
            this.chatList[currentResLocation].msg = xhr.responseText
            // this.scrollToBottomIfAtBottom()
            this.scrollToBottomIfAtBottom()
          }
          // 如果 readyState 是 4，表示完成请求
          if (xhr.readyState === 4) {
            this.acqStatus = true;
            if (xhr.status === 200) {
              // 避免接受过程中缺少字符
              this.chatList[currentResLocation].msg = xhr.responseText
              if (this.chatList.length === 2) {
                let sessionList = this.$parent.sessionList;
                sessionList.forEach(session => {
                  session.id = session.id + 1
                })
                const obj = {
                  "id": 1,
                  "title": this.chatList[0].msg,
                  "dataList": this.chatList,
                  "session": this.chatList[0].session
                }
                this.$parent.sessionList.unshift(obj)
                this.$parent.clickSession(obj)
              }
            } else {
              this.chatList[currentResLocation].msg = "网络故障，回答失败，请稍后重试。"
            }
          }
        }
        // 发送请求
        xhr.send();
        this.inputMsg = "";
        // this.$parent.updateMoneyInfo();
      } else {
        this.$nextTick(() => {
          this.acqStatus = true
        });
        this.$message.warning(this.$t('message.msg_empty'))
      }
    },
    generateUUID() {
      const array = new Uint8Array(16);
      crypto.getRandomValues(array);
      let uuid = '';

      for (let i = 0; i < array.length; i++) {
        uuid += array[i].toString(16).padStart(2, '0');
        if (i === 3 || i === 5 || i === 7 || i === 9) {
          uuid += '-';
        }
      }
      return uuid;
    },
    onScroll() {
      const scrollDom = this.$refs.chatContent;
      const scrollTop = scrollDom.scrollTop;
      const offsetHeight = scrollDom.clientHeight;
      const scrollHeight = scrollDom.scrollHeight;
      // 当滚动到底部，设置 isAutoScroll 为 true
      this.isAutoScroll = scrollTop + offsetHeight === scrollHeight;
    },
    //获取窗口高度并滚动至最底层
    scrollBottom() {
      this.$nextTick(() => {
        // if (!this.isAutoScroll) return; // 如果 isAutoScroll 为 false，不执行滚动方法
        const scrollDom = this.$refs.chatContent;
        animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
      });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent;
        if (scrollDom)
          scrollDom.scrollTop = scrollDom.scrollHeight
      })
    },
    scrollToTop() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent;
        if (scrollDom)
          scrollDom.scrollTop = 0
      })
    },
    scrollToBottomIfAtBottom() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent;
        if (scrollDom) {
          const threshold = 30 // 阈值，表示滚动条到底部的距离阈值
          const distanceToBottom = scrollDom.scrollHeight - scrollDom.scrollTop - scrollDom.clientHeight
          if (distanceToBottom <= threshold) {
            scrollDom.scrollTop = scrollDom.scrollHeight;
            setTimeout(() => {
              scrollDom.scrollTop = scrollDom.scrollHeight;
            }, 0);
          }
        }
      })
    },

    /*scrollToBottomIfAtBottom() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent;
        if (scrollDom) {
          const threshold = 100; // 阈值，表示滚动条到底部的距离阈值
          const distanceToBottom = scrollDom.scrollHeight - scrollDom.scrollTop - scrollDom.clientHeight;
          if (distanceToBottom <= threshold) {
            const scrollHeight = scrollDom.scrollHeight;
            const start = scrollDom.scrollTop;
            const end = scrollHeight - scrollDom.clientHeight;
            const duration = 300; // 滚动持续时间

            const startTime = performance.now();
            const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // 缓动函数

            const animateScroll = currentTime => {
              const elapsedTime = currentTime - startTime;
              if (elapsedTime >= duration) {
                scrollDom.scrollTop = end;
                return;
              }
              const timeFraction = elapsedTime / duration;
              const scrollPosition = start + (end - start) * easeInOutQuad(timeFraction);
              scrollDom.scrollTop = scrollPosition;
              requestAnimationFrame(animateScroll);
            };

            requestAnimationFrame(animateScroll);
          }
        }
      });
    }*/
  },
};
</script>


<style lang="scss" scoped>
.iconfont:hover {

  color: rgb(29, 144, 245);

  .block {
    opacity: 1;
  }

}

::v-deep {
  .el-textarea__inner {
    background-color: rgb(66, 70, 86);
    border-radius: 15px;
    border: 2px solid rgb(34, 135, 225);
    /* padding: 10px; */
    box-sizing: border-box;
    transition: 0.2s;
    font-size: 20px;
    color: #fff;
    font-weight: 100;
    /* margin: 0 20px; */
    width: 98%;
    height: 70px !important;

  }
}

pre {
  background-color: #211f1f !important;
  border-radius: 20px !important;
  box-shadow: 0px 0px 9px 0px #000000 !important;
  color: #ffff !important;
}

.hljs {
  background-color: #211f1f !important;
  border-radius: 20px !important;
  box-shadow: 0px 0px 9px 0px #000000 !important;
  color: #ffff !important;
}

textarea::-webkit-scrollbar {
  width: 3px;
  /* 设置滚动条宽度 */
}

textarea::-webkit-scrollbar-thumb {
  background-color: rgb(66, 70, 86);
  /* 设置滚动条滑块的背景色 */
  border-radius: 50%;
  /* 设置滑块的圆角 */
}

.spinner {
  width: 50px;
  height: 50px;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.chat-window {
  width: 100%;
  height: 100%;
  margin-left: 0px;
  position: relative;

  .top {
    &::after {
      content: "";
      display: block;
      clear: both;
    }

    .head-pic {
      float: left;
    }

    .info-detail {
      float: left;
      margin: 5px 20px 0;

      .name {
        font-size: 23px;
        font-weight: 600;
        color: #fff;
      }

      .detail {
        color: #9e9e9e;
        font-size: 12px;
        margin-top: 2px;
      }
    }

    .other-fun {
      float: right;
      margin-top: 20px;

      span {
        margin-left: 30px;
        cursor: pointer;
      }

      // .icon-tupian {

      // }
      input {
        display: none;
      }
    }
  }


  .textarea {
    &:focus {
      outline: none;
    }
  }
//中间的对话框
  .botoom {
    width: 100%;
    height: 85vh;
    background-size: 100% 100%;
    background-color: #fff;
    border-radius: 15px;
    padding: 0;
    box-sizing: border-box;
    position: relative;

    .chat-content {
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      padding: 20px;
      box-sizing: border-box;

      &::-webkit-scrollbar {
        width: 3px;
        /* 设置滚动条宽度 */
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgb(66, 70, 86);
        /* 设置滚动条滑块的背景色 */
        border-radius: 50%;
        /* 设置滑块的圆角 */
      }

      .chat-friend {
        width: 100%;
        float: left;
        margin-bottom: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;

        .chat-text {
          float: left;
          max-width: 90%;
          padding: 15px;
          max-width: 650px;
          border-radius: 20px 20px 20px 5px;
          background-color: #fff;
        }

        .chat-img {
          img {
            max-width: 300px;
            max-height: 200px;
            border-radius: 10px;
          }
        }

        .info-time {
          margin: 10px 0;
          color: #fff;
          font-size: 14px;
          display: flex;
          justify-content: flex-start;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 10px;
          }

          span {
            line-height: 30px;
          }

          span:last-child {
            color: rgb(101, 104, 115);
            margin-left: 10px;
            vertical-align: middle;
          }
        }
      }

      .chat-me {
        width: 100%;
        float: right;
        margin-bottom: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;

        .chat-text {
          float: right;
          max-width: 90%;
          padding: 15px;
          border-radius: 20px 20px 5px 20px;
          background-color: #95ec69;
          color: #000;
          word-break: break-all;
        }

        .chat-img {
          img {
            max-width: 300px;
            max-height: 200px;
            border-radius: 10px;
          }
        }

        .info-time {
          margin: 10px 0;
          color: #fff;
          font-size: 14px;
          display: flex;
          justify-content: flex-end;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
            margin-left: 10px;
          }

          span {
            line-height: 30px;
          }

          span:first-child {
            color: rgb(101, 104, 115);
            margin-right: 10px;
            vertical-align: middle;
          }
        }
      }
    }

    .chatInputs {
      width: 100%;
      position: absolute;
      bottom: 0;
      margin: 3%;
      display: flex;
      background-color: #E6E6FA;

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

      .luyin {
        color: #fff;
        margin-left: 1.5%;
        font-size: 30px;
        text-align: center;
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
    }
  }
}


.line {
  position: relative;
  width: 94%;
  margin-left: 2%;
  height: 2px;
  background: linear-gradient(to right, red, yellow, green);
  animation: shrink-and-expand 2s ease-in-out infinite;

}

.line::before,
.line::after {
  content: "";
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background: inherit;
}

.line::before {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  left: 0;
  transform-origin: left;
  animation: shrink-left 2s ease-in-out infinite;
}

.line::after {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  right: 0;
  transform-origin: right;
  animation: shrink-right 2s ease-in-out infinite;
}

@keyframes shrink-and-expand {

  0%,
  100% {
    transform: scaleX(1);
  }

  50% {
    transform: scaleX(0);
  }
}

@keyframes shrink-left {

  0%,
  50% {
    transform: scaleX(1);
  }

  50.1%,
  100% {
    transform: scaleX(0);
  }
}

@keyframes shrink-right {

  0%,
  50% {
    transform: scaleX(1);
  }

  50.1%,
  100% {
    transform: scaleX(0);
  }
}

@media only screen and (min-width: 768px) { // 当屏幕宽度大于或等于768px时
  .chat-window {
    margin-left: 20px;

    .botoom {
      padding: 20px;
    }
  }
  .chat-window {
    .botoom {
      .chatInputs {
        width: 90%;
      }
    }
  }
}
</style>
