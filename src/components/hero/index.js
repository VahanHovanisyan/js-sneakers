import styles from "./hero.module.scss";
import createElement from "/src/components/createElement";
import { router } from "/src/router";
import { getCard } from "/src/components/card";
import getSearch from "/src/components/search";
import { favoriteItemsArray } from "/src/fetch";
import { cartItemsArray } from "/src/fetch";
import getInfo from "/src/components/info";

export const arrayLoadItems = [
  {
    titleSmall: '',
    price: '',
    imgUrl: '',
  },
  {
    titleSmall: '',
    price: '',
    imgUrl: '',
  },
  {
    titleSmall: '',
    price: '',
    imgUrl: '',
  },
  {
    titleSmall: '',
    price: '',
    imgUrl: '',
  },
  {
    titleSmall: '',
    price: '',
    imgUrl: '',
  },
  {
    titleSmall: '',
    price: '',
    imgUrl: '',
  },
];

const { search, searchInput, searchButtonRemove } = getSearch();
export function getHero(getArray) {

  const hero = createElement({
    tag: 'section',
    classList: [styles.hero],
  })

  const container = createElement({
    tag: 'div',
    classList: ['container', styles.container],
    parent: hero
  })

  const heroContent = createElement({
    tag: 'div',
    classList: [styles.content],
    parent: container
  })

  const heroTitle = createElement({
    tag: 'h1',
    classList: [styles.title],
    params: {
      textContent: 'все Кроссовки'
    },
    parent: heroContent
  })

  heroContent.append(search);

  const cardsList = createElement({
    tag: 'ul',
    classList: [styles.catalog],
    parent: container
  })

  searchInput.addEventListener('input', () => {
    cardsList.innerHTML = '';
    renderItems(getArray);
  })

  searchButtonRemove.addEventListener('click', () => {
    cardsList.innerHTML = '';
    renderItems(getArray);
  })

  cardsList.innerHTML = '';
  renderItems(getArray);

  function getConteinerInfoEmpty(count = 0, getPage) {
    const conteinerInfoEmpty = getInfo({
      imgUrl: getPage === '#/profile' ? 'img/profileSmile.png' : 'img/sedSmile.png',
      title: getPage === '#/profile' ? 'У вас нет заказов' : 'Закладок нет :(',
      description: getPage === '#/profile' ? 'Вы нищеброд? Оформите хотя бы один заказ.' : 'Вы ничего не добавляли в закладки',
      closeInfo() {
        router.navigate('/');
      }
    });

    if (getArray?.length === count) {
      cardsList.remove();
      search.remove();
      heroTitle.remove();
      container.append(conteinerInfoEmpty);
    } else {
      conteinerInfoEmpty.remove();
    }
  }
  getConteinerInfoEmpty(0, window.location.hash);
  function renderItems(array = arrayLoadItems) {

    return array
      .filter(item => item.titleSmall.toLowerCase().includes(searchInput.value.toLowerCase()))
      .forEach(item => {

        const li = createElement({
          tag: 'li',
          classList: ['hero__card'],
          parent: cardsList
        })

        const card = getCard({
          id: item.id,
          title: item.title,
          titleSmall: item.titleSmall,
          price: item.price,
          imgUrl: item.imgUrl,
          onAddToFavorite() {
            const isExist = favoriteItemsArray.find(itemFavorite => itemFavorite.id === item.id);
            if (isExist) {
              getConteinerInfoEmpty(1, window.location.hash)
              document.querySelector(`[data-card="${isExist.id}"]`)?.querySelectorAll('use')[0].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/svg/sprite.svg#favorite');
              let index = favoriteItemsArray.indexOf(isExist);
              favoriteItemsArray.splice(index, 1);
              fetch(`https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/favorite/${isExist.key || isExist.keyId}.json`, {
                method: 'DELETE'
              })
              return
            }

            fetch('https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/favorite.json', {
              method: 'POST',
              body: JSON.stringify(item),
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(response => response.json())
              .then(dataFavorite => {
                favoriteItemsArray.push({
                  id: item.id,
                  keyId: dataFavorite.name,
                  title: item.title,
                  titleSmall: item.titleSmall,
                  price: item.price,
                  imgUrl: item.imgUrl
                })
              })
          },
          onAddToCart() {
            const isExist = cartItemsArray.find(itemCart => itemCart.id === item.id);
            if (isExist) {
              document.querySelector('.nav__icon-text_total-price').textContent = `${Math.abs(cartItemsArray.reduce((acc, totalItem) => acc - totalItem.price, isExist.price))} руб.`
              let index = cartItemsArray.indexOf(isExist);
              cartItemsArray.splice(index, 1);
              fetch(`https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/cart/${isExist.key || isExist.keyId}.json`, {
                method: 'DELETE'
              })
              return
            }
            document.querySelector('.nav__icon-text_total-price').textContent = `${Math.abs(cartItemsArray.reduce((acc, totalItem) => totalItem.price + acc, item.price))} руб.`
            fetch('https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
              method: 'POST',
              body: JSON.stringify(item),
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(response => response.json())
              .then(dataCart => {
                cartItemsArray.push({
                  id: item.id,
                  key: dataCart.name,
                  title: item.title,
                  titleSmall: item.titleSmall,
                  price: item.price,
                  imgUrl: item.imgUrl
                })
              })
          }
        })

        li.append(card)

      })
  }

  return {
    hero,
    heroContainer: container,
    heroTitle,
    cardsList,
  }
}