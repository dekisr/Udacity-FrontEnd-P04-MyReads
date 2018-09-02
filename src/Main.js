import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book';

function Main(props) {
  const {myReads, moveTo, addStar} = props
  return (
    <main>
      <section id="currentlyReading">
        <h2>Reading...</h2>
        <Book
          myReads={myReads}
          shelf={'currentlyReading'}
          moveTo={moveTo}
          addStar={addStar}
        />
      </section>
      <section id="wantToRead">
        <h2>Want to read!</h2>
        <Book
          myReads={myReads}
          shelf={'wantToRead'}
          moveTo={moveTo}
          addStar={addStar}
        />
      </section>
      <section id="read">
        <h2>Read.</h2>
        <Book
          myReads={myReads}
          shelf={'read'}
          moveTo={moveTo}
          addStar={addStar}
        />
      </section>
    </main>
  )
}
Main.propTypes = {
  myReads: PropTypes.array.isRequired,
  moveTo: PropTypes.func.isRequired,
  addStar: PropTypes.func.isRequired
}

export default Main;