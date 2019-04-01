<template> 
   <div class="main-page">
        <div class="dialog-box" :class="{goingTop: showPanel}">
        </div>
        <div class="user-input-box" :class="{showPanel: showPanel}">
            <span class="voice-input">
                <img src="@/assets/image/voice.png" alt="">
            </span>
            <div class="input-outer">
                <group>
                    <x-input placeholder="按住说话" v-model="userInput" ref="userInput"></x-input>
                </group>
            </div>
            <span class="add-input" @click="showAddPanel">
                <img src="@/assets/image/add.png" alt="">
            </span>
            <ul class="add-panel" :class="{showPanel: showPanel}">
                <li class="add-item" v-for="(item, index) in addItemData" v-model="showPopup" :class="{isInFour: index<4}" @click="getAddFunction(index)">
                    <img :src="item.imgSrc" alt="">
                    <span class="title">{{item.title}}</span>
                </li>
            </ul>
        </div>
        <ul class="bottom-tools" :class="{invision: showTools}">
            <li class="tool-item" v-for="(tool, index) in bottomToolsData" :class="{active: index === selected}" @click="chooseTool(index)">
                <img v-show="index == selected" :src="tool.activeImgSrc" alt="" class="tool-img" :class="{setting: index ===2}">
                <img v-show="index != selected" :src="tool.imgSrc" alt="" class="tool-img" :class="{setting: index ===2}">
                <span class="tool-title">{{tool.title}}</span>
            </li>
        </ul>
        <popup v-model="showPopup" height="66%" class="quick-order-panel-popup">
            <div class="close-popup" @click="closePanel">
                <img src="@/assets/image/icon_pull_down.png" alt="">
            </div>
            <div class="three-part-outer" :class="showWhichPart">
                <div class="quick-order-part">
                    <div class="quick-order-title">
                        <span class="tips title">我的快捷命令</span>
                        <span class="tips delete-order" @click="orderDelete">
                            <img v-if="!showDeleteCheck" src="@/assets/image/icon_delete.png" alt="">
                            <span v-if="showDeleteCheck" class="finish-delete"  @click.stop="hideOrderDelete">完成</span>
                        </span>
                        <span class="tips add-order" @click.stop="showPart(1)">
                            <img src="@/assets/image/icon_plus.png" alt="">
                        </span>
                    </div>
                    <div class="quick-order-content">
                        <ul class="quick-order-list">
                            <li class="each-quick-order" v-for="(order, index) in quickOrderData">
                                <img src="@/assets/image/assistant_logo_small.png" alt="">
                                <span class="order-is">{{order.content}}</span>
                                <span v-if="showDeleteCheck" class="delete-this-order" @click="deleteThisOrder(index)">
                                    <img src="@/assets/image/red_delete.png" alt="">
                                </span>
                            </li>
                        </ul>
                        <div class="empty-data" v-if="showEmpty">
                            <img src="@/assets/image/empty.png" alt="">
                            <p class="title">您还没有创建快捷命令,点击 + 立即创建</p>
                        </div>
                    </div>
                </div>
                <div class="add-order-part">
                    <div class="add-order-title">
                        <span class="back" @click.stop="showConfirmDialog">
                            <img src="@/assets/image/icon_arrow_left.png" alt="">
                        </span>
                        <span class="title">添加命令</span>
                        <span class="save" @click="showToast">保存</span>
                    </div>
                    <div class="add-order-content">
                        <div class="input-order">
                            <p>您的口令</p>
                            <group>
                                <x-input title="" v-model="quickOrderValue" placeholder="请设置口令，如帮我考勤"  ref="quickOrderInput">
                                </x-input>
                            </group>
                        </div>
                        <div class="perform-scene">
                            <p>需要小火执行的场景</p>
                            <div class="choose-box" v-for="(scene, index) in curSceneData" @click.stop="showPart(2);changeSceneItemIndex(index);">
                                <span class="tips-scene" :class="{showSceneName: scene.showSceneName}">{{scene.content}}</span>
                                <img class="choose-in-btn" src="@/assets/image/icon_arrow_right.png" alt="">
                            </div>
                            <div class="add-btn" @click.stop="addMoreSceneItem">
                                <x-button class="add-button" plain type="primary">添加更多场景</x-button>
                                <img class="add-in-btn" src="@/assets/image/icon_plus_blue.png" alt="">
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="choose-scene-part">
                    <div class="choose-scene-title">
                        <span class="back" @click.stop="showPart(1)">
                            <img src="@/assets/image/icon_arrow_left.png" alt="">
                        </span>
                        <span class="title">选择场景</span>
                    </div>
                    <div class="scene-search-box">
                        <icon class="search-icon" type="search"></icon>
                        <group>
                            <x-input title="" placeholder="搜索场景">
                            </x-input>
                        </group>
                    </div>
                    
                    <ul class="scene-items">
                        <scroller :on-infinite="loadSceneList" :on-refresh="refreshSceneList" ref="scene_scroller" :noDataText="noDataText">
                            <li class="scene-item" v-for="(item, index) in sceneItemData" @click.stop="showPart(1);addScene(item.title)">
                                <img :src="item.imgSrc" alt="">
                                <span class="title">{{item.title}}</span>
                            </li>
                        </scroller>
                        <div v-if="showLoadMore" class="load-tips">
                            <div class="load-bg"> </div>
                            <span class="title">上拉加载更多场景</span>
                            <img src="@/assets/image/pull_up.png" alt="">
                        </div>
                    </ul>
                </div>
            </div>
        </popup>
        <toast v-model="showToastValue" 
               type="text" 
               :time="1000" 
               width="20em" 
               is-show-mask 
               text="口令保存成功！" 
               :position="toastPosition"
               @on-hide="saveQuickOrder();showPart(0)">
        </toast>
        <toast v-model="setOrder" 
               type="warn"
               width="20em" 
               :time="1000" 
               :position="toastPosition"
               @on-hide="">保存前请设置口令！
        </toast>
        <confirm class="order-confirm" v-model="showConfirm"
                cancel-text="否"
                confirm-text="是"
                mask-z-index="5000"
                @on-confirm="showPart(0);resetPart2()">
            <p class="confirm-text">是否取消创建快捷命令？</p>
        </confirm>
   </div>
