import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CompBook from './CompBook';

class CompMain extends Component {
  static propTypes = {
    myReads: PropTypes.array.isRequired,
    moveTo: PropTypes.func.isRequired,
  }
  render() {
    const { myReads, moveTo } = this.props
    return (
      <main>
        <section id="currentlyReading">
          <h2>Reading...</h2>
          <CompBook
            myReads={myReads}
            shelf={'currentlyReading'}
            moveTo={moveTo}
          />
        </section>
        <section id="wantToRead">
          <h2>Want to read!</h2>
          <CompBook myReads={myReads} shelf={'wantToRead'} moveTo={moveTo}/>
        </section>
        <section id="read">
          <h2>Read.</h2>
          <CompBook myReads={myReads} shelf={'read'} moveTo={moveTo}/>
        </section>
      </main>
    )
  }
}

export default CompMain;