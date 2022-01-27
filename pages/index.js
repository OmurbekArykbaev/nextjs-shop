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

export default function Home(props) {
  const { products } = props
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {data.products.map((product) => (
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
                  <Button size="small" color="primary">
                    Add to cart
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
