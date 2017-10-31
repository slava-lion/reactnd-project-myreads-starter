import React, {Component} from 'react'

class Book extends Component {

  handleChange = (event, book) => {
    this.props.onShelfChange(book, event.target.value)
  }

  render() {
    const { book } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={
              // there were some books without images, which produced errors in console, so I added this check
              (typeof book.imageLinks !==	"undefined") ?
                { width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }
                : { width: 128, height: 193} }></div>
            <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(event) => this.handleChange(event, this.props.book)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">none</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">
          {(book.authors) ? book.authors.reduce((allAutors, newAuthor) => { return allAutors.length > 0 ? allAutors + ", " + newAuthor : newAuthor; }, "") : "" }
        </div>
      </div>
    )
  }
}

export default Book
