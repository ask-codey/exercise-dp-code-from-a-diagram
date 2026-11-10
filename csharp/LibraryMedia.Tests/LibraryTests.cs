using LibraryMedia;

namespace LibraryMedia.Tests;

// The tests for your code. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.

[TestClass]
public class LibraryTests
{
    private static Book Lighthouse() => new Book("The Lighthouse Keeper", 320);

    private static Audiobook Rivers() => new Audiobook("Rivers of Glass", 540);

    private static List<Book> FiveBooks() =>
        new List<string> { "A Map of Small Things", "Lanterns on the Pier", "The Orchard in Winter", "Paper Boats", "The Lighthouse Keeper" }
            .Select(title => new Book(title, 200)).ToList();

    // What the code does today. These pass before you change anything: keep them passing.

    [TestMethod]
    public void ABookKeepsItsTitleAndPages()
    {
        Book book = Lighthouse();
        Assert.AreEqual(("The Lighthouse Keeper", 320), (book.Title, book.Pages),
            "Keep this working: a Book made with \"The Lighthouse Keeper\" and 320 keeps that title and 320 pages.");
    }

    [TestMethod]
    public void ABookIsLentFor14Days()
    {
        Assert.AreEqual(14, Lighthouse().LoanDays(), "Keep this working: a book is lent for 14 days.");
    }

    [TestMethod]
    public void AnAudiobookKeepsItsTitleAndMinutes()
    {
        Audiobook audiobook = Rivers();
        Assert.AreEqual(("Rivers of Glass", 540), (audiobook.Title, audiobook.Minutes),
            "Keep this working: an Audiobook made with \"Rivers of Glass\" and 540 keeps that title and 540 minutes.");
    }

    [TestMethod]
    public void BooksAndAudiobooksKeepTheBorrowablePromise()
    {
        Assert.IsTrue(typeof(IBorrowable).IsAssignableFrom(typeof(Book)) && typeof(IBorrowable).IsAssignableFrom(typeof(Audiobook)),
            "Keep this working: the diagram's dashed arrows say Book and Audiobook both keep the Borrowable promise.");
    }

    [TestMethod]
    public void AMemberCanBorrowABook()
    {
        Member maya = new Member("Maya");
        Assert.IsTrue(maya.Borrow(Lighthouse()), "Keep this working: Maya can borrow a book.");
        Assert.AreEqual(1, maya.Count(), "Keep this working: after borrowing one book, Maya has 1 item.");
    }

    // The ticket's work: the diagram's rules that the code doesn't keep yet. These fail until the work is done.

    [TestMethod]
    public void AnAudiobookIsLentFor7Days()
    {
        Assert.AreEqual(7, Rivers().LoanDays(), "Not yet: an audiobook is lent for 7 days.");
    }

    [TestMethod]
    public void AMemberCanBorrowAnAudiobookToo()
    {
        Member maya = new Member("Maya");
        List<bool> took = new List<bool> { maya.Borrow(Lighthouse()), maya.Borrow(Rivers()) };
        CollectionAssert.AreEqual(new List<bool> { true, true }, took,
            "Not yet: the diagram's line goes from Member to Borrowable, so Maya can borrow an audiobook as well as a book.");
        Assert.AreEqual(2, maya.Count(), "Not yet: after a book and an audiobook, Maya has 2 items.");
    }

    [TestMethod]
    public void AMemberHoldsAtMostFiveItems()
    {
        Member sam = new Member("Sam");
        foreach (Book book in FiveBooks())
        {
            sam.Borrow(book);
        }
        Assert.IsFalse(sam.Borrow(new Book("The Quiet Harbor", 150)), "Not yet: the diagram says 0..5, so Sam's sixth item is refused.");
        Assert.AreEqual(5, sam.Count(), "Not yet: after five items and a refused sixth, Sam still has 5.");
    }

    [TestMethod]
    public void GivingAnItemBackMakesRoom()
    {
        Member sam = new Member("Sam");
        List<Book> books = FiveBooks();
        foreach (Book book in books)
        {
            sam.Borrow(book);
        }
        sam.GiveBack(books[0]);
        Assert.AreEqual(4, sam.Count(), "Not yet: after giving one of five items back, Sam has 4.");
        Assert.IsTrue(sam.Borrow(Rivers()), "Not yet: with a place free again, Sam can borrow an audiobook.");
        Assert.AreEqual(5, sam.Count(), "Not yet: after borrowing again, Sam has 5 items.");
    }
}
