import React, { useState } from 'react';
import './AdminPage.css';

const AdminPage = () => {
    
    // 페이지네이션 
    const [page, setPage] = useState(1);
    const itemsPerPage = 10; 
    const users = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `사용자 ${i + 1}`,
        email: `user${i + 1}@gmail.com`,
        nickname: `닉네임${i + 1}`,
        phone: '01012345678',
        userId: `user_id_${i + 1}`,
        date: '21.03.2026',
        update: ''
    }));

    // 페이지 계산 로직
    const maxPage = Math.ceil(users.length / itemsPerPage);
    const currentData = users.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="admin-container">
            <nav className='nav'>
                <div className='nav_container'>
                    <img src='/images/Settings.png'></img>
                    <span>관리자 페이지</span>
                </div>
            </nav>
            <div className='User_Module'>
                {/* 제목 영역 */}
                <div className='user_content'>
                    <div className='user_header'>
                        <h1>관리자 페이지</h1>
                        <div className='user_Divider'></div>
                    </div>
                </div>

                {/* 검색 및 테이블 영역 */}
                <div className='User_Table_Area'>
                    <div className='Table_header'>
                        <div className='Table_dropdown'>
                            <select className="admin-select">
                                <option value="name">이름</option>
                                <option value="id">아이디</option>
                                <option value="date">등록일</option>
                            </select>
                        </div>
                        <div className='Table_search'>
                            <input type="text" placeholder="검색" className="admin-input" />
                        </div>
                        <div className='search_ic'>
                            <img src='/images/search.png' alt='검색 아이콘' />
                        </div>
                    </div>

                    {/* 테이블 영역 */}
                    <div className="table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>이메일</th>
                                    <th>닉네임</th>
                                    <th>번호</th>
                                    <th>아이디</th>
                                    <th>가입일</th>
                                    <th>수정일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.nickname}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.userId}</td>
                                        <td>{user.date}</td>
                                        <td>{user.update}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 페이지네이션 영역 */}
                <div className="Pagination">
                    <div className="Pagination_Container">
                        <div className="arrow_item_left">
                            <button type="button" onClick={() => setPage(1)} disabled={page === 1}>
                                <img src="/icon/arrow_left2.png" alt="처음" />
                            </button>
                            <button type="button" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                                <img src="/icon/arrow_right.png" style={{ transform: 'rotate(180deg)' }} alt="이전" />
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
                            <button type="button" onClick={() => setPage(p => Math.min(maxPage, p + 1))} disabled={page === maxPage}>
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