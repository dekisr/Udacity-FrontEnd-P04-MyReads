import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CompBook extends Component {
  static propTypes = {
    myReads: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    moveTo: PropTypes.func.isRequired,
  }
  clear() {
    document.querySelectorAll('.bookOverlay')
    .forEach(el => el.style.display = 'none')
  }
  overlayMenu(id, shelf) {
    this.clear()

    const bookOverlay = document.getElementById(id)
    bookOverlay.style.display = 'grid'
    // bookDiv.style.display === 'grid' ?
    // (bookDiv.style.display = 'none') :
    // (bookDiv.style.display = 'grid')
    
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
      break
    }
  }
  // overlayMenu(shelf, index) {
  //   const currentShelf = document.getElementById(shelf)
  //   const bookDiv = currentShelf.querySelectorAll('.bookOverlay')
  //   const shelfButtons = bookDiv[index].querySelectorAll('.shelfButton')

  //   bookDiv[index].style.display === 'grid' ?
  //   (bookDiv[index].style.display = 'none') :
  //   (bookDiv[index].style.display = 'grid')

  //   switch(shelf) {
  //     case 'currentlyReading':
  //       shelfButtons[0].style.display = 'none'
  //       break
  //     case 'wantToRead':
  //       shelfButtons[1].style.display = 'none'
  //       break
  //     case 'read':
  //       shelfButtons[2].style.display = 'none'
  //       break
  //     default:
  //       break
  //   }
  // }

  render() {
    const { myReads, shelf, moveTo } = this.props
    return(
      <ul className="book">
        {myReads.filter((item) => item.book.shelf === shelf)
        .map((item, index) => (
          <li key={index}>
            <img src={item.book.imageLinks.thumbnail} alt={item.book.title} className="bookImage"/>
            <div>
              <span className="bookTitle">{item.book.title}</span>
              <span>{item.book.authors}</span>
              <span>Published: {item.book.publishedDate}</span>
              <span>Pages: {item.book.pageCount}</span>
            </div>
            <button className="changer" onClick={() => this.overlayMenu(item.book.id, shelf)}></button>
            <div id={item.book.id} className="bookOverlay">
              <button className="changerOver" onClick={() => this.clear()}></button>
              <h3>Move to:</h3>
              <button className="shelfButton" onClick={() => moveTo('currentlyReading', item)}>Reading</button>
              <button className="shelfButton" onClick={() => moveTo('wantToRead', item)}>Want to read</button>
              <button className="shelfButton" onClick={() => moveTo('read', item)}>Read</button>
              <button className="shelfButton" onClick={() => moveTo('none', item)}>None</button>
            </div>
          </li>
        ))}
      </ul>
    )
  }
  // render() {
  //   const { myReads, shelf, moveTo } = this.props
  //   return(
  //     <ul className="book">
  //       {myReads.filter((item) => item.book.shelf === shelf)
  //       .map((item, index) => (
  //         <li key={index}>
  //           <img src={item.book.imageLinks.smallThumbnail} alt="" className="bookImage"/>
  //           <div>
  //             <span className="bookTitle">{item.book.title}</span>
  //             <span>{item.book.authors}</span>
  //             <span>Published: {item.book.publishedDate}</span>
  //             <span>Pages: {item.book.pageCount}</span>
  //             <button className="changer" onClick={() => this.overlayMenu(shelf, index)}></button>
  //             <div className="bookOverlay">
  //               <button className="changerOver" onClick={() => this.overlayMenu(shelf, index)}></button>
  //               <h3>Move to:</h3>
  //               <button className="shelfButton" onClick={() => moveTo('currentlyReading', item)}>Reading</button>
  //               <button className="shelfButton" onClick={() => moveTo('wantToRead', item)}>Want to read</button>
  //               <button className="shelfButton" onClick={() => moveTo('read', item)}>Read</button>
  //               <button className="shelfButton" onClick={() => moveTo('currentlyReading', item)}>None</button>
  //             </div>
  //           </div>
  //         </li>
  //       ))}
  //     </ul>
  //   )
  // }
}
export default CompBook;