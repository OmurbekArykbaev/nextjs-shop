import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CardActions,
} from "@mui/material"
import Layout from "../components/Layout"
import NextLink from "next/link"
import data from "../utils/data"
import db from "../utils/db"
import Product from "../models/Product"
import { useRouter } from "next/router"
import { Store } from "../utils/Store"
import { useContext } from "react"
import axios from "axios"

export default function Home({ product }) {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  console.log(product)

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1

    if (data.countInStock <= quantity) {
      window.alert("Sorry, product is  out if stock")
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: 1 },
    })

    router.push("/cart")
  }
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {product.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>`
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => addToCartHandler(product)}
                  >
                    Купить
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  await db.connect()
  const product = await Product.find({}).lean()
  await db.disconnect()
  return {
    props: {
      product: product.map(db.convertDocToObj),
    },
  }
}
