import { React, Component } from 'react'
import PropTypes from 'prop-types'
import Polyglot from 'node-polyglot'

class PolyglotProvider extends Component {
  constructor(props) {
    super(props)
    this.polyglot = new Polyglot({
      locale: props.locale,
      phrases: props.wordings[props.locale]
    })
    this.state = {
      t: this.polyglot.t.bind(this.polyglot)
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.locale !== this.props.locale) {
      this.polyglot.locale(newProps.locale)
      this.polyglot.replace(newProps.wordings[newProps.locale])
    }
  }

  render() {
    return this.props.render(this.state)
  }
}

PolyglotProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  wordings: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired
}

export default PolyglotProvider
