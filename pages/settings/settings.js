// settings.js
Page({
  data: {
    selectedDict: 0,
    dictionaries: ['基础词库', '电影词库', '明星词库', '甄嬛传词库', '英文词库', 'emoji猜成语'],
    timeOptions: ['30秒', '60秒', '90秒'],
    timeIndex: 1, // Default to 60 seconds
    playerCount: 2,
  },

  onLoad(options) {
    if (options.dict) {
      this.setData({
        selectedDict: parseInt(options.dict)
      });
    }
  },

  onTimeChange(e) {
    this.setData({
      timeIndex: e.detail.value
    });
  },

  increasePlayer() {
    if (this.data.playerCount < 10) {
      this.setData({
        playerCount: this.data.playerCount + 1
      });
    }
  },

  decreasePlayer() {
    if (this.data.playerCount > 2) {
      this.setData({
        playerCount: this.data.playerCount - 1
      });
    }
  },

  startGame() {
    // Store game settings
    const gameSettings = {
      dictionary: this.data.selectedDict,
      dictionaryName: this.data.dictionaries[this.data.selectedDict],
      timeInSeconds: (this.data.timeIndex + 1) * 30, // Convert to seconds (30, 60, or 90)
      playerCount: this.data.playerCount
    };
    
    // Store in global data or localStorage
    wx.setStorageSync('gameSettings', gameSettings);
    
    // Navigate to prepare page
    wx.navigateTo({
      url: '/pages/prepare/prepare'
    });
  },

  goBack() {
    wx.navigateBack();
  }
}) 