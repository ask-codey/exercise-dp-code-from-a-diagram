import java.util.ArrayList;
import java.util.List;

// A library member. Written when the library only lent books.
public class Member {
    private final String name;
    private final List<Book> books = new ArrayList<>();

    public Member(String name) {
        this.name = name;
    }

    public String name() { return name; }

    // The checkout desk calls this with any item. It returns true when the member takes the item home.
    public boolean borrow(Borrowable item) {
        if (item instanceof Book book) {
            books.add(book);
            return true;
        }
        return false;
    }

    // The returns desk calls this. It does nothing yet.
    public void giveBack(Borrowable item) {
    }

    public int count() { return books.size(); }
}
