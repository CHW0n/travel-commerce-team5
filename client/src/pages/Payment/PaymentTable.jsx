import React from 'react';
import './PaymentTable.css';

const PaymentTable = () => {
    // 1. 시안용 임시 데이터
    const payments = [
        { id: 1, date: '2026.04.09', product: '[제주] 감성 숙소 2박 3일 패키지', amount: '450,000원', status: '결제완료' },
        { id: 2, date: '2026.04.05', product: '[부산] 해운대 요트 투어', amount: '85,000원', status: '결제완료' },
        { id: 3, date: '2026.03.20', product: '[강원] 속초 서핑 레슨', amount: '120,000원', status: '취소완료' },
    ];

    return (
        <div className="payment-container">
            <nav className='nav'>
                <div className='nav_container'>
                    <img src='/images/User_02.png'></img>
                    <span>마이페이지</span>
                    <img src='/images/arrow_right.png'></img>
                    <span className='payment-on'>결제 내역</span>
                </div>
            </nav>
            <div className="Payment_Module">
                <div className="my_Tabs_Wrapper">
                    <div className="tab_item active">결제 내역</div>
                    <div className="tab_item">회원 정보</div>
                </div>
                <div className='Paylist_content'>
                    <div className='user_header'>
                        <h1>결제 내역</h1>
                        <div className='user_Divider'></div>
                    </div>
                    <div className='Pay_Section'>
                        <div className='product_Row'>
                            <div className='product_info'>
                                <img src='/images/Product_Image.png'></img>
                                <div className="product_info_container">
                                    <div className="product_title">경복궁</div>
                                    <div className="product_date">2월 20일 (화)</div>
                                    <div className="product_count">2명</div>
                                </div>
                            </div>
                            <div className='paylist_etc'>
                                <span>62,386원</span>
                                <button>자세히 보기 <img src='/images/Search_01.png'></img></button>
                            </div>
                        </div>
                        <div className='user_Divider'></div>
                    </div>
                    <div className='Pay_Section'>
                        <div className='product_Row'>
                            <div className='product_info'>
                                <img src='/images/Product_Image.png'></img>
                                <div className="product_info_container">
                                    <div className="product_title">경복궁</div>
                                    <div className="product_date">2월 20일 (화)</div>
                                    <div className="product_count">2명</div>
                                </div>
                            </div>
                            <div className='paylist_etc'>
                                <span>62,386원</span>
                                <button>자세히 보기 <img src='/images/Search_01.png'></img></button>
                            </div>
                        </div>
                        <div className='user_Divider'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentTable;