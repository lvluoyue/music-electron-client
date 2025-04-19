import axios, { AxiosError, AxiosResponse } from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_CORE_API,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  paramsSerializer: (params) => {
    return qs.stringify(params)
  }
})

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 检查配置的响应类型是否为二进制类型（'blob' 或 'arraybuffer'）, 如果是，直接返回响应对象
    if (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer') {
      return response
    }

    const { code, data, message } = response.data
    if (code === 0) {
      return data
    }

    ElMessage.error(message || '系统出错')
    return Promise.reject(new Error(message || 'Error'))
  },
  (error: AxiosError<ResponseData<null>>) => {
    // 异常处理
    if (error.response?.data) {
      const { message } = error.response.data
      ElMessage.error(message || '系统出错')
    } else {
      ElMessage({
        message: message(error.response as AxiosResponse),
        type: 'error',
        duration: 5000
      })
    }
    return Promise.reject(error.message)
  }
)

const message = ({ status, statusText }: AxiosResponse): string => {
  let message = ''
  switch (status) {
    case 403:
      message = '您的权限不足'
      break
    case 404:
      message = '网络请求不存在'
      break
    case 500:
      message = '服务器访问异常'
      break
    default:
      message = statusText
      break
  }
  return message
}
// 导出 axios 实例
export default service
