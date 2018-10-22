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
const { numberToRate } = require('fintech')

const rateA = numberToRate(0.618, 100, 1) // number, type, accuracy
console.log(rateA) // 61.8%

const rateB = numberToRate(0.003141592653, 1000, 3)
console.log(rateB) // 3.142‰

const rateC = numberToRate(0.00299792458, 10000, 5)
console.log(rateC) // 29.97925‱
```

```js
const { assetsSummary } = require('fintech')

const amount = {BTC: 1, ETH: 10}
const price = {BTC: 10000, ETH: 1000}

const assets = assetsSummary(amount, price) // amountObject, priceObject
console.log(assets) // {assets: {BTC: 10000, ETH: 10000}, total: 20000}
```

## Advanced Usage

## License
MIT
