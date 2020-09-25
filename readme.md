#### 一个语音提示包，有多种语音可供选择
*** 代码示例 ***
```javascript
const consoleVoice = require('@hellorobot/console-voice')
consoleVoice(2, 'error', 'normal', 9, 0)
```
 * 播放语音
 * @param {int} num 重复播放次数，默认1
 * @param {string} type 语音播放的类型（目前两种：error,finish），默认error
 * @param {string} voiceType 语音的音色，默认normal
 * @param {int} times 出错或者完成的次数，默认1
 * @param {int} delay 每次播放后的间隔秒数，默认1s

*** other文件夹里面有一个播放器，添加到环境变量即可 ***
