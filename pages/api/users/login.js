import nc from "next-connect"
import db from "../../../utils/db"
import User from "../../../models/User"
import { signToken } from "../../../utils/auth"

const handler = nc()

handler.post(async (req, res) => {
  await db.connect()
  const user = await User.findOne({ email: req.body.email })
  await db.disconnect()
  if (user && req.body.password) {
    const token = signToken(user)
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res
      .statusCode(401)
      .send({ message: "Неверный пароль, либо учетная запись" })
  }
})

export default handler
