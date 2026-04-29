import React, { useState, useEffect } from "react";
import { fetchAdminUsers } from "../../api/client";
import Header from "../../components/header/header";
import "./AdminPage.css";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAdminUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("데이터를 가져오는데 실패했습니다:", error);

        if (error.message?.includes("401")) {
          setError("로그인이 필요한 관리자 페이지입니다.");
        } else if (error.message?.includes("403")) {
          setError("관리자 권한이 없습니다.");
        } else {
          setError("회원 목록을 불러오지 못했습니다.");
        }
      }
    };

    loadData();
  }, []);

  const maxPage = Math.max(1, Math.ceil(users.length / itemsPerPage));
  const currentData = users.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="admin-container">
      <Header />
      
      <nav className="nav">
        <div className="nav_container">
          <img src="/images/Settings.png" alt="설정" />
          <span>관리자 페이지</span>
        </div>
      </nav>

      <div className="User_Module">
        <div className="user_content">
          <div className="user_header">
            <h1>관리자 페이지</h1>
            <div className="user_Divider"></div>
          </div>
        </div>

        <div className="User_Table_Area">
          <div className="Table_header">
            <div className="Table_dropdown">
              <select className="admin-select">
                <option value="nickname">닉네임</option>
                <option value="email">이메일</option>
                <option value="role">권한</option>
                <option value="status">상태</option>
              </select>
            </div>

            <div className="Table_search">
              <input type="text" placeholder="검색" className="admin-input" />
            </div>

            <div className="search_ic">
              <img src="/images/search.png" alt="검색 아이콘" />
            </div>
          </div>

          {error ? (
            <p>{error}</p>
          ) : (
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>회원 ID</th>
                    <th>이메일</th>
                    <th>닉네임</th>
                    <th>권한</th>
                    <th>상태</th>
                  </tr>
                </thead>

                <tbody>
                  {currentData.map((user) => (
                    <tr key={user.userId}>
                      <td>{user.userId}</td>
                      <td>{user.email}</td>
                      <td>{user.nickname}</td>
                      <td>{user.role}</td>
                      <td>{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="Pagination">
          <div className="Pagination_Container">
            <div className="arrow_item_left">
              <button type="button" onClick={() => setPage(1)} disabled={page === 1}>
                <img src="/icon/arrow_left2.png" alt="처음" />
              </button>

              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <img
                  src="/icon/arrow_right.png"
                  style={{ transform: "rotate(180deg)" }}
                  alt="이전"
                />
              </button>
            </div>

            <div className="Page_Number">
              {Array.from({ length: maxPage }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={p === page ? "is-active" : ""}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="arrow_item_right">
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                disabled={page === maxPage}
              >
                <img src="/icon/arrow_right.png" alt="다음" />
              </button>

              <button type="button" onClick={() => setPage(maxPage)} disabled={page === maxPage}>
                <img src="/icon/arrow_right2.png" alt="끝" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
