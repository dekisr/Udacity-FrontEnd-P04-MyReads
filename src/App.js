import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import Header from './Header'
import Main from './Main'
import HeaderAddBooks from './HeaderAddBooks'
import AddBooks from './AddBooks'
import Footer from './Footer'
import Loading from './Loading'

class App extends Component {
  state = {
    myReads: [],
    loading: false
  }
  componentDidMount() {
    // Try to get data from localStorage or from BooksAPI
    (!localStorage.getItem('myReadsLocal')) ?
    this.myBooks() :
    this.setState({
      myReads: JSON.parse(localStorage.getItem('myReadsLocal')),
      loading: true
    })
  }
  componentDidUpdate(prevState) {
    // Update the localStorage on changes
    (this.state.myReads !== prevState.myReads) &&
    localStorage.setItem('myReadsLocal', JSON.stringify(this.state.myReads))
  }
  /*
   Create the first shelf from selected books
  */
  myBooks() {
    const currentlyReading = ['mDzDBQAAQBAJ', '_hIWb6Z8mX0C', 'luD1Bpc1fmsC']
    const wantToRead = ['3_PhCwAAQBAJ', 'piwP9HXtpvUC', 'QlduAgAAQBAJ', 'MjhaAAAAMAAJ']
    const read = ['BjDuAAAAMAAJ', 'JvOTGx2S6UgC', 'pqHfBQAAQBAJ', 'ZTOtnZg_j3gC', 'a_fSBAAAQBAJ']
    this.fetchBooks(wantToRead, 'wantToRead')
    this.fetchBooks(currentlyReading, 'currentlyReading')
    this.fetchBooks(read, 'read')
  }
  /*
   Fetch the chosen books to a specific shelf
  */
  fetchBooks(books, shelf) {
    books.map((book) => {
      return (
        BooksAPI.get(book).then((resp) => {
          const obj = {
            ...resp.book,
            stars: 0
          }
          return obj
        }).then((resp) => {
          let list = []
          resp.shelf = shelf
          list.push(resp)
          return list
        }).then((resp) => {
          this.setState((prevState) => ({
            myReads: prevState.myReads.concat(resp),
            loading: true
          }))
        })
      )
    })
  }
  /*
   Function to add star rating
  */
  rating = (num, item) => {
    const updatedBook = {
      ...item,
      stars: num
    }
    const updatedBooks = this.state.myReads
    const filtered = updatedBooks.filter((el) => el.id !== updatedBook.id)
    filtered.push(updatedBook)
    this.setState({
      myReads: filtered
    })
  }
  /*
   Move the current selected book to another shelf
  */
  move = (shelf, item) => {
    // prevent overlay mess
    document.querySelectorAll('.bookOverlay')
    .forEach(el => el.style.display = 'none')
    // apply the chosen shelf
    const updatedBook = item
    updatedBook.shelf = shelf
    const updatedBooks = this.state.myReads
    // prevent duplicates
    const filtered = updatedBooks.filter((el) => el.id !== updatedBook.id)
    shelf !== 'none' && filtered.push(updatedBook)
    this.setState({
      myReads: filtered
    })
  }
  render() {
    if(this.state.loading === false) {
      return <Loading/>
    } else {
      return (
        <div id="myReads">
          <Route exact path={process.env.PUBLIC_URL + '/'} render={() => (
            <Header/>
          )}/>
          <Route exact path={process.env.PUBLIC_URL + '/'} render={() => (
            <Main
              myReads={this.state.myReads}
              moveTo={this.move}
              addStar={this.rating}
            />
          )}/>
          <Route path={process.env.PUBLIC_URL + '/search'} render={() => (
            <HeaderAddBooks/>
          )}/>
          <Route path={process.env.PUBLIC_URL + '/search'} render={() => (
            <AddBooks
              myReads={this.state.myReads}
              moveTo={this.move}
            />
          )}/>
          <Footer/>
        </div>
      );
    }
  }
}

export default App;