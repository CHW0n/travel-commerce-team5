# O-TRIP

회원 기반 여행 상품 예약 서비스입니다.  
사용자는 지역과 날짜를 기준으로 여행 상품을 조회하고, 로그인 후 상품을 예약할 수 있습니다.  
마이페이지에서는 주문 내역과 회원 정보를 관리할 수 있으며, 관리자는 회원 목록을 조회할 수 있습니다.

## 프로젝트 소개

기존 JSON mock 데이터 기반 여행 상품 서비스에  
회원 인증, 상품 날짜 필터링, 주문 생성, 마이페이지, 관리자 기능을 추가한 풀스택 프로젝트입니다.

Spring Boot와 MySQL을 기반으로 실제 DB를 연동하고,  
세션 기반 인증을 적용하여 회원 전용 기능과 관리자 권한 기능을 구현했습니다.


## 팀원 및 역할
팀 역할분담: 도메인 중심의 기능 분담

- 각 팀원이 담당 도메인의 프론트엔드 화면과 백엔드 API를 함께 구현

- 공통 인증, API 연동, 배포 환경은 팀장 중심으로 통합 관리
  
| 이름  | 역할                                              |
| --- | ----------------------------------------------- |
| 최희원(팀장) | User 도메인, 도메인 설계 및 기술 설계, API 명세서 작성, 로그인/회원가입/중복검사, 세션 연동, 배포    |
| 김다은 | Order/Admin 도메인, 마이페이지, 관리자 페이지, 주문 기능          |
| 정윤서 | Product 도메인, 상품 목록/상세, 날짜 필터링                   |
| 조아영 | User 도메인, 회원 정보 수정, 비밀번호 검증, BCrypt, 예외 처리, 테스트 |

## 주요 기능

### User

- 회원가입
- 로그인 / 로그아웃
- 이메일, 닉네임 중복 검사
- 회원 정보 조회 및 수정
- 비밀번호 변경
- 회원 탈퇴

### Product

- 지역별 여행 상품 조회
- 상품 상세 조회
- 상품별 이용 가능 날짜 조회
- 지역/날짜 기반 상품 필터링
- 외부 API 기반 상품 데이터 가공

### Order

- 상품 예약 생성
- 이용 날짜 및 인원수 저장
- 예약자 정보 저장
- 주문 내역 조회
- 주문 상세 조회

### Admin

- 관리자 권한 확인
- 전체 회원 목록 조회

## 기술 스택

### Frontend

- React
- Vite
- React Router
- Axios

### Backend

- Spring Boot
- Spring MVC
- Spring Data JPA
- Spring Security
- BCrypt

### Database

- MySQL

### Deployment

- AWS S3
- AWS CloudFront
- AWS EC2
- AWS RDS MySQL

## 도메인 설계

서비스는 기능 책임에 따라 다음 4개 도메인으로 구분했습니다.

```text
User    : 회원가입, 로그인, 회원 정보 관리, 회원 탈퇴
Product : 여행 상품 조회, 지역/날짜 필터링, 상품 상세 조회
Order   : 상품 예약, 주문 생성, 주문 내역 관리
Admin   : 관리자 권한 기반 회원 조회
````

## ERD 구조

주요 테이블은 다음과 같습니다.

```text
users
regions
products
product_dates
orders
```

테이블 관계는 다음과 같습니다.

```text
User 1 : N Order
Region 1 : N Product
Product 1 : N ProductDate
ProductDate 1 : N Order
```

관리자 계정은 별도 테이블을 두지 않고 `users.role` 값으로 구분했습니다.

```text
USER  : 일반 사용자
ADMIN : 관리자
```

회원 탈퇴는 실제 삭제가 아닌 소프트 삭제 방식으로 처리했습니다.

```text
ACTIVE → WITHDRAWN
```

## 인증 방식

세션 기반 인증 방식을 사용했습니다.

로그인 성공 시 서버에서 세션을 생성하고,
이후 요청에서는 세션 정보를 통해 로그인 상태와 사용자 권한을 확인합니다.

세션에는 다음 정보를 저장합니다.

```text
user_id
role
```

관리자 페이지 접근 시에는 `role = ADMIN` 여부를 확인하여 접근을 제한했습니다.

## 주요 API

### User API

| Method | URL                   | 설명       |
| ------ | --------------------- | -------- |
| POST   | `/api/users/signup`   | 회원가입     |
| POST   | `/api/users/login`    | 로그인      |
| POST   | `/api/users/logout`   | 로그아웃     |
| GET    | `/api/users/me`       | 내 정보 조회  |
| PATCH  | `/api/users/me`       | 회원 정보 수정 |
| PATCH  | `/api/users/withdraw` | 회원 탈퇴    |

### Product API

| Method | URL                         | 설명       |
| ------ | --------------------------- | -------- |
| GET    | `/api/regions`              | 지역 목록 조회 |
| GET    | `/api/products`             | 상품 목록 조회 |
| GET    | `/api/products/{productId}` | 상품 상세 조회 |

상품 목록은 지역과 날짜 조건으로 필터링할 수 있습니다.

```http
GET /api/products?region=seoul&date=2026-03-24&page=1&size=16
```

### Order API

| Method | URL                     | 설명         |
| ------ | ----------------------- | ---------- |
| POST   | `/api/orders`           | 주문 생성      |
| GET    | `/api/orders`           | 내 주문 목록 조회 |
| GET    | `/api/orders/{orderId}` | 주문 상세 조회   |

### Admin API

| Method | URL                         | 설명          |
| ------ | --------------------------- | ----------- |
| GET    | `/api/admin/users`          | 전체 회원 목록 조회 |
| GET    | `/api/admin/users/{userId}` | 회원 상세 조회    |

## 화면 구성

* 로그인 / 회원가입
* 메인 상품 목록
* 상품 상세 및 예약
* 결제 진행
* 마이페이지 주문 내역
* 마이페이지 회원 정보 수정
* 관리자 회원 관리 페이지

## 배포

프론트엔드는 React 빌드 파일을 S3에 업로드하고 CloudFront로 배포했습니다.
백엔드는 EC2에서 Spring Boot 애플리케이션을 실행했으며,
데이터베이스는 Amazon RDS MySQL을 사용했습니다.

```text
Frontend : S3 + CloudFront
Backend  : EC2
Database : RDS MySQL
```

## 트러블슈팅

### 상품 목록 API 응답 구조 불일치

프론트엔드에서 기대한 응답 구조와 백엔드 응답 구조가 달라 상품 목록이 출력되지 않는 문제가 있었습니다.
응답 구조를 확인한 뒤 데이터 매핑 로직을 수정하여 해결했습니다.

### 사용자 인증 상태 관리

로그인 후 페이지 이동이나 새로고침 시 인증 상태 반영이 불안정한 문제가 있었습니다.
세션 확인 API를 통해 로그인 상태를 다시 동기화하도록 수정했습니다.

### Vite 프록시 설정 문제

로컬 개발 환경에서 API 요청 시 CORS 오류가 발생했습니다.
Vite 프록시 설정을 통해 백엔드 서버로 요청이 전달되도록 수정했습니다.

