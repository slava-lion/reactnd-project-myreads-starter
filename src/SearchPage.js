import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends Component {

  state = {
    query: "",
    maxResults: 3,
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    let searchedBooks = []
    BooksAPI.search(query, this.state.maxResults).then((response) => {
      if(response.length > 0) {
        response.map((book) => {
          searchedBooks.push(book)
          this.setState({ searchedBooks })
        })
      } else {
        this.setState({ searchedBooks })
      }
    })
  }

  changeShelf = (book, shelf) => {
    this.props.onShelfChange(book, shelf)
  }

  render() {
    const { query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.length > 0 ?
              this.state.searchedBooks.map((book) =>
                <li key={book.id}><Book book={book} onShelfChange={(book, shelf) => this.changeShelf(book, shelf)} /></li> )
              : "Nothing was found" }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
