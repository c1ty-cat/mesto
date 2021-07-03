const cardContainer = document.querySelector(".cards");
const cardForm = document.querySelector(".popup_type_card .popup__form");

/*Функция создания карточек*/
function createCard(nameValue, imgValue) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").setAttribute("src", imgValue);
  cardElement.querySelector(".card__title").textContent = nameValue;
  const altName = `Фотография местности: ${nameValue}`;
  cardElement.querySelector(".card__image").setAttribute("alt", altName);

  /*Добавляем слушатель удаления карточки*/
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function (evt) {
      const eventTarget = evt.target;
      eventTarget.closest(".card").remove();
    });

  /*Добавляем слушатель лайка*/
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      const eventTarget = evt.target;
      eventTarget.classList.toggle("card__like-button_active");
    });

  /*Добавляем слушатель копирования содержания карточки в попап*/
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function () {
      imagePopup.querySelector(".popup__image").setAttribute("src", imgValue);
      imagePopup.querySelector(".popup__image").setAttribute("alt", altName);
      imagePopup.querySelector(".popup__figcaption").textContent = nameValue;
    });

  /*Добавляем слушатель открытия попапа*/
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openImagePopup);

  /*Вставляем узел карточки в DOM*/
  cardContainer.append(cardElement);
}

/*Функция добавления новой карточки*/
function submitFormCard(evt) {
  evt.preventDefault();
  const placeNameInput = cardForm.querySelector("#place");
  const picInput = cardForm.querySelector("#picture");
  const cardName = placeNameInput.value;
  const cardLink = picInput.value;
  placeNameInput.value = "";
  picInput.value = "";
  createCard(cardName, cardLink);
  closePopup(cardPopup);
}

/*Обработчик формы*/
cardForm.addEventListener("submit", submitFormCard);

/*Добавляем начальные 6 карточек*/
initialCards.forEach(function (item) {
  createCard(item.name, item.link);
});
