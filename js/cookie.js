

// Встановлення cookie для мови
function setLanguageCookie(language) {
  document.cookie = `language=${language}; path=/; max-age=${
    60 * 60 * 24 * 365
  }` // 1 рік
}

// Перенаправлення на збережену мову
function redirectToSavedLanguage() {
  const cookies = document.cookie.split('; ')
  const languageCookie = cookies.find((row) => row.startsWith('language='))
  const savedLanguage = languageCookie ? languageCookie.split('=')[1] : null

  if (savedLanguage) {
    // Перенаправлення на відповідну сторінку
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

// Виконуємо перенаправлення під час завантаження сторінки
window.onload = redirectToSavedLanguage
