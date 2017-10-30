import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class BookshelfBooks extends Component {

  render() {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.map((book) => (
            <li key={book.id}>
              <Book book={book} />
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default BookshelfBooks
