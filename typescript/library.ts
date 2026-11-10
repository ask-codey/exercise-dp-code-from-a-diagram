// Riverside Library's media classes. Read the ticket in README.md first.

// The promise every item the library lends keeps: a title, and how many days it goes out for.
export interface Borrowable {
  title: string;
  loanDays(): number;
}

export class Book implements Borrowable {
  title: string;
  pages: number;

  constructor(title: string, pages: number) {
    this.title = title;
    this.pages = pages;
  }

  loanDays(): number {
    return 14;
  }
}

// The catalog team typed this class in from the diagram, and stopped before its loan days.
export class Audiobook implements Borrowable {
  title: string;
  minutes: number;

  constructor(title: string, minutes: number) {
    this.title = title;
    this.minutes = minutes;
  }

  loanDays(): number {
    return 0; // not written yet
  }
}

// A library member. Written when the library only lent books.
export class Member {
  name: string;
  private books: Book[] = [];

  constructor(name: string) {
    this.name = name;
  }

  // The checkout desk calls this with any item. It returns true when the member takes the item home.
  borrow(item: Borrowable): boolean {
    if (item instanceof Book) {
      this.books.push(item);
      return true;
    }
    return false;
  }

  // The returns desk calls this. It does nothing yet.
  giveBack(item: Borrowable): void {
  }

  count(): number {
    return this.books.length;
  }
}
