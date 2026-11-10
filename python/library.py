"""Riverside Library's media classes. Read the ticket in README.md first."""
from abc import ABC, abstractmethod


class Borrowable(ABC):
    """The promise every item the library lends keeps: a title, and how many days it goes out for."""

    title = ""

    @abstractmethod
    def loan_days(self): ...


class Book(Borrowable):
    def __init__(self, title, pages):
        self.title = title
        self.pages = pages

    def loan_days(self):
        return 14


class Audiobook(Borrowable):
    """The catalog team typed this class in from the diagram, and stopped before its loan days."""

    def __init__(self, title, minutes):
        self.title = title
        self.minutes = minutes

    def loan_days(self):
        return 0  # not written yet


class Member:
    """A library member. Written when the library only lent books."""

    def __init__(self, name):
        self.name = name
        self._books = []

    def borrow(self, item):
        """The checkout desk calls this with any item. It returns True when the member takes the item home."""
        if isinstance(item, Book):
            self._books.append(item)
            return True
        return False

    def give_back(self, item):
        """The returns desk calls this. It does nothing yet."""

    def count(self):
        return len(self._books)
