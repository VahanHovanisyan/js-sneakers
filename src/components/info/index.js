import styles from './info.module.scss';
import createElement from "/src/components/createElement";

function getInfo({ imgUrl, title, description, closeInfo = () => { } } = {}) {

  const info = createElement({
    tag: 'div',
    classList: [styles.cartEmpty],
    params: {
      onclick: (event) => {
        if (event.target.closest('.infoButton')) {
          closeInfo();
        }
      },
      innerHTML: /* html */ `
      <img class=${styles.cartEmptyImg} src="${imgUrl}" alt="cart-empty" width="100">
      <h3 class="infoTitle">${title}</h3>
      <p class="infoText">
        ${description}
      </p>
      <button class="infoButton btn ">
        <svg class="infoButtonIcon btnIcon">
          <use xlink:href="img/svg/sprite.svg#checkoutBtnArrow"></use>
        </svg>
        Вернуться назад
      </button>
    `
    }
  })

  return info
}

export default getInfo;