import axios from 'axios'

const fetchWithErrorHandling = async (
  url,
  options = { method: 'GET' },
) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const axiosOptions = { ...options }
  delete axiosOptions.headers

  const response = await axios({
    url,
    headers,
    timeout: 10000,
    validateStatus: (status) => status >= 200 && status < 400,
    ...axiosOptions,
  })
    .then((res) => {
      return res
    })
    .catch((error) => {
      return ({ error: error.response?.data?.error || error.message })
    })

  if ('error' in response) {
    return { error: response.error }
  }

  return response.data
}

export const get = (url, options = {}) => {
  return fetchWithErrorHandling(url, {
    method: 'GET',
    ...options,
  })
}

export const post = (url, data, options = {}) => {
  return fetchWithErrorHandling<T>(url, {
    method: 'POST',
    data,
    ...options,
  })
}