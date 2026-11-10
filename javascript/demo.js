// A demo: tries your code on one member's visit. You don't need to change it.
import { Audiobook, Book, Member } from "./library.js";

const yesNo = (answer) => (answer ? "yes" : "no");

const book = new Book("The Lighthouse Keeper", 320);
const audiobook = new Audiobook("Rivers of Glass", 540);
console.log(`${book.title}: ${book.loanDays()} days`);
console.log(`${audiobook.title}: ${audiobook.loanDays()} days`);

const maya = new Member("Maya");
console.log(`Maya borrows 2 items: ${yesNo(maya.borrow(book))}, ${yesNo(maya.borrow(audiobook))}`);
const more = [new Book("A Map of Small Things", 210), new Book("Lanterns on the Pier", 180), new Book("The Orchard in Winter", 260)];
console.log("Then 3 more: " + more.map((item) => yesNo(maya.borrow(item))).join(", "));
const sixth = new Book("Paper Boats", 96);
console.log(`And a sixth: ${yesNo(maya.borrow(sixth))}`);
maya.giveBack(book);
console.log(`After giving one back: ${yesNo(maya.borrow(sixth))}`);
