import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import CompBookRating from './CompBookRating'

class CompBook extends Component {
  static propTypes = {
    myReads: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    moveTo: PropTypes.func.isRequired
  }
  // clear overlay divs to prevent mess
  clear() {
    document.querySelectorAll('.bookOverlay')
    .forEach(el => el.style.display = 'none')
  }
  // create the overlay options when changer button is clicked
  overlayMenu(id, shelf) {
    this.clear()

    const bookOverlay = document.getElementById(id)
    bookOverlay.style.display = 'grid'
    console.log(bookOverlay)
    console.log(id)
    // bookDiv.style.display === 'grid' ?
    // (bookDiv.style.display = 'none') :
    // (bookDiv.style.display = 'grid')

    // prevent to show the current shelf as option
    const shelfButtons = bookOverlay.querySelectorAll('.shelfButton')
    switch(shelf) {
      case 'currentlyReading':
        shelfButtons[0].style.display = 'none'
        break
      case 'wantToRead':
        shelfButtons[1].style.display = 'none'
        break
      case 'read':
        shelfButtons[2].style.display = 'none'
        break
      default:
        shelfButtons[3].style.display = 'none'
        break
    }
  }
  render() {
    /*
     Render the books for the specific shelf
    */
    const { myReads, shelf, moveTo, addStar } = this.props
    return(
      <ul className="book">
        {myReads.filter((item) => item.book.shelf === shelf)
        .map((item, index) => (
          <li key={index} className={item.book.id}>
            {
              item.book.imageLinks === undefined ?
              <div className="bookImage noCover">NO COVER</div> :
              <img src={item.book.imageLinks.thumbnail} alt={item.book.title} className="bookImage"/>
            }
            <div>
              <span className="bookTitle">{item.book.title}</span>
              {
                item.book.authors === undefined ?
                <span>----------</span> :
                <span>{item.book.authors}</span>
              }
              <span>Published: {item.book.publishedDate}</span>
              <span>Pages: {item.book.pageCount}</span>
              {/* Rating stars should only be available for books that are on shelves */}
              <Route exact path="/" render={() => (
              <CompBookRating
                item={item}
                addStar={addStar}
              />
              )}/>
            </div>
            <button className="changer" onClick={() => this.overlayMenu(`${item.book.id}_overlay`, shelf)}></button>
            <div id={`${item.book.id}_overlay`} className="bookOverlay">
              <button className="changerOver" onClick={() => this.clear()}></button>
              <h3>Move to:</h3>
              <button className="shelfButton" onClick={() => moveTo('currentlyReading', item)}>Reading</button>
              <button className="shelfButton" onClick={() => moveTo('wantToRead', item)}>Want to read</button>
              <button className="shelfButton" onClick={() => moveTo('read', item)}>Read</button>
              <button className="shelfButton" onClick={() => moveTo('none', item)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default CompBook;