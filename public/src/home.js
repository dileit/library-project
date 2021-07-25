let booksF = require("./books");

function getTotalBooksCount(books) {
	return books.length;
	// returns a number that represents number of book objs inside of the array
}

function getTotalAccountsCount(accounts) {
	return accounts.length;
	// returns a number of all account objs
}

function getBooksBorrowedCount(books) {
	const checkedOut = booksF.sortBooksCheckedOut(books);
	return checkedOut.length;
	// returns a number that - number of books currently checked out of library
}

function getMostCommonGenres(books) {
	// empty array
	let result = [];

	// reduce the genres from our books array (no need to map)
	const acc = books.reduce((acc, book) => {
		if (acc[book.genre]) {
			acc[book.genre] = acc[book.genre] + 1;
		} else {
			// if key does NOT exist assign value of 1
			acc[book.genre] = 1;
		}
		return acc;
	}, {});

	// THEN FOR IN LOOP
	for (let key in acc) {
		const tempObj = { name: key, count: acc[key] };
		result.push(tempObj);
	}

	return result.sort((a, b) => b.count - a.count).slice(0, 5);
}

function getMostPopularBooks(books) {
	// get clear book data
	const borrows = books.map((book) => ({
		name: book.title,
		count: book.borrows.length,
	}));
	// sort by borrow count, descending
	borrows.sort((a, b) => b.count - a.count);
	// returns an array 5 objects or fewer that represents the most popular books in library
	return borrows.slice(0, 5);
}

// function getMostPopularAuthors(books, authors) {}
function getMostPopularAuthors(books, authors) {
	return authors
		.map((author) => {
			// loop through the author array
			author.count = books
				.filter((book) => book.authorId === author.id)
				.reduce(
					(acc, item) => acc + ((item.borrows && item.borrows.length) || 0),
					0
				);
			// to get the count, filter the book array and then reduce it to a sum of all matching books borrows array length
			author.name = `${author.name.first} ${author.name.last}`;
			delete author.id;
			// remove the id since that isn't part of the desired result
			return author;
		})
		.sort((a, b) => b.count - a.count)
		.slice(0, 5);
	// sort the end result to be biggest counts first, then slice the array down to the desired length
}

// [
// 	{ name: "Cristina Buchanan", count: 112 },
// 	{ name: "Tami Hurst", count: 83 },
// 	{ name: "Chrystal Lester", count: 80 },
// 	...
// ]

module.exports = {
	getTotalBooksCount,
	getTotalAccountsCount,
	getBooksBorrowedCount,
	getMostCommonGenres,
	getMostPopularBooks,
	getMostPopularAuthors,
};
