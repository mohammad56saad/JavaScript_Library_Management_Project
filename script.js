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

const bookArr = []
const authorArr = []
const publisherArr = []

const home = () => {
  bookForm.style.display = 'none'
  update(locations[0])
  tableBody.innerHTML = ''
  displayHome();
}

const bookManagement = () => {
  bookForm.style.display = 'block'
  update(locations[1])
  tableBody.innerHTML = ''
  displayBookManagement();
}

const authors = () => {
  bookForm.style.display = 'none'
  update(locations[2])
  tableBody.innerHTML = ''
  displayAuthor()
  
}

const publishers = () => {
  bookForm.style.display = 'none'
  update(locations[3])
  tableBody.innerHTML
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
  },
  {
    name: 'publisher',
    title: 'Publishers',
    buttonText: ['home', 'Books', 'Author'],
    buttonFunctions: [home, bookManagement, authors],
    headerRow: `<th>Sr</th>
    <th>Publishers</th>
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

const displayHome = () => {
  for (let i = 0; i < bookArr.length; i++) {
    const { name, author, publisher, date } = bookArr[i]
    tableBody.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${name}</td>
        <td>${author}</td>
        <td>${publisher}</td>
        <td>${date}</td>`
  }
}

const displayBookManagement = () => {
  for (let i = 0; i < bookArr.length; i++) {
    const { name, author, publisher, date } = bookArr[i]
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

const displayAuthor = () => {
  for (let i = 0; i < authorArr.length; i++) {
    const { name, nob } = authorArr[i]
    tableBody.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${name}</td>
        <td>${nob}</td>
        <td><button class = "row-button">Delete</button></td>`
  }
}

const displayPublisher = () => {
  
}

const addBook = (name, author, publisher, date) => {
  const obj = {
    name: `${name}`,
    author: `${author}`,
    publisher: `${publisher}`,
    date: `${date}`
  }
  bookArr.push(obj)
  addAuthor(author, name)
  addPublisher(publisher, name)
}

const addAuthor = (name, bookName) => {
  for (let i = 0; i < authorArr.length; i++) {
    if (authorArr[i].name.toLowerCase() === name.toLowerCase()) {
      authorArr[i].nob++
      authorArr[i].books.push(bookName)
      return
    }
  }

  const obj = {
    name: `${name}`,
    books: [bookName],
    nob: 1
  }

  authorArr.push(obj)
}

const addPublisher = (name, bookName) => {
  for(let i = 0; i < publisherArr.length; i++){
    if(publisherArr[i].name.toLowerCase() === name.toLowerCase()){
      publisherArr[i].nob++;
      publisherArr[i].books.push(bookName)
      return
    }
  }

  const obj = {
    name: `${name}`,
    books: [bookName],
    nob: 1,
  }

  publisherArr.push(obj)
}


const editBook = id => {
  editDialog.showModal()
  const { name, author, publisher, date } = bookArr[id]
  const authorName = author
  const bookName = name
  editName.value = name
  editAuthor.value = author
  editPublisher.value = publisher
  editDate.value = date
  editForm.onsubmit = () => {
    bookArr[id].name = editName.value
    bookArr[id].author = editAuthor.value
    bookArr[id].publisher = editPublisher.value
    bookArr[id].date = editDate.value

    if (
      authorName.toLowerCase() !== bookArr[id].author.toLowerCase() &&
      bookName.toLowerCase() === bookArr[id].name.toLowerCase()
    ) {
      editedAuthor(authorName, bookArr[id].author, bookName)
    }

    if (
      authorName.toLowerCase() !== bookArr[id].author.toLowerCase() &&
      bookName.toLowerCase() !== bookArr[id].name.toLowerCase()
    ) {
      editedAuthor(authorName, bookArr[id].author, bookName, bookArr[id].name)
    }

    if (
      authorName.toLowerCase() === bookArr[id].author.toLowerCase() &&
      bookName.toLowerCase() !== bookArr[id].name.toLowerCase()
    ) {
      editedAuthor(authorName, undefined, bookName, bookArr[id].name)
    }
    console.log(authorArr)

    tableBody.innerHTML = ''
    for (let i = 0; i < bookArr.length; i++) {
      const { name, author, publisher, date } = bookArr[i]
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
    editDialog.close()
  }
}

const deleteBook = id => {
  if (id === 0) {
    for (let i = 0; i < authorArr.length; i++) {
      if (bookArr[id].author === authorArr[i].name) {
        authorArr[i].nob--
        if (authorArr[i].nob === 0) {
          deleteAuthor(i)
          break
        }
        for (let j = 0; j < authorArr[i].books.length; j++) {
          if (authorArr[i].books[j] === bookArr[id].name) {
            if (j === 0) {
              authorArr[i].books.shift()
              break
            }
            if (j === authorArr[i].books.length - 1) {
              authorArr[i].books.pop()
              break
            }
            for (let k = j; k < authorArr[i].books.length - 1; k++) {
              authorArr[i].books[k] = authorArr[i].books[k + 1]
            }
            authorArr[i].books.pop()
            break
          }
        }
        break
      }
    }
    bookArr.shift()
    console.log(authorArr)
    tableBody.innerHTML = ''
    for (let i = 0; i < bookArr.length; i++) {
      const { name, author, publisher, date } = bookArr[i]
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
    return
  }

  if (id === bookArr.length - 1) {
    for (let i = 0; i < authorArr.length; i++) {
      if (bookArr[id].author === authorArr[i].name) {
        authorArr[i].nob--
        if (authorArr[i].nob === 0) {
          deleteAuthor(i)
        }
        for (let j = 0; j < authorArr[i].books.length; j++) {
          if (authorArr[i].books[j] === bookArr[id].name) {
            if (j === 0) {
              authorArr[i].books.shift()
              break
            }
            if (j === authorArr[i].books.length - 1) {
              authorArr[i].books.pop()
              break
            }
            for (let k = j; k < authorArr[i].books.length - 1; k++) {
              authorArr[i].books[k] = authorArr[i].books[k + 1]
            }
            authorArr[i].books.pop()
            break
          }
        }
        break
      }
    }
    console.log(authorArr)
    bookArr.pop()
    tableBody.innerHTML = ''
    for (let i = 0; i < bookArr.length; i++) {
      const { name, author, publisher, date } = bookArr[i]
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
    return
  }

  for (let i = 0; i < authorArr.length; i++) {
    if (bookArr[id].author === authorArr[i].name) {
      authorArr[i].nob--
      if (authorArr[i].nob === 0) {
        deleteAuthor(i)
      }
      for(let j = 0; j < authorArr[i].books.length; j++){
        if(authorArr[i].books[j] === bookArr[id].name){
          if(j === 0){
            authorArr[i].books.shift();
            break
          }
          if(j === authorArr[i].books.length - 1){
            authorArr[i].books.pop();
            break
          }
          for(let k = j; k < authorArr[i].books.length - 1; k++){
            authorArr[i].books[k] = authorArr[i].books[k+1]
          }
          authorArr[i].books.pop();
          break
        }
      }
      break
    }
  }
  console.log(authorArr)
  for (let i = 0; i < bookArr.length; i++) {
    if (i === id) {
      for (let j = i; j < bookArr.length - 1; j++) {
        bookArr[j].name = bookArr[j + 1].name
        bookArr[j].author = bookArr[j + 1].author
        bookArr[j].publisher = bookArr[j + 1].publisher
        bookArr[j].date = bookArr[j + 1].date
      }
    }
  }

  bookArr.pop()

  tableBody.innerHTML = ''
  for (let i = 0; i < bookArr.length; i++) {
    const { name, author, publisher, date } = bookArr[i]
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













const editedAuthor = (
  preAuthor,
  newAuthor = preAuthor,
  bookName,
  newBook = bookName
) => {
  for (let i = 0; i < authorArr.length; i++) {
    if (authorArr[i].name === preAuthor) {
      authorArr[i].nob--
      if (authorArr[i].nob === 0) {
        deleteAuthor(i)
        break
      }
      for (let j = 0; j < authorArr[i].books.length; j++) {
        if (authorArr[i].books[j] === bookName) {
          if (j === 0) {
            authorArr[i].books.shift()
            break
          }
          if (j === authorArr[i].books.length - 1) {
            authorArr[i].books.pop()
            break
          }
          for (let k = j; k < authorArr[i].books.length - 1; k++) {
            authorArr[i].books[k] = authorArr[i].books[k + 1]
          }
          authorArr[i].books.pop()
          break
        }
      }
    }
  }

  addAuthor(newAuthor, newBook)
}

const deleteAndDisplayAuthor = (id) => {
  for(let i = 0; i < authorArr[id].books.length; i++){
    for(let j = 0; j < bookArr.length; j++){
      if(bookArr[j].name === authorArr[id].books[i]){
        deleteBook(i);
      }
    }
  }
  deleteAuthor(id);
}

const deleteAuthor = id => {
  if (id === 0) {
    authorArr.shift()
    return
  }

  if (id === authorArr.length - 1) {
    authorArr.pop()
    return
  }

  for (let i = 0; i < authorArr.length; i++) {
    if (i === id) {
      for (let j = i; j < authorArr.length; j++) {
        authorArr[j].name = authorArr[j + 1].name
        authorArr[j].nob = authorArr[j + 1].nob
      }
    }
  }

  authorArr.pop()
  
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
  displayBookManagement();
  clearInput()
})

closeDialogBtn.addEventListener('click', () => {
  editDialog.close()
})

//Initialize the buttons

button1.onclick = bookManagement
button2.onclick = authors
button3.onclick = publishers
displayHome();