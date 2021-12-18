const Database = require('../db/config')

module.exports = {
  async delete(req, res) {
    const db = await Database()
    const roomId = req.params.room
    const questionId = req.params.question
    const password = req.body.password

    const verifyRoomPass = await db.get(
      `SELECT * FROM rooms WHERE id = ${roomId}`
    )

    if (verifyRoomPass.pass == password) {
      await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
      res.redirect(`/room/${roomId}`)
    } else {
      res.render(`passincorrect`, { roomId: roomId })
    }
  },

  async check(req, res) {
    const db = await Database()
    const roomId = req.params.room
    const questionId = req.params.question

    await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)

    res.redirect(`/room/${roomId}`)
  },

  async create(req, res) {
    const db = await Database()
    const question = req.body.question
    const roomId = req.params.room
    await db.run(
      `INSERT INTO questions(title, room, read)VALUES("${question}", ${roomId}, 0)`
    )
    res.redirect(`/room/${roomId}`)
  }
}
