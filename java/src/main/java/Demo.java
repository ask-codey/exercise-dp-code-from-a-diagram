import java.util.List;

// A demo: tries your code on one member's visit. You don't need to change it.
// Run it with: java src/main/java/Demo.java
public class Demo {
    static String yesNo(boolean answer) {
        return answer ? "yes" : "no";
    }

    public static void main(String[] args) {
        Book book = new Book("The Lighthouse Keeper", 320);
        Audiobook audiobook = new Audiobook("Rivers of Glass", 540);
        System.out.println(book.title() + ": " + book.loanDays() + " days");
        System.out.println(audiobook.title() + ": " + audiobook.loanDays() + " days");

        Member maya = new Member("Maya");
        System.out.println("Maya borrows 2 items: " + yesNo(maya.borrow(book)) + ", " + yesNo(maya.borrow(audiobook)));
        List<Book> more = List.of(new Book("A Map of Small Things", 210), new Book("Lanterns on the Pier", 180), new Book("The Orchard in Winter", 260));
        System.out.println("Then 3 more: " + String.join(", ", more.stream().map(item -> yesNo(maya.borrow(item))).toList()));
        Book sixth = new Book("Paper Boats", 96);
        System.out.println("And a sixth: " + yesNo(maya.borrow(sixth)));
        maya.giveBack(book);
        System.out.println("After giving one back: " + yesNo(maya.borrow(sixth)));
    }
}
