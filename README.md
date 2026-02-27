# travel-commerce-team5
## 폴더 구조 요약
```
travel-commerce/
├── client/          # Vite + React
│   └── src/
│       ├── pages/   # 라우트 단위 페이지
│       ├── router/  # AppRouter.jsx
│       ├── components/
│       ├── hooks/
│       └── context/
└── server/          # Express REST API
    ├── routes/
    ├── controllers/
    ├── data/
    └── public/images/
```
## 라우팅(프론트 경로 고정)
```
/ : MainPage

/products/:productId : ProductDetailPage

/payment : PaymentPage

/complete : CompletePage

/mypage : MyPage
```
페이지 내부 UI/로직은 각 담당자가 구현합니다. 현재는 placeholder 상태입니다.

## Product 필드 고정
```
Product 필드:
- id
- title
- imagePath
- satisfaction
- reviewCount
- bookings
- duration
- languages
- pricePerPerson
- regionId
- itinerary
```
