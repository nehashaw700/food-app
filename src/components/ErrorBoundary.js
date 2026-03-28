import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application crashed:", error, errorInfo);
  }

  handleRefresh = () => {
    window.location.assign("/");
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-state-page" role="alert">
          <div className="error-card">
            <p className="error-eyebrow">Application Error</p>
            <h1>Something broke on our side.</h1>
            <p className="error-copy">
              We could not render this screen safely. Refresh and try again.
            </p>
            {this.state.error?.message ? (
              <p className="error-message">{this.state.error.message}</p>
            ) : null}
            <button className="primary-action" onClick={this.handleRefresh}>
              Go to home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
