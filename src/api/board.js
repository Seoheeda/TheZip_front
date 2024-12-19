import { httpClient } from "./http";

export const getBoardList = async () => {
  try {
    const data = await httpClient.get(`boards`);
    return data;
  } catch (error) {
    console.error("공지사항 불러오기 실패:", error);
  }
};

export const writePost = async (title, content) => {
  try {
    const data = await httpClient.post(`/boards`, {
      title: title,
      content: content,
      author: "관리자",
    });

    return data;
  } catch (error) {
    console.error("공지사항 작성 실패:", error);
    throw error;
  }
};

export const updatePost = async (boardId, title, content) => {
  try {
    const data = await httpClient.put(`/boards`, {
      boardId: boardId,
      title: title,
      content: content,
    });

    return data;
  } catch (error) {
    console.error("공지사항 수정 실패:", error);
    throw error;
  }
};

export const deletePost = async (boardId) => {
  try {
    const data = await httpClient.delete(`/boards/${boardId}`);
    return data;
  } catch (error) {
    console.error("공지사항 삭제 실패:", error);
    throw error;
  }
};

export const getCommentList = async (boardId) => {
  try {
    const response = await httpClient.get(`/boards/comments/${boardId}`);
    return response.data;
  } catch (error) {
    console.error("댓글 불러오기 실패:", error);
    throw error;
  }
};

export const postComment = async (comment) => {
  try {
    const data = await httpClient.post(`/boards/comments`, comment);
    return data;
  } catch (error) {
    console.error("댓글 작성 실패:", error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const data = await httpClient.delete(`/boards/comments/${commentId}`);
    return data;
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
    throw error;
  }
};
