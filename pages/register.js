import {
  List,
  ListItem,
  Link,
  Button,
  TextField,
  Typography,
} from "@mui/material"
import React, { useContext, useEffect } from "react"
import Layout from "../components/Layout"
import useStyles from "../utils/styles"
import NextLink from "next/link"
import axios from "axios"
import { Store } from "../utils/Store"
import { useRouter } from "next/router"
import Cookies from "js-cookie"
import { Controller, useForm } from "react-hook-form"
import { useSnackbar } from "notistack"

const Register = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const router = useRouter()
  const { redirect } = router.query
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  useEffect(() => {
    if (userInfo) {
      router.push("/")
    }
  }, [router, userInfo])

  const classes = useStyles()

  const onSubmitHandler = async ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    closeSnackbar()
    if (password !== confirmPassword) {
      enqueueSnackbar("Пароли не совподают!", { variant: "error" })
      return
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      })

      dispatch({ type: "USER_LOGIN", payload: data })
      Cookies.set("userInfo", data)
      router.push(redirect || "/")

      enqueueSnackbar("Успешная регистрация", { variant: "success" })
    } catch (error) {
      enqueueSnackbar(
        error.response.data ? error.response.data.message : error.message
      )
    }
  }
  return (
    <Layout title="Login">
      <form onSubmit={handleSubmit(onSubmitHandler)} className={classes.form}>
        <Typography component="h1">Регистрация</Typography>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  inputProps={{ type: "name" }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.name
                      ? errors.name.type === "minLength"
                        ? "Name is more than 1"
                        : "Name is required"
                      : " "
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: "email" }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Email is not valid"
                        : "Email is required"
                      : " "
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === "pattern"
                        ? "Password length more 5"
                        : "Password is required"
                      : " "
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === "pattern"
                        ? "confirmPassword length more 5"
                        : "confirmPassword is required"
                      : " "
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Регистрация
            </Button>
          </ListItem>

          <ListItem>
            Уже есть учетная запись? &nbsp;
            <NextLink href={`/login?redirect=${redirect || "/"}`} passHref>
              <Link>Войти</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}

export default Register
