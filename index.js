//语音提醒
const path = require('path')
const { spawn } = require('child_process');
const { error } = require('console');
const { type } = require('os');

//语音包存放路径
const voicePath = './voice';

//初始变量
// var voiceType = 'normal'; //默认音色为正常女性音色
var mimeType = ".mp3";
var errorTimes = 1; //出错次数（完成次数）
var randomAudioSrc = ['zhutou', 'shabi', 'zhizhang', 'erbaiwu', 'laji', 'mutougeda']; //随机语音数组（error）
var startAudioSrc = ['start', 'start1']; //随机启动语音数组
var exitAudioSrc = ['exit', 'exit1']; //随机退出语音数组
//test
// playAudio(2, 'finish', 'normal', 5);
// playAudio(2, 'error', 'normal');
// playAudio(2, 'start', 'normal');
// playAudio(3, 'exit', 'normal');

/**
 * 播放语音包
 * @param {int} num 重复播放次数，默认1
 * @param {string} type 语音播放的类型（start,error,finish），默认error
 * @param {string} voiceType 语音的音色，默认normal
 * @param {int} times 出错或者完成的次数，默认1
 * @param {int} delay 每次播放后的间隔秒数，默认1s
 * @param {string} player 音频播放器，默认inner内置的一个播放器
 */
async function playAudio(num = 1, type = 'error', voiceType = 'normal', times = 1, delay = 1, player = 'inner') {
    errorTimes = times;
    let audioSrc = voiceSrc(type); //根据错误次数获取实际路径
    let len = audioSrc.length;
    for (let i = 0; i < num; i++) {
        await timeOut(delay)
        for (let n = 0; n < len; n++) {
            playSound(type, voiceType, audioSrc[n] + mimeType, player);
        }
    }
}

//延迟函数
function timeOut(num = 1) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, num * 1000);
    })
}


//播放语音提示
async function playSound(type, voiceType, audioSrc, player) {
    var playSrc = '';
    let soundSrc = path.join(__dirname, voicePath, voiceType, type, audioSrc);
    if (type == 'finish') {
        playSrc = soundSrc;
    } else if (type == 'error') {
        playSrc = soundSrc;
    } else if (type == 'start') {
        playSrc = soundSrc;
    } else if (type == 'exit') {
        playSrc = soundSrc
    }
    await consolePlayer(playSrc, player);
}

//语音播放器
function consolePlayer(playSrc, player = 'inner') {
    var playerUrl = '';
    if (player == 'inner') {
        playerUrl = path.join(__dirname, "./other/mpg123.exe");
    } else {
        playerUrl = player;
    }
    return new Promise((resolve, reject) => {
        var sound = spawn(playerUrl, [playSrc]);
        sound.on('exit', (e) => {
            resolve(e);
        })
    })
}

//根据播放的次数返回具体的语音路径
function voiceSrc(type = 'error') {
    var src = '';
    var srcArr = []; //语音路径数组（有些语音是多个拼合的）
    if (type == 'start') {
        srcArr.push(randomAudio('start'));
    } else if (type == 'exit') {
        srcArr.push(randomAudio('exit'));
    } else if (type == 'finish') {
        if (9 < errorTimes) {
            errorTimes = errorTimes % 9;
        }
        if (0 < errorTimes && errorTimes <= 3) {
            src = 'finish'
            srcArr.push(src)
        }
        if (3 < errorTimes && errorTimes <= 6) {
            src = "finish1"
            srcArr.push(src)
        }
        if (6 < errorTimes && errorTimes <= 9) {
            src = "finish2"
            srcArr.push(src)
        }
    } else if (type == 'error') {
        if (30 < errorTimes) {
            errorTimes = errorTimes % 30;
        }
        if (0 < errorTimes && errorTimes <= 3) {
            src = "error"
            srcArr.push(src)
        }
        if (3 < errorTimes && errorTimes <= 6) {
            src = "error1"
            srcArr.push(src)
        }
        if (6 < errorTimes && errorTimes <= 9) {
            src = "error2"
            srcArr.push(src)
        }
        if (9 < errorTimes && errorTimes <= 12) {
            src = "error3"
            srcArr.push(src)
        }
        if (12 < errorTimes && errorTimes <= 15) {
            src = "hehe"
            srcArr.push(src)
            src = "ytmccl"
            srcArr.push(src)
        }
        if (15 < errorTimes && errorTimes <= 18) {
            src = "xingbuxinga"
            srcArr.push(src)
            src = "error2"
            srcArr.push(src)
        }
        if (18 < errorTimes && errorTimes <= 21) {
            src = "shax"
            srcArr.push(src)
            src = "ytmccl"
            srcArr.push(src)
        }
        if (21 < errorTimes && errorTimes <= 24) {
            src = "glss"
            srcArr.push(src)
            src = "zswyl"
            srcArr.push(src)
        }
        if (24 < errorTimes && errorTimes <= 30) {
            for (let i = 24; i < errorTimes; i++) {
                if (i < 26) {
                    srcArr.push('you')
                }
            }
            srcArr.push('error1')
            srcArr.push(randomAudio('error'));
        }
    }
    return srcArr;
}

//随机返回一个词
function randomAudio(type = 'error') {
    if (type == 'start') {
        let len = startAudioSrc.length;
        let index = getRndInteger(0, len);
        return startAudioSrc[index];
    } else if (type == 'error') {
        let len = randomAudioSrc.length;
        let index = getRndInteger(0, len);
        return randomAudioSrc[index];
    } else if (type == 'exit') {
        let len = exitAudioSrc.length;
        let index = getRndInteger(0, len);
        return exitAudioSrc[index];
    }
}

//获取两个整数之间的随机数
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    consoleVoice: playAudio,
    consolePlayer
}