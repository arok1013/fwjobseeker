export const saveUserSession = (user) => {
  localStorage.setItem("user", JSON.stringify(user))
}

export const getUserSession = () => {
  return JSON.parse(localStorage.getItem("user"))
}

export const logoutSession = () => {
  localStorage.removeItem("user")
}

export const isAuthenticated = () => {
  return !!localStorage.getItem("user")
}