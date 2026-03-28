import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  const statusCode = err?.status || 500;
  const statusText = err?.statusText || "Unexpected Error";
  const message =
    err?.data?.message ||
    err?.error?.message ||
    "The page could not be loaded. Please try again from the home screen.";

  return (
    <div className="error-state-page" role="alert">
      <div className="error-card">
        <p className="error-eyebrow">Route Error</p>
        <h1>We could not open this page.</h1>
        <p className="error-copy">{message}</p>
        <p className="error-message">
          {statusCode} {statusText}
        </p>
        <Link className="primary-action action-link" to="/">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default Error;
