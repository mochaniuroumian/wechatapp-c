//转换日期
const date = function(dateObject) {
    if (dateObject.length > 0) {
      if (!dateObject.includes('T')) dateObject = dateObject.replace(/-/g, '/')
      const d = new Date(dateObject)
      let day = d.getDate()
      let month = d.getMonth() + 1
      const year = d.getFullYear()
      if (day < 10) {
        day = '0' + day
      }
      if (month < 10) {
        month = '0' + month
      }
      const date = year + '-' + month + '-' + day
      return date
    }
    return null
}
//过滤html
const _filter = function(str) {
    if (str !== null && str !== '' && str !== undefined) {
      const regex = /(<([^>]+)>)/gi
      let res = str.replace(regex, '')
      res = res.replace(/&nbsp;/gi, '')
      return res
    }
    return null
}
//截取字段
const cutString = function(str, len) {
    if (str == null || str === '' || str === undefined) return null
    //length属性读出来的汉字长度为1
    if (str.length * 2 <= len) {
      return str
    }
    let strlen = 0
    let s = ''
    for (let i = 0; i < str.length; i++) {
      s = s + str.charAt(i)
      if (str.charCodeAt(i) > 128) {
        strlen = strlen + 2
        if (strlen >= len) {
          return s.substring(0, s.length - 1) + '..'
        }
      } else {
        strlen = strlen + 1
        if (strlen >= len) {
          return s.substring(0, s.length - 2) + '..'
        }
      }
    }
    return s
}

export default {
    date,
    _filter,
    cutString
}