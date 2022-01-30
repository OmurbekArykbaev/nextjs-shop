import nc from "next-connect"
import db from "../../utils/db"
import Product from "../../models/Product"
import data from "../../utils/data"
import User from "../../models/User"

const handler = nc()

handler.get(async (req, res) => {
  await db.connect()
  await User.deleteMany()
  await User.insertMany(data.users)
  await db.connect()
  await Product.deleteMany()
  await Product.insertMany(data.products)
  await db.disconnect()
  res.send({ message: "Данные успешно посаженны!" })
})

export default handler
