class Book {
    constructor(name, author, isbn) {
        this.name = name;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static displayBooks() {
        const books = Storage.getFromStorage();
        books.forEach((book) => {
            UI.addSignleBook(book);
        });
    }


    static addSignleBook(book) {
        const table_row = document.createElement('tr');
        table_row.appendChild(document.createElement('td')).innerHTML = book.name;
        table_row.lastChild.classList.add('name');
        table_row.appendChild(document.createElement('td')).innerHTML = book.author;
        table_row.lastChild.classList.add('author');
        table_row.appendChild(document.createElement('td')).innerHTML = book.isbn;
        table_row.lastChild.classList.add('isbn');
        table_row.appendChild(document.createElement('td')).innerHTML = "&times;";
        table_row.lastChild.style = 'border: black solid 1px; background-color:red; font-weight:bold; font-size:40px;width:38px;';
        table_row.lastChild.addEventListener('click', UI.removeBook);
        document.querySelector('tbody').appendChild(table_row);
    }


    static removeBook(e) {
        const row = e.target.parentElement;
        const isbn = (row.querySelector('.isbn')).innerText;
        row.remove();
        console.log((row.querySelector('.isbn')).innerText);
        Storage.removeFromStorage(isbn);
    }

    static addBook(book) {
        const name = document.querySelector('#book').value;
        console.log(name);
        const isbn = document.querySelector('#theisbn').value;
        const author = document.querySelector('#theauthor').value;

        if (name === '' || author === '' || isbn === '') {
            UI.emptyFields();
            return;
        }
        book = new Book(name, author, isbn);
        UI.addSignleBook(book);
        console.log(book);
        Storage.addToStorage(book);
    }

    static emptyFields() {

        let errMsg = document.createElement("div");
        errMsg.classList.add('.err');
        errMsg.style.backgroundColor = "red";
        errMsg.style.width = "80%";
        errMsg.style.height = "30px";
        errMsg.style.margin = "auto";

        let errSpan = document.createElement("span");
        errSpan.innerHTML = "Please fill in all the fileds";
        errMsg.appendChild(errSpan);
        const row = document.querySelector('.row');
        const form = document.querySelector('#form');
        row.insertBefore(errMsg, form);
        // remove error message after half second   
        setTimeout(UI.removeMsg, 500);


    }

    static removeMsg() {
        document.querySelector(".row").removeChild(document.getElementsByClassName(".err")[0]);
    }

}


// Local Storage Class
class Storage {
    static addToStorage(book) {
        const books = Storage.getFromStorage();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeFromStorage(isbn) {
        const books = Storage.getFromStorage();
        books.forEach((book, index) => {
            if ((book.isbn).trim() === isbn) {
                console.log(` index = ${index} and isbn =${book.isbn}`);
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));

    }

    static getFromStorage() {
        let books;
        if (localStorage.getItem('books') === null)
            books = [];
        else
            books = JSON.parse(localStorage.getItem('books'));
        return books;

    }

}

document.querySelector('form').addEventListener('submit', (e) => { e.preventDefault(); });
document.addEventListener('DOMContentLoaded', UI.displayBooks);
document.querySelector('#btn').addEventListener('click', UI.addBook);