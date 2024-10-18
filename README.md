<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


## google authentification 
1. Go to Google Cloud Console:

Open your browser and navigate to Google Cloud Console.

2 . Create a New Project (if you don't have one already):

In the top-left corner, click the project dropdown.
Click New Project.
Provide a name for your project and select a location (if necessary).
Click Create.

3 . Enable the Google OAuth API:

After creating the project, go to the API & Services section on the left-hand sidebar.
Click Library.
In the search bar, type "Google OAuth" or "Google+ API".
Select Google Identity Platform (OAuth) and click Enable.

4 . Create OAuth 2.0 Credentials:

Go to the Credentials tab on the left sidebar under the APIs & Services section.
Click + CREATE CREDENTIALS at the top of the page and select OAuth 2.0 Client IDs.
You will be prompted to configure the OAuth consent screen.

5 . Configure the OAuth Consent Screen:

Select either External (if you plan to let users outside your organization authenticate) or Internal (for GSuite users in your organization).
Fill in the basic information, including your app name, user support email, and app domain (if applicable).
For testing purposes, you can skip the "Scopes" section and just click Save and Continue.
6 . Create the OAuth 2.0 Client ID:

Once your OAuth consent screen is set up, return to Credentials and create the OAuth 2.0 credentials.
Select Web application as the application type.
Provide a name for your OAuth 2.0 client ID.
Under Authorized redirect URIs, you need to specify where Google will redirect users after they authenticate. For example, http://localhost:3000/auth/google/callback if you're running locally or the relevant URI in production.
Click Create.

7 . Get the clientID and clientSecret:

After you create the credentials, Google will provide you with a Client ID and Client Secret.
Copy them and store them in your .env file or your configuration.

8 . Set Redirect URI in Google Console (Optional if not done earlier):

If you didn't set the redirect URIs earlier, go back to your OAuth 2.0 Client ID entry in the credentials section, and click Edit.
Add the redirect URI: http://localhost:3000/auth/google/callback (or your production URI).



## github authentifivation

1 . Se connecter à GitHub :

Rendez-vous sur GitHub et connectez-vous à votre compte.

2 . Accéder aux paramètres du compte développeur :

Cliquez sur votre avatar dans le coin supérieur droit et sélectionnez Settings (Paramètres).
Dans la barre latérale gauche, sous Developer settings, cliquez sur OAuth Apps.

3 . Créer une nouvelle application OAuth :

Dans la section OAuth Apps, cliquez sur New OAuth App.

4 . Configurer votre application OAuth : Remplissez les champs requis :

Application Name: Donnez un nom à votre application (par exemple, "MonApplicationOAuth").
Homepage URL: Indiquez l'URL de votre site ou de l'application. Si vous êtes en développement local, cela pourrait être http://localhost:3000.
Authorization callback URL: C'est l'URL où GitHub redirigera l'utilisateur après l'authentification. Pour une application locale, cela pourrait être quelque chose comme : http://localhost:3000/auth/github/callback. 
Exemple de valeurs en développement local :

Homepage URL: http://localhost:3000
Callback URL: http://localhost:3000/auth/github/callback

5 . Enregistrer l'application :

Une fois les informations saisies, cliquez sur Register Application.

6 . Obtenir le clientID et clientSecret :

Après l’enregistrement, vous verrez votre Client ID directement dans la page d’informations de l’application.

7. Cliquez sur Generate a new client secret pour obtenir votre clientSecret.

8. Copiez ces deux valeurs pour les utiliser dans votre application NestJS.
Ajouter le clientID et clientSecret dans votre fichier .env




