
小程序自定义组件-环形进度条
=======

# 小程序环形进度条

### 先看看效果图
![](https://github.com/954469291/ProgressView/blob/master/static/images/jindu.gif)
  
    
      
## 属性
 ### canvasWidth ： 画布的宽度 单位rpx
 ### radian ： 进度条的弧度大小，最小值为0，最大值为1，默认为1代表绘制一个圆的弧度也就是360°
 ### lineWidth ：线条宽度 默认16,单位rpx
 ### lineColor ： 当前进度颜色 默认"#E3AF6A"
 ### bottomColor ： 进度条底色 默认"#FFF9F1"
 ### value ：当前进度的值 
 ### maxValue ：进度条最大值 默认100
 ### direction ： 当前进度值的方向，只在radian为1时起作用，可填left(九点钟方向开始)，top(12点钟方向开始)，bottom（6点钟方向开始），right（3点钟方向开始）
 ### showText ：是否显示中间进度值文字，默认为true
 ### textSize ：中间字体大小，单位rpx
 ### textColor ： 中间字体颜色
  
    
      
 ## 方法
 ### drawProgressBar(value, maxValue) 绘制2/3圆形进度条
 #### 参数
 ##### value 当前进度值
 ##### maxValue 进度条的最大值
  



