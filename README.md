![](https://lh3.googleusercontent.com/rVduSg1MkKOFJCTY2mzz1q30wSEk8VmhpH7_cJuz-Y9CX_JRuUvvtiFF79wKLNmbN1XNEj44JYe5dSE=w3200-h1746-rw)
Yonies
=======================
[![MIT license](http://img.shields.io/badge/license-MIT-lightgrey.svg)](http://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/%40angular%2Fmaterial.svg)](https://www.npmjs.com/package/%40angular%2Fmaterial)
[![Build Status](https://travis-ci.org/angular/material2.svg?branch=master)](https://travis-ci.org/angular/material2)
[![Gitter](https://badges.gitter.im/angular/material2.svg)](https://gitter.im/angular/material2?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

**Live Demo**: http://yoniesapp.com

## Yonies - Stream and Follow, Together! ##
We’ve been working to develop a totally new type of watch party. We call it Yonies!

Ever tried to watch your favorite creator's latest vid with friends? It's not fun, or easy. That’s why we built Yonies.

We believe in sharing your slice of pop culture with friends. It’s not all about fancy vacations, sushi dinners, or beautiful sunsets. Sometimes it’s an inside joke, a silly face, or talking about the Kardashian's latest pregnancy.

Pop culture is more entertaining when it’s shared with the people who know us best. And we know that no one is better at making us laugh than our friends.

Happy YoYo!
Team Yonies

### Testimonials

> [**“Nice! That README alone is already gold!”**](https://www.producthunt.com/tech/hackathon-starter#comment-224732)<br>
> — Adrian Le Bas

> [**“Awesome. Simply awesome.”**](https://www.producthunt.com/tech/hackathon-starter#comment-224966)<br>
> — Steven Rueter

> [**“I'm using it for a year now and many projects, it's an awesome boilerplate and the project is well maintained!”**](https://www.producthunt.com/tech/hackathon-starter#comment-228610)<br>
> — Kevin Granger

> **“Small world with Sahat's project. We were using his hackathon starter for our hackathon this past weekend and got some prizes. Really handy repo!”**<br>
> — Interview candidate for one of the companies I used to work with.

#### Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Scaffolding](#scaffolding)
    1. [Build](#build)
    1. [Production](#production)
    1. [Tests](#tests)
1. [Team](#team)
1. [Contributing](#contributing)
1. [Help](#help)

Prerequisites
-------------

- [MongoDB](https://www.mongodb.org/downloads)
- [Node.js 6.0+](http://nodejs.org)
- Command Line Tools
 - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp;**Mac OS X:** [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) (or **OS X 10.9+**: `xcode-select --install`)
 - <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17">&nbsp;**Windows:** [Visual Studio](https://www.visualstudio.com/products/visual-studio-community-vs)
 - <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17">&nbsp;**Ubuntu** / <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_Linux_Mint.png" height="17">&nbsp;**Linux Mint:** `sudo apt-get install build-essential`
 - <img src="http://i1-news.softpedia-static.com/images/extra/LINUX/small/slw218news1.png" height="17">&nbsp;**Fedora**: `sudo dnf groupinstall "Development Tools"`
 - <img src="https://en.opensuse.org/images/b/be/Logo-geeko_head.png" height="17">&nbsp;**OpenSUSE:** `sudo zypper install --type pattern devel_basis`

**Note:** If you are new to Node or Express, I recommend to watch
[Node.js and Express 101](https://www.youtube.com/watch?v=BN0JlMZCtNU)
screencast by Alex Ford that teaches Node and Express from scratch. Alternatively,
here is another great tutorial for complete beginners - [Getting Started With Node.js, Express, MongoDB](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/).

Getting Started
-------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone --depth=1 https://github.com/sahat/hackathon-starter.git myproject

# Change directory
cd myproject

# Install NPM dependencies
npm install

# Then simply start your app
node app.js
```

**Note:** I highly recommend installing [Nodemon](https://github.com/remy/nodemon).
It watches for any changes in your  node.js app and automatically restarts the
server. Once installed, instead of `node app.js` use `nodemon app.js`. It will
save you a lot of time in the long run, because you won't need to manually
restart the server each time you make a small change in code. To install, run
`sudo npm install -g nodemon`.


Obtaining API Keys
------------------

To use any of the included APIs or OAuth authentication methods, you will need
to obtain appropriate credentials: Client ID, Client Secret, API Key, or
Username & Password. You will need to go through each provider to generate new
credentials.

**Hackathon Starter 2.0 Update:** I have included dummy keys and passwords for
all API examples to get you up and running even faster. But don't forget to update
them with *your credentials* when you are ready to deploy an app.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1000px-Google_2015_logo.svg.png" width="200">

- Visit <a href="https://cloud.google.com/console/project" target="_blank">Google Cloud Console</a>
- Click on the **Create Project** button
- Enter *Project Name*, then click on **Create** button
- Then click on *APIs & auth* in the sidebar and select *API* tab
- Click on **Google+ API** under *Social APIs*, then click **Enable API**
- Next, under *APIs & auth* in the sidebar click on *Credentials* tab
- Click on **Create new Client ID** button
- Select *Web Application* and click on **Configure Consent Screen**
- Fill out the required fields then click on **Save**
- In the *Create Client ID* modal dialog:
 - **Application Type**: Web Application
 - **Authorized Javascript origins**: http://localhost:3000
 - **Authorized redirect URI**: http://localhost:3000/auth/google/callback
- Click on **Create Client ID** button
- Copy and paste *Client ID* and *Client secret* keys into `.env`

**Note:** When you ready to deploy to production don't forget to
add your new url to *Authorized Javascript origins* and *Authorized redirect URI*,
e.g. `http://my-awesome-app.herokuapp.com` and
`http://my-awesome-app.herokuapp.com/auth/google/callback` respectively.
The same goes for other providers.

<hr>

<img src="http://www.doit.ba/img/facebook.jpg" width="200">

- Visit <a href="https://developers.facebook.com/" target="_blank">Facebook Developers</a>
- Click **My Apps**, then select **Add a New App* from the dropdown menu
- Select **Website** platform and enter a new name for your app
- Click on the **Create New Facebook App ID** button
- Choose a **Category** that best describes your app
- Click on **Create App ID** button
- In the upper right corner click on **Skip Quick Start**
- Copy and paste *App ID* and *App Secret* keys into `.env`
 - **Note:** *App ID* is **clientID**, *App Secret* is **clientSecret**
- Click on the *Settings* tab in the left nav, then click on **+ Add Platform**
- Select **Website**
- Enter `http://localhost:3000` under *Site URL*

**Note:** After a successful sign in with Facebook, a user will be redirected back to home page with appended hash `#_=_` in the URL. It is *not* a bug. See this [Stack Overflow](https://stackoverflow.com/questions/7131909/facebook-callback-appends-to-return-url) discussion for ways to handle it.

<hr>

<img src="https://github.global.ssl.fastly.net/images/modules/logos_page/GitHub-Logo.png" width="200">

- Go to <a href="https://github.com/settings/profile" target="_blank">Account Settings</a>
- Select **Applications** from the sidebar
- Then inside **Developer applications** click on **Register new application**
- Enter *Application Name* and *Homepage URL*
- For *Authorization Callback URL*: http://localhost:3000/auth/github/callback
- Click **Register application**
- Now copy and paste *Client ID* and *Client Secret* keys into `.env` file

<hr>

<img src="https://g.twimg.com/ios_homescreen_icon.png" width="90">

- Sign in at <a href="https://apps.twitter.com/" target="_blank">https://apps.twitter.com</a>
- Click **Create a new application**
- Enter your application name, website and description
- For **Callback URL**: http://127.0.0.1:3000/auth/twitter/callback
- Go to **Settings** tab
- Under *Application Type* select **Read and Write** access
- Check the box **Allow this application to be used to Sign in with Twitter**
- Click **Update this Twitter's applications settings**
- Copy and paste *Consumer Key* and *Consumer Secret* keys into `.env` file

<hr>

<img src="http://www.danpontefract.com/wp-content/uploads/2014/02/logo-linkedin.png" width="200">

- Sign in at <a href="https://developer.linkedin.com/" target="_blank">LinkedIn Developer Network</a>
- From the account name dropdown menu select **API Keys**
 - *It may ask you to sign in once again*
- Click **+ Add New Application** button
- Fill out all the *required* fields
 - **OAuth 2.0 Redirect URLs**: http://localhost:3000/auth/linkedin/callback
 - **JavaScript API Domains**: http://localhost:3000
- For **Default Application Permissions** make sure at least the following is checked:
 - `r_basicprofile`
- Finish by clicking **Add Application** button
- Copy and paste *API Key* and *Secret Key* keys into `.env` file
 - *API Key* is your **clientID**
 - *Secret Key* is your **clientSecret**

<hr>

<img src="https://stripe.com/img/about/logos/logos/black@2x.png" width="200">

- <a href="https://stripe.com/" target="_blank">Sign up</a> or log into your <a href="https://manage.stripe.com" target="_blank">dashboard</a>
- Click on your profile and click on Account Settings
- Then click on **API Keys**
- Copy the **Secret Key**. and add this into `.env` file

<hr>

<img src="https://pixabay.com/static/uploads/photo/2015/05/26/09/37/paypal-784404_960_720.png" width="200">

- Visit <a href="https://developer.paypal.com" target="_blank">PayPal Developer</a>
- Log in to your PayPal account
- Click **Applications > Create App** in the navigation bar
- Enter *Application Name*, then click **Create app**
- Copy and paste *Client ID* and *Secret* keys into `.env` file
- *App ID* is **client_id**, *App Secret* is **client_secret**
- Change **host** to api.paypal.com if you want to test against production and use the live credentials

<hr>

<img src="http://33.media.tumblr.com/ffaf0075be879b3ab0b87f0b8bcc6814/tumblr_inline_n965bkOymr1qzxhga.png" width="200">

- Go to <a href="https://developer.foursquare.com" target="_blank">Foursquare for Developers</a>
- Click on **My Apps** in the top menu
- Click the **Create A New App** button
- Enter *App Name*, *Welcome page url*,
- For **Redirect URI**: http://localhost:3000/auth/foursquare/callback
- Click **Save Changes**
- Copy and paste *Client ID* and *Client Secret* keys into `.env` file

<hr>

<img src="http://img4.wikia.nocookie.net/__cb20130520163346/logopedia/images/8/8d/Tumblr_logo_by_x_1337_x-d5ikwpp.png" width="200">

- Go to <a href="http://www.tumblr.com/oauth/apps" target="_blank">http://www.tumblr.com/oauth/apps</a>
- Once signed in, click **+Register application**
- Fill in all the details
- For **Default Callback URL**: `http://localhost:3000/auth/tumblr/callback`
- Click **✔Register**
- Copy and paste *OAuth consumer key* and *OAuth consumer secret* keys into `.env` file

<hr>

<img src="http://www.technologytell.com/gaming/files/2012/01/steam_logo.jpg" width="200">

- Go to <a href="http://steamcommunity.com/dev/apikey" target="_blank">http://steamcommunity.com/dev/apikey</a>
- Sign in with your existing Steam account
- Enter your *Domain Name*, then and click **Register**
- Copy and paste *Key* into `.env` file

<hr>

<img src="https://sendgrid.com/brand/sg-logo-300.png" width="200">

- Go to <a href="https://sendgrid.com/user/signup" target="_blank">https://sendgrid.com/user/signup</a>
- Sign up and **confirm** your account via the *activation email*
- Then enter your SendGrid *Username* and *Password* into `.env` file

<hr>

<img src="https://raw.github.com/mailgun/media/master/Mailgun_Primary.png" width="200">

- Go to <a href="http://www.mailgun.com" target="_blank">http://www.mailgun.com</a>
- Sign up and add your *Domain Name*
- From the domain overview, copy and paste the default SMTP *Login* and *Password* into `.env` file

<hr>

<img src="https://s3.amazonaws.com/ahoy-assets.twilio.com/global/images/wordmark.svg" width="200">

- Go to <a href="https://www.twilio.com/try-twilio" target="_blank">https://www.twilio.com/try-twilio</a>
- Sign up for an account.
- Once logged into the dashboard, expand the link 'show api credentials'
- Copy your Account Sid and Auth Token

Project Structure
-----------------

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **config**/passport.js             | Passport Local and OAuth strategies, plus login middleware.  |
| **controllers**/api.js             | Controller for /api route and all api examples.              |
| **controllers**/contact.js         | Controller for contact form.                                 |
| **controllers**/home.js            | Controller for home page (index).                            |
| **controllers**/user.js            | Controller for user account management.                      |
| **models**/User.js                 | Mongoose schema and model for User.                          |
| **public**/                        | Static assets (fonts, css, js, img).                         |
| **public**/**js**/application.js   | Specify client-side JavaScript dependencies.                 |
| **public**/**js**/main.js          | Place your client-side JavaScript here.                      |
| **public**/**css**/main.scss       | Main stylesheet for your app.                                |
| **public/css/themes**/default.scss | Some Bootstrap overrides to make it look prettier.           |
| **views/account**/                 | Templates for *login, password reset, signup, profile*.      |
| **views/api**/                     | Templates for API Examples.                                  |
| **views/partials**/flash.pug       | Error, info and success flash notifications.                 |
| **views/partials**/header.pug      | Navbar partial template.                                     |
| **views/partials**/footer.pug      | Footer partial template.                                     |
| **views**/layout.pug               | Base template.                                               |
| **views**/home.pug                 | Home page template.                                          |
| .env.example                       | Your API keys, tokens, passwords and database URI.           |
| app.js                             | The main application file.                                   |
| package.json                       | NPM dependencies.                                            |
| package-lock.lock                          | Contains exact versions of NPM dependencies in package.json. |

**Note:** There is no preference how you name or structure your views.
You could place all your templates in a top-level `views` directory without
having a nested folder structure, if that makes things easier for you.
Just don't forget to update `extends ../layout`  and corresponding
`res.render()` paths in controllers.

List of Packages
----------------

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| async                           | Utility library that provides asynchronous control flow.              |
| bcrypt-nodejs                   | Library for hashing and salting user passwords.                       |
| cheerio                         | Scrape web pages using jQuery-style syntax.                           |
| clockwork                       | Clockwork SMS API library.                                            |
| connect-mongo                   | MongoDB session store for Express.                                    |
| dotenv                          | Loads environment variables from .env file.                           |
| express                         | Node.js web framework.                                                |
| body-parser                     | Express 4 middleware.                                                 |
| express-session                 | Express 4 middleware.                                                 |
| morgan                          | Express 4 middleware.                                                 |
| compression                     | Express 4 middleware.                                                 |
| errorhandler                    | Express 4 middleware.                                                 |
| serve-favicon                   | Express 4 middleware offering favicon serving and caching.            |
| express-flash                   | Provides flash messages for Express.                                  |
| express-status-monitor          | Reports real-time server metrics for Express.                         |
| express-validator               | Easy form validation for Express.                                     |
| fbgraph                         | Facebook Graph API library.                                           |
| github                          | GitHub API library.                                                   |
| pug (jade)                      | Template engine for Express.                                          |
| lastfm                          | Last.fm API library.                                                  |
| instagram-node                  | Instagram API library.                                                |
| lob                             | Lob API library                                                       |
| lusca                           | CSRF middleware.                                                      |
| mongoose                        | MongoDB ODM.                                                          |
| node-foursquare                 | Foursquare API library.                                               |
| node-linkedin                   | LinkedIn API library.                                                 |
| node-sass-middleware            | Sass middleware compiler.                                                 |
| nodemailer                      | Node.js library for sending emails.                                   |
| passport                        | Simple and elegant authentication library for node.js                 |
| passport-facebook               | Sign-in with Facebook plugin.                                         |
| passport-github                 | Sign-in with GitHub plugin.                                           |
| passport-google-oauth           | Sign-in with Google plugin.                                           |
| passport-twitter                | Sign-in with Twitter plugin.                                          |
| passport-instagram              | Sign-in with Instagram plugin.                                        |
| passport-local                  | Sign-in with Username and Password plugin.                            |
| passport-linkedin-oauth2        | Sign-in with LinkedIn plugin.                                         |
| passport-oauth                  | Allows you to set up your own OAuth 1.0a and OAuth 2.0 strategies.    |
| paypal-rest-sdk                 | PayPal APIs library.                                                  |
| request                         | Simplified HTTP request library.                                      |
| stripe                          | Offical Stripe API library.                                           |
| tumblr.js                       | Tumblr API library.                                                   |
| twilio                          | Twilio API library.                                                   |
| twit                            | Twitter API library.                                                  |
| lodash                          | Handy JavaScript utlities library.                                    |
| validator                       | Used in conjunction with express-validator in **controllers/api.js**. |
| mocha                           | Test framework.                                                       |
| chai                            | BDD/TDD assertion library.                                            |
| supertest                       | HTTP assertion library.                                               |

## Requirements ##
This project uses:
* [**F**irebase](http://www.firebase.com) ([Firebase](https://www.firebase.com)): database
* [**E**xpress.js](http://expressjs.com): backend framework
* [**A**ngular 4](https://angular.io): frontend framework
* [**N**ode.js](https://nodejs.org): runtime environment
* [**P**ython](https://www.python.org/): runtime environment
* [**F**lask](http://expressjs.com): backend framework

Other tools and technologies used:
* [Angular CLI](https://cli.angular.io): frontend scaffolding
* [Redis](https://cli.angular.io): frontend scaffolding
* [Docker](https://cli.angular.io): frontend scaffolding
* [NginX](https://cli.angular.io): frontend scaffolding
* [AWS](https://cli.angular.io): frontend scaffolding
* [Bootstrap](http://www.getbootstrap.com): layout and styles
* [Font Awesome](http://fontawesome.io): icons
* [TypeScript](https://www.typescriptlang.org): typed superset of JavaScript
* [Adobe Creative Suite](https://cli.angular.io): frontend scaffolding
* [Socket.IO](https://cli.angular.io): frontend scaffolding
* [SQL Alchemy](https://cli.angular.io): frontend scaffolding
* [Sequelize](https://cli.angular.io): frontend scaffolding
* [PostGRES](https://cli.angular.io): frontend scaffolding

## Development ##
`npm run dev`: [concurrently](https://github.com/kimmobrunfeldt/concurrently) execute Firebase, Angular build, TypeScript compiler, Flask and Express servers.

A window will automatically open at [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

### Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build

### Production
`npm run prod`: run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000) . 
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Tests
Before running the tests make sure you are serving the app via `ng serve`.

* Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
* Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Yonies Team
  - __Product Owner__: [Nadina Gerlach](https://github.com/nadinagerlach)
  - __Scrum Master__: [Gabriel Katz](https://github.com/gabekatz)
  - __Development Team Members__: [David Kang](https://github.com/davidxkang), [Dan Kim](https://github.com/dankim9)

### Project status
Yonies is currently in beta and under active development.
During beta, new features will be added regularly and APIs will evolve based on user feedback.

If you'd like to contribute, you must follow our [contributing guidelines](https://github.com/unexpected-lion/ourglass/blob/master/contributing.md).
You can look through the issues (which should be up-to-date on who is working on which features
and which pieces are blocked) and make a comment.
Also see our [`Good for community contribution`](https://github.com/angular/material2/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+for+community+contribution%22)
label.

High level stuff planned for Q4 2017 (October - December):
* RC and stable release
* Research and prototyping for virtual-scroll
* Research and exploration for data visualization
* cdkTree and matTree
* Expanded cdkTable features
* cdk/svg
* cdk/dialog
* Switch build to bazel
* Overlay positioning improvements
