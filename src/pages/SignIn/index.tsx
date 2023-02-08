import { useEffect, useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FormHelperText } from '@mui/material'

import { UserAuth } from "../../context/authProvider"

import { EMAIL_REGEX, PWD_REGEX } from '../../services/regex'
import { Copyright } from "../../components/Copyright"


import './styles.scss'

const theme = createTheme()

export default function SignIn() {

  const { signIn, user, msgError, isUserExist }: any = UserAuth()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const emailValue = data.get('email')
    const pwdValue = data.get('password')

    await signIn(emailValue, pwdValue)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      {user && (
        <Navigate to={from} />
      )}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <FormHelperText className={!isUserExist ? "invalid" : "valid"} error>{msgError}</FormHelperText>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to='../SignUp'>
                  Ainda não tem uma conta? Cadastre-se.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}