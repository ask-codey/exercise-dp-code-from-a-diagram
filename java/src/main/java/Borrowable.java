// Riverside Library's media classes. Read the ticket in README.md first.

// The promise every item the library lends keeps: a title, and how many days it goes out for.
public interface Borrowable {
    String title();
    int loanDays();
}
