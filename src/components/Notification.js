import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {

  render() {
    const style = {
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        <p>{this.props.notify}</p>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    notify: store.notify,
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)


export default ConnectedNotification