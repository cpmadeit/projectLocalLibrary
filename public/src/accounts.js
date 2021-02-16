function findAccountById(accounts, id) {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].id === id) {
      return accounts[i];
    }
  }
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let borrowCount = 0;
  const accountId = account.id;

  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (accountId === borrow.id) {
        borrowCount += 1;
      }
    });
  });
  return borrowCount;
}

function findAuthor(book, authors) {
  const booksAuthorId = book.authorId;
  return authors.find((author) => {
    const authorId = author.id;
    return authorId === booksAuthorId;
  });
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = [];
  const accountId = account.id;
  let bookBorrows;

  books.forEach((book) => {
    bookBorrows = book.borrows;

    bookBorrows.forEach((borrow) => {
      const borrowerId = borrow.id;
      const borrowedStatus = borrow.returned;

      if (borrowerId === accountId && !borrowedStatus) {
        borrowedBooks.push(book);
      }
    });
  });

  return borrowedBooks.map((book) => {
    return { ...book, author: findAuthor(book, authors) };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
