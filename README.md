# 5TRIP - 여행 상품 서비스
https://d3jlgy3lzjx5vb.cloudfront.net/

# 1. 프로젝트 소개

5TRIP은 사용자가 국내의 다양한 여행 상품을 탐색하고 예약 및 결제를 진행할 수 있는 여행 상품 웹 서비스입니다.

사용자는 지역별(서울, 부산, 제주, 강릉) 여행 상품을 확인하고 상품 상세 정보를 통해 일정과 가격을 확인한 뒤 결제를 진행할 수 있습니다.
결제 이후 주문 정보는 마이페이지에서 확인할 수 있습니다.

시스템은 React 기반 프론트엔드와 Node.js API 서버를 연결한 웹 서비스로 구현됐으며,
AWS 인프라(S3, CloudFront, EC2)를 이용하여 실제 서비스 형태로 배포됐습니다.

# 2. 프로젝트 구조

```
travel-service
│
├─ client                # React Frontend
│  ├─ src
│  │  ├─ api             # 서버 API 호출 로직
│  │  ├─ components      # 공통 UI 컴포넌트
│  │  ├─ context         # Context API 전역 상태 관리
│  │  ├─ pages           # 페이지 컴포넌트
│  │  ├─ router          # 라우팅 설정
│  │  └─ tests           # 프론트 테스트 코드
│  │
│  ├─ public             # 정적 리소스 (이미지, 아이콘)
│  ├─ App.jsx            # 루트 컴포넌트
│  └─ main.jsx           # React 앱 진입점
│
├─ server                # Node.js + Express Backend
│  ├─ controllers        # API 비즈니스 로직
│  ├─ routes             # API 라우팅
│  │  ├─ regions.js
│  │  ├─ products.js
│  │  └─ order.js
│  │
│  ├─ data               # JSON 기반 데이터 저장
│  │  ├─ regions.json
│  │  ├─ orders.json
│  │  └─ products
│  │      ├─ seoul.json
│  │      ├─ busan.json
│  │      ├─ jeju.json
│  │      └─ gangneung.json
│  │
│  ├─ tests              # API 테스트 코드
│  └─ server.js          # Express 서버 실행
│
└─ README.md
```

# 3. 역할 분담
김다은(팀장)
- 노션 회의 내용 정리 및 작성 
- 프로젝트 설계 및 기획 문서 작성 
- 로고 디자인 및 스토리보드 제작 
- 1차 UI 구현
- 발표자로 ppt 작성  
- 컴포넌트 시스템 구조 정리 및 클래스 정의

정윤서 
- 메인/마이페이지 UI 구현 및 레이아웃 설계
- 상품/주문 리스트 렌더링 구조 구성
- 로딩·에러·빈 상태 처리 및 페이지네이션 UI 적용
- 반응형 그리드(4열→2열→1열) 최적화

조아영
- API 통신 로직 및 데이터 구성 
- 상품 상세 페이지 퍼블 및 프론트 
- 주문 결제 로직 구현 
- 상품 검색 및 필터 기능 구현

최희원
- 팀 깃허브 세팅 및 리드미 작성 
- 프로젝트 세팅 - 결제 진행 페이지 퍼블 및 프론트 
- 결제 완료 페이지 퍼블 및 프론트 
- 최종 테스트 자동화 및 기능 검증 
- 배포 


# 4. 주요 기능

### 1️⃣ 여행 상품 조회

* 지역 및 날짜 기반 여행 상품 목록 조회(검색 필터링)
* 상품 카드 UI 제공
* 상품 상세 페이지 이동

### 2️⃣ 상품 상세 페이지

* 여행 일정 및 가격 정보 확인
* 날짜 선택 기능
* 예약 진행

### 3️⃣ 결제 기능

* 결제 페이지 구현
* 예약 정보 기반 주문 생성
* 결제 완료 페이지 제공

### 4️⃣ 마이페이지

* 결제 완료된 주문 확인
* Context API 기반 주문 상태 관리
* LocalStorage를 통한 주문 데이터 유지


# 5. 기술 스택

### Frontend

* React
* React Router
* Context API
* CSS

### Backend

* Node.js
* Express
* REST API

# 6. API

API는 React 클라이언트와 Express 기반 서버 간 REST API 통신 구조로 구현.

클라이언트는 지역 조회, 상품 조회, 주문 생성 등의 기능을 API를 통해 처리합니다.

### API 구조

```
Client (React)
      ↓
HTTP / JSON
      ↓
Express API Server
      ↓
JSON Data (regions, products, orders)
```

### Endpoint 요약

| Method | Endpoint                   | 설명                  |
| ------ | -------------------------- | ------------------- |
| GET    | `/api/regions`             | 서비스에서 제공하는 지역 목록 조회 |
| GET    | `/api/products`            | 지역별 여행 상품 목록 조회     |
| GET    | `/api/products/:productId` | 특정 여행 상품 상세 조회      |
| GET    | `/api/orders`              | 전체 주문 목록 조회         |
| POST   | `/api/orders`              | 여행 상품 주문 생성         |


### 상품 조회 예시

```
GET /api/products?region=seoul&page=1&perPage=16
```

Response

```json
{
  "products": [...],
  "totalCount": 20
}
```


### 주문 생성 예시

```
POST /api/orders
```

Request Body

```json
{
  "productId": "seoul-2",
  "title": "간데메공원",
  "dateText": "3월 17일 (화)",
  "people": 2,
  "unitPrice": 24000,
  "totalPrice": 120000
}
```


# 7. 배포 (AWS)

프론트엔드와 백엔드를 분리하여 AWS 기반으로 배포.

React 정적 파일은 S3 + CloudFront로 제공하고, API 서버는 EC2에서 Node.js + Express로 실행됩니다.

## AWS Services

### S3

* React 빌드 결과물 정적 호스팅
* `index.html`, `assets`, 이미지 파일 저장

### CloudFront

* HTTPS 제공
* CDN 캐싱을 통한 빠른 콘텐츠 전달
* `/api/*` 요청을 EC2 서버로 라우팅

### EC2

* Node.js + Express 기반 API 서버 실행
* 상품 조회 및 주문 API 처리

### PM2

* Node 서버 프로세스 관리
* 서버 중단 시 자동 재시작


## Deployment Result

| 구분          | 주소               |
| ----------- | ---------------- |
| Frontend    | CloudFront 배포 주소 |
| Backend API | EC2 서버 (`:4000`) |


## Request Flow

```text
User
   ↓
CloudFront (HTTPS / CDN)
   ↓
S3 (React Static Hosting)

CloudFront (/api/*)
   ↓
EC2 (Node.js + Express API Server)
```

