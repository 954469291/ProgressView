# 小程序环形进度条

### 先看看效果图
![](https://github.com/954469291/ProgressView/blob/master/static/images/jindu.gif)

<br>
<br>
## 属性
 ### canvasWidth ： 画布的宽度 单位rpx
 ### lineWidth ：线条宽度 默认16,单位rpx
 ### lineColor ： 当前进度颜色 默认"#E3AF6A"
 ### bottomColor ： 进度条底色 默认"#FFF9F1"
 ### value ：当前进度的值 
 ### maxValue ：进度条最大值 默认100
 ### showText ：是否显示中间进度值文字，默认为true
 ### textSize ：中间字体大小，单位rpx
 ### textColor ： 中间字体颜色
 <br>
 <br>
 
 ## 方法
 ### showCanvasRing(value, maxValue) 绘制2/3圆形进度条
 #### 参数
 ##### value 当前进度值
 ##### maxValue 进度条的最大值
 <br>
 ### showCanvasRound(value, maxValue) 绘制圆形进度条
 #### 参数
 ##### value 当前进度值
 ##### maxValue 进度条的最大值
 
