const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()
    const pass = req.body.password
    let roomId

    let isRoom = true
    while (isRoom) {
      // Gerar Id da Sala
      for (var i = 0; i < 6; i++) {
        i == 0
          ? (roomId = Math.floor(Math.random() * 10).toString())
          : (roomId += Math.floor(Math.random() * 10).toString())
      }

      // Verificar se o Id já foi usado
      const roomsExistIds = await db.all(`SELECT id FROM rooms`)

      let ids = []

      roomsExistIds.forEach(id => {
        ids.push(id.id)
      })

      isRoom = ids.some(id => id === Number(roomId))
      /*método some retorna true ou false */
    }

    // Inserir a Sala no db
    await db.run(
      `INSERT INTO rooms (id, pass) VALUES (${parseInt(roomId)}, ${pass})`
    )

    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async openCreated(req, res) {
    const db = await Database()
    const roomId = req.params.room
    const questionsNoRead = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 0`
    )
    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 1`
    )

    res.render('room', {
      roomId: roomId,
      questionsNoRead: questionsNoRead,
      questionsRead: questionsRead
    })
  },

  async open(req, res) {
    const db = await Database()
    const roomId = req.body.roomId

    // Verificar se o roomId já existe
    const roomsExistIds = await db.all(`SELECT id FROM rooms`)

    let ids = []

    roomsExistIds.forEach(id => {
      ids.push(id.id)
    })

    isThereRoomId = ids.some(
      id => id === Number(roomId)
    ) /*método some retorna true ou false */

    if (isThereRoomId) {
      res.redirect(`/room/${roomId}`)
    } else {
      res.render(`roomIdincorrect`, {})
    }
  }
}
