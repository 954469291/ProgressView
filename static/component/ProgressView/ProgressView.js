// static/component/ProgressView/ProgressView.js

var app = getApp();
var windWidth = wx.getSystemInfoSync().windowWidth;//屏幕宽度
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
    //进度条的弧度大小，最小值为0，最大值为1，默认为1代表绘制一个圆的弧度也就是360°
    radian: {
      type: Number,
      value: 1 / 2
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
    //当前进度值的方向，只在radian为1时起作用，可填left(九点钟方向开始)，top(12点钟方向开始)，bottom（6点钟方向开始），right（3点钟方向开）
    direction: {
      type: String,
      value: "top"
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
    //中间字体颜色
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
    width: 400,
    height: 400,
    percentage: 0 //中间百分比的值
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 绘制环形进度条
     * @param value 当前进度值
     * @param maxValue 进度最大值
     */
    drawProgressBar(value, maxValue) {
      var radian = this.data.radian//弧度大小
      radian=radian>1?1:radian //控制最大值为1
      radian=radian<0?0:radian //控制最小值为0
      //作画

      var bottomColor = this.data.bottomColor //进度条底色
      var lineColor = this.data.lineColor; //线条颜色
      var lineWidth = this.data.lineWidth * xs; //线条宽度

      var canvasWidth = this.data.canvasWidth//画布的宽

      var canvasHeight = (Math.cos((1 - radian) * Math.PI) + 1) * canvasWidth / 2 + lineWidth //计算画布的高度
      //设置画布宽高,高最低是进度框的半径
      this.setData({
        width: canvasWidth,
        height: radian < 0.5 ? canvasWidth / 2 : canvasHeight
      })

      //计算弧形的起点，这是为了保证起点和终点在同一水平线上
      var startPath = Math.PI * (3 / 2 - radian)
      var endPath = startPath + 2 * Math.PI * radian

      //获取canvas 的绘图上下文
      var ctx = this.data.ctx
      if (!ctx) {
        ctx = wx.createCanvasContext("circleBar", this); //创建 canvas 的绘图上下文 CanvasContext 对象
        this.setData({
          ctx: ctx
        })
      }

      var circle_r = canvasWidth * xs / 2;  //画布的一半，用来找中心点和半径
      ctx.translate(circle_r, circle_r);//改变坐标原点的位置，将原点当做圆心作画

      //绘制底色圆弧
      ctx.beginPath();//开始创建一个路径
      ctx.setStrokeStyle(bottomColor);//设置描边颜色
      ctx.setLineWidth(lineWidth);//设置线条的宽度
      ctx.arc(0, 0, circle_r - lineWidth / 2, startPath, endPath, false);//创建一条弧线
      ctx.setLineCap('round') //末端圆弧
      ctx.stroke();//画出当前路径的边框
      ctx.closePath();//关闭一个路径

      //计算中间进度文字的值
      var maxValue = maxValue != null ? maxValue : this.data.maxValue; //最大值
      var value = value != null ? value : this.data.value; //当前的值
      //更新进度值
      this.setData({
        percentage: parseInt(value / maxValue * 100)
      })


      //计算当前进度弧形大小,环形总长度为Math.PI*2
      var percent = 2 * Math.PI * radian * (value / maxValue)
      var currStartPath = startPath //当前进度值的起点位置
      //如果radian为1则使用自定义的起始位置
      if (radian == 1) {
        var direction = this.data.direction//当前进度值
        switch (direction) {
          case 'left':
            currStartPath =Math.PI //九点钟方向
            break
          case 'top':
            currStartPath = 3 / 2 * Math.PI //十二点钟方向
            break
          case 'right':
            currStartPath = 0 //三点钟方向
            break
          case 'bottom':
            currStartPath = 1 / 2 * Math.PI //六点钟方向
            break
        }
      }

      //当前进度的圆弧
      ctx.beginPath();//开始创建一个路径
      ctx.setStrokeStyle(lineColor);//设置描边颜色
      ctx.setLineWidth(lineWidth);//设置线条的宽度
      ctx.arc(0, 0, circle_r - lineWidth / 2, currStartPath, percent + currStartPath, false);//创建一条弧线
      ctx.setLineCap('round') //末端圆弧
      ctx.stroke();//画出当前路径的边框
      ctx.closePath();//关闭一个路径


      ctx.draw(); //清空上次内容绘制本次内容

    }



  }
})