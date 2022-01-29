import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import dynamic from "next/dynamic"
import React, { useContext } from "react"
import Layout from "../components/Layout"
import { Store } from "../utils/Store"
import NextLink from "next/link"
import Image from "next/image"

const CartScreen = () => {
  const { state } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  return (
    <Layout title="Shoping Cart">
      <Typography component="h1" variant="h1">
        Ваша корзина
      </Typography>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <NextLink href="/">Go shopping</NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Изображение</TableCell>
                    <TableCell>Название</TableCell>
                    <TableCell align="right">Количество</TableCell>
                    <TableCell align="right">Цена</TableCell>
                    <TableCell align="right">Действие</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell align="right">
                        <Select value={item.quantity}>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" color="secondary">
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography>
                    Итого ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    товаров) : $
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button variant="contained" color="primary">
                    Продолжить
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })
