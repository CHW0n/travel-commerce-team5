import React from 'react';
import './PaymentList.css';

const PaymentList = () => {
    return (
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
    );
};

export default PaymentList;
