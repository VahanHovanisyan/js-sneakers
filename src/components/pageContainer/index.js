import styles from './pageContainer.module.scss';
import createElement from "/src/components/createElement";
import { cartItemsArray } from "/src";

function getPageContainer() {




  const main = createElement({
    tag: 'main',
    classList: [styles.main],
  })

  return main
}

export default getPageContainer;