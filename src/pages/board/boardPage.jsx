import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms";
import { FaEdit, FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa";
import { getBoardList, deletePost } from "../../api/board"; // deletePost 함수 추가

const BoardPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const postsPerPage = 5; // 한 페이지에 표시할 게시물 수

  const [userInfo] = useRecoilState(userState);

  // 페이지네이션을 위한 데이터 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const fetchBoardList = async () => {
    try {
      const response = await getBoardList();
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("유저 정보를 불러오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchBoardList();
  }, []);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(posts.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = async (postId) => {
    // 삭제 확인을 위한 alert
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (!confirmDelete) {
      return; // 사용자가 취소를 누르면 삭제하지 않음
    }

    try {
      await deletePost(postId);
      console.log("게시물이 삭제되었습니다.");
      fetchBoardList(); // 게시물 목록을 새로 고침
    } catch (error) {
      console.log("게시물 삭제에 실패했습니다:", error);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full h-[100%] overflow-auto bg-gradient-to-b from-gray-100 to-gray-50 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold text-gray-800">📋 공지사항</h1>
          {userInfo.role === "ROLE_ADMIN" && (
            <button
              className="flex items-center bg-primary-1 text-white px-4 py-2 rounded-md hover:bg-primary-2 transition"
              onClick={() => navigate("/board/post")}
            >
              <FaEdit className="mr-2" />
              글쓰기
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md transition-all"
              onClick={() => {
                navigate(`/board/${post.boardId}`, { state: { post } });
              }}
            >
              <div>
                <h2 className="text-md font-semibold text-gray-800 cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  관리자 · {post.createdAt.slice(0, 10)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="text-primary-DEFAULT font-medium px-3 py-1 rounded-md border border-primary-2 hover:bg-primary-5"
                  onClick={() =>
                    navigate(`/board/${post.boardId}`, { state: { post } })
                  }
                >
                  자세히 보기
                </button>
                {userInfo.role === "ROLE_ADMIN" && (
                  <>
                    <button
                      className="text-yellow-500 font-medium px-3 py-1 rounded-md border border-yellow-500 hover:bg-yellow-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/board/edit/${post.boardId}`, {
                          state: { post },
                        });
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="text-red-500 font-medium px-3 py-1 rounded-md border border-red-500 hover:bg-red-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(post.boardId);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 페이지 이동 버튼 */}
        <div className="flex justify-between items-center mt-6">
          <button
            className="flex items-center px-4 py-2 text-gray-600 rounded-md border hover:bg-gray-100 transition"
            onClick={handlePrevPage}
          >
            <FaArrowLeft className="mr-2" />
            이전
          </button>

          {/* 페이지 번호 */}
          <div className="flex space-x-2">
            {pageNumbers.map((number) => (
              <button
                key={number}
                className={`px-4 py-2 text-gray-600 rounded-md border hover:bg-gray-100 transition ${
                  currentPage === number ? "bg-gray-200" : ""
                }`}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            className="flex items-center px-4 py-2 text-gray-600 rounded-md border hover:bg-gray-100 transition"
            onClick={handleNextPage}
          >
            다음
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
