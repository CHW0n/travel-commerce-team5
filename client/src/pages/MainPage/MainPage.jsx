import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";

const tourCards = Array.from({ length: 16 }, (_, index) => ({
  id: index + 1,
  title: "경복궁",
  location: "서울 종로구",
  rating: 4.9,
  reviews: 215,
  price: "33,280원",
  badge: index < 3 ? `TOP ${index +1}`:"",
}));

export default function MainPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("서울");
  const [selectedDate, setSelectedDate] = useState("2월 2026");
  const dropdownRef = useRef(null);
  const datePickerRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="Main">
      <header className="Header">
        <div className="page Header_Row">
          <a href="#" className="Header_logo" aria-label="5trip 홈">
            <span className="ohtrip-logo-icon2">
              <img src="/icon/ohtrip-logo-icon2.png" alt="5TRIP" className="logo_img" />
            </span>
          </a>
          <Link to="/mypage" className="MyPage_Btn" aria-label="마이페이지로 이동">
            <span className="MyPage_Btn_Text">마이페이지</span>
          </Link>
        </div>
      </header>

      <main className="Main_Content">
        <section className="Rectangle_150353" aria-label="프로모션 배너">
          <div className="page Rectangle_150353_Inner" />
        </section>

        <section className="Search_Module">
          <div className="page Search_Card">
            <div className="Tabs_Wrapper">
              <div className="Tabs">
                <button type="button" className="tab is-active">
                  <span className="tab_label">투어 티켓</span>
                  <span className="tab_indicator" />
                </button>
                <button type="button" className="tab">
                  <span className="tab_label">항공권</span>
                  <span className="tab_indicator" />
                </button>
                <button type="button" className="tab">
                  <span className="tab_label">숙소</span>
                  <span className="tab_indicator" />
                </button>
              </div>
              <div className="divider" />
            </div>

            <form className="Search_Form" onSubmit={(event) => event.preventDefault()}>
              <label className="Search_Field" htmlFor="region" ref={dropdownRef}>
                <span className="Search_Field_Label">어디로 가세요?</span>
                <div className="Search_Field_Control">
                  <input id="region" value={selectedRegion} readOnly />
                  <button
                    type="button"
                    className="Field_Icon_Button"
                    aria-label="지역 드롭다운 열기"
                    onClick={() => {
                      setIsDropdownOpen((prev) => !prev);
                      setIsDatePickerOpen(false);
                    }}
                  >
                    <img src="/icon/dropdown_icon.png" alt="" />
                  </button>
                </div>
                {isDropdownOpen && (
                  <div className="DropdownList" aria-label="지역 선택 목록">
                    <button
                      type="button"
                      className="Dropdown_Item"
                      onClick={() => {
                        setSelectedRegion("서울");
                        setIsDropdownOpen(false);
                      }}
                    >
                      서울
                    </button>
                    <button
                      type="button"
                      className="Dropdown_Item"
                      onClick={() => {
                        setSelectedRegion("부산");
                        setIsDropdownOpen(false);
                      }}
                    >
                      부산
                    </button>
                    <button
                      type="button"
                      className="Dropdown_Item"
                      onClick={() => {
                        setSelectedRegion("제주");
                        setIsDropdownOpen(false);
                      }}
                    >
                      제주
                    </button>
                    <button
                      type="button"
                      className="Dropdown_Item"
                      onClick={() => {
                        setSelectedRegion("강릉");
                        setIsDropdownOpen(false);
                      }}
                    >
                      강릉
                    </button>
                  </div>
                )}
              </label>

              <label className="Search_Field" htmlFor="date" ref={datePickerRef}>
                <span className="Search_Field_Label">언제 가시나요?</span>
                <div className="Search_Field_Control">
                  <input id="date" value={selectedDate} readOnly />
                  <button
                    type="button"
                    className="Field_Icon_Button"
                    aria-label="날짜 선택 열기"
                    onClick={() => {
                      setIsDatePickerOpen((prev) => !prev);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <img src="/icon/calendar_icon.png" alt="" />
                  </button>
                </div>
                {isDatePickerOpen && (
                  <div className="Date_Picker" aria-label="날짜 선택">
                    <div className="Calendar_Header">
                      <div className="Month_Label">
                        <span className="Month_Text">2월</span>
                        <span className="Year_Text">2026</span>
                      </div>
                      <div className="Month_Navigation">
                        <button type="button" className="Prev_Button" aria-label="이전 달">
                          <span className="Icon_Frame">‹</span>
                        </button>
                        <button type="button" className="Next_Button" aria-label="다음 달">
                          <span className="Icon_Frame">›</span>
                        </button>
                      </div>
                    </div>

                    <div className="Calendar">
                      <div className="Calendar_Body">
                      <div className="Week_Days">
                        <span>일</span>
                        <span>월</span>
                        <span>화</span>
                        <span>수</span>
                        <span>목</span>
                        <span>금</span>
                        <span>토</span>
                      </div>
                      <div className="Date_Grid">
                        <div className="Date_Row">
                          <button type="button">1</button>
                          <button type="button">2</button>
                          <button type="button">3</button>
                          <button type="button">4</button>
                          <button type="button">5</button>
                          <button type="button">6</button>
                          <button type="button">7</button>
                        </div>
                        <div className="Date_Row">
                          <button type="button">8</button>
                          <button type="button">9</button>
                          <button type="button">10</button>
                          <button type="button">11</button>
                          <button type="button">12</button>
                          <button type="button">13</button>
                          <button type="button">14</button>
                        </div>
                        <div className="Date_Row">
                          <button type="button">15</button>
                          <button
                            type="button"
                            className="is-selected"
                            onClick={() => setSelectedDate("2월 16일")}
                          >
                            16
                          </button>
                          <button type="button">17</button>
                          <button type="button">18</button>
                          <button type="button">19</button>
                          <button type="button">20</button>
                          <button type="button">21</button>
                        </div>
                        <div className="Date_Row">
                          <button type="button">22</button>
                          <button type="button">23</button>
                          <button type="button">24</button>
                          <button type="button">25</button>
                          <button type="button">26</button>
                          <button type="button">27</button>
                          <button type="button">28</button>
                        </div>
                        <div className="Date_Row">
                          <button type="button">29</button>
                          <button type="button">30</button>
                          <button type="button">31</button>
                          <button type="button" disabled />
                          <button type="button" disabled />
                          <button type="button" disabled />
                          <button type="button" disabled />
                        </div>
                      </div>
                      </div>
                    </div>

                    <div className="CTAs">
                      <button type="button" className="Button_Tertiary" onClick={() => setIsDatePickerOpen(false)}>
                        <span className="Button_Tertiary_Text">취소</span>
                      </button>
                      <button type="button" className="Button_Primary" onClick={() => setIsDatePickerOpen(false)}>
                        <span className="Button_Primary_Text">선택하기</span>
                      </button>
                    </div>
                  </div>
                )}
              </label>

              <button type="submit" className="Search_Btn">
                검색
              </button>
            </form>
          </div>
        </section>

        <section className="page Tour_Section" aria-label="추천 투어 리스트">
          <div className="Card_grid">
            {tourCards.map((tour) => (
              <Link
                key={tour.id}
                to={`/products/${tour.id}`}
                className="Card_item"
                style={{ display: "block" }}
              >
              <article>
                <div className="media">
                  <div className="image_cover" />
                  {tour.badge && <span className="best_badge">{tour.badge}</span>}
                  <div className="info">
                    <p className="Card_location">{tour.location}</p>
                    <h2 className="Card_title">{tour.title}</h2>
                    <p className="Card_meta">
                      ★ {tour.rating} · 후기 {tour.reviews}개
                    </p>
                    <p className="Card_price">{tour.price}</p>
                  </div>
                </div>
              </article>
              </Link>
            ))}
          </div>

          <div className="Pagination">
            <div className="Pagination_Container">
              <div className="Numbers">
                <div className="Number_List">
                  <div className="arrow_item_left">
                    <button type="button" className="arrow_left2" aria-label="첫 페이지">
                      <img src="/icon/arrow_left2.png" alt="" />
                    </button>
                    <button type="button" className="arrow_left" aria-label="이전 페이지">
                      <img src="/icon/arrow_right.png" className="left_chevron_icon" alt="" />
                    </button>
                  </div>
                  <div className="Page_Number">
                    <button type="button" className="is-active" aria-current="page">1</button>
                    <button type="button">2</button>
                    <button type="button">3</button>
                    <button type="button">4</button>
                  </div>
                </div>
              </div>

              <div className="arrow_item_right">
                <button type="button" className="arrow_right" aria-label="다음 페이지">
                  <img src="/icon/arrow_right.png" alt="" />
                </button>
                <button type="button" className="arrow_right2" aria-label="마지막 페이지">
                  <img src="/icon/arrow_right2.png" alt="" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
