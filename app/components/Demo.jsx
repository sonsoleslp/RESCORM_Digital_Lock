import React from "react";
import { render } from "react-dom";

import PatternLock from "react-pattern-lock";

class Demo extends React.Component {
  state = {
    path: [],
    isLoading: false,
    error: false,
    success: false,
    disabled: false,
    size: 3
  };

  errorTimeout = 0;

  componentDidMount() {
    window.addEventListener("keydown", ({ which }) => {
      if (which === 38) {
        this.setState({
          size: this.state.size >= 10 ? 10 : this.state.size + 1
        });
      } else if (which === 40) {
        this.setState({ size: this.state.size > 3 ? this.state.size - 1 : 3 });
      }
    });
  }

  onReset = () => {
    this.setState({
      path: [],
      success: false,
      error: false,
      disabled: false
    });
  };

  onChange = path => {
    this.setState({ path: [...path] });
  };

  onFinish = () => {
    this.setState({ isLoading: true });
    // an imaginary api call
    setTimeout(() => {
      if (this.state.path.join("-") === "0-1-2") {
        this.setState({ isLoading: false, success: true, disabled: true });
      } else {
        this.setState({ disabled: true, error: true });
        this.errorTimeout = window.setTimeout(() => {
          this.setState({
            disabled: false,
            error: false,
            isLoading: false,
            path: []
          });
        }, 2000);
      }
    }, 1000);
  };

  render() {
    const { size, path, disabled, success, error, isLoading } = this.state;
    return (
      <React.Fragment>
        <div className="center">
          <PatternLock
            size={size}
            onChange={this.onChange}
            path={path}
            error={error}
            onFinish={this.onFinish}
            connectorThickness={5}
            disabled={disabled || isLoading}
            success={success}
          />
        </div>
        <div className="output">
          Select the top 3 points starting from the left
        </div>
        <div className="output">Output : {this.state.path.join(", ")}</div>
        {success && (
          <button
            style={{ margin: "0 auto", display: "block" }}
            onClick={this.onReset}
          >
            Click here to reset
          </button>
        )}
        <div className="output">
          Press the up/down arrow keys to increase/decrease the size of the
          input
        </div>
      </React.Fragment>
    );
  }
}

render(<Demo />, document.getElementById("root"));
