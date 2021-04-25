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
      // 'Value of type is set to 100 and symbol will be %'
      type = 100
      symbol = '%'
      break
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

/*
 * @param {String or Number} num
 * The number you want to transform
 * @param {Integer} unit
 * the place you want to depart
 * @param {String} symbol
 * The symbol you want to add
 * @return {String} localeString
 */
const splitNum = (num, unit, symbol, keepFloat) => {
  unit = parseInt(unit || 3)
  symbol = (symbol || ',').toString()
  const numString = num.toString()
  const intPart = numString.split('.')[0]
  const intPartArr = intPart.split('')
  let floatPart = numString.split('.')[1]
  if (floatPart && !keepFloat) {
    floatPart = floatPart.slice(0, 3)
  }
  
  let newIntPart = ''
  for (let i = 0; i < intPartArr.length; i++) {
    const element = intPartArr[i]
    const index = intPartArr.length - i - 1
    newIntPart = newIntPart + element
    if (index % unit === 0 && index !== 0) {
      newIntPart += symbol
    }
  }
  const localeString = newIntPart + (floatPart ? `.${floatPart}` : '')
  return localeString
}

/*
 * @param {Array} tickArr
 * An array of assets history
 * @param {Number} type
 * 100 => %, 1000 => ‰, 10000 => ‱
 * @param {Number} di
 * Accuracy of digits
 * @return {String} tempLoss
 */
const maxLoss = (tickArr, type, di) => {
  let maxValue = 0
  let tempLoss = 0
  tickArr.forEach((tick) => {
    const tickFloat = parseFloat(tick)
    const currentLoss = (tickFloat - maxValue) / maxValue
    tempLoss = tempLoss < currentLoss ? tempLoss : currentLoss
    maxValue = maxValue > tickFloat ? maxValue : tickFloat
  })
  return numberToRate(tempLoss, type, di)
}

/*
 * @param {Number} n
 * 5 => MA5, 10 => MA10
 * @param {List} candleList
 * A list of candles object
 * @param {Number} isNewCandleFirst
 * If new candle is first, set true(default)
 * @return {Float} ma
 */
const ma = (n, candleList, isNewCandleFirst) => {
  let maValue = 0
  if (isNewCandleFirst === false) {
      candleList.reverse()
  }
  candleList.forEach((candle, index) => {
    if (index < n) {
      maValue += parseFloat(candle.close)
    } 
  })
  maValue /= n

  return maValue
}

/*
 * Calc WR Index
 * @param {Number} n
 * 交易者设定的周期
 * @param {List} candleList
 * 蜡烛数据列表
 * @param {bool} isNewCandleFirst
 * 最新蜡烛数据是否在下标第一位
 */
const wr = (n, candleList, isNewCandleFirst) => {
  let nList = [] // 周期内的蜡烛数据
  let c // 第n日最新收盘价
  let hn // 第n日内最高价
  let ln // 第n日内最低价
  if (isNewCandleFirst === false) {
    candleList.forEach((item, index) => {
      if (index > candleList.length - n - 1) {
        nList.push(item)
      }
    })
    c = nList[n - 1].close
  } else {
    candleList.forEach((item, index) => {
      if (index < n) {
        nList.push(item)
      }
    })
    c = nList[0].close
    nList.reverse()
  }
  hn = nList[0].high
  nList.forEach((item) => {
    hn = hn > item.high ? hn : item.high
  })
  ln = nList[0].low
  nList.forEach((item) => {
    ln = ln > item.low ? item.low : ln
  })

  const wrIndex = (c- hn) / (hn - ln) * 100
  
  return wrIndex
}



module.exports = {
  numberToRate,
  assetsSum,
  assetsValue,
  splitNum,
  maxLoss,
  ma,
  wr
}
