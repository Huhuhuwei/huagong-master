<template>
  <div class="person-card" :class="{ activeCard: sessionInfo.id === current }">
    <div class="info">
      <div class="info-detail">
        <div class="detail">
          <div style="padding: 13px;">
            <el-row>
              <el-col :span="2">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                     stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </el-col>
              <el-col :span="20">
                {{ sessionInfo.title.substring(0, 12) }}
              </el-col>
              <el-col :span="2">
                <el-popover
                    title="确认删除该会话吗？"
                    v-model="visible"
                    v-if="isActiveCard">
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="deleteSession">确定</el-button>
                  </div>
                  <span slot="reference">
                  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                       stroke-linecap="round"
                       stroke-linejoin="round" class="h-4 w-4 small-icon" height="1em" width="1em"
                       xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path
                      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line
                      x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </span>
                </el-popover>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  props: {
    sessionInfo: {
      default: {},
    },
    settingInfo: Object,
    pcCurrent: {
      default: ''
    }
  },
  data() {
    return {
      current: '',
      visible: false
    }
  },
  watch: {
    pcCurrent: function () {
      this.isActive()
    }
  },
  methods: {
    isActive() {
      this.current = this.pcCurrent
    },

    deleteSession() {
      let params = {
        'token': '',
        'userToken': '',
        'session': this.sessionInfo.session
      }
      if (this.settingInfo.KeyMsg) {
        params.token = this.settingInfo.KeyMsg
        params.userToken = null
      } else if (this.settingInfo.UserTokenMsg) {
        params.userToken = this.settingInfo.UserTokenMsg
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
        this.visible = false
        let errorCode = res.data.errorCode;
        if (errorCode === '0') {
          this.$parent.sessionList = this.$parent.sessionList.filter(item => item.session !== this.sessionInfo.session);
          this.$parent.$refs.chatWindow.clearMsgList();
        } else {
          alert("删除会话失败，失败原因：" + res.data.errorMessage)
        }
      })

    }
  },
  computed: {
    isActiveCard() {
      return this.sessionInfo.id === this.current
    }
  }
};
</script>

<style lang="scss" scoped>
.w-4 {
  width: 1rem;
}

.h-4 {
  width: 1rem;
}

.person-card {
  width: 100%;
  height: auto;
  border-radius: 10px;
  background-color: rgb(50, 54, 68);
  position: relative;
  margin: 25px 0;
  cursor: pointer;

  .info {
    width: auto;

    .info-detail {
      margin-top: 5px;
      //margin-left: 20px;

      .detail {
        color: #fff;
        font-size: 15px;
      }
    }
  }

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 136, 255);
    // box-shadow:  0 5px 20px rgba(251, 152, 11, .5);
    .info {
      .info-detail {
        .detail {
          color: #fff;
        }
      }
    }
  }
}

.small-icon {
  &:hover {
    box-shadow: 0 0 10px 0 rgba(197, 197, 210);
  }
}

.activeCard {
  box-shadow: 0 0 10px 0 rgba(0, 136, 255);

  .info {
    .info-detail {
      .detail {
        color: #fff;
      }
    }
  }
}
</style>
