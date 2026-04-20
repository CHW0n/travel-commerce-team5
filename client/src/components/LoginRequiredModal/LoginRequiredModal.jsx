import "./LoginRequiredModal.css";

export default function LoginRequiredModal({
  open,
  onClose,
  onLogin,
  title = "로그인",
  description = "로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?",
  cancelText = "취소",
  confirmText = "로그인",
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="Modal_Log_Backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="Modal_Log"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-required-title"
        aria-describedby="login-required-description"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="Modal_dialog">
          <button
            type="button"
            className="Modal_dialog_close"
            aria-label="모달 닫기"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="Modal_header">
          <h2 id="login-required-title" className="Modal_title">
            {title}
          </h2>
          <p
            id="login-required-description"
            className="Modal_des"
          >
            {description}
          </p>
        </div>

        <div className="Modal_Log_btn">
          <button
            type="button"
            className="Modal_Log_btn_ext Modal_Log_btn_text"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="Modal_Log_btn_text Modal_Log_btn_login"
            onClick={onLogin ?? onClose}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
