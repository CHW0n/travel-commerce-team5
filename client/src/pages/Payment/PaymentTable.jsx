import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PaymentTable.css';

const PaymentTable = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/my-orders/list') 
            .then(res => {
                setOrders(res.data);
            })
            .catch(err => {
                console.error("데이터를 불러오는데 실패했습니다.", err);
            });
    }, []);

    return (
        <div className="payment_table_container">
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div className="product_info_container" key={order.id}>
                        {/* 1. 이미지: productImageUrl 사용 */}
                        <img 
                            src={order.productImageUrl} 
                            alt={order.title} 
                            className="product_img"
                        />
                        
                        <div className="product_text_info">
                            {/* 2. 상품명: title */}
                            <div className="product_title">{order.title}</div>
                            
                            {/* 3. 예약날짜: dateText 사용 */}
                            <div className="product_date">예약일: {order.dateText}</div>
                            
                            {/* 4. 인원: people 사용 */}
                            <div className="product_count">인원: {order.people}명</div>
                            
                            {/* 5. 총 가격: totalPrice 사용 (천단위 콤마 추가) */}
                            <div className="product_price">
                                결제금액: {order.totalPrice?.toLocaleString()}원
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="no_data">결제 내역이 없습니다.</div>
            )}
        </div>
    );
};

export default PaymentTable;