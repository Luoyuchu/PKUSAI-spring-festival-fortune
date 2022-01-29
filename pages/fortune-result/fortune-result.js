// pages/fortune-result.js
Page({

  /**
   * 页面的初始数据
   */
  all_text : ['稳定不稳定，反正都逃不过置身湍流中的事实，只是一些琐碎的细节而已，最后的方向基本上不会有什么改变，所以只要随意就好',
              'It is our choices that show what we truly are, far more than our abilities',
              'You have to live spherically - in many directions. Never lose your childish enthusiasm and things will come your way',
              '为了自己想过的生活，勇于放弃一些东西。若要前行，就得离开你现在停留的地方',
              '不必太纠结于当下，也不必太忧虑未来，当你经历过一些事情的时候，眼前的风景已经和从前不一样了',
              '活着就意味必须要做点什么，请好好努力',
              '千万别因为懦弱和无聊的自尊失去心爱的人',
              '缺乏想象力的狭隘、苛刻、自以为是的命题、空洞的术语、被篡夺的理想、僵化的思想体系——对我来说，真正可怕的是这些东西',
              '有些人不属于自己，但是遇见了也弥足珍贵',
              '决定人生的那一瞬间，绝对不能够欺骗自己',
              '当你相信你做的是对的时，你就不愿意浪费一分一秒',
              '一个好棋手得想好了再走棋，至少要先想好三步',
              '凭信念做事，而且不遗余力',
              '眼里所无法看见的花朵，更无心中所不愿思慕的明月',
              '必须努力寻找自己的声音，因为越迟开始寻找，找到的可能性就越小',
              '放心吧，你一定可以做得到的',
              '燃烧比褪色好',
              '自学者和学生的区别，不在于知识的广度，而在于生命力和自信心的差异',
              '如果爱，请深爱，爱到不能再爱的那一天','在隆冬，我终于知道，我身上有一个不可战胜的夏天','只要能拥抱世界，那拥抱得笨拙又有什么关系','与其不透彻地理解许多事，不如理解的事不多，但都能彻底'],
  all_title : ['上上签','上签','上上上签'],
  data: {
    pixelRatio: 0,
    windowWidth: 0,
    windowHeight: 0,
    showBgImagePath:'',
    // showBgImagePath2: '../../images/3x/b1@3x.png',
    // showBgImagePath3: '../../images/3x/b1@3x.png',
    showBgImagePath2: '../../images/backgrounds/3.png',
    showBgImagePath3: '../../images/backgrounds/3.png',
    dogBgImagePath:'',
    dogBgImagePath2: '../../images/3x/fortune-frame@3x.png',
    dogBgImagePath3: '../../images/3x/fortune-frame@3x.png',
    qrBgImagePath: '../../images/qr@2x.jpg',
    name: '',
    title: '',
    desc: '',
    
    
  },

  returnIndex: () => {
    // 关闭跳转
    wx.redirectTo({
      url: '../index/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let arr = wx.getStorageSync('currentFortuneData') || {};
    var title_idx = Math.floor(Math.random()*3)
    var text_idx = Math.floor(Math.random()*22)
    
    
    this.setData({
      name: arr.name +' 的虎年新年签',
      // title: "上上签",
      title: this.all_title[title_idx],
      // desc: "论文发不停！",
      desc:this.all_text[text_idx],
    })

    wx: wx.getSystemInfo({
      success: function (res) {
        that.setData({
          pixelRatio: res.pixelRatio,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.drawCanvas();
  },

  drawCanvas: function () {
    // 根据像素比绘画不同的图片
    var idx = Math.floor(Math.random()*23)
    // var idx = 3
    var img_path = '../../images/backgrounds/' + (idx+1).toString()+'.png';
    if (this.data.pixelRatio == 2) {
      this.setData({
        // showBgImagePath: this.data.showBgImagePath2,
        showBgImagePath : img_path,
        dogBgImagePath: this.data.dogBgImagePath2
      });
    } else {
      this.setData({
        // showBgImagePath: this.data.showBgImagePath3,
        showBgImagePath : img_path,
        dogBgImagePath: this.data.dogBgImagePath3
      });
    }
    let ctx = wx.createCanvasContext('myCanvas');
    // 画布宽高
    let ctxW = this.data.windowWidth;
    // let ctxH = this.data.windowHeight - 80;
    let ctxH = ctxW / 390 * 650;
    // 默认像素比
    let pixelRatio = this.data.pixelRatio;
    // 屏幕系数比，以设计稿375*667（iphone7）为例
    let XS = this.data.windowWidth/390;

    // 垂直渐变
    // const grd = ctx.createLinearGradient(0, 0, 0, ctxH);
    // grd.addColorStop(0, '#0E128D');
    // grd.addColorStop(1, '#080E3A');
    // ctx.setFillStyle(grd);

    // ctx.fillRect(0, 0, ctxW, ctxH);

    ctx.drawImage(this.data.showBgImagePath, 0, 0, 390 * XS, 650 * XS);
    // ctx.drawImage(this.data.showBgImagePath, ctxW / 2 - 158*XS, 34 * XS, 317 * XS, 361 * XS);
    ctx.drawImage(this.data.dogBgImagePath, 22.5, 25, 345 * XS, 600 * XS);
    // ctx.drawImage(this.data.dogBgImagePath, 20 * XS, 331 * XS, 61 * XS, 98 * XS);

    ctx.setFontSize(18 * XS);
    ctx.setFillStyle('#F7F7FA');
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.fillText(this.data.name, ctxW / 2, 170 * XS);

    ctx.font="25px CocaKaiti"
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    // ctx.setFontSize(25 * XS);
    ctx.setFillStyle('#FFFFFF');
    // this.fontLineFeed(ctx, this.data.title, 1, 38 * XS, ctxW / 2, 120 * XS);
    ctx.fillText(this.data.title, ctxW  / 2, 240 * XS);

    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.setFontSize(35 * XS);
    ctx.setFillStyle('#FFFFFF');
    // this.fontLineFeed(ctx, this.data.desc, 18 * XS, 20 * XS, 200 * XS, 330 * XS);
    ctx.fillText(this.data.desc, ctxW / 2, 350 * XS);

    ctx.stroke();
    ctx.draw();
  },
  // 文字换行
  /**
   * ctx,画布对象
   * str,需要绘制的文字
   * splitLen,切割的长度字符串
   * strHeight,每行文字之间的高度
   * x,位置
   * y
   */
  fontLineFeed:function(ctx,str,splitLen,strHeight,x,y){
    let strArr=[];
    for (let i = 0, len = str.length / splitLen;i<len;i++){
      strArr.push(str.substring(i * splitLen, i * splitLen + splitLen));
    }
    let s=0;
    for (let j = 0, len = strArr.length ; j < len; j++) {
      s = s + strHeight;
      ctx.fillText(strArr[j], x, y+s);
    }
  },
  // 保存图片
  saveImage: function (e) {
    
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(result){
            wx.showToast({
              title: '图片保存成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '2018运势小程序',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: 'loading',
          duration: 2000
        })
      }
    }
  }
})