const Decimal = require('decimal.js')

/*
 * @param {Number} num
 * The number you want to transform
 * @param {Number} type
 * 100 => %, 1000 => ‰, 10000 => ‱
 * @param {Number} di
 * Accuracy of digits
 * @return {String}
 */
const numberToRate = (num, type, di) => {
  let symbol = ''
  switch (type) {
    case 100:
      symbol = '%'
      break
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
        throw new Error('Value of type is set to 100 and symbol will be %')
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
