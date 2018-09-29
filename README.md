# fintech
Financial technology utilities

## Motivation

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

const rateB = numberToRate(0.003141592653, 1000, 3) // number, type, accuracy
console.log(rateB) // 3.142‰

const rateC = numberToRate(0.00299792458, 10000, 5) // number, type, accuracy
console.log(rateC) // 29.97925‱
```
