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
const elMoreInfo = document.querySelector(".books-more-info");
const elOverlay = document.querySelector(".overlay");

let orderByNewest = "";
let search = "python";
let page = 1;

//LOGOUT:
elLogout.addEventListener("click", function (evt) {
  evt.preventDefault();
  window.localStorage.removeItem("token");
  window.location.replace("login.html");
});

//OVERLAY
elOverlay.addEventListener("click", () => {
  elMoreInfo.classList.add("hidden");
  elOverlay.classList.add("hidden");
});

let localBookmarks = JSON.parse(window.localStorage.getItem("localBookmark"));

const bookmarks = localBookmarks || [];

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

    window.localStorage.setItem("localBookmark", JSON.stringify(bookmarks));

    let localStorageremove = JSON.parse(
      window.localStorage.getItem("localBookmark")
    );

    if (localStorageremove.length === 0) {
      window.localStorage.removeItem("localBookmark");
    }

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

        window.localStorage.setItem("LocalBookmark", JSON.stringify(bookmarks));
        renderBookmarks(bookmarks, elBookmarksList);
      }
    }

    const isBookmarkBtnIdInfo = evt.target.matches(".books-list__info");
    if (isBookmarkBtnIdInfo) {
      elMoreInfo.classList.remove("hidden");
      elOverlay.classList.remove("hidden");
    }
  });
};

