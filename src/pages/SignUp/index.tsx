import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { UserAuth } from '../../context/authProvider';
import { Copyright } from '../../components/Copyright';
import { USER_REGEX, EMAIL_REGEX, PWD_REGEX } from '../../services/regex'

import './styles.scss'

const theme = createTheme()

export default function SignUp() {

  const [ createdUser, setCreatedUser ] = useState<Boolean>()

  const [ confirmedTerms, setConfirmedTerms ] = useState(false)

  const [ msgError, setMsgError ] = useState('')

  const [ user, setUser ] = useState('')
  const [ userFocus, setUserFocus ] = useState(false)
  const [ validUser, setValidUser ] = useState(false)

  const [ email, setEmail ] = useState('')
  const [ emailFocus, setEmailFocus ] = useState(false)
  const [ validEmail, setValidEmail ] = useState(false)

  const [ pwd, setPwd ] = useState('')
  const [ pwdFocus, setPwdFocus ] = useState(false)
  const [ validPwd, setValidPwd ] = useState(false)

  const { createUser, isEmailExist }: any = UserAuth()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log(isEmailExist)

    if (isEmailExist) setMsgError('Email já existente') 

    if (!confirmedTerms) setMsgError('Confirme os termos')

    if (validUser && validEmail && validPwd && confirmedTerms && !isEmailExist) {
      await createUser(user, email, pwd)
      return setCreatedUser(true)
    } else {
      return setCreatedUser(false)
    }
  }

  useEffect(() => {
    return setValidUser(USER_REGEX.test(user))
  }, [user])

  useEffect(() => {
    return setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    return setValidPwd(PWD_REGEX.test(pwd))
  }, [pwd])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          {createdUser && (
            <Navigate to="/" replace={true} />
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={userFocus ? true : false}
                  autoComplete="given-name"
                  name="name"
                  onChange={(e) => {
                    setUser(e.target.value)
                    setUserFocus(!validUser)
                  }}
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                  aria-invalid={validUser ? "false" : "true"}
                  onFocus={() => setUserFocus(!validUser)}
                />
                <FormHelperText className={userFocus && user && !validUser ? "invalid" : "valid"} error>Nome Inválido</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={emailFocus ? true : false}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailFocus(!validEmail)
                  }}
                  aria-invalid={validEmail ? "false" : "true"}
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onFocus={() => setEmailFocus(!validEmail)}
                />
                <FormHelperText className={emailFocus && email && !validEmail ? "invalid" : "valid"} error>Email Inválido</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={pwdFocus ? true : false}
                  required
                  onChange={(e) =>  {
                    setPwd(e.target.value)
                    setPwdFocus(!validPwd)
                  }}
                  aria-invalid={validPwd ? "false" : "true"}
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onFocus={() => setPwdFocus(!validPwd)} 
                />
                <FormHelperText className={pwdFocus && pwd && !validPwd ? "invalid" : "valid"} error>Senha Inválido</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  name="checkBox"
                  onChange={() => { setConfirmedTerms(!confirmedTerms); !confirmedTerms ? setMsgError('') : '' }}
                  control={<Checkbox value={confirmedTerms} color="primary" />}
                  label="Eu aceito todos os termos, e também começar a ter bons hábitos a partir de hoje."
                />
                <FormHelperText className={!createdUser && !isEmailExist ? "invalid" : "valid"} error>{msgError}</FormHelperText>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar-se
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to='../SignIn'>
                  Já tem uma Conta? Entre Agora.
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