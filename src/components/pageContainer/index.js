import styles from './pageContainer.module.scss';
import createElement from "/src/components/createElement";
import { app } from "/src";

function getPageContainer() {

  const main = createElement({
    tag: 'main',
    classList: [styles.main],
  })
  setTimeout(() => {
    app.append(main)
  }, 0);

  return main
}

export default getPageContainer;