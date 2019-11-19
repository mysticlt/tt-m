// 提供  调用文章相关的接口函数

import request from '@/utils/request'

/**
 * 获取文章列表
 * @param {Integer} channelId - 频道ID
 * @param {String} timestamp - 时间戳 相对于分页页码
 */
export const getArticles = (channelId, timestamp) => {
  return request('app/v1_1/articles', 'get', {
    channel_id: channelId,
    timestamp,
    with_top: 1
  })
}

/**
 * 不感兴趣文章
 * @param {String} articleId   文章ID
 */
export const disLikes = (articleId) => {
  return request('app/v1_0/article/dislikes', 'post', {
    target: articleId
  })
}

/**
 *
 * @param {BigInt} articleId
 * @param {Integer} type
 */
export const report = (articleId, type) => {
  return request('app/v1_0/article/reports', 'post', {
    target: articleId,
    type
  })
}
