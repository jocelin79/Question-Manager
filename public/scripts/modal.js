export default function Modal() {
  // Atribuir a classe active para a modal
  function open() {
    document.querySelector('.modal-wrapper').classList.add('active')
  }
  // Remover a classe active para a modal
  function close() {
    document.querySelector('.modal-wrapper').classList.remove('active')
  }

  return {
    open,
    close
  }
}
