namespace LibraryMedia;

// Riverside Library's media classes. Read the ticket in README.md first.

// The promise every item the library lends keeps: a title, and how many days it goes out for.
public interface IBorrowable
{
    string Title { get; }
    int LoanDays();
}

public class Book : IBorrowable
{
    public string Title { get; }
    public int Pages { get; }

    public Book(string title, int pages)
    {
        Title = title;
        Pages = pages;
    }

    public int LoanDays() => 14;
}

// The catalog team typed this class in from the diagram, and stopped before its loan days.
public class Audiobook : IBorrowable
{
    public string Title { get; }
    public int Minutes { get; }

    public Audiobook(string title, int minutes)
    {
        Title = title;
        Minutes = minutes;
    }

    public int LoanDays() => 0; // not written yet
}

// A library member. Written when the library only lent books.
public class Member
{
    private readonly List<Book> books = new List<Book>();

    public string Name { get; }

    public Member(string name)
    {
        Name = name;
    }

    // The checkout desk calls this with any item. It returns true when the member takes the item home.
    public bool Borrow(IBorrowable item)
    {
        if (item is Book book)
        {
            books.Add(book);
            return true;
        }
        return false;
    }

    // The returns desk calls this. It does nothing yet.
    public void GiveBack(IBorrowable item)
    {
    }

    public int Count() => books.Count;
}
