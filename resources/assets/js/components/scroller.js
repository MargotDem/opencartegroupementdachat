import * as React from 'react'
import { withRouter } from 'react-router'

export var Scroller = withRouter(
  class ScrollToTopWithoutRouter extends React.Component {
    componentDidUpdate (prevProps) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }

    render () {
      return null
    }
  }
)
