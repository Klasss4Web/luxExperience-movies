import "./EmptyState.css";

type EmptyStateProps = {
  status?: string;
  title: string;
  description?: string;
  mainBtnText?: string;
};

const EmptyState = ({
  status = "",
  title,
  description,
  mainBtnText = "Reconnect Now",
}: EmptyStateProps) => {
  return (
    <div className="err-container">
      <div className="err-card">
        <div className="err-icon-wrapper">
          <div className="err-icon-glow"></div>
          <div className="err-icon-main">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="var(--color-error)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="err-header">
          <h1 className="err-title">{title}</h1>
          <p className="err-desc">{description}</p>
        </div>

        <div className="err-actions">
          <a href="/" className="err-btn err-btn--primary">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6m12-4a9 9 0 0 1-15 6.7L3 16" />
            </svg>
            {mainBtnText}
          </a>

          <div className="err-btn-group">
            <a href="/" className="err-btn err-btn--secondary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Go Back
            </a>

            <a href="/" className="err-btn err-btn--secondary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </a>
          </div>
        </div>

        <div className="err-footer">
          <code>{status}</code>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
