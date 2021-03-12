# fintech
Financial technology utilities

## Motivation
Make developers more powerful in financial world.

## Features

## Installation
```sh
$ npm i --save fintech
```

## Common Usage
```js
/*
 *Calculate max loss of an array
 */
const { maxLoss } = require('fintech')

const tickArr = [1, 1.2, 1.15, 1.08, 1.16]
const lossRate = maxLoss(tickArr)

console.log(lossRate) // -10%
```

```js
/*
 *Calculate MA of a List of candles 
 */
const { ma } = require('fintech')

const candlesList = [{close: 5}, {close: 6}, {close: 7}, {close: 8}, {close: 9}]
const ma5 = ma(5, candlesList)

console.log(ma5) // 7
```

```js
/*
 *Calculate WR Index of a List of candles 
 */
const { wr } = require('fintech')

const candlesList = [
    {open: 5, high: 5, low: 5, close: 5,},
    {open: 6, high: 6, low: 6, close: 6,},
    {open: 7, high: 7, low: 7, close: 7,},
    {open: 8, high: 8, low: 8, close: 8,},
    {open: 9, high: 9, low: 9, close: 9,}
]
const wr5 = wr(5, candlesList)

console.log(wr5) // 0
```

```js
const { numberToRate } = require('fintech')

const rateA = numberToRate(0.618, 100, 1) // Number, type, accuracy
console.log(rateA) // 61.8%

const rateB = numberToRate(0.003141592653, 1000, 3)
console.log(rateB) // 3.142‰

const rateC = numberToRate(0.00299792458, 10000, 5)
console.log(rateC) // 29.97925‱
```

```js
const { spitNum } = require('fintech')

const localeA = numberToRate(58888.88) // Number, Unit, Symbol
console.log(localeA) // 58,888.88

const localeB = numberToRate('100000000000', 4) // String, Unit
console.log(localeB) // 1000,0000,0000

const localeC = numberToRate(100000000000, 4, ' ') // Number, Unit, Symbol
console.log(localeC) // 1000 0000 0000

const localeD = numberToRate('BTCETHLTC', 3, ' 🚀 ') // String, Unit, Symbol
console.log(localeD) // BTC 🚀 ETH 🚀 LTC
```

```js
const { assetsSum } = require('fintech')

const amountA = {BTC: 1, ETH: 11}
const amountB = {BTC: 2, ETH: 22}
const amountC = {BTC: 3, ETH: 33}

const assetsArr = [amountA, amountB, amountC]

const assets = assetsSum(assetsArr) // Assets array
console.log(assets) // {BTC: 6, ETH: 66}
```

```js
const { assetsValue } = require('fintech')

const amount = {BTC: 1, ETH: 10}
const price = {BTC: 10000, ETH: 1000}

const assets = assetsValue(amount, price) // Amount object, price object
console.log(assets) // {assets: {BTC: 10000, ETH: 10000}, total: 20000}
```

## Advanced Usage

## License
MIT
