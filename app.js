//Book Class: represents a book
class Book {
    constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    }
}


//UI Class: handle ui tasks
class UI {

    static displayBooks() {
        
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td> 
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }
static deleteBook(el) {
    if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
    }
}
// div created for use of Alert
static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    //clear alert in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(),
    3000);

}
// clears input fields after submit
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

//Store Class: Handles Storage
class Store {
    static getBooks() {
let books;
if(localStorage.getItem('books') === null) {
    books = [];
} else {
    books = JSON.parse(localStorage.getItem('books'));
}

return books;
    }

    static addBook(book) {
const books = Store.getBooks();

books.push(book);

localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
if(book.isbn === isbn) {
    books.splice(index, 1);
}
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}



//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);


//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => 
{
    // prevent actual submit

    e.preventDefault();

// get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

//validation of book

    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please complete all fields', 'danger');
    } else {
// instatiate book

const book = new Book(title, author, isbn);

// add book to UI
UI.addBookToList(book);


// Add book to store
Store.addBook(book);

//Successful add message

UI.showAlert('Book Added', 'success');
// method that clears fields after submit

UI.clearFields();
    }

});

//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {

//removes book from UI
    UI.deleteBook(e.target)

//Removes from store
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

//Alert when book deleted
    UI.showAlert('Book Deleted', 'success');
});


//Search Bar

//get input element
let filterInput = document.getElementById('filterInput');

//add event listener

//filterInput.addEventListener('keyup', foundItems);

//function filterNames(){
    //get the value of the input
//let filterValue = document.getElementById('filterInput').value.toUpperCase();
    
//}

