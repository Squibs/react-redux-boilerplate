# React Boilerplate

A personal starting point for my own React projects. For now this is a slight variation/bootstrap of Stephen Grider's [ReduxSimpleStarter](https://github.com/StephenGrider/ReduxSimpleStarter). I am aiming to evolve this boilerplate overtime, as I learn, to suite myself.

If nothing else this boilerplate will simply serve to help me understand Webpack more.

---

<h2>Table of Contents</h2>

<!-- TOC -->

- [File Structure](#file-structure)
- [Scripts](#scripts)
- [Notable Sources](#notable-sources)
- [Current Known Issues](#current-known-issues)

<!-- /TOC -->

---

## File Structure

At the moment I am structuring this boilerplate to not be very portable/modular as it could be. I am putting all assets in one spot. I am definitely looking to use the ducks/re-ducks methods of folder structure in the future. Many projects starting out, as I learn React, are going to be small in nature and as soon as my projects start to get larger... I will definitely be adapting this boilerplate to match.

For future reference (switching from function-first to feature-first folder structure):
- [Structure your React-Redux project for scalability and maintainability](https://levelup.gitconnected.com/structure-your-react-redux-project-for-scalability-and-maintainability-618ad82e32b7)
- [Scaling your Redux App with ducks](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be)

*With the above in mind, I currently have an assets folder that is separate from the `src` folder to house css and other files not directly related react/redux files. After a few projects to help me better understand React/Redux I can hopefully correct this and switch to a more component based structure.*

```
react-redux-boilerplate/
├──assets/                        * any files not related to react/redux
│   ├──images/                      * images used in project
│   ├──stylesheets/                 * houses stylesheets for project
│   │   ├──bootstrap_custom.scss      * import wanted bootstrap styles
│   │   ├──index.scss                 * scss semi-entrypoint (imported in index.jsx)
│   │   └──main.scss                  * main styles, applied to every component
│   └──webfonts/                    * local fonts; rtraleway
│
├──src/                           * files for react/redux
│   ├──actions/                     * redux actions
│   ├──components/                  * react components
│   ├──container/                   * react-redux containers
│   ├──reducers/                    * redux reducers
│   └──index.jsx                    * app/entrypoint
│
├──.babelrc                       * babel configuration options
├──.eslintrc                      * eslint configuration options
├──.gitignore                     * git ignored files
├──package.json                   * npm dependencies & scripts
├──postcss.config.js              * postcss configuration options (used in post-css loader)
├──README.md                      * this document
├──webpack.common.js              * webpack configuration options shared between development and production
├──webpack.development.js         * webpack configuration options for development
├──webpack.production.js          * webpack configuration options for production
└──yarn.lock                      * stores dependency versions and other other important information
```

*Another example of folder structure (for future reference) [Angular Starter](https://github.com/paasplatform/idp-service).*

--

Also look into using [Aphrodite](https://github.com/Khan/aphrodite); already using Airbnb eslint rules, might as well follow through and use component-based styling as well. Found while looking into [stylelint rules](https://github.com/airbnb/css/issues/45#issuecomment-310527115).

[Airbnb CSS-in-JavaScript Style Guide](https://github.com/airbnb/javascript/tree/master/css-in-javascript) and [CSS in JavaScript: The future of component-based styling](https://medium.freecodecamp.org/css-in-javascript-the-future-of-component-based-styling-70b161a79a32).

--

[Better eslint configuration/setup.](https://github.com/airbnb/javascript/issues/1589#issuecomment-344097023)

---

## Scripts

When repository is initially cloned, run initial setup:

```
yarn install
```

Create development build served with webpack dev server:

```
yarn run start
```

Create production build:

```
yarn run build
```

---

## Notable Sources

There were a few sources of information about Webpack 4 (or Webpack in general) that really helped me put this together:

- The [Webpack guides](https://webpack.js.org/guides/), while outdated at the creation time of this boilerplate, gave me a general flow of the order in-which to learn Webpack.
- Many of the guides in [Google Developers Web Fundamentals](https://developers.google.com/web/fundamentals/performance/get-started/). The *Web Performance Optimization with Webpack* guides specifically.
- Also the many references I have scattered throughout, mostly the webpack configuration files; all proved to be useful in various ways.

---

## Current Known Issues

- Parent directories with spaces aren't supported by webpack-dev-server at the moment. [Issue.](https://github.com/webpack/webpack-dev-server/issues/1375)
  - `C:/My Projects/project-1` - would cause an issue.
  - `C:/My-Projects/project-1` - would be okay.

- When emitting `runtimeChunk:`, entry chunks use `chunkFilename:` instead of `filename:`. [Issue.](https://github.com/webpack/webpack/issues/6598)
  - This causes a number of other problems in the `./dist` folder.
    1. The manifest takes the app.bundle place in the root of the `./dist/js` folder and pushes app into the `./dist/js/chunks` folder.
    2. This causes the entrypoint to use `chunkFilename:` instead of `filename:`. (This is also brought up in the linked issue above.)
    ```
    ERROR in chunk scripts/runtime [entry]
    [name]-[chunkhash].js
    Cannot use [chunkhash] or [contenthash] for chunk in '[name]-[chunkhash].js' (use [hash] instead)
    ```
    3. CSS for the app is now not named app.css, but instead uses the id for the app.bundle.

- When using axios, there are issues with IE11 and probably before. [Issue.](https://github.com/axios/axios/issues/135)
     - This problem is already solved, and requires polyfilling `Promise` using es6-promise.
