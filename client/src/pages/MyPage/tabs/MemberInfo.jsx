// export default function MemberInfo() {
//   return (
//     <div className="MemberInfo">
//     </div>
//   );
// }

import "./MemberInfo.css";

const dummyUser = {
  name: "김다은",
  nickname: "다은이",
  email: "daeun@example.com",
  password: "password123",
};

export default function MemberInfo() {
  return (
    <div className="user_content">
      <div className="user_header">
        <div className="user_title">
          <h2 className="user_Title_main">회원정보</h2>
          <p className="user_Title_sub">원하시는 정보를 수정할 수 있습니다.</p>
        </div>
      </div>

      <div className="user_Form">
        <div className="user_name">
          <div className="user_Label_name">
            <span className="user_Label_text">이름</span>
          </div>
          <div className="user_Field_name">
            <span className="user_Field_text">{dummyUser.name}</span>
          </div>
        </div>

        <div className="user_name">
          <div className="user_Label_user">
            <span className="user_Label_text">닉네임</span>
          </div>
          <div className="user_Field_user">
            <span className="user_Field_text">{dummyUser.nickname}</span>
          </div>
        </div>

        <div className="user_name">
          <div className="user_Label_email">
            <span className="user_Label_text">이메일</span>
          </div>
          <div className="user_Field_email">
            <span className="user_Field_text">{dummyUser.email}</span>
          </div>
        </div>

        <div className="user_name">
          <div className="user_Label_pw">
            <span className="user_Label_text">비밀번호</span>
          </div>
          <div className="user_Field_pw">
            <span className="user_Field_text">{"•".repeat(8)}</span>
          </div>
        </div>
      </div>

      <div className="user_FieldRow_Contact">
        <div className="user_Field_btn_con">
          <div className="user_Field_btn">
            <button type="button" className="user_btn_home">홈</button>
            <button type="button" className="user_btn_ch">회원정보 수정</button>
          </div>
        </div>
      </div>
    </div>
  );
}
