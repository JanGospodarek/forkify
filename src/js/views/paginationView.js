import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // do refactoringu!
    let markup = ` 
    <button data-goto="${
      currPage - 1
    }" class="btn--inline pagination__btn--prev ${
      currPage === 1 && numPages > 1 ? 'hidden' : ''
    }">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>     
    <p class="pages ${
      currPage === numPages && numPages > 1 ? 'hidden' : ''
    }">Pages: ${numPages}</p>
    <button data-goto="${
      currPage + 1
    }" class="btn--inline pagination__btn--next ${
      currPage === numPages && numPages > 1 ? 'hidden' : ''
    }">
    <span>Page ${currPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button> 
  `;
    return markup;
  }
}
export default new PaginationView();
