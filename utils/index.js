export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export const checkTheme = () => {
  if (typeof window === 'undefined') return

  let theme = 'light'
  try {
    const mediaPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    const localPreference = window.localStorage.getItem('meout-theme')

    if (
      (!localPreference && mediaPrefersDark.matches) ||
      localPreference === 'dark'
    ) {
      document.documentElement.classList.add('dark')
      theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      theme = 'light'
    }

    window.localStorage.setItem('meout-theme', theme)
  } catch (e) {
    console.error(e.message)
  }

  return theme
}
