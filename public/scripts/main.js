import Modal from './modal.js'
const modal = Modal()

// Pegar todos os botões com a class delete
const deleteButtons = document.querySelectorAll('.actions .delete')

deleteButtons.forEach(button => {
  // Adicionar o Evento Eculta
  button.addEventListener('click', event => {
    // Coletar informações da quest do botão delete clicado

    const buttonRoomId = document.querySelector('#room-id')

    const roomId = buttonRoomId.getAttribute('data-id')

    const form = document.querySelector('.modal .master-form')

    const questionId = event.target.dataset.id

    form.setAttribute(`action`, `/question/${roomId}/${questionId}`)

    // Abrir modal
    event.preventDefault()
    modal.open()
  })
})

// Pegar todos os botões com a class button-cancelar-exclusao
const cancelButtons = document.querySelectorAll(
  '.modal-wrapper .button-cancelar-exclusao'
)

cancelButtons.forEach(button => {
  // Adicionar o Evento Eculta
  button.addEventListener('click', event => {
    // Fechar modal
    event.preventDefault()
    modal.close()
  })
})
