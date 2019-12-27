//index.js
//获取应用实例
const app = getApp()
var value=0
Page({
  data: {

  },

  /**
   * 加
   */
  plus:function(){
    if(value<100){
      value+=10
      this.progressView.showCanvasRing(value, 100); //绘制环形进度
      this.progressView2.showCanvasRound(value, 100); //绘制环形进度
    }
  },

  /**
   * 减
   */
  minus: function() {
    if (value >0) {
      value-=10
      this.progressView.showCanvasRing(value, 100); //绘制环形进度
      this.progressView2.showCanvasRound(value, 100); //绘制环形进度
    }
  },

  onLoad: function() {
    this.progressView = this.selectComponent("#progressView");
    this.progressView2 = this.selectComponent("#progressView2");

    this.progressView.showCanvasRing(value, 100); //绘制环形进度
    this.progressView2.showCanvasRound(value, 100); //绘制环形进度

    
  },

})