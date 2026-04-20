import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../api/client";
import Header from "../../components/header/header";
import LoginRequiredModal from "../../components/LoginRequiredModal/LoginRequiredModal";
import "./MainPage.css";

const REGIONS = ["서울", "부산", "제주", "강릉"];
const REGION_TO_ID = { 서울: "seoul", 부산: "busan", 제주: "jeju", 강릉: "gangneung" };
const PER_PAGE = 1000;

function buildCalendarRows(year, month) {
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(firstDayOfWeek).fill(null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const rows = [];
  for (let index = 0; index < cells.length; index += 7) {
    rows.push(cells.slice(index, index + 7));
  }

  return rows;
}

function formatDisplayDate(year, month, day) {
  return `${year}년 ${month + 1}월 ${day}일`;
}

function formatApiDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function MainPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isPastDateModalOpen, setIsPastDateModalOpen] = useState(false);
  const [searchValidationMessage, setSearchValidationMessage] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("어디로 가세요?");
  const [appliedRegionId, setAppliedRegionId] = useState("");
  const [selectedDate, setSelectedDate] = useState("언제 가세요?");
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);
  const [appliedCalendarDate, setAppliedCalendarDate] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const dropdownRef = useRef(null);
  const datePickerRef = useRef(null);
  const calendarRows = buildCalendarRows(viewYear, viewMonth);
  const maxPage = Math.max(1, totalPages);

  function handlePrevMonth() {
    setViewMonth((prevMonth) => {
      if (prevMonth === 0) {
        setViewYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  }

  function handleNextMonth() {
    setViewMonth((prevMonth) => {
      if (prevMonth === 11) {
        setViewYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  }

  function handleSelectDay(day) {
    const nextDate = new Date(viewYear, viewMonth, day);
    nextDate.setHours(0, 0, 0, 0);

    if (nextDate < today) {
      setIsPastDateModalOpen(true);
      return;
    }

    setSelectedCalendarDate(nextDate);
    setSelectedDate(formatDisplayDate(viewYear, viewMonth, day));
  }

  function isSelectedDay(day) {
    if (!selectedCalendarDate) return false;
    return (
      selectedCalendarDate.getFullYear() === viewYear &&
      selectedCalendarDate.getMonth() === viewMonth &&
      selectedCalendarDate.getDate() === day
    );
  }

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProducts(appliedRegionId, page, PER_PAGE)
      .then((data) => {
        setProducts(data.products || data.content || []);
        setTotalCount(data.totalCount || data.totalElements || 0);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [appliedRegionId, page]);

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
      <Header />

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

            <form
              className="Search_Form"
              onSubmit={(e) => {
                e.preventDefault();
                const hasSelectedRegion = REGIONS.includes(selectedRegion);
                const hasSelectedDate = Boolean(selectedCalendarDate);

                if (!hasSelectedRegion && hasSelectedDate) {
                  setSearchValidationMessage("지역을 선택해야 합니다.");
                  return;
                }

                if (hasSelectedRegion && !hasSelectedDate) {
                  setSearchValidationMessage("날짜를 선택해야 합니다.");
                  return;
                }

                const nextRegionId = REGIONS.includes(selectedRegion) ? REGION_TO_ID[selectedRegion] : "";
                setAppliedRegionId(nextRegionId);
                setAppliedCalendarDate(selectedCalendarDate);
                setPage(1);
              }}
            >
              <label className="Search_Field" htmlFor="region" ref={dropdownRef}>
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
                    {REGIONS.map((region) => (
                  <button
                    key={region}
                    type="button"
                    className={`Dropdown_Item ${selectedRegion === region ? "is-active" : ""}`}
                    onClick={() => {
                      setSelectedRegion(region);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {region}
                  </button>
                ))}
                  </div>
                )}
              </label>

              <label className="Search_Field" htmlFor="date" ref={datePickerRef}>
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
                        <span className="Month_Text">{viewMonth + 1}월</span>
                        <span className="Year_Text">{viewYear}</span>
                      </div>
                      <div className="Month_Navigation">
                        <button type="button" className="Prev_Button" aria-label="이전 달" onClick={handlePrevMonth}>
                          <img src="/icon/arrow_left.png" alt="" className="Month_Arrow_Icon" />
                        </button>
                        <button type="button" className="Next_Button" aria-label="다음 달" onClick={handleNextMonth}>
                          <img src="/icon/arrow_right.png" alt="" className="Month_Arrow_Icon" />
                        </button>
                      </div>
                    </div>

                    <div className="Calendar">
                      <div className="Calendar_Body">
                      <div className="Week_Days">
                        <span className="is-weekend">일</span>
                        <span>월</span>
                        <span>화</span>
                        <span>수</span>
                        <span>목</span>
                        <span>금</span>
                        <span className="is-weekend">토</span>
                      </div>
                      <div className="Date_Grid">
                        {calendarRows.map((row, rowIndex) => (
                          <div className="Date_Row" key={`row-${rowIndex}`}>
                            {row.map((day, dayIndex) => (
                              <button
                                key={day ? `${viewYear}-${viewMonth}-${day}` : `empty-${rowIndex}-${dayIndex}`}
                                type="button"
                                className={[
                                  dayIndex === 0 || dayIndex === 6 ? "is-weekend" : "",
                                  day && isSelectedDay(day) ? "is-selected" : "",
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                                onClick={() => {
                                  if (day) handleSelectDay(day);
                                }}
                                disabled={!day}
                              >
                                {day ?? ""}
                              </button>
                            ))}
                          </div>
                        ))}
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
          {loading && (
            <div style={{ padding: "40px", textAlign: "center" }}>로딩 중...</div>
          )}
          {error && (
            <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
              {error}
            </div>
          )}
          {!loading && !error && (
            <>
              <div className="Card_grid">
                {products.map((tour, index) => (
                  <Link
                    key={tour.productId || tour.id}
                    to={`/products/${tour.productId || tour.id}`}
                    state={{
                      baseDate: appliedCalendarDate ? formatApiDate(appliedCalendarDate) : null,
                    }}
                    className="Card_item"
                    style={{ display: "block" }}
                  >
                    <article>
                      <div className="media">
                        <img
                          src={tour.imageUrl || tour.imagePath}
                          alt={tour.title}
                          className="Card_image"
                          loading="lazy"
                        />
                        {index < 3 && (
                          <span className="best_badge">TOP {index + 1}</span>
                        )}
                        <div className="info">
                          <h2 className="Card_title">{tour.title}</h2>
                          <p className="Card_rating">
                            ⭐️ {tour.satisfaction} / 5
                          </p>
                          <p className="Card_duration"> 한국어 · 1박 2일
                          </p>
                          <p className="Card_price">
                            {tour.pricePerPerson.toLocaleString()}원
                          </p>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              <div className="Pagination">
                <div className="Pagination_Container">
                  <div className="arrow_item_left">
                    <button
                      type="button"
                      className="arrow_left2"
                      aria-label="첫 페이지"
                      onClick={() => setPage(1)}
                      disabled={page <= 1}
                    >
                      <img src="/icon/arrow_left2.png" alt="" />
                    </button>
                    <button
                      type="button"
                      className="arrow_left"
                      aria-label="이전 페이지"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1}
                    >
                      <img src="/icon/arrow_right.png" className="left_chevron_icon" alt="" />
                    </button>
                  </div>

                  <div className="Page_Number">
                    {Array.from({ length: maxPage }, (_, index) => index + 1).map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={p === page ? "is-active" : ""}
                        aria-current={p === page ? "page" : undefined}
                        onClick={() => p <= maxPage && setPage(p)}
                        disabled={p > maxPage}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <div className="arrow_item_right">
                    <button
                      type="button"
                      className="arrow_right"
                      aria-label="다음 페이지"
                      onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                      disabled={page >= maxPage}
                    >
                      <img src="/icon/arrow_right.png" alt="" />
                    </button>
                    <button
                      type="button"
                      className="arrow_right2"
                      aria-label="마지막 페이지"
                      onClick={() => setPage(maxPage)}
                      disabled={page >= maxPage}
                    >
                      <img src="/icon/arrow_right2.png" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
      <LoginRequiredModal
        open={isPastDateModalOpen}
        onClose={() => setIsPastDateModalOpen(false)}
        title="알림"
        description="오늘보다 이전 날짜는 선택할 수 없습니다. 오늘 이후 날짜를 선택해주세요."
        cancelText="닫기"
        confirmText="확인"
      />
      <LoginRequiredModal
        open={Boolean(searchValidationMessage)}
        onClose={() => setSearchValidationMessage("")}
        title="알림"
        description={searchValidationMessage}
        cancelText="닫기"
        confirmText="확인"
      />
    </div>
  );
}
