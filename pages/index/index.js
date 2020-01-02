//index.js
//获取应用实例

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
      this.progressView2.drawProgressBar(value, 100); //绘制环形进度
    }
  },

  /**
   * 减
   */
  minus: function() {
    if (value >0) {
      value-=10
      this.progressView2.drawProgressBar(value, 100); //绘制环形进度
    }
  },

  onLoad: function() {
    this.progressView2 = this.selectComponent("#progressView2");

    this.progressView2.drawProgressBar(value, 100); //绘制环形进度

    
  },

})