import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";

// API 없을 때 쓰는 기본 카드 데이터
const defaultTourCards = Array.from({ length: 16 }, (_, index) => ({
  id: index + 1,
  title: "경복궁",
  location: "서울 종로구",
  rating: 4.9,
  reviews: 215,
  price: "33,280원",
  badge: index < 3 ? `TOP ${index + 1}` : "",
  firstImage: null,
}));

export default function MainPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("서울");
  const [selectedDate, setSelectedDate] = useState("2월 16일");
  const [selectedDay, setSelectedDay] = useState(16);
  const [draftSelectedDay, setDraftSelectedDay] = useState(16);
  const [tourCards, setTourCards] = useState(defaultTourCards);
  const [tourLoading, setTourLoading] = useState(false);
  const [tourError, setTourError] = useState(null);
  const dropdownRef = useRef(null);
  const datePickerRef = useRef(null);
  const calendarRows = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, null, null, null, null],
  ];

  function formatSelectedDate(day) {
    return `2월 ${day}일`;
  }

  // 지역 선택 시 한국관광공사 API(서버 프록시)로 목록 조회
  useEffect(() => {
    let cancelled = false;
    setTourError(null);
    setTourLoading(true);

    fetch(`/api/tour?region=${encodeURIComponent(selectedRegion)}`)
      .then((res) => {
        if (!res.ok) return res.json().then((d) => Promise.reject(d));
        return res.json();
      })
      .then((items) => {
        if (cancelled) return;
        const cards = (items || []).slice(0, 16).map((item, index) => ({
          id: item.contentid || index + 1,
          title: item.title || "관광지",
          location: item.addr1 || selectedRegion,
          rating: 4.9,
          reviews: 215,
          price: "33,280원",
          badge: index < 3 ? `TOP ${index + 1}` : "",
          firstImage: item.firstimage || item.firstImage || null,
        }));
        setTourCards(cards.length ? cards : defaultTourCards);
      })
      .catch((err) => {
        if (cancelled) return;
        setTourError(err?.error || err?.message || "목록을 불러오지 못했습니다.");
        setTourCards(defaultTourCards);
      })
      .finally(() => {
        if (!cancelled) setTourLoading(false);
      });

    return () => { cancelled = true; };
  }, [selectedRegion]);

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
                      setIsDatePickerOpen((prev) => {
                        const next = !prev;
                        if (next) setDraftSelectedDay(selectedDay);
                        return next;
                      });
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
                        {calendarRows.map((row, rowIndex) => (
                          <div className="Date_Row" key={`row-${rowIndex}`}>
                            {row.map((day, columnIndex) => {
                              if (!day) {
                                return <button type="button" key={`empty-${columnIndex}`} disabled />;
                              }

                              return (
                                <button
                                  type="button"
                                  key={day}
                                  className={draftSelectedDay === day ? "is-selected" : ""}
                                  onClick={() => setDraftSelectedDay(day)}
                                >
                                  {day}
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                      </div>
                    </div>

                    <div className="CTAs">
                      <button
                        type="button"
                        className="Button_Tertiary"
                        onClick={() => {
                          setDraftSelectedDay(selectedDay);
                          setIsDatePickerOpen(false);
                        }}
                      >
                        <span className="Button_Tertiary_Text">취소</span>
                      </button>
                      <button
                        type="button"
                        className="Button_Primary"
                        onClick={() => {
                          setSelectedDay(draftSelectedDay);
                          setSelectedDate(formatSelectedDate(draftSelectedDay));
                          setIsDatePickerOpen(false);
                        }}
                      >
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
          {tourLoading && (
            <p className="Tour_Loading">목록 불러오는 중...</p>
          )}
          <div className="Card_grid">
            {tourCards.map((tour) => (
              <article key={tour.id} className="Card_item">
                <div className="media">
                  {tour.firstImage ? (
                    <div
                      className="image_cover"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(13, 13, 15, 0) 30%, rgba(13, 13, 15, 0.7) 100%), url(${tour.firstImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  ) : (
                    <div className="image_cover" />
                  )}
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
