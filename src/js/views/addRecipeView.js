import View from './View';
import icons from 'url:../../img/icons.svg';

class addRecipeView extends View {
  _message = 'Recipe has been uploaded!😀';
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  toggleWindow() {
    // const message = document.querySelector('.message');
    // console.log(message);
    // if (message) message.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  hideWindow() {
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHadnlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log(this);
      const labels = Array.from(this.querySelectorAll('.ingredients')).map(
        ing =>
          Array.from(ing.children).map(el => {
            return el.value ? el.value : el.textContent;
          })
      );

      const data = Object.fromEntries([...new FormData(this)]);
      console.log(data);
      const exitData = {
        cookingTime: data.cookingTime,
        image: data.image,
        publisher: data.publisher,
        servings: data.servings,
        sourceUrl: data.sourceUrl,
        title: data.title,
        cookingTime: data.cookingTime,
      };
      //juniorski kod ponizej
      labels.map(arr => {
        if (arr[0] === 'Ingredient 1')
          exitData.ingredientOne = arr.slice(1).join(',');
        if (arr[0] === 'Ingredient 2')
          exitData.ingredientTwo = arr.slice(1).join(',');
        if (arr[0] === 'Ingredient 3')
          exitData.ingredientThree = arr.slice(1).join(',');
        if (arr[0] === 'Ingredient 4')
          exitData.ingredientFour = arr.slice(1).join(',');
        if (arr[0] === 'Ingredient 5')
          exitData.ingredientFive = arr.slice(1).join(',');
        if (arr[0] === 'Ingredient 6')
          exitData.ingredientSix = arr.slice(1).join(',');
      });
      console.log(exitData);
      //console.log(exitData);
      handler(exitData);
    });
  }
  _generateMarkup() {}
}

export default new addRecipeView();
