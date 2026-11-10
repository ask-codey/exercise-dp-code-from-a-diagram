public class Book implements Borrowable {
    private final String title;
    private final int pages;

    public Book(String title, int pages) {
        this.title = title;
        this.pages = pages;
    }

    public String title() { return title; }
    public int pages() { return pages; }
    public int loanDays() { return 14; }
}
