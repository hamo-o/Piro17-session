let date = new Date(); //현재 날짜 객체
// const date2 = new Date(2022, 8, 7); // 지정 날짜 객체

const makeCalendar = () => {
  const viewYear = date.getFullYear(); //2022
  const viewMonth = date.getMonth(); // 6 / 0 1 2 3...
  const viewDate = date.getDate(); //7
  const viewDay = date.getDay(); // 4 == 목 / 0 1 2 3 4 5 6 < 일 월 화 수 목 ...

  // 캘린더 년도 달 채우기
  document.querySelector(".year-month").textContent = `
${viewYear}년 ${viewMonth + 1}월
`;

  // 이번 달 마지막 날짜 가져오기
  const thisLast = new Date(2022, 8, 7);
  // 일에 0을 넣으면 마지막 날짜가 가져와진다!
  const thisDate = thisLast.getDate();
  const thisDay = thisLast.getDay();

  // 저번 달 마지막 날짜 가져오기
  const prevLast = new Date(viewYear, viewMonth, 0);
  const prevDate = prevLast.getDate();
  const prevDay = prevLast.getDay();

  // 전체 날짜를 만들기 위한 배열 만들기
  const prevDates = [];
  const thisDates = [...Array(thisDate + 1).keys()].slice(1);
  // Array(32) 길이가 32인 배열 [undefined, undefined, ... , undefined]
  // .keys() [0, 1, 2, ... , 31]
  // .slice(1) >> 첫번째 인덱스 날림
  const nextDates = [];

  // 저번달의 마지막 날이 토요일이면 저번달 달력 표시 안해도 됨
  // 이전 달 날짜들을 만들어주는 코드
  if (prevDay !== 6) {
    for (let i = 0; i < prevDay + 1; i++) {
      prevDates.unshift(prevDate - i);
    }
  }

  // thisDay는 마지막 날짜의 요일!
  // 다음 달 날짜들을 만들어주는 코드
  for (let i = 1; i < 7 - thisDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);

  // div로 감싸서 다시 배열에 넣어주기--------------------------------

  const firstDateIndex = dates.indexOf(1); // 앞에서부터 찾음
  const lastDateIndex = dates.lastIndexOf(thisDate); // 뒤에서부터 찾음

  // 이번달이 아닌 날들 other 이번달인 날들 this
  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
    //   if (i >= firstDateIndex && i < lastDateIndex + 1) {
    //     const condition = "this";
    //   } else {
    //     const condition = "other";
    //   }

    dates[i] = `
  <div class = "date"><span class ="${condition}">${date}</span></div>
  `;
  });

  // Dates 그리기
  document.querySelector(".dates").innerHTML = dates.join("");

  // 오늘 날짜 찾기
  const today = new Date();
  if (viewYear === today.getFullYear() && viewMonth === today.getMonth()) {
    for (let date of document.querySelectorAll(".this")) {
      if (+date.innerHTML == today.getDate()) {
        // 숫자로 변경해주기 위해서 + 붙이기. parseInt도 됨
        date.classList.add("today");
        break;
      }
    }
  }
};

makeCalendar();

// 이전 달로 이동
const prevMonth = () => {
  date.setDate(1); // 전 달로 날짜 변경
  date.setMonth(date.getMonth() - 1); // 전 달로 달 변경
  makeCalendar();
};

// 이번 달로 이동
const curMonth = () => {
  date = new Date();
  makeCalendar();
};

// 다음 달로 이동
const nextMonth = () => {
  date.setDate(1); // 다음 달로 날짜 변경
  date.setMonth(date.getMonth() + 1); // 다음 달로 달 변경
  makeCalendar();
};
