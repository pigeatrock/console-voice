#### 一个语音提示包，有多种语音可供选择（内置一个音频播放器）
*** 代码示例 ***
```javascript
const { consolePlayer, consoleVoice } = require('./index.js')

consoleVoice(2, 'error', 'normal', 9, 1, 'inner').then(() =>{}) //播放内置语音包
consolePlayer("./voice/normal/start/start.mp3", 'inner').then(() =>{}) //一个小型的windows命令行音频播放器 mpg123
```
 * consoleVoice 播放内置语音包
 * @param {int} num 重复播放次数，默认1
 * @param {string} type 语音播放的类型（start,error,finish,exit），默认error
 * @param {string} voiceType 语音的音色，默认normal（目前只有这个，百度语音合成上搞就行）
 * @param {int} times 出错或者完成的次数，默认1
 * @param {int} delay 每次播放后的间隔秒数，默认1s
 * @param {string} player 音频播放器，默认inner内置的一个windows播放器

 * consolePlayer 音频播放器
 * @param {string} playSrc 音频文件
 * @param {string} player 音频播放器，默认inner内置的一个windows播放器