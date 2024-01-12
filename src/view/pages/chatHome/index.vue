<template>
  <div class="chatHome">

    <div class="chatLeft" style="width:20%" v-show="showPersonList">
      <div class="title" style="text-align: center;">
        <h2>化工大模型问答</h2>
      </div>
      <div class="online-person" style="margin-top: 5%;">
        <div v-show="cutSetting === 1">
          <div class="s-wrapper">
            <div v-for="sessionInfo in sessionList" :key="sessionInfo.id" @click="clickSession(sessionInfo)">
              <Session :sessionInfo="sessionInfo" :settingInfo="SettingInfo" :pcCurrent="sessionCurrent"></Session>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chatRight">
      <!-- <router-view></router-view> -->
      <!--      左侧折叠-->
      <div class="top-left" @click="toggleLeft">
        <svg t="1679366341860" class="icon" v-show="!showPersonList" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="5764" width="30" height="30">
          <path
              d="M912.8 513.2C912.8 733.1 733.9 912 514 912S115.2 733.1 115.2 513.2 294.1 114.3 514 114.3s398.8 179 398.8 398.9z m-701.5 0c0 166.9 135.8 302.7 302.7 302.7s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5 211.3 346.3 211.3 513.2z"
              fill="#BDD2EF" p-id="5765"></path>
          <path
              d="M626.8 345.9c0 15-5.7 30.1-17.2 41.5L487.1 510l122.6 122.6c22.9 22.9 22.9 60.2 0 83.1-22.9 22.9-60.2 22.9-83.1 0L362.4 551.6c-22.9-22.9-22.9-60.2 0-83.1l164.1-164.1c22.9-22.9 60.2-22.9 83.1 0 11.5 11.5 17.2 26.5 17.2 41.5z"
              fill="#2867CE" p-id="5766"></path>
        </svg>
        <svg t="1679366707602" class="icon" v-show="showPersonList" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="7551" width="30" height="30">
          <path
              d="M514 912c-219.9 0-398.8-178.9-398.8-398.9 0-219.9 178.9-398.8 398.8-398.8s398.8 178.9 398.8 398.8c0 220-178.9 398.9-398.8 398.9z m0-701.5c-166.9 0-302.7 135.8-302.7 302.7S347.1 815.9 514 815.9s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5z"
              fill="#BDD2EF" p-id="7552"></path>
          <path
              d="M402.5 677.3c0-15 5.7-30.1 17.2-41.5l122.6-122.6-122.6-122.6c-22.9-22.9-22.9-60.2 0-83.1 22.9-22.9 60.2-22.9 83.1 0l164.1 164.1c22.9 22.9 22.9 60.2 0 83.1L502.8 718.8c-22.9 22.9-60.2 22.9-83.1 0-11.5-11.4-17.2-26.5-17.2-41.5z"
              fill="#2867CE" p-id="7553"></path>
        </svg>
      </div>

      <!--      右侧折叠-->
      <div class="top-right" @click="toggleRight">
        <svg t="1679366707602" class="icon" v-show="!showSetupList" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="7551" width="30" height="30">
          <path
              d="M514 912c-219.9 0-398.8-178.9-398.8-398.9 0-219.9 178.9-398.8 398.8-398.8s398.8 178.9 398.8 398.8c0 220-178.9 398.9-398.8 398.9z m0-701.5c-166.9 0-302.7 135.8-302.7 302.7S347.1 815.9 514 815.9s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5z"
              fill="#BDD2EF" p-id="7552"></path>
          <path
              d="M402.5 677.3c0-15 5.7-30.1 17.2-41.5l122.6-122.6-122.6-122.6c-22.9-22.9-22.9-60.2 0-83.1 22.9-22.9 60.2-22.9 83.1 0l164.1 164.1c22.9 22.9 22.9 60.2 0 83.1L502.8 718.8c-22.9 22.9-60.2 22.9-83.1 0-11.5-11.4-17.2-26.5-17.2-41.5z"
              fill="#2867CE" p-id="7553"></path>
        </svg>
        <svg t="1679366341860" class="icon" v-show="showSetupList" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="5764" width="30" height="30">
          <path
              d="M912.8 513.2C912.8 733.1 733.9 912 514 912S115.2 733.1 115.2 513.2 294.1 114.3 514 114.3s398.8 179 398.8 398.9z m-701.5 0c0 166.9 135.8 302.7 302.7 302.7s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5 211.3 346.3 211.3 513.2z"
              fill="#BDD2EF" p-id="5765"></path>
          <path
              d="M626.8 345.9c0 15-5.7 30.1-17.2 41.5L487.1 510l122.6 122.6c22.9 22.9 22.9 60.2 0 83.1-22.9 22.9-60.2 22.9-83.1 0L362.4 551.6c-22.9-22.9-22.9-60.2 0-83.1l164.1-164.1c22.9-22.9 60.2-22.9 83.1 0 11.5 11.5 17.2 26.5 17.2 41.5z"
              fill="#2867CE" p-id="5766"></path>
        </svg>
      </div>

      <div v-if="showChatWindow" v-show="showMainContent">
        <ChatWindow ref="chatWindow" :friendInfo="chatWindowInfo" :settingInfo="SettingInfo" :storeStatu="storeStatus"
                    @personCardSort="personCardSort"></ChatWindow>
      </div>
      <div class="showIcon" v-else>
        <svg t="1679552353056" class="icon iconfont icon-snapchat" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="3488" width="200" height="200">
          <path
              d="M992.33 416.37c17.66 0 31.98-14.32 31.98-31.98s-14.32-31.98-31.98-31.98h-63.98v-63.96h63.98c17.66 0 31.98-14.32 31.98-31.98s-14.32-31.98-31.98-31.98h-63.98v-95.94c0.01-8.48-3.36-16.62-9.35-22.62-6-6-14.14-9.37-22.62-9.36h-95.94V32.61c0-17.67-14.32-31.98-31.98-31.98-17.67 0-31.98 14.32-31.98 31.98v63.96h-63.96V32.61c0-17.67-14.32-31.98-31.98-31.98-17.67 0-31.98 14.32-31.98 31.98v63.96H544.6V32.61c0-17.67-14.32-31.98-31.98-31.98-17.67 0-31.98 14.32-31.98 31.98v63.96h-63.96V32.61c0-17.67-14.32-31.98-31.98-31.98s-31.98 14.32-31.98 31.98v63.96h-63.96V32.61c0-17.67-14.32-31.98-31.98-31.98S224.8 14.95 224.8 32.61v63.96h-95.94c-8.48 0-16.62 3.36-22.62 9.36s-9.36 14.14-9.36 22.62v95.94H32.92c-17.67 0-31.98 14.32-31.98 31.98s14.32 31.98 31.98 31.98h63.96v63.96H32.92c-17.67 0-31.98 14.32-31.98 31.98 0 17.67 14.32 31.98 31.98 31.98h63.96v63.97H32.92c-17.66 0-31.97 14.31-31.97 31.97 0 17.65 14.31 31.97 31.97 31.97h63.96v63.98H32.92c-17.66 0-31.97 14.31-31.97 31.97 0 17.66 14.31 31.97 31.97 31.97h63.96v63.98H32.92C15.26 736.18 0.95 750.5 0.95 768.15s14.31 31.97 31.97 31.97h63.96v95.95a31.944 31.944 0 0 0 9.36 22.62c6 5.99 14.14 9.36 22.62 9.35h95.94v63.98c0 17.66 14.32 31.98 31.98 31.98 17.67 0 31.98-14.32 31.98-31.98v-63.98h63.96v63.98c0 17.66 14.32 31.98 31.98 31.98 17.67 0 31.98-14.32 31.98-31.98v-63.98h63.96v63.98c0 17.66 14.32 31.98 31.98 31.98s31.98-14.32 31.98-31.98v-63.98h63.96v63.98c0 17.66 14.32 31.98 31.98 31.98s31.98-14.32 31.98-31.98v-63.98h63.96v63.98c0 17.66 14.32 31.98 31.98 31.98s31.98-14.32 31.98-31.98v-63.98h95.94c8.48 0.02 16.62-3.35 22.62-9.35s9.37-14.14 9.35-22.62v-95.95h63.98c17.65 0 31.97-14.31 31.97-31.97 0-17.66-14.31-31.97-31.97-31.97h-63.98V672.2h63.98c17.65 0 31.97-14.31 31.97-31.97 0-17.66-14.31-31.97-31.97-31.97h-63.98v-63.98h63.98c17.65 0 31.97-14.31 31.97-31.97 0-17.66-14.31-31.97-31.97-31.97h-63.98v-63.97h63.98zM864.41 864.1H160.84V160.53h703.57V864.1zM406.82 580.42h79.2l15.48 61.56h67.68l-83.16-267.84h-77.04l-83.16 267.84h65.52l15.48-61.56z m18-72.36c6.84-26.64 14.04-57.96 20.52-86.04h1.44c7.2 27.36 14.04 59.4 21.24 86.04l5.76 22.68h-54.72l5.76-22.68zM697.7 641.98h-64.44V374.14h64.44v267.84z"
              p-id="3489"></path>
        </svg>
      </div>
    </div>

    <div class="chatLeft" v-show="showSetupList">
