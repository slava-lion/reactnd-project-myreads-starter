import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BookshelfBooks from './BookshelfBooks'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  filterBooksForShelf(shelf) {
    console.log(this.state.books)

    return this.state.books.filter((book) => (book.shelf === shelf))
  }

  changeShelf = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(() => {
      this.setState(state => ({
        books: state.books.concat([ book ])
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchPage myBooks={this.state.books} onShelfChange={(book, shelf) => this.changeShelf(book, shelf)} />
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <BookshelfBooks books={this.filterBooksForShelf("currentlyReading")} shelf="currentlyReading" onShelfChange={(book, shelf) => this.changeShelf(book, shelf)} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookshelfBooks books={this.filterBooksForShelf("wantToRead")} shelf="wantToRead"  onShelfChange={(book, shelf) => this.changeShelf(book, shelf)}  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookshelfBooks books={this.filterBooksForShelf("read")} shelf="read" onShelfChange={(book, shelf) => this.changeShelf(book, shelf)}  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Unsorted (Marked)</h2>
                  <BookshelfBooks books={this.filterBooksForShelf("marked")} shelf="none"  onShelfChange={(book, shelf) => this.changeShelf(book, shelf)}  />
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
