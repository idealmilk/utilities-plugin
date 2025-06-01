import { get } from "../../utils/fetch"

export const getUtilities = async (q = '') => {
  return get(`/wp-json/utilities-plugin/v1/utilities?q=${encodeURIComponent(q)}`)
}