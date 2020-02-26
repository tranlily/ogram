var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var PREVIOUS_SELECTOR = '[class="previous-button"]';
var NEXT_SELECTOR = '[class="next-button"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
  'use strict';

  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title')
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function () {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function(event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
}

function getIndex() {

  var index = 0;
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  var titleContent = detailTitle.textContent;

  if (titleContent === "Stayin' Alive") {
    index = 0;
  } else if (titleContent === "How Deep Is Your Love") {
    index = 1;
  } else if (titleContent === "You Should Be Dancing") {
    index = 2;
  } else if (titleContent === "Night Fever") {
    index = 3;
  } else if (titleContent === "To Love Somebody") {
    index = 4;
  } else if (titleContent === "I Love Layin") {
    index = 5;
  } else if (titleContent === "I Wuv Sweepin") {
    index = 6;
  }
  return index;
}

function addPreviousClickHandler() {
  'use strict';
  var previous_button = document.querySelector(PREVIOUS_SELECTOR);
  previous_button.addEventListener('click', function(event) {
    event.preventDefault();

    var thumbnailArray = getThumbnailsArray();
    var index = getIndex();

    if (index != 0) {
      var previousImage = thumbnailArray[index - 1];
    } else {
      var previousImage = thumbnailArray[6];
    }
    setDetailsFromThumb(previousImage);
  });
}

function addNextClickHandler() {
  'use strict';
  var next_button = document.querySelector(NEXT_SELECTOR);
  next_button.addEventListener('click', function(event) {
    event.preventDefault();

    var thumbnailArray = getThumbnailsArray();
    var index = getIndex();

    if (index != 6) {
      var nextImage = thumbnailArray[index + 1];
    } else {
      var nextImage = thumbnailArray[0];
    }
    setDetailsFromThumb(nextImage);
  });
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
  addPreviousClickHandler();
  addNextClickHandler();
}

initializeEvents();