<!--      <el-card shadow="hover" id="jianbian" style="line-height: 120%; text-align: center;">-->
<!--        <div>-->
<!--          <el-row :gutter="24">-->
<!--            <el-col :span="16">-->
<!--              <el-row v-if="!isBound">-->
<!--                <input class="inputs" v-if="!isBound && !SettingInfo.UserTokenMsg" v-model="SettingInfo.KeyMsg"-->
<!--                       :placeholder="$t('placeholder.openai_key')"-->
<!--                       autocomplete="new-password"-->
<!--                       style="width: 100%; margin: 10px 0 0 0;" ref="keyInput"/>-->
<!--                <input class="inputs" v-if="!isBound && !SettingInfo.KeyMsg" v-model="SettingInfo.UserTokenMsg"-->
<!--                       :placeholder="$t('placeholder.user_token')"-->
<!--                       autocomplete="new-password"-->
<!--                       style="width: 100%; margin: 10px 0 0 0;" ref="userTokenInput"/>-->
<!--              </el-row>-->
<!--              <el-row class="button-container" v-else>-->
<!--                <input class="inputs smaller-input" v-if="SettingInfo.KeyMsg" v-model="SettingInfo.KeyMsg"-->
<!--                       :placeholder="$t('placeholder.openai_key')"-->
<!--                       autocomplete="new-password"-->
<!--                       style="width: 100%; margin: 10px 0 0 0;" :disabled="true"/>-->
<!--                <input class="inputs smaller-input" v-if="SettingInfo.UserTokenMsg" v-model="SettingInfo.UserTokenMsg"-->
<!--                       :placeholder="$t('placeholder.user_token')"-->
<!--                       autocomplete="new-password"-->
<!--                       style="width: 100%; margin: 10px 0 0 0;" :disabled="true"/>-->
<!--              </el-row>-->
<!--&lt;!&ndash;            </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-col :span="8" class="button-col">&ndash;&gt;-->
<!--&lt;!&ndash;              <el-row class="button-container">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-button type="info" plain class="inputs" v-if="!isBound" style="width: 100%; margin: 10px 0 0 0;"&ndash;&gt;-->
<!--&lt;!&ndash;                           @click="bindInputs">&ndash;&gt;-->
<!--&lt;!&ndash;                  绑定&ndash;&gt;-->
<!--&lt;!&ndash;                </el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-button type="info" plain class="inputs" v-if="isBound" style="width: 100%; margin: 10px 0 0 0;"&ndash;&gt;-->
<!--&lt;!&ndash;                           @click="unbindInputs">&ndash;&gt;-->
<!--&lt;!&ndash;                  解除&ndash;&gt;-->
<!--&lt;!&ndash;                </el-button>&ndash;&gt;-->
<!--&lt;!&ndash;              </el-row>&ndash;&gt;-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </div>-->
<!--      </el-card>-->

      <div class="online-person">
        <div class="s-wrapper" style="height: 75vh;">
          <!--会话-->
          <el-collapse-transition>
            <div v-show="SettingStatus === 5">
              <!--新会话-->
              <div class="session boxinput" @click="newSession">
                <i class="el-icon-chat-round" style="margin-right: 10px"/>
                {{ $t('session.create') }}
              </div>

