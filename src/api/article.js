import request from '@/utils/request'

export const getArticles = params =>{
    return request({
        method:'GET',
        url:'/app/v1_1/articles',
        params
    })
}

export const getArticleDetails = articleId =>{
    return request({
        method:'GET',
        url:`/app/v1_0/articles/${articleId}`,
       
    })
}


export const collectArticle = articleId =>{
    return request({
        method:'GET',
        url:`/app/v1_0/articles/collections`,
        data:{
            target:articleId
        }
       
    })
}

export const cancelCollectArticle= articleId =>{
    return request({
        method:'DELETE',
        url:`/app/v1_0/articles/collections/${articleId}`,
       
    })
}
export const addLike = articleId => {
    return request({
      method: 'POST',
      url: '/app/v1_0/article/likings',
      data: {
        target: articleId
      }
    })
  }
  
  // 取消点赞
  export const deleteLike = articleId => {
    return request({
      method: 'DELETE',
      url: `/app/v1_0/article/likings/${articleId}`
    })
  }
  