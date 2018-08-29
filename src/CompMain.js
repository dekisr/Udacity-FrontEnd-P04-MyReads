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
          addStar={props.addStar}
        />
      </section>
      <section id="wantToRead">
        <h2>Want to read!</h2>
        <CompBook
          myReads={props.myReads}
          shelf={'wantToRead'}
          moveTo={props.moveTo}
          addStar={props.addStar}
        />
      </section>
      <section id="read">
        <h2>Read.</h2>
        <CompBook
          myReads={props.myReads}
          shelf={'read'}
          moveTo={props.moveTo}
          addStar={props.addStar}
        />
      </section>
    </main>
  )
}
CompMain.propTypes = {
  myReads: PropTypes.array.isRequired,
  moveTo: PropTypes.func.isRequired,
  addStar: PropTypes.func.isRequired
}

export default CompMain;