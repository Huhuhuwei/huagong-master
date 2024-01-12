//下拉动画
export function animation(obj, target) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var step = (target - obj.scrollTop) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (obj.scrollTop >= target) {
      clearInterval(obj.timer);
    } else {
      // 当手动滚动时，停止自动下拉滚动
      if (obj.scrollTop !== obj.scrollHeight - obj.offsetHeight) {
        clearInterval(obj.timer);
        return;
      }
      obj.scrollTop = obj.scrollTop + step;
    }
  }, 10);
}

/**
* 获取当前时间
*/
export function getNowTime() {
  // 创建一个Date对象
  var date = new Date();
  // 获取年份、月份、日期、小时、分钟和秒数
  var year = date.getFullYear();
  var month = date.getMonth() + 1; // 注意月份从0开始计数
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  // 如果月份、日期、小时、分钟或秒数小于10，需要在前面补0
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  // 拼接成字符串
  // 输出结果
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}


/**
 * 格式化时间
 */
export function FormatDate(dateStr) {
  const date = new Date();
  const year = date.getFullYear();
  const month = addLeadingZero(date.getMonth() + 1);
  const day = addLeadingZero(date.getDate());
  const hour = addLeadingZero(date.getHours());
  const minute = addLeadingZero(date.getMinutes());
  const second = addLeadingZero(date.getSeconds());
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

/**
 * 复制到剪切板
 */

export function copyToClipboard(content) {
  const clipboardData = window.clipboardData
  if (clipboardData) {
    clipboardData.clearData()
    clipboardData.setData('Text', content)
    return true
  } else if (document.execCommand) {
    const el = document.createElement('textarea')
    el.value = content
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    return true
  }
  return false

}
/**
 * 是否在pc端下
 */
 export function isPc(){
  return navigator.userAgent.toLowerCase().indexOf(' electron/') > -1
}
