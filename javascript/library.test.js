// The tests for your code. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.
import assert from "node:assert/strict";
import { test } from "node:test";
import { Audiobook, Book, Member } from "./library.js";

const lighthouse = () => new Book("The Lighthouse Keeper", 320);
const rivers = () => new Audiobook("Rivers of Glass", 540);
const fiveBooks = () => ["A Map of Small Things", "Lanterns on the Pier", "The Orchard in Winter", "Paper Boats", "The Lighthouse Keeper"]
  .map((title) => new Book(title, 200));

// Keeps the Borrowable promise: has a title, and a loanDays() method.
const isBorrowable = (item) => typeof item.title === "string" && typeof item.loanDays === "function";

// What the code does today. These pass before you change anything: keep them passing.

test("a book keeps its title and pages", () => {
  const book = lighthouse();
  assert.deepEqual([book.title, book.pages], ["The Lighthouse Keeper", 320],
    'Keep this working: a Book made with "The Lighthouse Keeper" and 320 keeps that title and 320 pages.');
});

test("a book is lent for 14 days", () => {
  assert.equal(lighthouse().loanDays(), 14, "Keep this working: a book is lent for 14 days.");
});

test("an audiobook keeps its title and minutes", () => {
  const audiobook = rivers();
  assert.deepEqual([audiobook.title, audiobook.minutes], ["Rivers of Glass", 540],
    'Keep this working: an Audiobook made with "Rivers of Glass" and 540 keeps that title and 540 minutes.');
});

test("books and audiobooks keep the Borrowable promise", () => {
  assert.ok(isBorrowable(lighthouse()) && isBorrowable(rivers()),
    "Keep this working: the diagram's dashed arrows say Book and Audiobook both keep the Borrowable promise.");
});

test("a member can borrow a book", () => {
  const maya = new Member("Maya");
  assert.equal(maya.borrow(lighthouse()), true, "Keep this working: Maya can borrow a book.");
  assert.equal(maya.count(), 1, "Keep this working: after borrowing one book, Maya has 1 item.");
});

// The ticket's work: the diagram's rules that the code doesn't keep yet. These fail until the work is done.

test("an audiobook is lent for 7 days", () => {
  assert.equal(rivers().loanDays(), 7, "Not yet: an audiobook is lent for 7 days.");
});

test("a member can borrow an audiobook too", () => {
  const maya = new Member("Maya");
  const took = [maya.borrow(lighthouse()), maya.borrow(rivers())];
  assert.deepEqual(took, [true, true],
    "Not yet: the diagram's line goes from Member to Borrowable, so Maya can borrow an audiobook as well as a book.");
  assert.equal(maya.count(), 2, "Not yet: after a book and an audiobook, Maya has 2 items.");
});

test("a member holds at most five items", () => {
  const sam = new Member("Sam");
  for (const book of fiveBooks()) {
    sam.borrow(book);
  }
  assert.equal(sam.borrow(new Book("The Quiet Harbor", 150)), false, "Not yet: the diagram says 0..5, so Sam's sixth item is refused.");
  assert.equal(sam.count(), 5, "Not yet: after five items and a refused sixth, Sam still has 5.");
});

test("giving an item back makes room", () => {
  const sam = new Member("Sam");
  const books = fiveBooks();
  for (const book of books) {
    sam.borrow(book);
  }
  sam.giveBack(books[0]);
  assert.equal(sam.count(), 4, "Not yet: after giving one of five items back, Sam has 4.");
  assert.equal(sam.borrow(rivers()), true, "Not yet: with a place free again, Sam can borrow an audiobook.");
  assert.equal(sam.count(), 5, "Not yet: after borrowing again, Sam has 5 items.");
});
