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
          // I am looking for a book in state, because the book may be not in stock anymore
          // if we will suppose, that I can read only books, which are in stock,
          // then I can simply use BooksAPI.get(book.id) method, but it will cause more request to the server
          let foundedBooks = this.findBookInMyBooks(book)
          console.log(JSON.stringify(foundedBooks))
          if(foundedBooks.length > 0)
            // actually for every id there should be only 1 book,
            // so I should get in foundedBooks from findBookInMyBooks array with 1 element or empty array
            foundedBooks.map((foundBook) => {
              foundBook.inMyBooks = true
              searchedBooks.push(foundBook)
            })
          else
            searchedBooks.push(book)
          this.setState({ searchedBooks })
        })
      } else {
        this.setState({ searchedBooks })
      }
    })
  }

  findBookInMyBooks = (book) => {
    return this.props.myBooks.filter((myBook) => (myBook.id === book.id))
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
