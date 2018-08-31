import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import sortBy from 'sort-by'
import CompBookRating from './CompBookRating'
import CompOnTheShelf from './CompOnTheShelf'
import CompBookOverlay from './CompBookOverlay'

class CompBook extends Component {
  static propTypes = {
    myReads: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    moveTo: PropTypes.func.isRequired,
  }
  // clear overlay divs to prevent mess
  clear = () => {
    document.querySelectorAll('.bookOverlay')
    .forEach(el => el.style.display = 'none')
  }
  // create the overlay options when changer button is clicked
  overlayMenu = (id, shelf) => {
    this.clear()

    const bookOverlay = document.getElementById(id)
    bookOverlay.style.display = 'grid'
    // bookDiv.style.display === 'grid' ?
    // (bookDiv.style.display = 'none') :
    // (bookDiv.style.display = 'grid')
  }
  render() {
    /*
     Render the books for the specific shelf
    */
    const { myReads, shelf, moveTo, addStar } = this.props
    //sort by title
    myReads.sort(sortBy('title'))
    return(
      <ul className="book">
        <Route exact path={process.env.PUBLIC_URL + '/addBooks'} render={() => (
          <CompOnTheShelf
            myReads={myReads}
            shelf={shelf}
            moveTo={moveTo}
            overlayMenu={this.overlayMenu}
            clear={this.clear}
          />
        )}/>
        {myReads.filter((item) => item.shelf === shelf).map((item, index) => (
          <li key={index} className={item.id}>
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
              {/* Rating stars should only be available for books that are on shelves */}
              <Route exact path={process.env.PUBLIC_URL + '/'} render={() => (
                <CompBookRating
                  item={item}
                  addStar={addStar}
                />
              )}/>
            </div>
            <button className="changer" onClick={() => this.overlayMenu(`${item.id}_overlay`, shelf)}></button>
            <CompBookOverlay
              item={item}
              moveTo={moveTo}
              overlayMenu={this.overlayMenu}
              clear={this.clear}
            />
          </li>
        ))}
      </ul>
    )
  }
}

export default CompBook;