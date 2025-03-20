// ErrorBoundary.js
import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI
      return <div>{this.props.fallback}</div>
    }

    // Normally, just render children
    return this.props.children
  }
}
