// static/component/ProgressView/ProgressView.js

var app = getApp();
var windWidth = wx.getSystemInfoSync().windowWidth;
//由于canvas的单位的px,为了适配所有屏幕，这里之前所有像素单位赋值之前都要换成以rpx为单位的大小乘以xs
const xs = windWidth / 750;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //画布的宽度 单位rpx
    canvasWidth: {
      type: Number,
      value: 400
    },
    //线条宽度 默认16,单位rpx
    lineWidth: {
      type: Number,
      value: 16
    },
    //线条颜色 默认"#E3AF6A"
    lineColor: {
      type: String,
      value: "#E3AF6A"
    },
    //进度条底色
    bottomColor: {
      type: String,
      value: "#FFF9F1"
    },
    //当前的值 
    value: {
      type: Number,
      value: 36
    },
    //最大值 默认100
    maxValue: {
      type: Number,
      value: 100
    },
    //是否显示中间进度值文字
    showText: {
      type: Boolean,
      value: true
    },
    //中间字体大小，单位rpx
    textSize: {
      type: Number,
      value: 60
    },
    textColor: {
      type: String,
      value: "#E3AF6A"
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    ctx: null,
    xs: windWidth / 750,
    width: 200 * xs,
    height: 200 * xs,
    percentage: 0 //中间百分比的值
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 绘制2/3环形图
     * @param value 当前值
     * @param maxValue 最大值
     */
    showCanvasRing(value, maxValue) {
      var canvasWidth = this.data.canvasWidth
      var lineWidth = this.data.lineWidth
      //设置画布宽高
      this.setData({
        width: canvasWidth*xs,
        height: (canvasWidth * 3 / 4 + lineWidth / 2) * xs
      })

      //作画
      //画布的一半，用来找中心点和半径
      var circle_r = canvasWidth * xs / 2;
      var bottomColor = this.data.bottomColor //进度条底色
      var lineColor = this.data.lineColor; //线条颜色
      var lineWidth = lineWidth * xs; //线条宽度


      var ctx = this.data.ctx
      if (!ctx) { //画布对象为空这代表初始化
        ctx = wx.createCanvasContext("circleBar", this); //canvas组建封装，需要后加个this
        this.setData({
          ctx: ctx
        })
      }

      //定义起始点
      ctx.translate(circle_r, circle_r);
      //底色圆弧
      ctx.beginPath();
      ctx.setStrokeStyle(bottomColor);
      ctx.setLineWidth(lineWidth);
      ctx.arc(0, 0, circle_r - 4, Math.PI * 5 / 6, Math.PI / 6, false);
      ctx.setLineCap('round') //末端圆弧
      ctx.stroke();
      ctx.closePath();

      var maxValue = maxValue != null ? maxValue : this.data.maxValue; //最大值
      var value = value != null ? value : this.data.value; //当前的值
      parseInt
      this.setData({
        percentage: parseInt(value / maxValue * 100)
      })
      console.log(`当前进度===${value}---总进度===${maxValue}`)
      //计算结果,环形总长度为Math.PI*4/3，计算当前值占
      var percent = (Math.PI * 4 / 3) * (value / maxValue)

      //有色彩的圆弧
      ctx.beginPath();
      ctx.setStrokeStyle(lineColor);
      ctx.setLineWidth(lineWidth);
      ctx.arc(0, 0, circle_r - 4, Math.PI * 5 / 6, Math.PI * 5 / 6 + percent, false);
      ctx.setLineCap('round') //末端圆弧
      ctx.stroke();
      ctx.closePath();

      ctx.draw(); //清空上次内容绘制本次内容


    },


    /**
     * 绘制圆形图
     * @param value 当前值
     * @param maxValue 最大值
     */
    showCanvasRound(value, maxValue) {
      var canvasWidth = this.data.canvasWidth
      //设置画布宽高
      this.setData({
        width: canvasWidth * xs,
        height: canvasWidth* xs
      })
      //作画
      //画布的一半，用来找中心点和半径
      var circle_r = canvasWidth * xs / 2;
      var bottomColor = this.data.bottomColor //进度条底色
      var lineColor = this.data.lineColor; //线条颜色
      var lineWidth = this.data.lineWidth * xs; //线条宽度


      var ctx = this.data.ctx
      if (!ctx) { //画布对象为空这代表初始化
        ctx = wx.createCanvasContext("circleBar", this); //canvas组建封装，需要后加个this
        this.setData({
          ctx: ctx
        })
      }

      //定义起始点
      ctx.translate(circle_r, circle_r);
      //底色圆弧
      ctx.beginPath();
      ctx.setStrokeStyle(bottomColor);
      ctx.setLineWidth(lineWidth);
      ctx.arc(0, 0, circle_r - 4, Math.PI * 3 / 2, Math.PI * 7 / 2, false);
      ctx.setLineCap('round') //末端圆弧
      ctx.stroke();
      ctx.closePath();

      var maxValue = maxValue != null ? maxValue : this.data.maxValue; //最大值
      var value = value != null ? value : this.data.value; //当前的值
      parseInt
      this.setData({
        percentage: parseInt(value / maxValue * 100)
      })
      console.log(`当前进度===${value}---总进度===${maxValue}`)
      //计算结果,环形总长度为Math.PI*2，计算当前值占
      var percent = (Math.PI * 2) * (value / maxValue)

      //有色彩的圆弧
      ctx.beginPath();
      ctx.setStrokeStyle(lineColor);
      ctx.setLineWidth(lineWidth);
      ctx.arc(0, 0, circle_r - 4, Math.PI * 3 / 2, Math.PI * 3 / 2 + percent, false);
      ctx.setLineCap('round') //末端圆弧
      ctx.stroke();
      ctx.closePath();

      ctx.draw(); //清空上次内容绘制本次内容


    }



  }
})