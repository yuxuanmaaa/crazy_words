// game.js
Page({
  data: {
    currentWord: '',
    timeLeft: 60,
    score: 0,
    correctWords: [],
    skippedWords: [],
    wordList: [],
    isGameOver: false
  },

  onLoad() {
    try {
      console.log('游戏页面加载');
      // 获取游戏设置
      const gameSettings = wx.getStorageSync('gameSettings') || {};
      console.log('游戏设置:', gameSettings);
      
      // 设置初始倒计时
      const timeInSeconds = gameSettings.timeInSeconds || 60;
      
      // 加载词库
      const wordList = this.loadWordList(gameSettings.dictionary || 0);
      
      // 更新数据
      this.setData({
        timeLeft: timeInSeconds,
        wordList: wordList,
        gameSettings: gameSettings
      });
      
      // 显示第一个词
      this.showNextWord();
      
      // 开始倒计时
      this.startCountdown();
    } catch (error) {
      console.error('游戏初始化错误:', error);
      wx.showToast({
        title: '游戏初始化失败',
        icon: 'none',
        duration: 2000
      });
    }
  },

  onHide() {
    // 清理定时器
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  },

  onUnload() {
    // 清理定时器
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  },

  loadWordList(dictionaryIndex) {
    try {
      // 示例词库
      const dictionaries = [
        // 基础词库
        ['苹果', '香蕉', '橙子', '西瓜', '草莓', '电脑', '手机', '电视', '冰箱', '空调'],
        // 电影词库
        ['泰坦尼克号', '星球大战', '哈利波特', '阿凡达', '指环王', '复仇者联盟'],
        // 明星词库
        ['周杰伦', '成龙', '李连杰', '章子怡', '刘德华', '张艺谋'],
        // 甄嬛传词库
        ['甄嬛', '皇上', '华妃', '安陵容', '端妃', '太后'],
        // 英文词库
        ['Apple', 'Banana', 'Orange', 'Computer', 'Telephone'],
        // emoji猜成语
        ['一马当先', '对牛弹琴', '画蛇添足', '守株待兔', '鹬蚌相争']
      ];
      
      // 获取词库
      let wordList = [];
      if (dictionaryIndex >= 0 && dictionaryIndex < dictionaries.length) {
        wordList = dictionaries[dictionaryIndex];
      } else {
        wordList = dictionaries[0];
      }
      
      // 随机排序
      return this.shuffleArray(wordList);
    } catch (error) {
      console.error('加载词库错误:', error);
      return ['苹果', '香蕉', '橙子', '电脑', '手机']; // 返回默认词库
    }
  },

  shuffleArray(array) {
    try {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    } catch (error) {
      console.error('词库随机排序错误:', error);
      return array; // 发生错误时返回原数组
    }
  },

  startCountdown() {
    try {
      this.countdownTimer = setInterval(() => {
        if (this.data.timeLeft > 0) {
          this.setData({
            timeLeft: this.data.timeLeft - 1
          });
        } else {
          // 游戏结束
          this.endGame();
        }
      }, 1000);
    } catch (error) {
      console.error('启动倒计时错误:', error);
    }
  },

  showNextWord() {
    try {
      // 从词库中获取下一个词
      if (this.data.wordList.length > 0) {
        const wordList = [...this.data.wordList];
        const nextWord = wordList.shift();
        
        this.setData({
          currentWord: nextWord,
          wordList: wordList
        });
      } else {
        // 词库用完，结束游戏
        this.endGame();
      }
    } catch (error) {
      console.error('显示下一个词错误:', error);
    }
  },

  // 点击"猜对"按钮
  onCorrectTap() {
    this.markAsCorrect();
  },

  // 点击"跳过"按钮
  onSkipTap() {
    this.markAsSkipped();
  },

  markAsCorrect() {
    try {
      // 添加当前词到猜对列表
      const correctWords = [...this.data.correctWords];
      correctWords.push(this.data.currentWord);
      
      this.setData({
        correctWords: correctWords,
        score: correctWords.length
      });
      
      // 显示下一个词
      this.showNextWord();
    } catch (error) {
      console.error('标记为猜对错误:', error);
    }
  },

  markAsSkipped() {
    try {
      // 添加当前词到跳过列表
      const skippedWords = [...this.data.skippedWords];
      skippedWords.push(this.data.currentWord);
      
      this.setData({
        skippedWords: skippedWords
      });
      
      // 显示下一个词
      this.showNextWord();
    } catch (error) {
      console.error('标记为跳过错误:', error);
    }
  },

  endGame() {
    try {
      console.log('游戏结束');
      // 停止倒计时
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
      }
      
      // 保存游戏结果
      const gameSettings = this.data.gameSettings || {};
      const gameResults = {
        score: this.data.score,
        correctWords: this.data.correctWords,
        skippedWords: this.data.skippedWords,
        dictionary: gameSettings.dictionaryName || '基础词库',
        timeInSeconds: gameSettings.timeInSeconds || 60
      };
      
      wx.setStorageSync('gameResults', gameResults);
      console.log('游戏结果已保存', gameResults);
      
      // 跳转到结果页面
      wx.redirectTo({
        url: '/pages/result/result',
        success: () => {
          console.log('成功跳转到结果页面');
        },
        fail: (error) => {
          console.error('跳转到结果页面失败:', error);
          // 如果跳转失败，尝试返回首页
          wx.reLaunch({
            url: '/pages/index/index'
          });
        }
      });
    } catch (error) {
      console.error('结束游戏错误:', error);
      // 发生错误时，尝试返回首页
      wx.reLaunch({
        url: '/pages/index/index'
      });
    }
  }
}) 