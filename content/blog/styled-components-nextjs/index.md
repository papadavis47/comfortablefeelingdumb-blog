---
title: "Using styled-components in a Next.js project 🛠️"
date: "2021-10-06"
description: "How to setup a Next.js project for styled-components 🔧"
---

Lately, for personal projects, I have been using **Next.js** and it is wonderful 🚀

I also recently began learning the [styled-components](https://styled-components.com/) library.

For a [“digital garden”](https://papadavis47.dev) that I began working on a few days ago - I decided I wanted to combine the two.

![Next.js from Undraw](./undraw_next_js.png)

## Just a Bit of Prep Involved

An easy way to begin a **Next.js** project is to use the following command in a terminal:

`npx create-next-app <NameOfProject>`

I happen to prefer working with the [**yarn**](https://classic.yarnpkg.com/lang/en/) package manager, which I have installed globally, so I run the following:

`yarn create next-app <NameOfProject>`

When I run the command `yarn create next-app` **Next.js** defaults to using a [css-modules](https://github.com/css-modules/css-modules) solution.

The **Next.js** command line tool will create a `styles` folder containing a `Home.module.css` file - which is imported into the `pages/index.js` file.

It will also create a `globals.css` file - which is imported into the `pages/_app.js` file.

The first step, after scaffolding the project with the CLI tool, is to `cd` into the root of the project and install the required packages for **styled-components**:

`yarn add babel-plugin-styled-components styled-components`

Then create a `.babelrc` file at the root - with the following contents:

```js

// In .babelrc at the root of project

{
  "presets": ["next/babel"],
  "plugins": [
    [
      "styled-components",
      {
        "ssr": true
      }
    ]
  ]
}

```

The next step is to create a `_document.js` file in the `pages` directory and add the following code:

```js
import Document from "next/document"
import { ServerStyleSheet } from "styled-components"

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
```

This [code](https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js) can also be found at the styled-components-example in the Next.js repo.

Here is a link to the [documentation](https://styled-components.com/docs/advanced#nextjs) on the styled-components website.

---

## Choices After Setup

Now that we have the the dependencies installed - `.babelrc` configured - and the provided code in a `pages/_document.js` file - we can begin using styled-components as I would in any other React project.

Of course, we no longer need `Home.module.css` file in the `styles` folder - so we can delete that and the related import inside `index.js` - along with some other cleanup of the boilerplate code.

We can choose to still use `styles/globabls.css` and keep the related import inside `pages/_app.js` - or we can simply delete those too and create our own global styles with the `createGlobalStyle` API from styled-components.

I have used both options and it is simply a matter of preference ⭐

Hope this article helps you when using **styled-components** with _Next.js_! 💯

![SourceCode from Undraw](./undraw_Source_code.png)
