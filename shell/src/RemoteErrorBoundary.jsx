import { Component } from "react";

export default class RemoteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.error}>
          <strong>{this.props.label ?? "Remote"} failed to load</strong>
          <p style={styles.text}>
            Run{" "}
            <code style={styles.code}>npm run dev:all</code> from the project
            root and wait for remotes to finish building (ports :3001 and
            :3002), then open the shell at{" "}
            <code style={styles.code}>localhost:3000</code>.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  error: {
    flex: 1,
    minWidth: "280px",
    padding: "1.25rem",
    borderRadius: "12px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#991b1b",
  },
  text: {
    margin: "0.5rem 0 0",
    fontSize: "0.9rem",
    lineHeight: 1.5,
    color: "#7f1d1d",
  },
  code: {
    fontFamily: "ui-monospace, monospace",
    background: "#fff",
    padding: "0.1rem 0.35rem",
    borderRadius: "4px",
  },
};
