function getTotalBooksCount(books) {
  let accumulator = 0;
  for (let i = 0; i < books.length; i++) {
    accumulator += 1;
  }
  return accumulator;
}

function getTotalAccountsCount(accounts) {
  const accountCount = accounts.reduce((allAccounts, account) => {
    if (account) allAccounts++;
    return allAccounts;
  }, 0);
  return accountCount;
}

function getBooksBorrowedCount(books) {
  const borrowedCount = [];
  books.forEach((book) => {
    book.borrows.filter((borrow) => {
      if (borrow.returned === false) borrowedCount.push(borrow);
    });
  });
  return borrowedCount.length;
}

function getMostCommonGenres(books) {
  const commonGenres = [];
  const countByGenre = {};

  books.forEach((book) => {
    if (countByGenre[book.genre]) {
      countByGenre[book.genre] += 1;
    } else {
      countByGenre[book.genre] = 1;
    }
  });

  for (let genreName in countByGenre) {
    const genreCount = countByGenre[genreName];
    const genreInfo = { name: genreName, count: genreCount };
    commonGenres.push(genreInfo);
  }
  commonGenres.sort((genreA, genreB) => genreB.count - genreA.count);
  return commonGenres.slice(0, 5);
}

function getMostPopularBooks(books) {
  const transformedBooks = books.map((book) => {
    let numberOfBorrows = 0;
    const borrowsList = book.borrows;
    for (let i = 0; i < borrowsList.length; i++) {
      numberOfBorrows += 1;
    }
    return { name: book.title, count: numberOfBorrows };
  });
  transformedBooks.sort((bookA, bookB) => bookB.count - bookA.count);
  return transformedBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const transformedBooks = books.map((book) => {
    let numberOfBorrows = 0;
    const borrowsList = book.borrows;
    let authorName = "";
    const booksAuthor = book.authorId;
    for (let i = 0; i < borrowsList.length; i++) {
      numberOfBorrows += 1;

      authors.map((author) => {
        const firstName = author.name.first;
        const lastName = author.name.last;
        const authorId = author.id;
        if (authorId === booksAuthor) {
          authorName = `${firstName} ${lastName}`;
        }
      });
    }
    return { name: authorName, count: numberOfBorrows };
  });
  transformedBooks.sort((a, b) => b.count - a.count);
  return transformedBooks.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
