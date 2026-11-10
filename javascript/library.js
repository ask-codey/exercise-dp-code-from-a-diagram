// Riverside Library's media classes. Read the ticket in README.md first.
//
// JavaScript has no interfaces, so the Borrowable promise is kept by shape:
// any object with a title and a loanDays() method is Borrowable.

export class Book {
  constructor(title, pages) {
    this.title = title;
    this.pages = pages;
  }

  loanDays() {
    return 14;
  }
}

// The catalog team typed this class in from the diagram, and stopped before its loan days.
export class Audiobook {
  constructor(title, minutes) {
    this.title = title;
    this.minutes = minutes;
  }

  loanDays() {
    return 0; // not written yet
  }
}

// A library member. Written when the library only lent books.
export class Member {
  #books = [];

  constructor(name) {
    this.name = name;
  }

  // The checkout desk calls this with any item. It returns true when the member takes the item home.
  borrow(item) {
    if (item instanceof Book) {
      this.#books.push(item);
      return true;
    }
    return false;
  }

  // The returns desk calls this. It does nothing yet.
  giveBack(item) {
  }

  count() {
    return this.#books.length;
  }
}