<!--                 <div class="session boxinput" @click="exportObjArrAllToJson"-->
<!--                                 style="margin-left: 0;margin-right: 0;width: 99%;">-->
<!--                              <span class="iconfont icon-daochu" style="color: #fff; margin-right:10px;"></span>-->
<!--                              {{ $t('session.export') }}-->
<!--                            </div>-->
<!--                            &lt;!&ndash;导入对话&ndash;&gt;-->
<!--                            <div class="session boxinput" @click="importFromJsonArrAll">-->
<!--                              <span class="iconfont icon-daoru" style="color: #fff; margin-right:10px;"></span> {{-->
<!--                                $t('session.import')-->
<!--                              }}-->
<!--                              <input type="file" ref="onupdateJosnArrAll" @change="handleFileUploadAll" style="display: none;">-->
<!--                            </div>-->
<!--          -->
              <el-popover
                  title="确认删除全部会话吗？"
                  v-model="visible">
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="clearAllContext">确定</el-button>
                </div>
                <div class="session boxinput" slot="reference">
                  <i class="el-icon-delete" style="margin-right: 10px"/>
                  {{ $t('session.clear') }}
                </div>
              </el-popover>
            </div>
          </el-collapse-transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Session from "@/components/Session.vue";
import ChatWindow from "./chatwindow.vue";
import {AI_HEAD_IMG_URL, USER_HEAD_IMG_URL} from '@/store/mutation-types'

