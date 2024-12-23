import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms";
import { FaArrowLeft } from "react-icons/fa";
import { getCommentList, postComment, deleteComment } from "../../api/board";

const BoardDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // location 객체에서 전달된 state를 확인
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const { post } = location.state || {};

  // 댓글 상태 관리
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // 댓글 작성 처리 함수
  const handleCommentSubmit = async (e) => {
    if (newComment.trim()) {
      console.log(post.boardId);
      const newCommentObj = {
        boardId: post.boardId,
        author: userInfo.nickname,
        createdAt: new Date().toISOString(),
        content: newComment,
      };

      setNewComment(""); // 댓글 입력 필드 초기화

      try {
        const response = await postComment(newCommentObj); // 비동기 결과 대기
        if (response.status >= 400 && response.status <= 599) {
          alert("로그인이 필요합니다.");
          // 롤백 처리 (옵션)
          setComments(comments); // 기존 상태로 되돌림
        }

        newCommentObj.commentId = response.data.commentId; // commentId를 받아서 commentObj에 추가
        setComments([...comments, newCommentObj]);
      } catch (error) {
        console.error("댓글 등록 중 오류 발생:", error);
        alert("댓글 등록 중 오류가 발생했습니다.");
        // 롤백 처리 (옵션)
        setComments(comments); // 기존 상태로 되돌림
      }
    }
  };

  // 댓글 삭제 처리 함수
  const handleDeleteComment = async (id) => {
    console.log("Comment ID to delete:", id); // 디버깅 로그

    // 삭제 전 상태 저장
    const previousComments = [...comments];

    // 댓글 UI에서 임시로 제거
    setComments(comments.filter((comment) => comment.commentId !== id));

    try {
      await deleteComment(id); // 실제 삭제 요청
    } catch (error) {
      console.error("Error deleting comment:", error);
      // 삭제 실패 시 롤백 및 알림
      alert("Failed to delete comment. Please try again.");
      setComments(previousComments); // 상태 롤백
    }
  };

  useEffect(() => {
    if (!post?.boardId) return;

    const fetchComments = async () => {
      const commentList = await getCommentList(post.boardId);
      setComments(Array.isArray(commentList) ? commentList : []);
    };

    fetchComments();
  }, [post.boardId]);

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-50 py-10">
      {post && (
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              className="flex items-center text-gray-600 px-4 py-2 rounded-md border hover:bg-gray-100 transition"
              onClick={() => navigate("/board")}
            >
              <FaArrowLeft className="mr-2" />
              목록으로
            </button>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-gray-800 mb-2">
              {post.title}
            </h1>
            <p className="text-sm text-gray-500 mb-7">
              관리자 · {post.createdAt.slice(0, 10)}
            </p>
            <div className="text-gray-700">{post.content}</div>
          </div>

          {/* 댓글 작성 */}
          <div className="mt-16 border-t border-gray-300 pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              댓글 작성
            </h3>
            <div className="flex space-x-3">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 작성하세요..."
                rows="4"
                className="w-full px-4 py-2 border rounded-md text-gray-700"
              />
              <button
                type="submit"
                onClick={handleCommentSubmit}
                className="w-24 py-1 bg-primary-2 text-white rounded-md hover:bg-primary-3 transition"
              >
                댓글 작성
              </button>
            </div>
          </div>

          {/* 댓글 목록 */}

          <div className="my-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              댓글 ({comments.length})
            </h2>
            <div className="space-y-4">
              {Array.isArray(comments) &&
                comments.map((comment) => (
                  <div
                    key={comment.commentId}
                    className="border-b border-gray-200 pb-4 flex justify-between items-start"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-md text-gray-800">
                          {comment.author}
                        </p>
                        <p className="text-sm text-gray-500">
                          {comment.createdAt
                            ? comment.createdAt.slice(0, 10)
                            : "날짜 없음"}{" "}
                        </p>
                        <span className="text-primary-1">
                          {comment.createdAt
                            ? comment.createdAt.slice(11, 16)
                            : ""}
                        </span>
                      </div>
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                    {(comment.author === userInfo.nickname ||
                      userInfo.role === "ROLE_ADMIN") && (
                      <button
                        onClick={() => handleDeleteComment(comment.commentId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardDetailPage;
