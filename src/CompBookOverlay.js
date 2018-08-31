import React from 'react'
import PropTypes from 'prop-types'

function CompBookOverlay(props) {
  const { item, moveTo, clear } = props
  return (
    <div id={`${item.id}_overlay`} className="bookOverlay">
      <button className="changerOver" onClick={() => clear()}></button>
      <h3>Move to:</h3>
      {
        item.shelf === 'currentlyReading' &&
        <div className="buttons">
          <button className="shelfButton" onClick={() => moveTo('wantToRead', item)}>Want to read</button>
          <button className="shelfButton" onClick={() => moveTo('read', item)}>Read</button>
          <button className="shelfButton" onClick={() => moveTo('none', item)}>Remove</button>
        </div>
      }
      {
        item.shelf === 'wantToRead' &&
        <div className="buttons">
          <button className="shelfButton" onClick={() => moveTo('currentlyReading', item)}>Reading</button>
          <button className="shelfButton" onClick={() => moveTo('read', item)}>Read</button>
          <button className="shelfButton" onClick={() => moveTo('none', item)}>Remove</button>
        </div>
      }
      {
        item.shelf === 'read' &&
        <div className="buttons">
          <button className="shelfButton" onClick={() => moveTo('currentlyReading', item)}>Reading</button>
          <button className="shelfButton" onClick={() => moveTo('wantToRead', item)}>Want to read</button>
          <button className="shelfButton" onClick={() => moveTo('none', item)}>Remove</button>
        </div>
      }
      {
        item.shelf === 'none' &&
        <div className="buttons">
          <button className="shelfButton" onClick={() => moveTo('currentlyReading', item)}>Reading</button>
          <button className="shelfButton" onClick={() => moveTo('wantToRead', item)}>Want to read</button>
          <button className="shelfButton" onClick={() => moveTo('read', item)}>Read</button>
        </div>
      }
    </div>
  )
}
CompBookOverlay.propTypes = {
  moveTo: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired
}

export default CompBookOverlay;