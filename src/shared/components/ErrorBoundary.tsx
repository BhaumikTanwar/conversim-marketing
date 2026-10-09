import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  compact?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled error caught by ErrorBoundary:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.compact) {
      return (
        <div className="p-8 flex flex-col items-center gap-3 text-center">
          <AlertTriangle className="w-8 h-8 text-rose-500 stroke-[2.5]" />
          <p className="text-sm font-medium text-aurora-text">Something went wrong.</p>
          <button
            onClick={this.handleReset}
            className="text-xs font-medium px-4 py-2 rounded-lg border border-aurora-border text-aurora-text-2 hover:text-aurora-text hover:bg-aurora-surface-2 transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    return (
      <div className="flex w-full h-dvh justify-center items-center bg-aurora-bg p-6">
        <div className="max-w-md w-full bg-aurora-surface border border-aurora-border rounded-3xl p-8 md:p-12 flex flex-col items-center gap-6 text-center shadow-[0_24px_60px_-24px_rgba(29,28,24,0.25)]">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-rose-500 stroke-[2.5]" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-aurora-text">Something went wrong</h1>
            <p className="text-aurora-text-2 text-sm leading-relaxed">
              An unexpected error occurred. Try again, or reload the page — if it keeps happening, let us know.
            </p>
          </div>
          <div className="flex gap-3 w-full">
            <button
              onClick={this.handleReset}
              className="flex-1 flex items-center justify-center gap-2 bg-aurora-surface-2 text-aurora-text-2 hover:text-aurora-text font-medium px-4 py-3 rounded-xl border border-aurora-border transition-all text-sm shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Try again
            </button>
            {/* Plain <a>, not <Link> — this may catch an error inside the router itself, so only a full navigation is guaranteed to recover. */}
            <a
              href="/"
              className="flex-1 flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-medium px-4 py-3 rounded-xl transition-colors text-sm shadow-md"
            >
              <Home className="w-3.5 h-3.5" />
              Go home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
