import { httpClient } from "./http";

export const getBoardList = async () => {
  const data = await httpClient.get(`boards`);
  return data;
};

export const writePost = async (title, content) => {

  const data = await httpClient.post(`/boards`,{
    title: title,
    content: content,
    author: "관리자",
  });

  return data;
};

export const updatePost = async (boardId, title, content) => {

  const data = await httpClient.put(`/boards`,{
    boardId: boardId,
    title:title,
    content: content,
  });

  return data;
};

export const deletePost = async (boardId) => {

  const data = await httpClient.delete(`/boards/${boardId}`);
  return data;
};

export const getCommentList = async (boardId) => {
  const response = await httpClient.get(`/boards/comments/${boardId}`);
  return response.data; // 댓글 리스트 반환
};

export const postComment = async (comment) => {

  const data = await httpClient.post(`/boards/comments`,comment,
    {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return data;
}

export const deleteComment = async (commentId) => {
  const data = await httpClient.delete(`/boards/comments/${commentId}`);
  return data;
};