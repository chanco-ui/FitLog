import liff from '@line/liff'

export const initLiff = async (liffId: string) => {
  try {
    await liff.init({ liffId })
    return true
  } catch (error) {
    console.error('LIFFの初期化に失敗しました:', error)
    return false
  }
}

export const getProfile = async () => {
  try {
    const profile = await liff.getProfile()
    return profile
  } catch (error) {
    console.error('プロフィールの取得に失敗しました:', error)
    return null
  }
}

export const isLoggedIn = () => {
  return liff.isLoggedIn()
}

export const login = () => {
  liff.login()
}

export const logout = () => {
  liff.logout()
} 