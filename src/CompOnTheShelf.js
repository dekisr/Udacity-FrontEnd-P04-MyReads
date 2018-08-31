import React , { Component } from 'react'
import PropTypes from 'prop-types'

class CompOnTheShelf extends Component {
  static propTypes = {
    myReads: PropTypes.array.isRequired,
    moveTo: PropTypes.func.isRequired,
    overlayMenu: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired
  }
  currentShelf(shelf) {
    let currentShelf
    switch(shelf) {
      case 'currentlyReading':
        currentShelf = 'Reading'
        break
      case 'wantToRead':
        currentShelf = 'Want To Read'
        break
      default:
        currentShelf = 'Read'
        break
    }
    return currentShelf
  }
  render() {
    const { myReads, moveTo, shelf, overlayMenu, clear } = this.props
    return (
      myReads.filter((item) => item.shelf !== shelf).map((item, index) => (
        <li key={index} className={`${item.id} onShelf`}>
          {/* placeholder for undefined images */}
          {
            item.imageLinks === undefined ?
            <div className="bookImage noCover">NO COVER</div> :
            <img src={item.imageLinks.thumbnail} alt={item.title} className="bookImage"/>
          }
          <div>
            <span className="bookTitle">{item.title}</span>
            {/* placeholder for undefined authors */}
            {
              item.authors === undefined ?
              <span>----------</span> :
              <span>{item.authors}</span>
            }
            <span>Published: {item.publishedDate}</span>
            <span>Pages: {item.pageCount}</span>
            <span>Rating: {item.stars} stars</span>
            <span className="onShelfLine">Currently on the "{this.currentShelf(item.shelf)}" shelf</span>
          </div>
          <button className="changer" onClick={() => overlayMenu(`${item.id}_overlay`, item.shelf)}></button>
          <div id={`${item.id}_overlay`} className="bookOverlay">
            <button className="changerOver" onClick={() => clear()}></button>
            <h3>Move to:</h3>
            <button className="shelfButton" onClick={() => moveTo('currentlyReading', item)}>Reading</button>
            <button className="shelfButton" onClick={() => moveTo('wantToRead', item)}>Want to read</button>
            <button className="shelfButton" onClick={() => moveTo('read', item)}>Read</button>
            <button className="shelfButton" onClick={() => moveTo('none', item)}>Remove</button>
          </div>
        </li>
      ))
    )
  }
}

export default CompOnTheShelf;