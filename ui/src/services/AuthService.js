class AuthService {

  getConnectedUserId = () => {
    if (this.connectedUserId) return this.connectedUserId
    const token = this.getToken()
    if (!token) return ''
    const [, payload] = token.split('.')
    const { user: { _id } } = JSON.parse(atob(payload))
    this.connectedUserId = _id
    return _id
  }

  login = (credentials) => {
    return fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  subscribe = (credentials) => {
    return fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  setToken = (token) => {
    window.localStorage.setItem('auth-token', token)
  }

  getToken = () => {
    return window.localStorage.getItem('auth-token')
  }

  removeToken = () => {
    window.localStorage.setItem('auth-token', null)
  }

  logout = () => {
    this.removeToken()
    return Promise.resolve(true)
  }
}

export default new AuthService()
