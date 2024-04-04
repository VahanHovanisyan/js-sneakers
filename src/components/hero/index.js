import styles from "./hero.module.scss";
import createElement from "/src/components/createElement";
import { getSlider } from "/src/components/slider";
import { getCard } from "/src/components/card";
import getSearch from "/src/components/search";
import { favoriteItemsArray } from "/src";
import { cartItemsArray } from "/src";
import { itemsArray } from "../..";

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

  const heroSlider = getSlider('hero__slider');
  heroSlider.classList.add('hero__slider');
  container.append(heroSlider);

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

  function renderItems(array = itemsArray) {
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
              document.querySelector(`[data-card="${isExist.id}"]`)?.querySelectorAll('use')[0].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './img/svg/sprite.svg#favorite');
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
              let index = cartItemsArray.indexOf(isExist);
              cartItemsArray.splice(index, 1);
              fetch(`https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/cart/${isExist.key || isExist.keyId}.json`, {
                method: 'DELETE'
              })
              return
            }
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