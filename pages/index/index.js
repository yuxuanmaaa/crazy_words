// index.js
Page({
  data: {
    dictIndex: 0,
    dictionaries: ['📚 基础词库', '🎬 电影词库', '⭐ 明星词库', '👑 甄嬛传词库', '🌍 英文词库', '😊 emoji猜成语'],
    showRulesModal: false
  },

  onDictSelect(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      dictIndex: index
    });
  },

  onStartGame() {
    // Navigate to settings page and pass the selected dictionary
    wx.navigateTo({
      url: '/pages/settings/settings?dict=' + this.data.dictIndex
    });
  },

  showRules() {
    this.setData({
      showRulesModal: true
    });
  },

  hideRules() {
    this.setData({
      showRulesModal: false
    });
  }
})
