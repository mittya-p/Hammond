'use strict'

const addExpences = 30000
const logisticExpences = 160000

//Outputs

const totalPricePropanOutput = document.querySelector('.js-totalPricePropan')
const totalSalaryOutput = document.querySelector('.js-totalSalary')
const totalExpencesOutput = document.querySelector('.js-totalExpences')
const dryerCapacityOutput = document.querySelector('.js-dryerCapacity')
const daysDryingOutput = document.querySelector('.js-daysDrying')
const netCostPercentOutput = document.querySelector('.js-netCostPercent')
const totalProfitOutput = document.querySelector('.js-totalProfit')

//Inputs

const grainQty = document.querySelector('.js-grainQty')
const grainMoisture = document.querySelector('.js-grainMoisture')
const pricePropan = document.querySelector('.js-pricePropan')
const sellDryingPrice = document.querySelector('.js-sellDryingPrice')

const btnResult = document.querySelector('.js-btnResult')

// Google sheet table datas

let sheet_id = '14Up2ifhb4igG_Das-n-hXAsh_cADLXmjtfX8954xdOg'
let sheet_title = 'main'
let sheet_range = 'A1:B2'

let full_URL =
  'https://docs.google.com/spreadsheets/d/' +
  sheet_id +
  '/gviz/tq?sheet=' +
  sheet_title +
  '&range=' +
  sheet_range

fetch(full_URL)
  .then((res) => res.text())
  .then((rep) => {
    let data = JSON.parse(rep.substr(47).slice(0, -2))

    pricePropan.setAttribute('value', data.table.rows[0].c[0].v)
    sellDryingPrice.setAttribute('value', data.table.rows[0].c[1].v)
  })

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

  let dryerCapacity
  let daysDrying
  let totalSalary
  let totalPricePropan
  let totalExpences
  let netCostPercent
  let totalProfit

  dryerCapacity = dryerProductivity

  daysDrying = Math.round(Number(grainQty.value) / (dryerProductivity * 20) + 2)

  totalSalary = daysDrying * 10000

  totalPricePropan = Math.round(
    (Number(grainMoisture.value) - 14) *
      propanConsumption *
      Number(pricePropan.value) *
      Number(grainQty.value)
  )

  totalExpences =
    totalPricePropan + totalSalary + addExpences + logisticExpences

  netCostPercent = Math.round(
    totalExpences /
      ((Number(grainMoisture.value) - 14) * Number(grainQty.value))
  )

  totalProfit = Math.round(
    (Number(sellDryingPrice.value) - netCostPercent) *
      (Number(grainMoisture.value) - 14) *
      Number(grainQty.value)
  )

  // Formating and output

  function formatNumberOutput(element, number) {
    element.innerHTML = Intl.NumberFormat({
      signDisplay: 'always',
    }).format(number)
  }

  formatNumberOutput(dryerCapacityOutput, dryerCapacity)
  formatNumberOutput(daysDryingOutput, daysDrying)
  formatNumberOutput(totalSalaryOutput, totalSalary)
  formatNumberOutput(totalPricePropanOutput, totalPricePropan)
  formatNumberOutput(totalExpencesOutput, totalExpences)
  formatNumberOutput(netCostPercentOutput, netCostPercent)
  formatNumberOutput(totalProfitOutput, totalProfit)
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

// Popup

let popupBg = document.querySelector('.popup__bg')
let popup = document.querySelector('.popup')
let openPopupButtons = document.querySelectorAll('.open-popup')
let closePopupButton = document.querySelector('.close-popup')

openPopupButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault()
    popupBg.classList.add('active')
    popup.classList.add('active')
  })
})

closePopupButton.addEventListener('click', () => {
  popupBg.classList.remove('active')
  popup.classList.remove('active')
  success.style.display = 'none'
})

document.addEventListener('click', (e) => {
  if (e.target === popupBg) {
    popupBg.classList.remove('active')
    popup.classList.remove('active')
    success.style.display = 'none'
  }
})

// Send form to telegram

const TOKEN = '6199072332:AAH0FNRe-xweyv3SfXdoMbojgCfBFAIkClQ'
const CHAT_ID = '-1001569099157'
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`
const URI_API_DOC = `https://api.telegram.org/bot${TOKEN}/sendDocument`
const success = document.getElementById('success')

document.querySelector('.popup').addEventListener('submit', function (e) {
  e.preventDefault()

  let message = `<b>Повідомлення HAMMOND</b>\n`
  message += `<b>Відправник: </b>${this.name.value}\n`
  message += `<b>Пошта: </b>${this.email.value}\n`
  message += `<b>Телефон: </b>${this.tel.value}\n`
  message += `<b>Запитання: </b>${this.message.value}\n`

  if (
    this.name.value === '' ||
    this.email.value === '' ||
    this.message.value === ''
  ) {
    success.innerHTML = 'Заповніть будь ласка поля!'
    success.style.display = 'block'
  } else {
    axios
      .post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message,
      })
      .then((res) => {
        this.name.value = ''
        this.email.value = ''
        this.tel.value = ''
        this.message.value = ''
        success.innerHTML = 'Ваше запитання відправлено!'
        success.style.display = 'block'
      })

      .catch((err) => {})

      .finally(() => {})
  }
})
