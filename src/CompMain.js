import React from 'react'
import PropTypes from 'prop-types'
import CompBook from './CompBook';

function CompMain(props) {
  return (
    <main>
      <section id="currentlyReading">
        <h2>Reading...</h2>
        <CompBook
          myReads={props.myReads}
          shelf={'currentlyReading'}
          moveTo={props.moveTo}
        />
      </section>
      <section id="wantToRead">
        <h2>Want to read!</h2>
        <CompBook
          myReads={props.myReads}
          shelf={'wantToRead'}
          moveTo={props.moveTo}
        />
      </section>
      <section id="read">
        <h2>Read.</h2>
        <CompBook
          myReads={props.myReads}
          shelf={'read'}
          moveTo={props.moveTo}
        />
      </section>
    </main>
  )
}
CompMain.propTypes = {
  myReads: PropTypes.array.isRequired,
  moveTo: PropTypes.func.isRequired
}

export default CompMain;