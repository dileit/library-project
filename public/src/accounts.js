// Helper function - account id
function getAcctId(account) {
	return account.id;
}

// FindAccountById!
function findAccountById(accounts, id) {
	// loop the array to find the id that matches -find()
	return accounts.find((acct) => acct.id === id);
	// returns account obj with matching ID
}

function sortAccountsByLastName(accounts) {
	const sortedAccts = accounts.sort((acctA, acctB) =>
		acctA.name.last > acctB.name.last ? 1 : -1
	);
	// returns a sorted array of objects - alphabetically by last name
	return sortedAccts;
}

function getTotalNumberOfBorrows(account, books) {
	// account obj - get the id string
	const acctId = getAcctId(account);

	// loop borrows array inside each book in the books array
	const borrowInfo = books.reduce((acc, book) => {
		return (
			acc +
			book.borrows
				.filter((borrow) => borrow.id === acctId)
				.reduce((accBorrows, borrow) => accBorrows + 1, 0)
		);
	}, 0);

	// books.filter((book) => book.borrows === acctId);
	return borrowInfo;

	// return count = borrowInfo.length;
	// return a number for that
}

function getBooksPossessedByAccount(account, books, authors) {
	// need empty array for this
	// get account id
	const acctId = getAcctId(account); // string value

	// get author id
	// const bookAuthorId = books.autherId; // number value

	// const authId = authors.id; // number value

	// check books array of anything checked out:
	const checkedOutBooks = books.filter((book) =>
		book.borrows.some((borrow) => borrow.id === acctId && !borrow.returned)
	);
	// books - book - borrows - borrow check if ANY  id === acctId && returned === false matches.
	// put this into an array (filter)
	// THEN

	// then loop through checkedOutBooks array - check authorId against authors array - author.id
	// if it matches, add that author as a property of the book object in our checkedOut array
	checkedOutBooks.forEach(
		(book) =>
			(book.author = authors.find((author) => book.authorId === author.id))
	);

	return checkedOutBooks;

	// returns an array of books AND authors that represents all books currently checked out by the given acct
}

module.exports = {
	getAcctId,
	findAccountById,
	sortAccountsByLastName,
	getTotalNumberOfBorrows,
	getBooksPossessedByAccount,
};

// Accounts - Object of OBJECTS
// each Object is a person's account.
// id = string
// They can take out and return books

// Authors - Array of OBJECTS
// represents someone who wrote one or MORE books in
// id = number

// Books - Array of OBJECTS
// id = string
// represents physical book - contains also:
// authorId  matches author
// borrows array list of objs - list of transactions - how many times borrowed
// id for each borrow record amtches with the account ID
