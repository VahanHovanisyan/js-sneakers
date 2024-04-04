import "./search.scss";
import createElement from "/src/components/createElement";

function getSearch() {

  const search = createElement({
    tag: 'label',
    classList: ['search'],
    params: {
      innerHTML: /* html */ `
        <svg class="search__icon">
          <use xlink:href="./img/svg/sprite.svg#search"></use>
        </svg>
        <input class="search__input" type="text" placeholder="Поиск по названию">
      `
    }
  })
  const searchButtonRemove = createElement({
    tag: 'button',
    classList: ['search__button-remove', 'buttonReset'],
    params: {
      onclick: () => {
        search.querySelector('.search__input').value = null;
        searchButtonRemove.remove();
      },
      type: 'button',
      innerHTML: '<svg class="search__icon search__icon_remove"><use xlink:href="/img/svg/sprite.svg#cartIconRemove"></use></svg>'
    }
  })
  search.querySelector('.search__input').addEventListener('input', () => {
    if (search.querySelector('.search__input').value === null) {
      searchButtonRemove.remove();
    } else {
      search.append(searchButtonRemove);
    }
  })

  return {
    search,
    searchInput: search.querySelector('.search__input'),
    searchButtonRemove
  }
}

export default getSearch