"use strict";

//ELEMENTLARNI CHAQIRIB OLISH:
const elSearchInput = document.querySelector(".search-input");
const elBooksList = document.querySelector(".books-list");
const elBookmarksList = document.querySelector(".bookmark-list");
const elOrderNewest = document.querySelector(".order-newest");
const elTemplateBooks = document.querySelector(".template-books").content;
const elTemplateBookmarks = document.querySelector(
  ".template-bookmarks"
).content;
const elResultAll = document.querySelector(".result__number");
const elLogout = document.querySelector(".logout");
const elErrorBooks = document.querySelector(".error-books");
const elPrevBtn = document.querySelector(".prev-btn");
const elNextBtn = document.querySelector(".next-btn");
const elReadBtn = document.querySelector(".books-list__read");

let orderByNewest = "";
let search = "python";
let page = 1;

//LOGOUT:
elLogout.addEventListener("click", function (evt) {
  evt.preventDefault();
  window.localStorage.removeItem("token");
  window.location.replace("login.html");
});

const bookmarks = [];

//RENDERBOOKMARKS:
const renderBookmarks = function (arr, element) {
  const bookmarksFragment = document.createDocumentFragment();

  arr?.forEach((item) => {
    const clonedBookmarksTemplate = elTemplateBookmarks.cloneNode(true);

    if (item?.volumeInfo.title === undefined) {
      clonedBookmarksTemplate.querySelector(
        ".bookmark-list__heading"
      ).textContent = "Kitob nomi yetib kelmadi";
    } else {
      clonedBookmarksTemplate.querySelector(
        ".bookmark-list__heading"
      ).textContent = `${item?.volumeInfo.title}`;
    }

    if (item?.volumeInfo.authors === undefined) {
      clonedBookmarksTemplate.querySelector(
        ".bookmark-list__desc"
      ).textContent = "Muallif ismi kelmadi";
    } else {
      clonedBookmarksTemplate.querySelector(
        ".bookmark-list__desc"
      ).textContent = `${item?.volumeInfo.authors}`;
    }

    if (item?.id === undefined) {
      clonedBookmarksTemplate.querySelector(
        ".bookmark-list__desc"
      ).bookmarksDeleteBtnId = 1;
    } else {
      clonedBookmarksTemplate.querySelector(
        ".bookmark-delete-btn__icon"
      ).bookmarksDeleteBtnId = `${item.id}`;
    }

    clonedBookmarksTemplate.querySelector(
      ".bookmark-open-btn"
    ).href = `${item?.volumeInfo.previewLink}`;

    bookmarksFragment.appendChild(clonedBookmarksTemplate);
  });

  element.appendChild(bookmarksFragment);
};

//BOOKMARKS DELETE BT ID:
elBookmarksList.addEventListener("click", function (evt) {
  const isBookmarksDeleteBtnId = evt.target.matches(
    ".bookmark-delete-btn__icon"
  );

  if (isBookmarksDeleteBtnId) {
    const bookmarksBooksDeleteBtnId = evt.target.bookmarksDeleteBtnId;

    const foundBookmarks = bookmarks.findIndex(
      (bookmark) => bookmark?.id === bookmarksBooksDeleteBtnId
    );

    bookmarks.splice(foundBookmarks, 1);

    elBookmarksList.innerHTML = null;

    renderBookmarks(bookmarks, elBookmarksList);
  }
});

//BOOKMARK TARGET:
const renderBooksbookmark = function (arr) {
  elBooksList.addEventListener("click", function (evt) {
    const isBookmarkBtnId = evt.target.matches(".books-list__bookmark");
    if (isBookmarkBtnId) {
      const bookmarkBtnId = evt.target.bookmarkBtnIdData;

      const foundBooks = arr.find((book) => book.id === bookmarkBtnId);
      if (!bookmarks.includes(foundBooks)) {
        bookmarks.push(foundBooks);

        elBookmarksList.innerHTML = null;
        renderBookmarks(bookmarks, elBookmarksList);
      }
    }
  });
};

//RENDERBOOKS:
const renderBooks = function (arr, element, total) {
  const booksFragment = document.createDocumentFragment();
  element.innerHTML = null;

  if (total.totalItems > 0) {
    element.innerHTML = null;

    arr?.forEach((item) => {
      const clonedBoksTemplate = elTemplateBooks.cloneNode(true);

      clonedBoksTemplate.querySelector(
        ".books-list__img"
      ).src = `${item.volumeInfo.imageLinks?.thumbnail}`;

      clonedBoksTemplate.querySelector(
        ".books-list__name"
      ).textContent = `${item.volumeInfo?.title}`;

      clonedBoksTemplate.querySelector(
        ".books-list__author"
      ).textContent = `${item.volumeInfo?.authors}`;

      clonedBoksTemplate.querySelector(
        ".books-list__year"
      ).textContent = `${item.volumeInfo?.publishedDate}`;

      clonedBoksTemplate.querySelector(
        ".books-list__bookmark"
      ).bookmarkBtnIdData = `${item.id}`;

      clonedBoksTemplate.querySelector(
        ".books-list__read"
      ).href = `${item.volumeInfo?.previewLink}`;

      booksFragment.appendChild(clonedBoksTemplate);
    });
  } else {
    element.innerHTML = null;
    elErrorBooks.textContent = "Kechirasiz siz izlagan kitob topilmadi!!!";
  }

  element.appendChild(booksFragment);
};

//API FETCH;
const getBooks = async function () {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=search+${search}&startIndex=${page}${orderByNewest}`
    );

    const data = await response.json();

    elResultAll.textContent = data.totalItems;
    elBooksList.innerHTML = null;
    elErrorBooks.textContent = null;

    renderBooks(data.items, elBooksList, data);
    renderBooksbookmark(data.items);
  } catch (err) {
    elBooksList.innerHTML = null;
    elErrorBooks.textContent = "Xatolik yuz berdi!!!";
  }
};

getBooks();

//SEARCH INPUT:
elSearchInput.addEventListener("change", function () {
  search = elSearchInput.value;
  page = 1;
  getBooks();
});

//ORDERBYNEWEST:
elOrderNewest.addEventListener("click", function (evt) {
  orderByNewest = "&orderBy=newest";
  elBooksList.innerHTML = null;
  getBooks();
});

//PAGENATION:
// elPrevBtn.addEventListener("click", function () {
//   if (page >= 11) {
//     page = page - 10;
//     elPrevBtn.disabled = false;
//     getBooks();
//   } else {
//     elPrevBtn.disabled = true;
//   }
// });

// elNextBtn.addEventListener("click", function () {
//   page = page + 10;
//   getBooks();
// });
