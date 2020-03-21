import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: false };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.renderError(this.state.error);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
