import React, { useEffect, useState } from "react";
import { fetchOrders, fetchOrderDetail } from "../../../api/client";
import MyModalOrder from "../../../components/MyModalOrder/MyModalOrder";
import "./PaymentList.css";

const PaymentList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders()
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setError(err.message || "주문 내역을 불러오지 못했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOpenDetail = async (orderId) => {
    try {
      setDetailLoading(true);

      const detail = await fetchOrderDetail(orderId);

      setSelectedOrder(detail);
    } catch (err) {
      alert(err.message || "주문 상세 정보를 불러오지 못했습니다.");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="Paylist_content">
        <div className="user_header">
          <h1>결제 내역</h1>
          <div className="user_Divider"></div>
        </div>
        <p>결제 내역을 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="Paylist_content">
        <div className="user_header">
          <h1>결제 내역</h1>
          <div className="user_Divider"></div>
        </div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="Paylist_content">
      <div className="user_header">
        <h1>결제 내역</h1>
        <div className="user_Divider"></div>
      </div>

      {orders.length === 0 ? (
        <p>결제 내역이 없습니다.</p>
      ) : (
        orders.map((order) => (
          <div className="Pay_Section" key={order.orderId}>
            <div className="product_Row">
              <div className="product_info">
                <img
                  src={order.productImageUrl || "/images/Product_Image.png"}
                  alt={order.productTitle || "주문 상품"}
                />

                <div className="product_info_container">
                  <div className="product_title">{order.productTitle}</div>
                  <div className="product_date">{order.useDate}</div>
                  <div className="product_count">
                    {order.people ? `${order.people}명` : ""}
                  </div>
                </div>
              </div>

              <div className="paylist_etc">
                <span>{Number(order.totalPrice).toLocaleString()}원</span>

                <button
                  type="button"
                  onClick={() => handleOpenDetail(order.orderId)}
                  disabled={detailLoading}
                >
                  자세히 보기 <img src="/images/Search_01.png" alt="" />
                </button>
              </div>
            </div>

            <div className="user_Divider"></div>
          </div>
        ))
      )}

      {selectedOrder && (
        <MyModalOrder order={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default PaymentList;
