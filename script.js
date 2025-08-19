const button1 = document.getElementById('button1')
const button2 = document.getElementById('button2')
const button3 = document.getElementById('button3')
const title = document.getElementById('title')
const bookForm = document.getElementById('book-form')
const nameInput = document.getElementById('name')
const authorInput = document.getElementById('author')
const publisherInput = document.getElementById('publisher')
const dateInput = document.getElementById('date')
const formBtn = document.getElementById('form-btn')
const headerRow = document.getElementById('header-row')
const tableBody = document.getElementById('table-body')

const books = []

const locations = [
  {
    name: 'home',
    title: 'Home',
    button1: 'Books',
    button2: 'Author',
    button3: 'Publishers',
    headerRow: `<th>Sr</th>
                    <th>Book</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Publishing Date</th>`
  },
  {
    name: 'book',
    title: 'Book Management',
    button1: 'Home',
    button2: 'Author',
    button3: 'Publishers',
    headerRow: `<th>Sr</th>
                    <th>Book</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Publishing Date</th>
                    <th class="header-button">Edit</th>
  <th class="header-button">Delete</th>`
  }
]

const update = location => {
  title.innerText = location.title
  button1.innerText = location.button1
  button2.innerText = location.button2
  button3.innerText = location.button3
  headerRow.innerHTML = location.headerRow
}

const addBook = (name, author, publisher, date) => {
  const obj = {
    name: `${name}`,
    author: `${author}`,
    publisher: `${publisher}`,
    date: `${date}`
  }
  books.push(obj)
  console.log(books)
}

const displayBooks = books => {
  tableBody.innerHTML = ''
  for (let i = 0; i < books.length; i++) {
    console.log('Its Working')
    const { name, author, publisher, date } = books[i]
    tableBody.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${name}</td>
        <td>${author}</td>
        <td>${publisher}</td>
        <td>${date}</td>
        <td>
        <button class="row-button">Edit</button>
        </td>
        <td>
        <button class="row-button">Delete</button></td>
        </tr>`
  }
}

const clearInput = () => {
  nameInput.value = ''
  authorInput.value = ''
  publisherInput.value = ''
  dateInput.value = ''
}

button1.addEventListener('click', () => {
  update(locations[1])
  bookForm.style.display = 'block'
  bookForm.addEventListener('submit', e => {
    e.preventDefault()
    addBook(
      nameInput.value,
      authorInput.value,
      publisherInput.value,
      dateInput.value
    )
    displayBooks(books)
    clearInput()
  })
  button1.addEventListener('click', () => {
    bookForm.style.display = "none"
    update(locations[0])
    displayBooks(books);
  })
})
