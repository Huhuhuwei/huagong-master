<template>
  <div class="home" :class="{'is-pc':isPc}">
        <router-view></router-view>
  </div>
</template>

<script>
import { isPc } from '@/util/util.js'

export default {
  name: "App",
  components: {
  },
  computed:{
    isPc:()=>isPc()
  },
  data() {
    return {
      asideStatus: true,
      firstSize: true,
      width: 0
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    resize(){
      this.asideStatus = window.innerWidth > 1150;
    },
   //监听窗口尺寸的变化
    handleResize() {
      if (this.firstSize){
        this.resize();
        this.firstSize = false;
        this.width = window.innerWidth;
      }
      if ( this.width !== window.innerWidth ){
        this.resize();
        this.width = window.innerWidth;
      }

    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
 // background-color: rgb(39, 42, 55);
  //border-radius: 15px;
 // background: url("../../src/assets/login.png") center/cover no-repeat fixed; /* Replace 'your-background-image.jpg' with the path to your background image */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.is-pc{
  width: 100vw;
  height: 100vh;
  border-radius: unset;
}
</style>