</template>
<script>
import { XSwitch, Group, XInput, XButton, Selector, Search, Icon, Toast, Confirm, Popup } from 'vux'
export default {
  name: 'assistant',
  components: {
     XSwitch, 
     Group,
     XInput,
     XButton,
     Selector,
     Search,
     Icon,
     Toast,
     Confirm,
     Popup   
  },
  data () {
    return {
       showEmpty: false,
       showTools: false,
       showPanel: true,
       showDeleteCheck: false,
       showQuickOrder: false,
       showPopup: false,
       showLoadMore: true,
       showToastValue: false,
       inputRequired: false,
       setOrder: false,
       showConfirm: false,
       userInput: "",
       userInput1: "",
       toastPosition: "middle",
       confirmTitle: "是否取消创建快捷口令？",
    //    showSceneName: false,
       selected: 0,
       partIndex: 0,
       sceneItemIndex:0,
       quickOrderValue: "",
       pageNo: 0,
       pageSize: 5,
       noDataText: "--已经到底了--",
       bottomToolsData: [
           {
                imgSrc: require("@/assets/image/assistant.png"),
                activeImgSrc: require("@/assets/image/assistant_active.png"),
                title: "助手"
            },
           {
                imgSrc: require("@/assets/image/discovery.png"),
                activeImgSrc: require("@/assets/image/discovery_active.png"),
                title: "发现"
           },
           {
                imgSrc: require("@/assets/image/mysetting.png"),
                activeImgSrc: require("@/assets/image/mysettings_active.png"),
                title: "我的"
           }
       ],
       quickOrderData: [
           {
               content: "查车牌1",
               showCheck: false
           },
           {
               content: "查牌2",
               showCheck: false
           },
           {
               content: "查车牌3",
               showCheck: false
           },
           {
               content: "查牌4",
               showCheck: false
           },
           {
               content: "查车牌5",
               showCheck: false
           },
           {
               content: "查牌6",
               showCheck: false
           },
           {
               content: "查车牌7",
               showCheck: false
           },
           {
               content: "查牌8",
               showCheck: false
           },
           {
               content: "查车牌9",
               showCheck: false
           },
           {
               content: "查牌10",
               showCheck: false
           },
           {
               content: "查车牌11",
               showCheck: false
           },
           {
               content: "查牌12",
               showCheck: false
           }
       ],
       addItemData: [
            {
                imgSrc: require("@/assets/image/order_take_photo.png"),
                title: "拍照"
            },
            {
                imgSrc: require("@/assets/image/order_picture.png"),
                title: "图片"
            },
            {
                imgSrc: require("@/assets/image/order_document.png"),
                title: "文档"
            },
            {
                imgSrc: require("@/assets/image/order_video.png"),
                title: "视频"
            },
             {
                imgSrc: require("@/assets/image/order_voice.png"),
                title: "音频"
            },
            {
                imgSrc: require("@/assets/image/order_quick_order.png"),
                title: "我的快捷命令"
            },
            {
                imgSrc: require("@/assets/image/order_collect.png"),
                title: "我的收藏"
            }
       ],
       sceneItemData: [
            {
                imgSrc: require("@/assets/image/scene_my_salary_note.png"),
                title: "我的工资"
            },
            {
                imgSrc: require("@/assets/image/scene_my_beizhuang.png"),
                title: "我的备装"
            },
            {
                imgSrc: require("@/assets/image/scene_week_menu.png"),
                title: "本周菜单"
            },
            {
                imgSrc: require("@/assets/image/scene_meeting_preserve.png"),
                title: "预定会议"
            },
             {
                imgSrc: require("@/assets/image/scene_integration_query.png"),
                title: "积分查询"
            },
            {
                imgSrc: require("@/assets/image/scene_timing_card.png"),
                title: "考勤打卡"
            },
            {
                imgSrc: require("@/assets/image/scene_people_check.png"),
                title: "人员核查"
            },
            {
                imgSrc: require("@/assets/image/scene_timing_card.png"),
                title: "考勤打卡"
            },
            {
                imgSrc: require("@/assets/image/scene_people_check.png"),
                title: "人员核查"
            },
             {
                imgSrc: require("@/assets/image/scene_people_check.png"),
                title: "人员核查"
            },
            {
                imgSrc: require("@/assets/image/scene_timing_card.png"),
                title: "考勤打卡"
            },
            {
                imgSrc: require("@/assets/image/scene_people_check.png"),
                title: "人员核查"
            }
       ],
       menusQuickOrder: {
        //    delete: '<span style="color:red">关闭</span>'
       },
       curSceneData: [
           {
               content: "请选择要执行的场景",
               showSceneName: false
           }
       ]
 
    }
  },
  computed: {
      showWhichPart: function() {
          return {
            left0: this.partIndex == 0,
            left1: this.partIndex == 1,
            left2: this.partIndex == 2
          }
         
      },
      choosedScene(index) {
            return this.$store.state.sceneName[index]
      }
  },
  methods: {
      chooseTool: function(index) {
         this.selected = index
      },
      showAddPanel: function() {
         this.showTools = !this.showTools
         this.showPanel = !this.showPanel
      },
      getAddFunction: function(index) {
         if(index == 5) {
            //  alert("点击快捷命令")
             this.showPopup = true
         }
      },
      orderDelete: function() {
         this.showDeleteCheck = true
      },
      hideOrderDelete: function() {
         this.showDeleteCheck = false
      },
      quickOrderClick: function() {
         
      },
      closePanel: function() {
          this.showPopup = false;
      },
      showPart: function(index) {
          this.partIndex = index
      },
      saveQuickOrder: function() {
          this.quickOrderData.unshift({
              content: this.quickOrderValue,
              showCheck: false
          })
          this.showEmpty = false
      },
      deleteThisOrder: function(index) {
          this.quickOrderData.splice(index,1)
          if(this.quickOrderData.length == 0) {
               this.showEmpty = true;
          }
      },
      showToast: function() {
          if(this.quickOrderValue == "") {
             this.setOrder = true;
             this.$refs.quickOrderInput.focus();
          }else {
             this.showToastValue = true
          }
      },
      showConfirmDialog: function() {
          this.showConfirm = true
      },
      resetPart2: function() {
          this.quickOrderValue = "";
          this.curSceneData =  [
            {
                content: "请选择要执行的场景",
                showSceneName: false
            }
          ]
      },
      refreshSceneList: function() {
          console.log("下拉刷新……")
           this.timeout = setTimeout(()=>{
               this.$refs.scene_scroller.finishPullToRefresh();
           }, 1500)
      },
      loadSceneList: function() {
          console.log("上拉加载……")
          this.timeout = setTimeout(()=>{
                if (this.pageSize > 5) {
                    this.$refs.scene_scroller.finishInfinite(true)
                }else{
                    this.$refs.scene_scroller.finishInfinite(false)
                    this.pageSize ++;
                }
                this.sceneItemData.push(this.sceneItemData[0])
          }, 1500)

      },
      addScene: function(sceneName) {
        //   this.$store.commit("getSenceName", sceneName);
        //   this.showSceneName = true;
          this.curSceneData[this.sceneItemIndex].content       = sceneName
          this.curSceneData[this.sceneItemIndex].showSceneName = true

      },
      addMoreSceneItem: function() {
          this.curSceneData.push({
              content: "请选择要执行的场景",
              showSceneName: false
          })
      },
      changeSceneItemIndex: function(index) {
          this.sceneItemIndex = index
      }
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/assets/scss/assistant.scss';
</style>
