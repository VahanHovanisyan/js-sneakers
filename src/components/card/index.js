import styles from "./card.module.scss";
import createElement from "/src/components/createElement";
import { cartItemsArray } from "/src/fetch";
import { favoriteItemsArray } from "/src/fetch";

export function getCard({
  id = '',
  title = '',
  titleSmall = '',
  imgUrl = '',
  price = '',
  onAddToCart = () => { },
  onAddToFavorite = () => { }
} = {}) {

  const card = createElement({
    tag: 'article',
    classList: [styles.card],
    attributes: {
      'data-card': id
    },
  })

  const link = createElement({
    tag: 'a',
    classList: [styles.link],
    parent: card
  })

  const iconFavorite = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  iconFavorite.classList.add(styles.icon);

  const iconPlus = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  iconPlus.classList.add(styles.icon_checked);

  const iconFavoriteUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  const iconPlusUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');

  iconFavoriteUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/svg/sprite.svg#favorite');
  iconPlusUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/svg/sprite.svg#cardUnChecked');

  cartItemsArray.forEach(itemCart => {
    if (itemCart.id === id) {
      iconPlusUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/svg/sprite.svg#cardChecked')
    }
  })

  favoriteItemsArray.forEach(itemFavorite => {
    if (itemFavorite.id === id) {
      iconFavoriteUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/svg/sprite.svg#favoriteActive')
    }
  })

  iconFavorite.appendChild(iconFavoriteUse);
  iconPlus.appendChild(iconPlusUse);

  let buttonFavoriteActive = false
  const buttonFavorite = createElement({
    tag: 'button',
    classList: [styles.btnFavorite, styles.btn, 'buttonReset'],
    params: {
      onclick: () => {
        if (iconFavoriteUse.getAttribute('xlink:href') === 'img/svg/sprite.svg#favoriteActive') {
          buttonFavoriteActive = true
          if (window.location.href.includes('favorite')) {
            card.parentElement?.remove();
          }
        }
        buttonFavoriteActive = !buttonFavoriteActive
        onAddToFavorite();
        iconFavoriteUse.setAttributeNS(
          'http://www.w3.org/1999/xlink',
          'xlink:href',
          buttonFavoriteActive ? 'img/svg/sprite.svg#favoriteActive'
            : 'img/svg/sprite.svg#favorite');
      }
    },
    parent: window.location.pathname === '/profile' ? null : card
  })

  buttonFavorite.append(iconFavorite);

  if (imgUrl) {
    const img = createElement({
      tag: 'img',
      classList: [styles.img],
      params: {
        src: imgUrl,
        alt: titleSmall,
      },
      parent: card
    })
  } else {
    const imgLoad = createElement({
      tag: 'div',
      classList: [styles.load, styles.load_img],
      parent: card
    })
  }


  const content = createElement({
    tag: 'div',
    classList: [styles.bottom],
    parent: card
  })
  let buttonPlusChecked = false
  const buttonPlus = createElement({
    tag: 'button',
    classList: [styles.btnChecked, styles.btn, 'buttonReset'],
    params: {
      onclick: () => {
        if (iconPlusUse.getAttribute('xlink:href') === 'img/svg/sprite.svg#cardChecked') {
          buttonPlusChecked = true
        } else {
          buttonPlusChecked = false
        }
        buttonPlusChecked = !buttonPlusChecked
        onAddToCart();
        iconPlusUse.setAttributeNS(
          'http://www.w3.org/1999/xlink',
          'xlink:href',
          buttonPlusChecked ? 'img/svg/sprite.svg#cardChecked'
            : 'img/svg/sprite.svg#cardUnChecked');
      }
    },
    parent: window.location.pathname === '/profile' ? null : content
  })
  buttonPlus.append(iconPlus);

  if (title && titleSmall) {
    const titleCard = createElement({
      tag: 'h3',
      classList: [styles.title],
      params: {
        textContent: titleSmall + title,
      },
      parent: card
    })

  } else {
    const titleCardLoad = createElement({
      tag: 'div',
      classList: [styles.load, styles.load_text],
      parent: card
    })
  }



  const priceText = createElement({
    tag: 'span',
    classList: [styles.priceText],
    params: {
      textContent: 'Цена:'
    },
    parent: content
  })

  if (price) {
    const priceNumber = createElement({
      tag: 'span',
      classList: [styles.priceNumber],
      params: {
        textContent: price
      },
      parent: content
    })
  } else {
    const priceNumberLoad = createElement({
      tag: 'div',
      classList: [styles.load, styles.load_text],
      parent: content
    })
  }


  return card;
}