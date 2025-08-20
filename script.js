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
const editDialog = document.getElementById('edit-dialog')
const closeDialogBtn = document.getElementById('close-dialog')
const editForm = document.getElementById('edit-form')
const editName = document.getElementById('edit-name')
const editAuthor = document.getElementById('edit-author')
const editPublisher = document.getElementById('edit-publisher')
const editDate = document.getElementById('edit-date')

const books = [];
const authorArr = [];

const editBook = id => {
  editDialog.showModal()
  console.log(books[id])
  const { name, author, publisher, date } = books[id]
  editName.value = name
  editAuthor.value = author
  editPublisher.value = publisher
  editDate.value = date
  editForm.onsubmit = () => {
    books[id].name = editName.value
    books[id].author = editAuthor.value
    books[id].publisher = editPublisher.value
    books[id].date = editDate.value
    tableBody.innerHTML = ''
  for (let i = 0; i < books.length; i++) {
    const { name, author, publisher, date } = books[i]
    tableBody.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${name}</td>
        <td>${author}</td>
        <td>${publisher}</td>
        <td>${date}</td>
        <td>
        <button class="row-button" onclick= "editBook(${i})">Edit</button>
        </td>
        <td>
        <button class="row-button" onclick = "deleteBook(${i})">Delete</button></td>
        </tr>`
  }
  editDialog.close();
  }
}

const deleteBook = (id) => {
  if(id === 0){
    books.shift();
    tableBody.innerHTML = ''
  for (let i = 0; i < books.length; i++) {
    const { name, author, publisher, date } = books[i]
    tableBody.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${name}</td>
        <td>${author}</td>
        <td>${publisher}</td>
        <td>${date}</td>
        <td>
        <button class="row-button" onclick= "editBook(${i})">Edit</button>
        </td>
        <td>
        <button class="row-button" onclick = "deleteBook(${i})">Delete</button></td>
        </tr>`
    return
  }
  }

  if(id === books.length - 1){
    books.pop();
    tableBody.innerHTML = ''
  for (let i = 0; i < books.length; i++) {
    const { name, author, publisher, date } = books[i]
    tableBody.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${name}</td>
        <td>${author}</td>
        <td>${publisher}</td>
        <td>${date}</td>
        <td>
        <button class="row-button" onclick= "editBook(${i})">Edit</button>
        </td>
        <td>
        <button class="row-button" onclick = "deleteBook(${i})">Delete</button></td>
        </tr>`
    return
  }
  }

  for(let i = 0; i < books.length; i++){
    if(i === id){
      for(let j = i; j < books.length - 1; j++){
        books[j].name = books[j+1].name
        books[j].author = books[j+1].author
        books[j].publisher = books[j+1].publisher
        books[j].date = books[j+1].date
      }
    }
  }

  books.pop();

  tableBody.innerHTML = ''
  for (let i = 0; i < books.length; i++) {
    const { name, author, publisher, date } = books[i]
    tableBody.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${name}</td>
        <td>${author}</td>
        <td>${publisher}</td>
        <td>${date}</td>
        <td>
        <button class="row-button" onclick= "editBook(${i})">Edit</button>
        </td>
        <td>
        <button class="row-button" onclick = "deleteBook(${i})">Delete</button></td>
        </tr>`

}
}

const bookManagement = () => {
  bookForm.style.display = 'block'
  update(locations[1])
  tableBody.innerHTML = ''
  for (let i = 0; i < books.length; i++) {
    const { name, author, publisher, date } = books[i]
    tableBody.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${name}</td>
        <td>${author}</td>
        <td>${publisher}</td>
        <td>${date}</td>
        <td>
        <button class="row-button" onclick= "editBook(${i})">Edit</button>
        </td>
        <td>
        <button class="row-button" onclick = "deleteBook(${i})">Delete</button></td>
        </tr>`
  }
}

const authors = () => {
  bookForm.style.display = 'none'
  update(locations[2]);
  tableBody.innerHTML = ''
  for (let i = 0; i < authorArr.length; i++) {
    const { name, nob } = authorArr[i]
    tableBody.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${name}</td>
        <td>${nob}</td>
        <td><button>Delete</button></td>`
  }
}

const publishers = () => {
  console.log('publishers')
}

const home = () => {
  bookForm.style.display = 'none'
  update(locations[0])
  tableBody.innerHTML = ''
  for (let i = 0; i < books.length; i++) {
    const { name, author, publisher, date } = books[i]
    tableBody.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${name}</td>
        <td>${author}</td>
        <td>${publisher}</td>
        <td>${date}</td>`
  }
}

const locations = [
  {
    name: 'home',
    title: 'Home',
    buttonText: ['Books', 'Author', 'Publishers'],
    buttonFunctions: [bookManagement, authors, publishers],
    headerRow: `<th>Sr</th>
                    <th>Book</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Publishing Date</th>`
  },
  {
    name: 'book',
    title: 'Book Management',
    buttonText: ['Home', 'Author', 'Publishers'],
    buttonFunctions: [home, authors, publishers],
    headerRow: `<th>Sr</th>
                    <th>Book</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Publishing Date</th>
                    <th class="header-button">Edit</th>
  <th class="header-button">Delete</th>`
  },
  {
    name: 'author',
    title: 'Author',
    buttonText: ['Home', 'Books', 'Publishers'],
    buttonFunctions: [home, bookManagement, publishers],
    headerRow: `<th>Sr</th>
    <th>Author</th>
    <th>Books</th>
    <th>Delete</th>`
  }
]

const update = location => {
  title.innerText = location.title
  button1.innerText = location['buttonText'][0]
  button2.innerText = location['buttonText'][1]
  button3.innerText = location['buttonText'][2]
  headerRow.innerHTML = location.headerRow
  button1.onclick = location['buttonFunctions'][0]
  button2.onclick = location['buttonFunctions'][1]
  button3.onclick = location['buttonFunctions'][2]
}

const addAuthor = (name) => {
  for(let i = 0; i < authorArr.length; i++){
    if(authorArr[i].name.toLowerCase() === name.toLowerCase()){
      authorArr[i].nob++;
      return;
    }
  }

  const obj = {
    name : `${name}`,
    nob: 1
  }

  authorArr.push(obj);
}

const editedAuthor = () => {
  
}

const addBook = (name, author, publisher, date) => {
  const obj = {
    name: `${name}`,
    author: `${author}`,
    publisher: `${publisher}`,
    date: `${date}`
  }
  addAuthor(author);
  console.log(authorArr);
  books.push(obj)
}

const clearInput = () => {
  nameInput.value = ''
  authorInput.value = ''
  publisherInput.value = ''
  dateInput.value = ''
}

bookForm.addEventListener('submit', e => {
  e.preventDefault()
  addBook(
    nameInput.value,
    authorInput.value,
    publisherInput.value,
    dateInput.value
  )
  tableBody.innerHTML = ''
  for (let i = 0; i < books.length; i++) {
    const { name, author, publisher, date } = books[i]
    tableBody.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${name}</td>
        <td>${author}</td>
        <td>${publisher}</td>
        <td>${date}</td>
        <td>
        <button class="row-button" onclick= "editBook(${i})">Edit</button>
        </td>
        <td>
        <button class="row-button" onclick= "deleteBook(${i})">Delete</button></td>
        </tr>`
  }
  clearInput()
})

closeDialogBtn.addEventListener('click', () => {
  editDialog.close()
})

//Initialize the buttons

button1.onclick = bookManagement
button2.onclick = authors
button3.onclick = publishers

