/**
 * Function to use as event handler for a elements that scroll to another element.
 * @param {MouseEvent} event
 */
export default function scrollToElement(event) {
  const id = event.target.href.split('#')[1];
  document.querySelector(`#${id}`).scrollIntoView(true, { behavior: 'smooth' });
  event.preventDefault();
}
