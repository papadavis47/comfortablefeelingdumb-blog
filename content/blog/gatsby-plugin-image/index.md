---
title: "Loving gatsby-plugin-image with Gatsby v3 💌"
date: "2021-08-24"
description: "All about a great new tool for Gatsby developers ⚙️"
---

I have been using the new `gatsby-plugin-image` with [Gatsby v3](https://www.gatsbyjs.com/blog/gatsby-v3/) on a recently started [personal project](https://lafamiliadavis.com/).

And I love it ❤️‍🔥

![True Love from Undraw](./undraw_true_love_cy8x.png)

## The first thing I noticed was the speed increase 🏎️

Optimizing images using `gatsby-plugin-image` becomes much, much easier.

In BETA release prior to when Gatsby v3 was shipped - and generally available since March 2021 - this plugin has a very straightforward API.

I have found working with it to be a great developer experience 👍

The plugin comes with two different components, `<StaticImage />` and a rewritten `<GatsbyImage />`.

There are also some helper functions - including `getImage()` and `getSrc()` - which are detailed thoroughly in the [docs](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/).

Both StaticImage and GatsbyImage components drastically reduce the "over-the-wire" size of images compared to using a simple `<img>` tag.

`gatsby-image-plugin` uses some brilliant abstractions to create source sets of your remote or local images. Similarly to a regular `<img>` element - you set an image with a `src` prop on your component. Various sizes and formats are created under the hood - in order to serve the most optimized version based on the client device and screen size.

More info about how this is accomplished can be found at the [Gatsby Conceptual Guides](https://www.gatsbyjs.com/docs/conceptual/using-gatsby-image/).

The new plugin was designed to take advantage of the recent [WebPImage standard](https://developers.google.com/speed/webp) as well as [AVIF images](https://netflixtechblog.com/avif-for-next-generation-image-coding-b1d75675fe4) - a brand new format used at Netflix, Google and several other large companies with gigantic websites. The AVIF format offers better sizes and quality over jpg or other standard file types.

## The next thing I noticed were the customization options 😄

Props are added manually to the component in the case of `<StaticImage />`, and they are added dynamically through data gathered from a GraphQL query if using the `<GatsbyImage />` option.

There is a long list of options to customize how your images render - including `layout`, `aspectRatio`, `placeholder`, `formats`, etc.

All prop options can be found at the [Gatsby-Image resource guide](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/).

Example from my recent project code:

```js
<StaticImage
  src="../images/john.jpg"
  alt="A self portrait in a rocking chair"
  width={700}
  placeholder="blurred"
  transformOptions={{ grayscale: true }}
  imgClassName={styles.pic}
/>
```

The following is a GraphQL query that gathers some image nodes from a local folder:

```js
export const data = graphql`
  {
    allFile(filter: { sourceInstanceName: { eq: "instagram" } }) {
      nodes {
        id
        name
        childImageSharp {
          gatsbyImageData(height: 300, width: 300, layout: FIXED)
        }
      }
    }
  }
`
```

Which I then map over in a page component - to display like so:

```js
// project styled using css modules
<div className={styles.picContainer}>
  {nodes.map(pic => {
    // calling helper function here
    const image = getImage(pic)
    return (
      <GatsbyImage
        key={pic.id}
        image={image}
        className={styles.instaPic}
        alt=""
      />
    )
  })}
</div>
```

All code for this project can be found by clicking [here](https://github.com/papadavis47/lafamiliadavis) 🤓

Lastly, to get up and running with these tools in your next Gatsby project, I recommend [this excellent 10 minute video](https://www.youtube.com/watch?v=zRtFwzF4p1o) by [Laurie Barth](https://twitter.com/laurieontech) from a talk during <a href="https://www.gatsbyconf.com/">GatsbyConf 2021</a>.

Laurie concisely goes over the options available when working with `gatsby-image-plugin`. This video contains all the information I needed in order to get started using it initially.

And, ofcourse, the [Gatsby docs](https://www.gatsbyjs.com/docs) are of very high quality 🥇

Happy coding with Gatsby v3!

![Celebration](./undraw_well_done_i2wr.png)
