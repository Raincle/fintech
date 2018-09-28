const Decimal = require('decimal.js')

/*
 * @param {Number} num
 * 需要转化为百分数的数值
 * @param {Number} type
 * 百分号或千分号
 * @param {Number} di
 * 需要精确到小数点后的位数
 * @return {String}
 */
const numberToRate = (num, type, di) => {
  type = type || 100
  let symbol = '%'
  switch (type) {
    case 1000:
      symbol = '‰'
      break
    case 10000:
      symbol = '‱'
      break
    default:
      type = 100
      symbol = '%'
      try {
        throw new Error('Value of type is not 100/1000/10000, type is set to 100 and symbol will be %')
      } catch (e) {
        console.log(e)
      }
  }

  di = di || 2

  const showValue = new Decimal(num).mul(type)
  const finValue = showValue.toFixed(di)
  return `${finValue}${symbol}`
}

module.exports = {
  numberToRate
}
