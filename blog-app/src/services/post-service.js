import { privateAxios } from "./helper";
import { myAxios } from "./helper";
export const createPost = (postData) =>{
    //console.log(postData)
    return privateAxios
    .post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData)
    .then((response)=>response.data)
}

//http://localhost:8083/api/v1/user/52/category/3/posts


//get all the posts
 
export const loadAllPosts = (pageNum,pageSize) =>{
    return myAxios.get(`/posts?pageNumber=${pageNum}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then((response)=> response.data);
}

//http://localhost:8083/api/v1/posts

export const loadSinglePost = (postId) =>{
    return myAxios.get("/posts/"+postId).then((response)=> response.data);
}

// http://localhost:8083/api/v1/posts/2/comments
export const createComment = (comment,postId) =>{
    return privateAxios.post(`/posts/${postId}/comments`,comment);
}

