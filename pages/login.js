import {
  List,
  ListItem,
  Link,
  Button,
  TextField,
  Typography,
} from "@mui/material"
import React from "react"
import Layout from "../components/Layout"
import useStyles from "../utils/styles"
import NextLink from "next/link"

const login = () => {
  const classes = useStyles()
  return (
    <Layout title="Login">
      <form className={classes.form}>
        <Typography component="h1">Вход</Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "email" }}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Войти
            </Button>
          </ListItem>

          <ListItem>
            Нет учетной записи? &nbsp;
            <NextLink href="/register" passHref>
              <Link>Регистрация</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}

export default login
