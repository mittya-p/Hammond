'use strict'

const addExpences = 30000
const logisticExpences = 160000

//Outputs

const totalPricePropan = document.querySelector('.js-totalPricePropan')
const totalSalary = document.querySelector('.js-totalSalary')
const totalExpences = document.querySelector('.js-totalExpences')
const dryerCapacity = document.querySelector('.js-dryerCapacity')
const daysDrying = document.querySelector('.js-daysDrying')
const netCostPercent = document.querySelector('.js-netCostPercent')
const totalProfit = document.querySelector('.js-totalProfit')

//Inputs

const grainQty = document.querySelector('.js-grainQty')
const grainMoisture = document.querySelector('.js-grainMoisture')
const pricePropan = document.querySelector('.js-pricePropan')
const sellDryingPrice = document.querySelector('.js-sellDryingPrice')

const btnResult = document.querySelector('.js-btnResult')

// Calculation

function calculate() {
  let dryerProductivity
  let propanConsumption
  let tableGrainMoisture = Number(grainMoisture.value)
  switch (tableGrainMoisture) {
    case 15:
      dryerProductivity = 13
      propanConsumption = 2.23
      break
    case 16:
      dryerProductivity = 14.7
      propanConsumption = 1.79
      break
    case 17:
      dryerProductivity = 14.4
      propanConsumption = 1.61
      break
    case 18:
      dryerProductivity = 15.1
      propanConsumption = 1.48
      break
    case 19:
      dryerProductivity = 15.6
      propanConsumption = 1.41
      break
    case 20:
      dryerProductivity = 14.4
      propanConsumption = 1.38
      break
    case 21:
      dryerProductivity = 13
      propanConsumption = 1.36
      break
    case 22:
      dryerProductivity = 11.9
      propanConsumption = 1.35
      break
    case 23:
      dryerProductivity = 11
      propanConsumption = 1.33
      break
    case 24:
      dryerProductivity = 10.2
      propanConsumption = 1.31
      break
    case 25:
      dryerProductivity = 9.6
      propanConsumption = 1.29
      break
    case 26:
      dryerProductivity = 9.1
      propanConsumption = 1.26
      break
    case 27:
      dryerProductivity = 8.7
      propanConsumption = 1.24
      break
    case 28:
      dryerProductivity = 8.3
      propanConsumption = 1.21
      break
    case 29:
      dryerProductivity = 8
      propanConsumption = 1.18
      break
    case 30:
      dryerProductivity = 7.7
      propanConsumption = 1.16
      break
    case 31:
      dryerProductivity = 7.5
      propanConsumption = 1.13
      break
    case 32:
      dryerProductivity = 7.3
      propanConsumption = 1.11
      break
    case 33:
      dryerProductivity = 7.1
      propanConsumption = 1.09
      break
    case 34:
      dryerProductivity = 6.9
      propanConsumption = 1.07
      break
    case 35:
      dryerProductivity = 6.6
      propanConsumption = 1.06
      break
    default:
  }

  //Calculation

  dryerCapacity.innerHTML = dryerProductivity

  daysDrying.innerHTML = Math.round(
    Number(grainQty.value) / (dryerProductivity * 20) + 2
  )
  totalSalary.innerHTML = Number(daysDrying.value) * 10000

  totalPricePropan.innerHTML = Math.round(
    (Number(grainMoisture.value) - 14) *
      propanConsumption *
      Number(pricePropan.value) *
      Number(grainQty.value)
  )

  totalExpences.innerHTML =
    Number(totalPricePropan.value) +
    Number(totalSalary.value) +
    addExpences +
    logisticExpences

  netCostPercent.innerHTML = Math.round(
    Number(totalExpences.value) /
      ((Number(grainMoisture.value) - 14) * Number(grainQty.value))
  )

  totalProfit.innerHTML = Math.round(
    (Number(sellDryingPrice.value) - Number(netCostPercent.value)) *
      (Number(grainMoisture.value) - 14) *
      Number(grainQty.value)
  )
}
// Check cell

function checkValue() {
  let valQty = Number(grainQty.value)
  if (grainMoisture.value >= 15 && grainMoisture.value <= 35) {
  } else {
    alert('Помилка. Введіть значення від 15 до 35.')
    return
  }
  if (
    grainQty.value &&
    grainMoisture.value &&
    pricePropan.value &&
    sellDryingPrice.value !== '' &&
    !isNaN(valQty)
  ) {
    calculate()
  } else {
    alert('Будь ласка заповніть всі значення!')
  }
}

// Button

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    checkValue()
  }
})

btnResult.addEventListener('click', function () {
  checkValue()
})
