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

/*
 * @param {Array} assetsArr
 * The assets you have
 * @return {Object}
 */
const assetsSum = (assetsArr) => {
  let assetsSymbols = []
  let assets = {}

  assetsArr.forEach((item) => {
    for (let symbol in item) {
      if (item.hasOwnProperty(symbol)) {

        if (assetsSymbols.indexOf(symbol) < 0) {
          assets[symbol] = item[symbol]
          assetsSymbols.push(symbol)
        } else {
          assets[symbol] = new Decimal(assets[symbol]).add(item[symbol]).toNumber()
        }

      }
    }
  })

  return assets
}

/*
 * @param {Object} amount
 * The amount you have
 * @param {Object} price
 * The price of each amount
 * @return {assets, total}
 */
const assetsValue = (amount, price) => {
  let assets = {}
  let total = new Decimal(0)
  for (let amountSymbol in amount) {
    if (amount.hasOwnProperty(amountSymbol)) {
      const symbolAmount = new Decimal(amount[amountSymbol])

      for (let priceSymbol in price) {
        if (price.hasOwnProperty(priceSymbol)) {
          if (priceSymbol === amountSymbol) {
            const symbolPrice = price[priceSymbol]
            assets[amountSymbol] = symbolAmount.mul(symbolPrice).toNumber()
            total = total.add(assets[amountSymbol])
          }
        }
      }

    }
  }

  return {assets, total: total.toNumber()}
}

module.exports = {
  numberToRate,
  assetsSum,
  assetsValue
}
