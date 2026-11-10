import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import org.junit.jupiter.api.Test;

// The tests for your code. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.
class LibraryTest {
    private static Book lighthouse() {
        return new Book("The Lighthouse Keeper", 320);
    }

    private static Audiobook rivers() {
        return new Audiobook("Rivers of Glass", 540);
    }

    private static List<Book> fiveBooks() {
        return List.of("A Map of Small Things", "Lanterns on the Pier", "The Orchard in Winter", "Paper Boats", "The Lighthouse Keeper")
            .stream().map(title -> new Book(title, 200)).toList();
    }

    // What the code does today. These pass before you change anything: keep them passing.

    @Test
    void aBookKeepsItsTitleAndPages() {
        Book book = lighthouse();
        assertEquals(List.of("The Lighthouse Keeper", 320), List.of(book.title(), book.pages()),
            "Keep this working: a Book made with \"The Lighthouse Keeper\" and 320 keeps that title and 320 pages.");
    }

    @Test
    void aBookIsLentFor14Days() {
        assertEquals(14, lighthouse().loanDays(), "Keep this working: a book is lent for 14 days.");
    }

    @Test
    void anAudiobookKeepsItsTitleAndMinutes() {
        Audiobook audiobook = rivers();
        assertEquals(List.of("Rivers of Glass", 540), List.of(audiobook.title(), audiobook.minutes()),
            "Keep this working: an Audiobook made with \"Rivers of Glass\" and 540 keeps that title and 540 minutes.");
    }

    @Test
    void booksAndAudiobooksKeepTheBorrowablePromise() {
        assertTrue(Borrowable.class.isAssignableFrom(Book.class) && Borrowable.class.isAssignableFrom(Audiobook.class),
            "Keep this working: the diagram's dashed arrows say Book and Audiobook both keep the Borrowable promise.");
    }

    @Test
    void aMemberCanBorrowABook() {
        Member maya = new Member("Maya");
        assertTrue(maya.borrow(lighthouse()), "Keep this working: Maya can borrow a book.");
        assertEquals(1, maya.count(), "Keep this working: after borrowing one book, Maya has 1 item.");
    }

    // The ticket's work: the diagram's rules that the code doesn't keep yet. These fail until the work is done.

    @Test
    void anAudiobookIsLentFor7Days() {
        assertEquals(7, rivers().loanDays(), "Not yet: an audiobook is lent for 7 days.");
    }

    @Test
    void aMemberCanBorrowAnAudiobookToo() {
        Member maya = new Member("Maya");
        List<Boolean> took = List.of(maya.borrow(lighthouse()), maya.borrow(rivers()));
        assertEquals(List.of(true, true), took,
            "Not yet: the diagram's line goes from Member to Borrowable, so Maya can borrow an audiobook as well as a book.");
        assertEquals(2, maya.count(), "Not yet: after a book and an audiobook, Maya has 2 items.");
    }

    @Test
    void aMemberHoldsAtMostFiveItems() {
        Member sam = new Member("Sam");
        for (Book book : fiveBooks()) {
            sam.borrow(book);
        }
        assertFalse(sam.borrow(new Book("The Quiet Harbor", 150)), "Not yet: the diagram says 0..5, so Sam's sixth item is refused.");
        assertEquals(5, sam.count(), "Not yet: after five items and a refused sixth, Sam still has 5.");
    }

    @Test
    void givingAnItemBackMakesRoom() {
        Member sam = new Member("Sam");
        List<Book> books = fiveBooks();
        for (Book book : books) {
            sam.borrow(book);
        }
        sam.giveBack(books.get(0));
        assertEquals(4, sam.count(), "Not yet: after giving one of five items back, Sam has 4.");
        assertTrue(sam.borrow(rivers()), "Not yet: with a place free again, Sam can borrow an audiobook.");
        assertEquals(5, sam.count(), "Not yet: after borrowing again, Sam has 5 items.");
    }
}
