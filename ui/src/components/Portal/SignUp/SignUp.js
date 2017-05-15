import React from 'react'
import styles from '../common/style.scss'
import { LabelInput, Button } from 'components/common'
import { Box, BoxHeader, BoxBody, BoxFooter } from 'components/common/Box'
import { AdviceLink } from 'components/Portal/common'
import { browserHistory } from 'react-router'
import { AuthService } from 'services'

const subscribe = (event) => {
  event.preventDefault()
  const credentials = {
    username: event.target.username.value,
    password: event.target.password.value,
    email: event.target.email.value,
    verifyPassword: event.target.verifyPassword.value,
  }
  AuthService.subscribe(credentials)
    .then(response => response.json)
    .then((data) => {
      window.localStorage.setItem('auth-token', data.token)
      browserHistory.push('/app')
    })
}

const SignUp = ( ) => {
  return (
    <div className={styles.component}>
      <Box>
        <BoxHeader withBorder className={styles.header}>
          <h3 className="box-title">Inscription</h3>
        </BoxHeader>
        <BoxBody>
          <form onSubmit={subscribe}>
            <LabelInput
              label="Nom d'utilisateur"
              domProps={{
                placeholder: "Okazari",
                type: 'text',
                name: 'username'
              }}
            />
            <LabelInput
              label="Adresse mail"
              domProps={{
                placeholder: "myvirtualstorybook@gmail.com",
                type: 'email',
                name: 'email'
              }}
            />
            <LabelInput
              label="Mot de passe"
              domProps={{
                placeholder: "thisisasecret",
                type: 'password',
                name: 'password'
              }}
            />
            <LabelInput
              label="Mot de passe (vérification)"
              domProps={{
                placeholder: "thisisasecret",
                type: 'password',
                name: 'verifyPassword'
              }}
            />
            <Button className={styles.button}>
              INSCRIPTION
            </Button>
          </form>
        </BoxBody>
        <BoxFooter>
          <AdviceLink
            advice="Déjà inscris ?"
            label="Connecte toi !"
            link="/portal/signin"
          />
          <AdviceLink
            advice="Nom d'utilisateur/Mot de passe oublié ?"
            label="Aidez moi !"
            link="/portal/recover"
          />
        </BoxFooter>
      </Box>
    </div>
  )
}

export default SignUp
