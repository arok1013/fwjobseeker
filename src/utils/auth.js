const STORAGE_KEY = "fwjobseeker_user"

export function saveUserSession(user) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(user)
  )
}

export function getUserSession() {

  try {

    const user = localStorage.getItem(
      STORAGE_KEY
    )

    if (!user) return null

    return JSON.parse(user)

  } catch {

    return null
  }
}

export function logout() {

  localStorage.removeItem(STORAGE_KEY)
}