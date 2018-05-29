import React from 'react';
import { connect } from 'react-redux';

class Kannat extends React.Component {
  componentDidMount = () => {
  }
  render() {
    return (
      <div className="container">
        <p>x</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  kysymykset: state.kysymykset,
  kayttaja: state.kayttaja,
});

export default connect(
  mapStateToProps,
  { },
)(Kannat);

