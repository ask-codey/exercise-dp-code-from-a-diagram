using LibraryMedia;

// A demo: tries your code on one member's visit. You don't need to change it.
string YesNo(bool answer) => answer ? "yes" : "no";

Book book = new Book("The Lighthouse Keeper", 320);
Audiobook audiobook = new Audiobook("Rivers of Glass", 540);
Console.WriteLine($"{book.Title}: {book.LoanDays()} days");
Console.WriteLine($"{audiobook.Title}: {audiobook.LoanDays()} days");

Member maya = new Member("Maya");
Console.WriteLine($"Maya borrows 2 items: {YesNo(maya.Borrow(book))}, {YesNo(maya.Borrow(audiobook))}");
List<Book> more = new List<Book> { new Book("A Map of Small Things", 210), new Book("Lanterns on the Pier", 180), new Book("The Orchard in Winter", 260) };
Console.WriteLine("Then 3 more: " + string.Join(", ", more.Select(item => YesNo(maya.Borrow(item)))));
Book sixth = new Book("Paper Boats", 96);
Console.WriteLine($"And a sixth: {YesNo(maya.Borrow(sixth))}");
maya.GiveBack(book);
Console.WriteLine($"After giving one back: {YesNo(maya.Borrow(sixth))}");
