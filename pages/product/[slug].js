import React from "react"
import Layout from "../../components/Layout"
import NextLink from "next/link"
import { Button, Grid, Link, List, ListItem, Typography } from "@mui/material"
import useStyles from "../../utils/styles"
import Image from "next/image"
import db from "../../utils/db"
import Product from "../../models/Product"

const ProductScreen = (props) => {
  const { product } = props
  const classes = useStyles()

  if (!product) {
    return <div>Product Not Found</div>
  }
  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>Назад к товарам</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1">{product.name}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Категория: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Бренд: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Рейтинг: {product.rating} из {product.numReviews}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Описание: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Grid>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Цена</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Статус</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? "В наличии" : "Нет в наличии"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Button fullWidth variant="contained" color="primary">
                  Добавить в корзину
                </Button>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ProductScreen

export async function getServerSideProps(context) {
  const { params } = context
  const { slug } = params

  await db.connect()
  const product = await Product.findOne({ slug }, "-reviews").lean()
  await db.disconnect()
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  }
}
