import axios from 'axios'
export const fetchStudents = async (AccessToken, document) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/students/${document}`,
      {
        headers: {
          Authorization: AccessToken
        }
      }
    )
    return res
  } catch (error) {
    return error.response
  }
}

export const login = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/login`, data
    )
    return res
  } catch (error) {
    return error.response
  }
}

export const registerUser = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/register`, data
    )
    return res
  } catch (error) {
    return error.response
  }
}