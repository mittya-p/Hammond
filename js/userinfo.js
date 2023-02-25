class Userinfo {
  constructor() {
    this.timeOpened = new Date()
    this.timezone = new Date().getTimezoneOffset() / 60
  }
  async battery() {
    return await navigator.getBattery()
  }

  async position() {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return {
      long: pos.coords.longitude,
      lat: pos.coords.latitude,
      speed: pos.coords.speed,
    }
  }

  async ip() {
    let res = await fetch('https://api.db-ip.com/v2/free/self')
    let data = await res.json()
    return data
  }

  sizeScreen() {
    return {
      screenAvailWidth: screen.availWidth,
      screenAvailHeight: screen.availHeight,
    }
  }
}
