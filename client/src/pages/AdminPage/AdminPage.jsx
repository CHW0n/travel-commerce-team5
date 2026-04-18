import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const loadData = async () => {
            try {
                // 백엔드 서버 주소로 데이터 요청
                const response = await axios.get('http://localhost:8080/api/admin/users');
                setUsers(response.data);
            } catch (error) {
                console.error("데이터를 가져오는데 실패했습니다:", error);
            }
        };
        loadData();
    }, []);

    const maxPage = Math.ceil(users.length / itemsPerPage);
    const currentData = users.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="admin-container">
            <nav className='nav'>
                <div className='nav_container'>
                    <img src='/images/Settings.png' alt='설정' />
                    <span>관리자 페이지</span>
                </div>
            </nav>
            <div className='User_Module'>
                <div className='user_content'>
                    <div className='user_header'>
                        <h1>관리자 페이지</h1>
                        <div className='user_Divider'></div>
                    </div>
                </div>

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
                                <button key={p} type="button" className={p === page ? "is-active" : ""} onClick={() => setPage(p)}>
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