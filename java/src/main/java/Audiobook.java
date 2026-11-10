// The catalog team typed this class in from the diagram, and stopped before its loan days.
public class Audiobook implements Borrowable {
    private final String title;
    private final int minutes;

    public Audiobook(String title, int minutes) {
        this.title = title;
        this.minutes = minutes;
    }

    public String title() { return title; }
    public int minutes() { return minutes; }
    public int loanDays() { return 0; } // not written yet
}
