function sortBooksCheckedOut(books) {
	return books.filter((book) =>
		book.borrows.some((borrow) => !borrow.returned)
	);
}

function findAuthorById(authors, id) {
	// find()
	return authors.find((author) => author.id === id);
	// returns the auhtor object with a matching ID
}

function findBookById(books, id) {
	return books.find((book) => book.id === id);
	// returns book object with matching ID
}

function partitionBooksByBorrowedStatus(books) {
	const sortBooksOut = sortBooksCheckedOut(books);
	const sortBooksIn = books.filter((book) =>
		book.borrows.every((borrow) => borrow.returned)
	);

	// returns an array
	// with 2 arrays inside of it
	// all books included

	// first array = BOOKS !returned
	// some() of the borrows (ANY of them !returned)
	//2nd array = BOOKS returned
	// every() of the borrows returned
	// use spread to combine
	return [sortBooksOut, sortBooksIn];
}

function getBorrowersForBook({ borrows }, accounts) {
	// take borrows of that book obj
	const borrowers = borrows.map(({ id, returned }) => {
		// match the id to acctId (loop accounts array) find()
		const account = accounts.find((account) => account.id === id);
		// returns an array - all transations from borrows key
		// EACH should include related acct info + returned key
		return { ...account, returned };
	});
}

module.exports = {
	sortBooksCheckedOut,
	findAuthorById,
	findBookById,
	partitionBooksByBorrowedStatus,
	getBorrowersForBook,
};

// function partitionBooksByBorrowedStatus(books) {
//   // returns an array
//   // with 2 arrays inside of it
//   // all of the inputted books are present in either the first or second array
//   // first array = books that have been checked out and not yet returned
//   // some() of the borrows (ANY of them !returned)
//   //2nd array = books that have been returned
//   // every() of the borrows returned
// }

// function getBorrowersForBook({borrows}, accounts) {
//   // const [id, returned] = borrows;

//   const borrowers = borrows.map(({id, returned}) => {accounts.find(account => account.id === id); return {...account, returned};});

//   return borrowers.slice(0, 10);

//   // take borrows of that book obj
//   // match the id to acctId (loop accounts array) find()
//   // then make a new array with matching account obj
//   // adding returned key to it.

//   // returns an array - all transations from borrows key
//   // EACH should include related acct info + returned key
//
