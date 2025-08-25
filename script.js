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

const bookArr = JSON.parse(localStorage.getItem('books')) || []
const authorArr = JSON.parse(localStorage.getItem('authors')) || []
const publisherArr = JSON.parse(localStorage.getItem('publishers')) || []

const home = () => {
  bookForm.style.display = 'none'
  update(locations[0])
  tableBody.innerHTML = ''
  displayHome()
}

const bookManagement = () => {
  bookForm.style.display = 'block'
  update(locations[1])
  tableBody.innerHTML = ''
  displayBookManagement()
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
  tableBody.innerHTML = ''
  displayPublisher()
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
        <td>${date}</td>
        </tr>`
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
        <button class="row-button" onclick = "deleteAndDisplayBook(${i})">Delete</button></td>
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
        <td><button class = "row-button" onclick = "deleteAndDisplayAuthor(${i})">Delete</button></td>
        </tr>`
  }
}

const displayPublisher = () => {
  for (let i = 0; i < publisherArr.length; i++) {
    const { name, nob } = publisherArr[i]
    tableBody.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${name}</td>
        <td>${nob}</td>
        <td><button class = "row-button" onclick = "deleteAndDisplayPublisher(${i})">Delete</button></td>
        </tr>`
  }
}

const addBook = (name, author, publisher, date) => {
  const obj = {
    name: `${name}`,
    author: `${author}`,
    publisher: `${publisher}`,
    date: `${date}`
  }
  bookArr.push(obj)
  localStorage.setItem('books', JSON.stringify(bookArr))
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
  localStorage.setItem('authors', JSON.stringify(authorArr))
}

const addPublisher = (name, bookName) => {
  for (let i = 0; i < publisherArr.length; i++) {
    if (publisherArr[i].name.toLowerCase() === name.toLowerCase()) {
      publisherArr[i].nob++
      publisherArr[i].books.push(bookName)
      return
    }
  }

  const obj = {
    name: `${name}`,
    books: [bookName],
    nob: 1
  }

  publisherArr.push(obj)
  localStorage.setItem('publishers', JSON.stringify(publisherArr))
}

const editBook = id => {
  editDialog.showModal()
  const { name, author, publisher, date } = bookArr[id]
  const authorName = author
  const bookName = name
  const publisherName = publisher
  editName.value = name
  editAuthor.value = author
  editPublisher.value = publisher
  editDate.value = date
  editForm.onsubmit = e => {
    e.preventDefault()
    bookArr[id].name = editName.value
    bookArr[id].author = editAuthor.value
    bookArr[id].publisher = editPublisher.value
    bookArr[id].date = editDate.value

    //Conditions for Author changes
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

    //Conditions for publisher changes
    if (
      publisherName.toLowerCase() !== bookArr[id].publisher.toLowerCase() &&
      bookName.toLowerCase() === bookArr[id].name.toLowerCase()
    ) {
      editedPublisher(publisherName, bookArr[id].publisher, bookName)
    }

    if (
      publisherName.toLowerCase() !== bookArr[id].publisher.toLowerCase() &&
      bookName.toLowerCase() !== bookArr[id].name.toLowerCase()
    ) {
      editedPublisher(
        publisherName,
        bookArr[id].publisher,
        bookName,
        bookArr[id].name
      )
    }

    if (
      publisherName.toLowerCase() === bookArr[id].publisher.toLowerCase() &&
      bookName.toLowerCase() !== bookArr[id].name.toLowerCase()
    ) {
      editedPublisher(publisherName, undefined, bookName, bookArr[id].name)
    }

    localStorage.setItem('books', JSON.stringify(bookArr))
    tableBody.innerHTML = ''
    displayBookManagement()
    editDialog.close()
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
      break
    }
  }

  addAuthor(newAuthor, newBook)
  localStorage.setItem('authors', JSON.stringify(authorArr))
}

const editedPublisher = (
  prePublisher,
  newPublisher = prePublisher,
  bookName,
  newBook = bookName
) => {
  for (let i = 0; i < publisherArr.length; i++) {
    if (publisherArr[i].name === prePublisher) {
      publisherArr[i].nob--
      if (publisherArr[i].nob === 0) {
        deletePublisher(i)
        break
      }
      for (let j = 0; j < publisherArr[i].books.length; j++) {
        if (publisherArr[i].books[j] === bookName) {
          if (j === 0) {
            publisherArr[i].books.shift()
            break
          }
          if (j === publisherArr[i].books.length - 1) {
            publisherArr[i].books.pop()
            break
          }
          for (let k = j; k < publisherArr[i].books.length - 1; k++) {
            publisherArr[i].books[k] = publisherArr[i].books[k + 1]
          }
          publisherArr[i].books.pop()
          break
        }
      }
      break
    }
  }

  addPublisher(newPublisher, newBook)
  localStorage.setItem('publishers', JSON.stringify(publisherArr))
}

const deleteBook = id => {
  if (id === 0) {
    bookArr.shift()
    return
  }

  if (id === bookArr.length - 1) {
    bookArr.pop()
    return
  }

  for (let i = 0; i < bookArr.length; i++) {
    if (i === id) {
      for (let j = i; j < bookArr.length - 1; j++) {
        bookArr[j].name = bookArr[j + 1].name
        bookArr[j].author = bookArr[j + 1].author
        bookArr[j].publisher = bookArr[j + 1].publisher
        bookArr[j].date = bookArr[j + 1].date
      }
      break
    }
  }

  bookArr.pop()
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
      for (let j = i; j < authorArr.length - 1; j++) {
        authorArr[j].name = authorArr[j + 1].name
        authorArr[j].books = authorArr[j + 1].books
        authorArr[j].nob = authorArr[j + 1].nob
      }
      break
    }
  }

  authorArr.pop()
}

const deletePublisher = id => {
  if (id === 0) {
    publisherArr.shift()
    return
  }

  if (id === publisherArr.length - 1) {
    publisherArr.pop()
    return
  }

  for (let i = 0; i < publisherArr.length; i++) {
    if (i === id) {
      for (let j = i; j < publisherArr.length - 1; j++) {
        publisherArr[j].name = publisherArr[j + 1].name
        publisherArr[j].books = publisherArr[j + 1].books
        publisherArr[j].nob = publisherArr[j + 1].nob
      }
      break
    }
  }

  publisherArr.pop()
}

const deleteAndDisplayBook = id => {
  //Deleting corresponding author
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

  //Deleting Corresponding Publisher
  for (let i = 0; i < publisherArr.length; i++) {
    if (bookArr[id].publisher === publisherArr[i].name) {
      publisherArr[i].nob--
      if (publisherArr[i].nob === 0) {
        deletePublisher(i)
        break
      }
      for (let j = 0; j < publisherArr[i].books.length; j++) {
        if (publisherArr[i].books[j] === bookArr[id].name) {
          if (j === 0) {
            publisherArr[i].books.shift()
            break
          }
          if (j === authorArr[i].books.length - 1) {
            publisherArr[i].books.pop()
            break
          }
          for (let k = j; k < publisherArr[i].books.length - 1; k++) {
            publisherArr[i].books[k] = publisherArr[i].books[k + 1]
          }
          publisherArr[i].books.pop()
          break
        }
      }
      break
    }
  }

  deleteBook(id)
  localStorage.setItem('books', JSON.stringify(bookArr))
  localStorage.setItem('authors', JSON.stringify(authorArr))
  localStorage.setItem('publishers', JSON.stringify(publisherArr))
  tableBody.innerHTML = ''
  displayBookManagement()
}

const deleteAndDisplayAuthor = id => {
  //Deleting Corresponding Books
  for (let i = 0; i < authorArr[id].books.length; i++) {
    for (let j = 0; j < bookArr.length; j++) {
      if (authorArr[id].books[i] === bookArr[j].name) {
        //Deleting Corresponding Publisher
        for (let k = 0; k < publisherArr.length; k++) {
          if (publisherArr[k].name === bookArr[j].publisher) {
            publisherArr[k].nob--
            if (publisherArr[k].nob === 0) {
              deletePublisher(k)
              break
            }
            for (let l = 0; l < publisherArr[k].books.length; l++) {
              if (publisherArr[k].books[l] === bookArr[j].name) {
                if (l === 0) {
                  publisherArr[k].books.shift()
                  break
                } else if (l === publisherArr[k].books.length - 1) {
                  publisherArr[k].books.pop()
                  break
                } else {
                  for (let m = l; m < publisherArr[k].books.length - 1; m++) {
                    publisherArr[k].books[m] = publisherArr[k].books[m + 1]
                  }
                  publisherArr[k].books.pop()
                  break
                }
              }
            }
          }
        }
        deleteBook(j)
      }
    }
  }
  localStorage.setItem('books', JSON.stringify(bookArr))
  localStorage.setItem('authors', JSON.stringify(authorArr))
  localStorage.setItem('publishers', JSON.stringify(publisherArr))
  deleteAuthor(id)
  tableBody.innerHTML = ''
  displayAuthor()
}

const deleteAndDisplayPublisher = id => {
  //Deleting Corresponding Books
  for (let i = 0; i < publisherArr[id].books.length; i++) {
    for (let j = 0; j < bookArr.length; j++) {
      if (publisherArr[id].books[i] === bookArr[j].name) {
        //Deleting Corresponding Author
        for (let k = 0; k < authorArr.length; k++) {
          if (authorArr[k].name === bookArr[j].author) {
            authorArr[k].nob--
            if (authorArr[k].nob === 0) {
              deleteAuthor(k)
              break
            }
            for (let l = 0; l < authorArr[k].books.length; l++) {
              if (authorArr[k].books[l] === bookArr[j].name) {
                if (l === 0) {
                  authorArr[k].books.shift()
                  break
                } else if (l === authorArr[k].books.length - 1) {
                  authorArr[k].books.pop()
                  break
                } else {
                  for (let m = l; m < authorArr[k].books.length - 1; m++) {
                    authorArr[k].books[m] = authorArr[k].books[m + 1]
                  }
                  authorArr[k].books.pop()
                  break
                }
              }
            }
          }
        }
        deleteBook(j)
      }
    }
  }
  deletePublisher(id)
  localStorage.setItem('books', JSON.stringify(bookArr))
  localStorage.setItem('authors', JSON.stringify(authorArr))
  localStorage.setItem('publishers', JSON.stringify(publisherArr))
  tableBody.innerHTML = ''
  displayPublisher()
}

const clearInput = () => {
  nameInput.value = ''
  authorInput.value = ''
  publisherInput.value = ''
  dateInput.value = ''
}

bookForm.addEventListener('submit', e => {
  e.preventDefault()
  for(let i = 0; i < bookArr.length; i++){
    if(nameInput.value.toLowerCase() === bookArr[i].name.toLowerCase()){
      alert("Book already exists! Please enter a new book")
      clearInput()
      return
    }
  }
  addBook(
    nameInput.value,
    authorInput.value,
    publisherInput.value,
    dateInput.value
  )
  tableBody.innerHTML = ''
  displayBookManagement()
  clearInput()
})

closeDialogBtn.addEventListener('click', () => {
  editDialog.close()
})

//Initialize the buttons

button1.onclick = bookManagement
button2.onclick = authors
button3.onclick = publishers
displayHome()
