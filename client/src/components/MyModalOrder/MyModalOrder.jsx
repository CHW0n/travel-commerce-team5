import { useEffect } from "react";
import "./MyModalOrder.css";

function formatPrice(value) {
  const amount = Number(value) || 0;
  return `${amount.toLocaleString()}원`;
}

function formatDateTime(value) {
  if (!value) return "결제 정보 없음";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${hour}:${minute} ${month}월 ${day}일`;
}

function getTravelerName(order) {
  const fullName = [order.travelerLastName, order.travelerFirstName]
    .filter(Boolean)
    .join("");

  return fullName || order.travelerName || order.bookerName || order.reserverName || "정보 없음";
}

function pickValue(order, keys, fallback = "정보 없음") {
  const matchedKey = keys.find((key) => {
    const value = order?.[key];
    return value !== undefined && value !== null && String(value).trim() !== "";
  });

  return matchedKey ? order[matchedKey] : fallback;
}

function OrderSummaryBlock({ order, totalPrice, dateText }) {
  return (
    <section className="MyModalOrder_Section">
      <div className="MyModalOrder_Divider" />
      <div className="MyModalOrder_ProductRow">
        <div className="MyModalOrder_ProductSummaryFrame">
          <div className="MyModalOrder_ProductMediaFrame">
            <img
              src={order.productImageUrl || order.thumbnailUrl || "/images/Tour_Image.png"}
              alt={order.title || "주문 상품"}
              className="MyModalOrder_ProductImage"
            />
          </div>
          <div className="MyModalOrder_ProductMetaFrame">
            <div className="MyModalOrder_ProductText">
              <h3 className="MyModalOrder_ProductTitle">{order.title || "상품명 없음"}</h3>
              <div className="MyModalOrder_ProductMetaDetails">
                <p className="MyModalOrder_ProductDate">{dateText}</p>
                <p className="MyModalOrder_PeopleCount">{order.people || 0}명</p>
              </div>
            </div>
          </div>
        </div>
        <div className="MyModalOrder_ProductPriceFrame">
          <p className="MyModalOrder_ProductPrice">{formatPrice(totalPrice)}</p>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value, emphasis = "default" }) {
  const labelClassName = emphasis === "subtle"
    ? "MyModalOrder_InfoSubLabel"
    : "MyModalOrder_InfoLabel";
  const valueClassName = emphasis === "subtle"
    ? "MyModalOrder_InfoSubValue"
    : "MyModalOrder_InfoValue";

  return (
    <div className={`MyModalOrder_InfoRow${emphasis === "strong" ? " is-strong" : ""}`}>
      <span className={labelClassName}>{label}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
}

function InfoSection({ title, rows }) {
  const titleClassName = title === "예약자 정보"
    ? "MyModalOrder_SectionTitle is-booker"
    : "MyModalOrder_SectionTitle is-payment";

  return (
    <section className="MyModalOrder_Section">
      <h3 className={titleClassName}>{title}</h3>
      <div className="MyModalOrder_Divider" />
      <div className="MyModalOrder_InfoCard">
        {rows.map((row) => (
          <InfoRow
            key={row.label}
            label={row.label}
            value={row.value}
            emphasis={row.emphasis}
          />
        ))}
      </div>
    </section>
  );
}

export default function MyModalOrder({ order, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!order) return null;

  const totalPrice = Number(order.totalPrice) || 0;
  const unitPrice = Number(order.unitPrice) || Math.round(totalPrice / Math.max(order.people || 1, 1));
  const dateText = String(order.dateText || "날짜 미정").replace(/\s*\n\s*/g, " ").trim();
  const reservationRows = [
    { label: "예약자", value: getTravelerName(order) },
    {
      label: "휴대폰 번호",
      value: pickValue(order, ["travelerPhone", "bookerPhone", "phoneNumber", "phone"]),
    },
    {
      label: "이메일",
      value: pickValue(order, ["travelerEmail", "bookerEmail", "email"]),
    },
  ];
  const paymentRows = [
    { label: "총 상품 금액", value: formatPrice(totalPrice), emphasis: "strong" },
    { label: "기본 금액", value: formatPrice(unitPrice), emphasis: "subtle" },
    { label: "인원 수", value: `${order.people || 0}명`, emphasis: "subtle" },
    { label: "결제 일시", value: formatDateTime(order.createdAt), emphasis: "strong" },
  ];

  return (
    <div className="MyModalOrder_Overlay" onClick={onClose}>
      <div
        className="MyModalOrder"
        role="dialog"
        aria-modal="true"
        aria-labelledby="my-modal-order-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="MyModalOrder_Header">
          <button type="button" className="MyModalOrder_Close" onClick={onClose} aria-label="모달 닫기">
            ×
          </button>
        </div>
        <h2 id="my-modal-order-title" className="MyModalOrder_Title">주문상품</h2>
        <OrderSummaryBlock order={order} totalPrice={totalPrice} dateText={dateText} />
        <InfoSection title="예약자 정보" rows={reservationRows} />
        <InfoSection title="결제 정보" rows={paymentRows} />

        <div className="MyModalOrder_ButtonRow">
          <button type="button" className="MyModalOrder_Button is-secondary" onClick={onClose}>
            취소
          </button>
          <button type="button" className="MyModalOrder_Button is-primary" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
