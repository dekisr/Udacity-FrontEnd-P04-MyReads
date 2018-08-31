import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'
import { debounce } from 'lodash'
import CompBook from './CompBook'

class CompAddBooks extends Component {
  static propTypes = {
    myReads: PropTypes.array.isRequired,
    moveTo: PropTypes.func.isRequired
  }
  state = {
    query: '',
    searchResults: [],
    invalid: false
  }
  updateQuery = debounce((value) => {
    const query = value.trim().replace(/\s+/g, ' ')
    this.setState({query})

    if (query.length) {
      BooksAPI.search(query).then((resp) => {
        let list = []
        resp.map((item) => {
          const obj = {...item, stars: 0}
          obj.shelf = 'none'
          // Do not show books that are already in a shelf
          return !this.props.myReads.find(el => el.id === obj.id) && list.push(obj)
        })
        return list
      }).then((resp) => {
        this.setState({
          searchResults: resp,
          invalid: false
        })
      }).catch((err) => {
        console.log(err)
        this.setState({
          searchResults: [],
          invalid: true
        })
      })
    } else {
      console.log('Empty')
      this.setState({
        searchResults: [],
        invalid: false
      })
    }
  }, 500)
  render() {
    return (
      <main>
        <section id="search">
          <input
            type="text"
            placeholder="search for new books!"
            className="search"
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </section>
        <section id="addBooks">
          <h2>searching for... ' {this.state.query} '</h2>
          {this.state.searchResults.length > 0 && (
            <div className="searchResults">
              <p>
                Found {this.state.searchResults.length} results
              </p>
            </div>
          )}
          {this.state.invalid === true && (
            <div className="searchResults">
              <p>We didnt find anything...</p>
              <p className="searchTerms"><strong>Available search terms:</strong> 'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'</p>
            </div>
          )}
          <CompBook
            myReads={this.state.searchResults}
            shelf={'none'}
            moveTo={this.props.moveTo}
          />
        </section>
      </main>
    )
  }
}

export default CompAddBooks;