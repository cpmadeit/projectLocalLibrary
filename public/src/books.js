function findAuthorById(authors, id) {
  for (let i = 0; i < authors.length; i++) {
    if (authors[i].id === id) {
      return authors[i];
    }
  }
}

function findBookById(books, id) {
  const foundBook = books.find((books) => books.id === id);
  return foundBook;
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = [];
  const returnedBooks = [];
  const allBooks = [borrowedBooks, returnedBooks];

  for (let i = 0; i < books.length; i++) {
    const borrows = books[i].borrows;

    borrows[0].returned
      ? returnedBooks.push(books[i])
      : borrowedBooks.push(books[i]);
  }
  return allBooks;
}

function getBorrowersForBook(book, accounts) {
  const bookBorrows = book.borrows;
  const accountInfo = [];
  let returnedStatus;

  const getAccountInfo = bookBorrows.forEach((borrow) => {
    const borrowsId = borrow.id;
    returnedStatus = borrow.returned;

    for (let i = 0; i < accounts.length; i++) {
      const accountsId = accounts[i].id;

      if (accountsId === borrowsId) {
        accountInfo.push(accounts[i]);
      }
    }
  });

  const accountInfoWithReturnedStatus = accountInfo.map((account) => {
    return { ...account, returned: returnedStatus };
  });
  return accountInfoWithReturnedStatus.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
