// Установка cookie для языка
function setLanguageCookie(language) {
  document.cookie = `language=${language}; path=/; max-age=${
    60 * 60 * 24 * 365
  }` // 1 год
}

// Перенаправление на сохранённый язык
function redirectToSavedLanguage() {
  const cookies = document.cookie.split('; ')
  const languageCookie = cookies.find((row) => row.startsWith('language='))
  const savedLanguage = languageCookie ? languageCookie.split('=')[1] : null

  if (savedLanguage) {
    // Перенаправление на соответствующую страницу
    if (savedLanguage === 'en' && !location.href.includes('index_en.html')) {
      window.location.href = './index_en.html'
    } else if (
      savedLanguage === 'ua' &&
      !location.href.includes('index.html')
    ) {
      window.location.href = './index.html'
    }
  }
}

// Выполняем перенаправление при загрузке страницы
window.onload = redirectToSavedLanguage
