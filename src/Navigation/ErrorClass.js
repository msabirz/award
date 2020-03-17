import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
  }
  render() {
    if (this.state.hasError) {
      return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <div title="Sorry Something went wrong!!!" bordered={false} style={{ width: 300 }}>
          <h1>Sorry Something went wrong!!!</h1>
        </div>
      </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
