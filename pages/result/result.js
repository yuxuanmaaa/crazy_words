// result.js
Page({
  data: {
    score: 0,
    correctWords: [],
    skippedWords: [],
    dictionary: '基础词库',
    timeInSeconds: 60
  },

  onLoad() {
    try {
      console.log('结果页面加载');
      // 获取游戏结果
      const gameResults = wx.getStorageSync('gameResults') || {};
      console.log('游戏结果:', gameResults);
      
      this.setData({
        score: gameResults.score || 0,
        correctWords: gameResults.correctWords || [],
        skippedWords: gameResults.skippedWords || [],
        dictionary: gameResults.dictionary || '基础词库',
        timeInSeconds: gameResults.timeInSeconds || 60
      });
    } catch (error) {
      console.error('结果页面加载错误:', error);
      // 出错时显示默认值
    }
  },

  playAgain() {
    try {
      // 导航到设置页面
      wx.redirectTo({
        url: '/pages/settings/settings',
        fail: (error) => {
          console.error('跳转到设置页面失败:', error);
          wx.showToast({
            title: '跳转失败，请重试',
            icon: 'none'
          });
        }
      });
    } catch (error) {
      console.error('再玩一次错误:', error);
    }
  },

  goHome() {
    try {
      // 导航到首页
      wx.reLaunch({
        url: '/pages/index/index',
        fail: (error) => {
          console.error('跳转到首页失败:', error);
          wx.showToast({
            title: '跳转失败，请重试',
            icon: 'none'
          });
        }
      });
    } catch (error) {
      console.error('返回首页错误:', error);
    }
  },

  shareResults() {
    try {
      // 分享结果
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage']
      });
    } catch (error) {
      console.error('分享错误:', error);
      wx.showToast({
        title: '分享功能暂不可用',
        icon: 'none'
      });
    }
  },

  onShareAppMessage() {
    return {
      title: `我在疯狂猜词中获得了${this.data.score}分！来挑战我吧！`,
      path: '/pages/index/index'
    }
  }
}) 