//BOOKS INFORMATION:
const booksMoreInfo = function (arr) {
  arr.forEach((bookInfo) => {
    //CREATE ELEMENT:
    let newBooksMoreInfoWrapper = document.querySelector("div");
    let newBooksMoreInfoTop = document.querySelector("div");
    let newBooksMoreInfoTitle = document.querySelector("h3");
    let newBooksMoreInfoCancel = document.querySelector("button");
    let newBooksMoreInfoList = document.querySelector("ul");
    let newBooksMoreInfoItem = document.querySelector("li");
    let newBooksMoreInfoImg = document.querySelector("img");
    let newBooksMoreInfoInfor = document.querySelector("p");
    let newBooksMoreInfoOuthorWrapper = document.querySelector("div");
    let newBooksMoreInfoOuthorTitle = document.querySelector("p");
    let newBooksMoreInfoOuthors = document.querySelector("ul");

    //OUTHORS:
    bookInfo.volumeInfo.authors.forEach((author) => {
      //CREATE ELEMENT:
      let newBooksMoreInfoOuthorsHead = document.querySelector("li");

      //SETATTRIBUT:
      newBooksMoreInfoOuthorsHead.setAttribute(
        "class",
        "books-more-info__authors-head"
      );

      //TEXTCONTENT:
      newBooksMoreInfoOuthorsHead.textContent = author;

      //appendChild:
      newBooksMoreInfoOuthors.appendChild(newBooksMoreInfoOuthorsHead);
    });

    let newBooksMoreInfoPublishedWrapper = document.querySelector("div");
    let newBooksMoreInfoPublishedTitle = document.querySelector("p");
    let newBooksMoreInfoPublishedHead = document.querySelector("p");
    let newBooksMoreInfoPublishersWrapper = document.querySelector("div");
    let newBooksMoreInfoPublishersTitle = document.querySelector("p");
    let newBooksMoreInfoPublishersHead = document.querySelector("p");
    let newBooksMoreInfoCategoriesWrapper = document.querySelector("div");
    let newBooksMoreInfoCategoriesTitle = document.querySelector("p");
    let newBooksMoreInfoCategoriesHead = document.querySelector("p");
    let newBooksMoreInfoPagescountWrapper = document.querySelector("div");
    let newBooksMoreInfoPagescountTitle = document.querySelector("p");
    let newBooksMoreInfoPagescountHead = document.querySelector("p");
    let newBooksMoreInfoBottom = document.querySelector("div");
    let newBooksMoreInfoRead = document.querySelector("a");

    //SETATRIBUTE:
    newBooksMoreInfoWrapper.setAttribute("class", "books-more-info__wrapper");
    newBooksMoreInfoTop.setAttribute("class", "books-more-info__top");
    newBooksMoreInfoTitle.setAttribute("class", "books-more-info__title");
    newBooksMoreInfoCancel.setAttribute("class", "books-more-info__cancel");
    newBooksMoreInfoList.setAttribute("class", "books-more-info__list");
    newBooksMoreInfoItem.setAttribute("class", "books-more-info__item");
    newBooksMoreInfoImg.setAttribute("class", "books-more-info__img");
    newBooksMoreInfoImg.setAttribute(
      "src",
      bookInfo.volumeInfo.imageLinks?.thumbnail
    );

    newBooksMoreInfoInfor.setAttribute("class", "books-more-info__infor");
    newBooksMoreInfoOuthorWrapper.setAttribute(
      "class",
      "books-more-info__outhor-wrapper"
    );
    newBooksMoreInfoOuthorTitle.setAttribute(
      "class",
      "books-more-info__outhor-title"
    );
    newBooksMoreInfoOuthors.setAttribute("class", "books-more-info__authors");
    newBooksMoreInfoPublishedWrapper.setAttribute(
      "class",
      "books-more-info__published-wrapper"
    );
    newBooksMoreInfoPublishedTitle.setAttribute(
      "class",
      "books-more-info__published-title"
    );
    newBooksMoreInfoPublishedHead.setAttribute(
      "class",
      "books-more-info__published-head"
    );
    newBooksMoreInfoPublishersWrapper.setAttribute(
      "class",
      "books-more-info__publishers-wrapper"
    );
    newBooksMoreInfoPublishersTitle.setAttribute(
      "class",
      "books-more-info__publishers-title"
    );
    newBooksMoreInfoPublishersHead.setAttribute(
      "class",
      "books-more-info__publishers-head"
    );
    newBooksMoreInfoCategoriesWrapper.setAttribute(
      "class",
      "books-more-info__categories-wrapper"
    );
    newBooksMoreInfoCategoriesTitle.setAttribute(
      "class",
      "books-more-info__categories-title"
    );
    newBooksMoreInfoCategoriesHead.setAttribute(
      "class",
      "books-more-info__categories-head"
    );
    newBooksMoreInfoPagescountWrapper.setAttribute(
      "class",
      "books-more-info__pagescount-wrapper"
    );
    newBooksMoreInfoPagescountTitle.setAttribute(
      "class",
      "books-more-info__pagescount-title"
    );
    newBooksMoreInfoPagescountHead.setAttribute(
      "class",
      "books-more-info__pagescount-head"
    );
    newBooksMoreInfoBottom.setAttribute("class", "books-more-info__bottom");
    newBooksMoreInfoRead.setAttribute("class", "books-more-info__read");
    newBooksMoreInfoRead.setAttribute("href", bookInfo.volumeInfo?.previewLink);
    newBooksMoreInfoRead.setAttribute("target", "_blank");
    console.log(bookInfo.volumeInfo?.publisher);

    // //TEXTCONTENT:
    newBooksMoreInfoTitle.textContent = bookInfo.volumeInfo?.title;
    newBooksMoreInfoInfor.textContent = bookInfo.volumeInfo?.description;
    newBooksMoreInfoOuthorTitle.textContent = "Author:";
    newBooksMoreInfoPublishedTitle.textContent = "Published:";
    newBooksMoreInfoPublishedHead.textContent =
      bookInfo.volumeInfo?.publishedDate;
    newBooksMoreInfoPublishersTitle.textContent = "Publishers:";
    newBooksMoreInfoPublishersHead.textContent = bookInfo.volumeInfo?.publisher;
    newBooksMoreInfoCategoriesTitle.textContent = "Categories:";
    newBooksMoreInfoCategoriesHead.textContent =
      bookInfo.volumeInfo?.categories;
    newBooksMoreInfoPagescountTitle.textContent = "Pages Count:";
    newBooksMoreInfoPagescountHead.textContent = bookInfo.volumeInfo?.pageCount;
    newBooksMoreInfoRead.textContent = "Read";

    //APPENDCHILD:
    elMoreInfo.appendChild(newBooksMoreInfoWrapper);
    newBooksMoreInfoWrapper.appendChild(newBooksMoreInfoTop);
    newBooksMoreInfoTop.appendChild(newBooksMoreInfoTitle);
    newBooksMoreInfoTop.appendChild(newBooksMoreInfoCancel);
    newBooksMoreInfoWrapper.appendChild(newBooksMoreInfoList);
    newBooksMoreInfoList.appendChild(newBooksMoreInfoItem);
    newBooksMoreInfoItem.appendChild(newBooksMoreInfoImg);
    newBooksMoreInfoItem.appendChild(newBooksMoreInfoInfor);
    newBooksMoreInfoItem.appendChild(newBooksMoreInfoOuthorWrapper);
    newBooksMoreInfoOuthorWrapper.appendChild(newBooksMoreInfoOuthorTitle);
    newBooksMoreInfoOuthorWrapper.appendChild(newBooksMoreInfoOuthors);
    newBooksMoreInfoItem.appendChild(newBooksMoreInfoPublishedWrapper);
    newBooksMoreInfoPublishedWrapper.appendChild(
      newBooksMoreInfoPublishedTitle
    );
    newBooksMoreInfoPublishedWrapper.appendChild(newBooksMoreInfoPublishedHead);
    newBooksMoreInfoItem.appendChild(newBooksMoreInfoPublishersWrapper);
    newBooksMoreInfoPublishersWrapper.appendChild(
      newBooksMoreInfoPublishersTitle
    );
    newBooksMoreInfoPublishersWrapper.appendChild(
      newBooksMoreInfoPublishersHead
    );
    newBooksMoreInfoItem.appendChild(newBooksMoreInfoCategoriesWrapper);
    newBooksMoreInfoCategoriesWrapper.appendChild(
      newBooksMoreInfoCategoriesTitle
    );
    newBooksMoreInfoCategoriesWrapper.appendChild(
      newBooksMoreInfoCategoriesHead
    );
    newBooksMoreInfoItem.appendChild(newBooksMoreInfoPagescountWrapper);
    newBooksMoreInfoPagescountWrapper.appendChild(
      newBooksMoreInfoPagescountTitle
    );
    newBooksMoreInfoPagescountWrapper.appendChild(
      newBooksMoreInfoPagescountHead
    );
    newBooksMoreInfoWrapper.appendChild(newBooksMoreInfoBottom);
    newBooksMoreInfoBottom.appendChild(newBooksMoreInfoRead);
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
        ".books-list__info"
      ).bookmarkBtnIdInfo = `${item.id}`;

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
    // booksMoreInfo(data.items);
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
