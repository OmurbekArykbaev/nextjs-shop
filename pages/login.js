import {
  List,
  ListItem,
  Link,
  Button,
  TextField,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import Layout from "../components/Layout"
import useStyles from "../utils/styles"
import NextLink from "next/link"
import axios from "axios"

const login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const classes = useStyles()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      })
      alert("Успешный вход")
    } catch (error) {
      alert(error.response.data ? error.response.data.message : error.message)
    }
  }
  return (
    <Layout title="Login">
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <Typography component="h1">Вход</Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
              onChange={(e) => setPassword(e.target.value)}
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
