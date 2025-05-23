// prepare.js
Page({
  data: {
    countdown: 3,
    gameSettings: {}
  },

  onLoad() {
    // Get game settings
    const gameSettings = wx.getStorageSync('gameSettings') || {};
    this.setData({ gameSettings });
    
    // Start countdown
    this.startCountdown();
  },

  startCountdown() {
    const countdownInterval = setInterval(() => {
      if (this.data.countdown > 1) {
        this.setData({
          countdown: this.data.countdown - 1
        });
      } else {
        // Stop the countdown
        clearInterval(countdownInterval);
        
        // 使用redirectTo直接跳转到游戏页面，关闭当前页面
        wx.redirectTo({
          url: '/pages/game/game'
        });
      }
    }, 1000);
  }
}) 