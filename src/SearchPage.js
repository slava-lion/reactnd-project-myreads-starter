import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends Component {

  state = {
    query: "",
    maxResults: 3,
    searchedBooks: [] // this array will contains books return from API
                      // merged with books from main page to make us know there state
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
              // baseg on this attribute I will display 2 sections on search page
              // to provide information whether this book is already on bookshelf
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
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Founded Books on your shelf</h2>
                <ol className="books-grid">
                  {this.state.searchedBooks.length > 0 ?
                    this.state.searchedBooks.filter((book) => book.inMyBooks).map((book) =>
                      <li key={book.id}><Book book={book} onShelfChange={(book, shelf) => this.changeShelf(book, shelf)} /></li> )
                    : "Nothing was found" }
                </ol>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Founded new book</h2>
                <ol className="books-grid">
                  {this.state.searchedBooks.length > 0 ?
                    this.state.searchedBooks.filter((book) => !book.inMyBooks).map((book) =>
                      <li key={book.id}><Book book={book} onShelfChange={(book, shelf) => this.changeShelf(book, shelf)} /></li> )
                    : "Nothing was found" }
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchPage
