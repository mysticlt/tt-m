// 导出 频道相关的API函数
import request from '@/utils/request'
import store from '@/store'
/**
 * 获取我的频道信息（如果没登录，获取的是后台设置的默认频道列表）
 */
// 存储都使用这个key 对应值 json字符串是数组类型
const CHANNEL_KEY = 'hm-toutiao-m-84-channel-key'
export const getMyChannels = () => {
  // 该函数的返回值必须是promise 使用的时候用了await
  // 1. 登录状态 直接调用接口返回数据即可
  // 2. 未登录状态
  // 2.1 本地未存储频道数据 (获取默认频道数据，存储在本地)
  // 2.2 本地已存储频道数据(获取本地频道数据即可)
  return new Promise(async (resolve, reject) => {
    const { user } = store.state
    if (user.token) {
    // 已登录 data = {channels: [我的频道]}
      const data = await request('/app/v1_0/user/channels', 'get')
      resolve(data)
    } else {
    // 未登录
      const str = window.localStorage.getItem(CHANNEL_KEY) || '[]'
      const localChannels = JSON.parse(str)
      if (!localChannels) {
      // 获取数据
        const data = await request('/app/v1_0/user/channels', 'get')
        // 存储数据
        window.localStorage.setItem(CHANNEL_KEY, JSON.stringify(data.channels))
        resolve(data)
      } else {
        resolve({ channels: localChannels })
      }
    }
  })
}

/**
 * 获取全部频道
 */
export const getAllChannels = () => {
  return request('app/v1_0/channels', 'get')
}
