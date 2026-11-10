"""The tests for your code. You don't need to change this file.
Each message says what was expected, so a failing test tells you what to look at."""
from library import Audiobook, Book, Borrowable, Member


def lighthouse():
    return Book("The Lighthouse Keeper", 320)


def rivers():
    return Audiobook("Rivers of Glass", 540)


def five_books():
    return [Book(title, 200) for title in ["A Map of Small Things", "Lanterns on the Pier", "The Orchard in Winter", "Paper Boats", "The Lighthouse Keeper"]]


# What the code does today. These pass before you change anything: keep them passing.

def test_a_book_keeps_its_title_and_pages():
    book = lighthouse()
    assert (book.title, book.pages) == ("The Lighthouse Keeper", 320), \
        "Keep this working: a Book made with \"The Lighthouse Keeper\" and 320 keeps that title and 320 pages."


def test_a_book_is_lent_for_14_days():
    assert lighthouse().loan_days() == 14, "Keep this working: a book is lent for 14 days."


def test_an_audiobook_keeps_its_title_and_minutes():
    audiobook = rivers()
    assert (audiobook.title, audiobook.minutes) == ("Rivers of Glass", 540), \
        "Keep this working: an Audiobook made with \"Rivers of Glass\" and 540 keeps that title and 540 minutes."


def test_books_and_audiobooks_keep_the_borrowable_promise():
    assert isinstance(lighthouse(), Borrowable) and isinstance(rivers(), Borrowable), \
        "Keep this working: the diagram's dashed arrows say Book and Audiobook both keep the Borrowable promise."


def test_a_member_can_borrow_a_book():
    maya = Member("Maya")
    assert maya.borrow(lighthouse()) is True, "Keep this working: Maya can borrow a book."
    assert maya.count() == 1, "Keep this working: after borrowing one book, Maya has 1 item."


# The ticket's work: the diagram's rules that the code doesn't keep yet. These fail until the work is done.

def test_an_audiobook_is_lent_for_7_days():
    assert rivers().loan_days() == 7, "Not yet: an audiobook is lent for 7 days."


def test_a_member_can_borrow_an_audiobook_too():
    maya = Member("Maya")
    took = [maya.borrow(lighthouse()), maya.borrow(rivers())]
    assert took == [True, True], \
        "Not yet: the diagram's line goes from Member to Borrowable, so Maya can borrow an audiobook as well as a book."
    assert maya.count() == 2, "Not yet: after a book and an audiobook, Maya has 2 items."


def test_a_member_holds_at_most_five_items():
    sam = Member("Sam")
    for book in five_books():
        sam.borrow(book)
    assert sam.borrow(Book("The Quiet Harbor", 150)) is False, "Not yet: the diagram says 0..5, so Sam's sixth item is refused."
    assert sam.count() == 5, "Not yet: after five items and a refused sixth, Sam still has 5."


def test_giving_an_item_back_makes_room():
    sam = Member("Sam")
    books = five_books()
    for book in books:
        sam.borrow(book)
    sam.give_back(books[0])
    assert sam.count() == 4, "Not yet: after giving one of five items back, Sam has 4."
    assert sam.borrow(rivers()) is True, "Not yet: with a place free again, Sam can borrow an audiobook."
    assert sam.count() == 5, "Not yet: after borrowing again, Sam has 5 items."
