import React, { Component } from 'react'
import * as BooksAPI from './utils/BooksAPI'
import CompHeader from './CompHeader'
import CompMain from './CompMain'
import CompFooter from './CompFooter'

class App extends Component {
  state = {
    myReads: []
  }
  componentDidMount() {
    if(!localStorage.getItem('myReadsLocal')) {
      this.myBooks()
    } else {
      this.setState({
        myReads: JSON.parse(localStorage.getItem('myReadsLocal'))
      })
      // BooksAPI.search('make').then((resp) => console.log(resp))
    }
  }
  componentDidUpdate(prevState) {
    if(this.state.myReads !== prevState.myReads) {
      localStorage.setItem('myReadsLocal', JSON.stringify(this.state.myReads))
    }
  }
  myBooks() {
    const currentlyReading = ['mDzDBQAAQBAJ', '_hIWb6Z8mX0C', 'luD1Bpc1fmsC']
    const wantToRead = ['3_PhCwAAQBAJ', 'piwP9HXtpvUC', 'QlduAgAAQBAJ', 'MjhaAAAAMAAJ']
    const read = ['BjDuAAAAMAAJ', 'JvOTGx2S6UgC', 'pqHfBQAAQBAJ', 'ZTOtnZg_j3gC', 'a_fSBAAAQBAJ']
    this.fetchBooks(wantToRead, 'wantToRead')
    this.fetchBooks(currentlyReading, 'currentlyReading')
    this.fetchBooks(read, 'read')
  }
  fetchBooks(books, shelf) {
    books.map((book) => {
      return (
        BooksAPI.get(book).then((resp) => {
          const obj = {
            book: resp.book,
            stars: 0
          }
          return obj
        }).then((resp) => {
          let list = []
          resp.book.shelf = shelf
          list.push(resp)
          return list
        }).then((resp) => {
          this.setState((prevState) => ({
            myReads: prevState.myReads.concat(resp)
          }))
        })
      )
    })
  }
  star = (item) => {
    item.stars++
    this.setState({
      myReads: this.state.myReads
    })
  }
  move = (shelf, item) => {
    document.querySelectorAll('.bookOverlay')
    .forEach(el => el.style.display = 'none')
    item.book.shelf = shelf
    this.setState({
      myReads: this.state.myReads
    })
  }
  render() {
    return (
      <div id="myReads">
        <CompHeader/>
        <CompMain
          myReads={this.state.myReads}
          addStar={this.star}
          moveTo={this.move}
        />
        <CompFooter/>
      </div>
    );
  }
}

export default App;