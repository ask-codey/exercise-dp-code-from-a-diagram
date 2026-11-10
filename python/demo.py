"""A demo: tries your code on one member's visit. You don't need to change it."""
from library import Audiobook, Book, Member


def yes_no(answer):
    return "yes" if answer else "no"


book = Book("The Lighthouse Keeper", 320)
audiobook = Audiobook("Rivers of Glass", 540)
print(f"{book.title}: {book.loan_days()} days")
print(f"{audiobook.title}: {audiobook.loan_days()} days")

maya = Member("Maya")
print(f"Maya borrows 2 items: {yes_no(maya.borrow(book))}, {yes_no(maya.borrow(audiobook))}")
more = [Book("A Map of Small Things", 210), Book("Lanterns on the Pier", 180), Book("The Orchard in Winter", 260)]
print("Then 3 more: " + ", ".join(yes_no(maya.borrow(item)) for item in more))
sixth = Book("Paper Boats", 96)
print(f"And a sixth: {yes_no(maya.borrow(sixth))}")
maya.give_back(book)
print(f"After giving one back: {yes_no(maya.borrow(sixth))}")