import {FormatDate, getNowTime} from "@/util/util";
import axios from "axios";

export default {
  name: "App",
  components: {
    ChatWindow,
    Session,
  },
  data() {
    return {
      visible: false,
      count: 0,
      isBound: false,
      storeStatus: 0,
      //0是聊天设置，1是图片设置
      SettingStatus: 5,
      //0是模型列表，1是会话列表
      cutSetting: 1,
      //全部的设置参数
      SettingInfo: {
        cutSetting: 1,
        KeyMsg: '',
        UserTokenMsg: '',
        openProductionPicture: false,
        openChangePicture: false,

        n: 1,
        size: "256x256",
        language: "zh",
        max_results: 3,
      },
      //当前点击的文件
      fiCurrent: "",
      //当前点击的模型
      pcCurrent: "",
      //当前点击的会话
      sessionCurrent: "",
      //当前点击的微调模型
      ftCurrent: "",
      //文件列表
      fileList: [],
      //模型列表
      personList: [],
      //会话列表
      sessionList: [],
      //模型列表缓存
      personListCache: [],
      //是否显示聊天窗口
      showChatWindow: true,
      //当前窗口的对话模型信息
      chatWindowInfo: {},
      // 是否隐藏模型列表和功能设置选择列表
      showPersonList: true,
      showSetupList: true,
      showMainContent: true,
      firstSize: true,
      width: 0
    };
  },
  created() {
    // 页面初始化时从localStorage中恢复存储的值和绑定状态
    const storedKeyMsg = localStorage.getItem('KeyMsg');
    const storedUserTokenMsg = localStorage.getItem('UserTokenMsg');

    if (storedKeyMsg || storedUserTokenMsg) {
      this.SettingInfo.KeyMsg = storedKeyMsg;
      this.SettingInfo.UserTokenMsg = storedUserTokenMsg;
      this.isBound = true;
      this.getContextInfos()
    }
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  watch: {
    SettingInfo: {
      handler: function (newVal, oldVal) {
        if (newVal.openChangePicture) {
          this.SettingInfo.openProductionPicture = false
        }
        if (newVal.openProductionPicture) {
          this.SettingInfo.openChangePicture = false
        }
      },
      deep: true
    }
  },
  methods: {
    updateSessionList(newList) {
      this.sessionList = newList
      //清除当前窗口数据
      this.$refs.chatWindow.clearMsgList();
    },

    getBillingUsage() {
      let params = {
        'token': '',
      }
      if (this.SettingInfo.KeyMsg) {
        params.token = this.SettingInfo.KeyMsg
      }
      axios({
        method: 'GET',
        url: 'http://localhost:9090/chat/getBillingUsage',
        params: params,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }).then(res => {
        let bill = res.data.result.substring(0, 9);
        localStorage.setItem('billingUsage', bill)
        this.$refs.chatWindow.billingUsage = bill
      })
    },

    bindInputs() {
      if (this.SettingInfo.KeyMsg || this.SettingInfo.UserTokenMsg) {
        // 存储input框中的值到localStorage
        localStorage.setItem('KeyMsg', this.SettingInfo.KeyMsg);
        localStorage.setItem('UserTokenMsg', this.SettingInfo.UserTokenMsg);
        /*if (this.SettingInfo.KeyMsg) {
          this.getBillingUsage()
        }*/
        // 设置绑定状态
        this.isBound = true;
      } else {
        this.$notify({
          title: '请输入OpenAI Key或User Token',
          duration: 2000,
          type: "error",
          position: 'bottom-right'
        });
      }
      this.getContextInfos()
    },

    getContextInfos() {
      let params = {
        'token': '',
        'userToken': ''
      }
      if (this.SettingInfo.KeyMsg) {
        params.token = this.SettingInfo.KeyMsg
        params.userToken = null
      } else if (this.SettingInfo.UserTokenMsg) {
        params.userToken = this.SettingInfo.UserTokenMsg
        params.token = null
      }
      axios({
        method: 'GET',
        url: 'http://localhost:9090/chat/context/getChatContentInfos',
        params: params,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }).then(res => {
        const contextInfoList = res.data.result;

        // 这里的每一个list是一个会话
        contextInfoList.forEach(item => {
          // 获取后端返回的session字段
          let session = item.session;
          // 检查sessionList中是否已存在相同的session
          if (this.sessionList.some(existingItem => existingItem.session === session)) {
            return; // 跳过当前循环
          }
          // 解析 JSON 字符串为 JavaScript 数组
          let jsonString = item.context;
          jsonString = jsonString.replace(/\n/g, '\\n');
          const parsedArray = JSON.parse(jsonString);
          const chatList = [];
          // 遍历数组
          parsedArray.forEach(item => {
            let name = '';
            let headImg = ''
            if (item.role === 'user') {
              name = 'User';
              headImg = USER_HEAD_IMG_URL
            } else {
              name = 'ChatGPT';
              headImg = AI_HEAD_IMG_URL
            }
            const dateNow = FormatDate(getNowTime());
            const sub = {
              "uid": item.role,
              "chatType": 0,
              "msg": item.content,
              'headImg': headImg,
              'name': name,
              'time': dateNow,
              'session': session
            }
            chatList.push(sub)
          });
          const obj = {
            "id": this.sessionList.length + 1,
            "title": parsedArray[0].content,
            "dataList": chatList,
            "session": session
          }
          this.sessionList.push(obj);
        })
      })
    },
    unbindInputs() {
      // 清除localStorage中的存储值
      localStorage.removeItem('KeyMsg');
      localStorage.removeItem('UserTokenMsg');
      // 清空input框的值
      this.SettingInfo.KeyMsg = '';
      this.SettingInfo.UserTokenMsg = '';
      // 设置绑定状态
      this.isBound = false;
      this.sessionList = []
      //清除当前窗口数据
      this.$refs.chatWindow.clearMsgList();
      this.$nextTick(() => {
        this.$refs.keyInput.value = '';
        this.$refs.userTokenInput.value = '';
      });
    },

    //清除所有的会话内容
    clearAllContext() {
      this.sessionList = []
      this.clearCurrentContext()
      this.deleteAllSession()
      this.visible = false
    },

    deleteAllSession() {
      let params = {
        'token': '',
        'userToken': '',
      }
      if (this.SettingInfo.KeyMsg) {
        params.token = this.SettingInfo.KeyMsg
        params.userToken = null
      } else if (this.SettingInfo.UserTokenMsg) {
        params.userToken = this.SettingInfo.UserTokenMsg
        params.token = null
      }
      axios({
        method: 'POST',
        url: 'http://localhost:9090/chat/context/deleteSession',
        params: params,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }).then(res => {
        let errorCode = res.data.errorCode;
        if (errorCode !== '0') {
          location.reload()
          alert("删除会话失败，失败原因：" + res.data.errorMessage);
        }
      })

    },
    //清除当前会话内容
    clearCurrentContext() {
      this.$refs.chatWindow.clearMsgList()
    },
    // 点击切换显示状态
    toggleLeft() {
      this.showPersonList = !this.showPersonList;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      if (isMobile && (this.showPersonList || this.showSetupList)) {
        this.showMainContent = false;
        this.showSetupList = !this.showPersonList;
        document.querySelectorAll('.chatLeft')[0].style.width = '100%';
      } else {
        this.showMainContent = true;
        document.querySelectorAll('.chatLeft')[0].style.width = '20%';
      }
    },
    toggleRight() {
      this.showSetupList = !this.showSetupList;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      if (isMobile && (this.showPersonList || this.showSetupList)) {
        this.showMainContent = false;
        this.showPersonList = !this.showSetupList;
        document.querySelectorAll('.chatLeft')[1].style.width = '100%';
      } else {
        this.showMainContent = true;
        document.querySelectorAll('.chatLeft')[1].style.width = '20%';
      }
    },

    resize() {
      if (window.innerWidth <= 1150) {
        this.showPersonList = false;
        this.showSetupList = false;
        this.showChatWindow = true;
        const info = {
          img: "",
          name: "ChatGPT",
          detail: "chatgpt v3.5 所基于的模型",
          lastMsg: "chatgpt v3.5 所基于的模型",
          id: "gpt-3.5-turbo",
          headImg: AI_HEAD_IMG_URL,
          showHeadImg: true
        }
        this.chatWindowInfo = info;
        this.personInfo = info;
      } else {
        this.showPersonList = true;
        this.showSetupList = true;
      }
    },
    //监听窗口尺寸的变化
    handleResize() {
      if (this.firstSize) {
        this.resize();
        this.firstSize = false;
        this.width = window.innerWidth;
      }
      if (this.width !== window.innerWidth) {
        this.resize();
        this.width = window.innerWidth;
      }
    },
    //创建会话
    newSession() {
      this.$refs.chatWindow.clearMsgList();
    },

    clearCurrent() {
      //清除当前选择的模型微调模型
      this.ftCurrent = ""
      //清除当前选择的模型
      this.pcCurrent = "";
      //清除当前选择的会话
      this.sessionCurrent = "";
      //清除当前选择的文件
      this.fiCurrent = "";
    },

    //会话被点击
    clickSession(info) {
      this.sessionCurrent = info.id;
      this.$refs.chatWindow.assignmentMesList(info.dataList)
    },

    personCardSort(id) {
      if (typeof this.personList[0] != 'undefined' && id !== this.personList[0].id) {
        let nowPersonInfo;
        for (let i = 0; i < this.personList.length; i++) {
          if (this.personList[i].id === id) {
            nowPersonInfo = this.personList[i];
            this.personList.splice(i, 1);
            break;
          }
        }
        this.personList.unshift(nowPersonInfo);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.button-col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
  padding: 5px;
}

.el-button {
  white-space: nowrap;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
}

.top-left,
.top-right {
  position: absolute;
  top: 5px;
  cursor: pointer;
}

.top-left {
  left: 5px;
}

.top-right {
  right: 5px;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.boxinput {
  height: 30px;
  line-height: 50px;
  color: #fff;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  width: 90%;
  text-align: center;
  height: 50px;
  background-color:  #f1f1f1;
  border-radius: 15px;
  border: 1px solid  #f1f1f1;
  position: relative;
  cursor: pointer;
}

.icon {
  margin-right: 10px;
  vertical-align: middle;
}

.send {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color:  #f1f1f1;
  border: 0;
  transition: 0.3s;
  box-shadow:  #f1f1f1;

  &:hover {
    box-shadow: 0px 0px 10px 0px rgb(91, 219, 239);
  }
}

.weitiao {
  margin-top: 10px;
  width: 100%;
  margin-left: 0px;
  margin-right: 0px;
  height: 50px;
  background-color:  #f1f1f1;
  border-radius: 15px;
  border: 2px solid rgb(34, 135, 225);
  padding: 10px;
  box-sizing: border-box;
  transition: 0.2s;
  font-size: 20px;
  color: #fff;
  font-weight: 100;

  &:focus {
    outline: none;
  }
}

.fineTune {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color:  #f1f1f1;
  border: 0;
  transition: 0.3s;
  box-shadow:  #f1f1f1;

  &:hover {
    box-shadow: 0px 0px 10px 0px rgb(29, 144, 245);
  }
}
//创建对话
.session {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgb(66, 70, 86);
  border: 0;
  //transition: 0.3s;
  box-shadow: 0px 0px 5px 0px rgb(84, 89, 110);
  margin-left: 0px;
  margin-right: 0px;
  width: 99%;

  &:hover {
    box-shadow: 0 0 10px 0 rgb(29, 144, 245);
  }
}

.inputs {
  width: 65%;
  height: 45px;
  background-color: #f1f1f1;
  border-radius: 15px;
  border: 2px solid rgb(34, 135, 225);
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

.whiteText {
  color: #fff;
}

::v-deep .el-input__inner {
  background-color: transparent;
  color: #211f1f;
}

.setting {
  margin-left: 0px;
  padding-left: 10px;
  color: rgb(176, 178, 189);
}

.setting.active {
  color: #fff; // 选中后的颜色
}

.setting:hover {
  cursor: pointer;
}

#jianbian {
  background-color: rgb(39, 42, 55);
  border-color: #409EFF;
  color: #fff;
  border-width: 0px;
}

.astrict {
  width: 90%;
}

.settingButton {
  width: 99%;
}

.block {
  margin-top: 5%;

  .demonstration {
    color: aliceblue;
    text-align: center;
  }
}

.inputs {
  width: 90%;
  height: 50px;
  background-color: rgb(66, 70, 86);
  border-radius: 15px;
  border: 2px solid rgb(34, 135, 225);
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

.chatHome {
  // margin-top: 20px;
  display: flex;

  .chatLeft {
    width: 20%;

    .title {
      color: #fff;
      padding-left: 10px;
    }

    .online-person {
      .onlin-text {
        margin-left: 20%;
        padding-left: 10px;
        color: rgb(176, 178, 189);
      }

      .s-wrapper {
        padding-left: 10px;
        height: 70vh;
        margin-top: 10px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;

        &::-webkit-scrollbar {
          width: 2px; /* 滚动条宽度 */
        }

        &::-webkit-scrollbar-track {
          background-color:  #f1f1f1; /* 滚动条拖动块背景色 */
        }

        &::-webkit-scrollbar-thumb {
          background-color: #f1f1f1; /* 滚动条轨道背景色 */
          border-radius: 9999px;
        }

        &::-webkit-scrollbar-thumb:hover {
          background-color: #555; /* 滚动条拖动块悬停时背景色 */
        }
      }
    }
  }

  .chatRight {
    flex: 1;
    padding-right: 0px;

    .showIcon {
      position: absolute;
      top: calc(50% - 150px);
      /*垂直居中 */
      left: calc(50% - 50px);

      /*水平居中 */
      .icon-snapchat {
        width: 300px;
        height: 300px;
        font-size: 300px;
        // color: rgb(28, 30, 44);
      }
    }
  }
}
.el-header{
  background-color: #fff;
  display: flex; //设置显示为flex布局
  justify-content: space-between;//设置为flex左右布局
  padding-left: 0;//左内边距为0（Logo贴左边）
  align-items: center;//元素上下居中（防止右边按钮贴上下边）
  color: #211f1f;
  font-size: 20px;
  > div {//内嵌的div样式
    display: flex;
    align-items: center;//Logo和文字上下居中
    span {
      margin-left: 15px;//文字左侧设置间距，防止与Logo紧贴
    }
  }
}


@media only screen and (min-width: 768px) { // 当屏幕宽度大于或等于768px时
  .chatHome {
    .chatRight {
      padding-right: 30px;
    }
  }
}
</style>
