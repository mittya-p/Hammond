

// Встановлення cookie для мови
function setLanguageCookie(language) {
  document.cookie = `language=${language}; path=/; max-age=${
    60 * 60 * 24 * 365
  }` // 1 год
}

// Перевіряємо, чи вибрав користувач мову вручну (за параметром ?lang=manual)
function redirectToSavedLanguage() {
  const urlParams = new URLSearchParams(window.location.search)
  const manualLanguageChange = urlParams.get('lang') === 'manual'

  if (manualLanguageChange) {
    return // Користувач вибрав мову вручну, перенаправлення не потрібно
  }

  const cookies = document.cookie.split('; ')
  const languageCookie = cookies.find((row) => row.startsWith('language='))
  const savedLanguage = languageCookie ? languageCookie.split('=')[1] : null

  if (savedLanguage) {
    const currentPage = location.pathname
    const isEnglishPage = currentPage.includes('index_en.html')
    const isUkrainianPage = currentPage.includes('index.html') && !isEnglishPage

    if (savedLanguage === 'en' && !isEnglishPage) {
      window.location.href = './index_en.html'
    } else if (savedLanguage === 'ua' && !isUkrainianPage) {
      window.location.href = './index.html'
    }
  }
}

// Виконуємо перенаправлення під час завантаження сторінки
window.onload = redirectToSavedLanguage
