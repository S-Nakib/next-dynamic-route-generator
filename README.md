![version2.0.0](https://img.shields.io/badge/version-3.0.0-green) ![License: MIT](https://img.shields.io/badge/license-MIT-blue) ![contributions:welcome](https://img.shields.io/badge/contributions-welcome-red)
<br/>

# Installation

```
npm i next-dynamic-route-generator
```

# About

This is a tiny, simple package with built-in **typescript** support.
This package is well tested and has custom error message for common user errors such as invalid argument passing, etc.
<br/><br/>

It is created as a helper to be used on `next.js`'s `getStaticPath` and `getStaticProps` methods when we use `next.js` to create static sites where the site's contents(such as `.md, .mdx`, etc files) remain inside a directory of the same project and `next.js` builds the site according to the contents of that directory.

<br/>

# Overview

From here we are assuming that you are familiar with `next.js`. You need not be an expert though. You may read the `next.js` [documentation](https://nextjs.org/docs/getting-started) if needed.

### Some definitions:

`paths`: The same as [paths](https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required) of `next.js`. It is an array.

`params`: The [params](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) key of the parameter of `getStaticProps`.

`route`: The url string. Such as `"about/about_me"`

`queryParam`: Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets such as `pages/post/[...slug].js`. [See docs](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes).  
Here `slug` is the queryParam. That means for dynamic routes, the name of the file without the brackets and 3 dots(...) is the `queryParam`.

<h3 id="example">An example,</h3>

Let you have created a `next.js` project to generate a static blog. It has a `posts` directory, which contains the blog posts as `.md` files.
The project file structure is something like this. (You may replace the `.js` to `.ts` if you want)

<pre>
--index.js  
--package.json 
--pages/[...slug].js  
--posts/about.md  
       /cpp/introduction.md  
       /javascript/asynchronous_javascript.md  
                  /nodejs/nodejs_architecture.md  
 
</pre>

Now you want the URL of the site to be the same as `posts` directory structure. That is...

<pre>
your_domain/about
           /cpp/introduction  
           /javascript/asynchronous_javascript  
                      /nodejs/nodejs_architecture
 </pre>

So you need to use [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) to generate those paths statically.

The returned object of the [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) must contain a key named as [paths](https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required). This key is an array defining the route/URL structure of the site. Since you want the route/URL structure to be the same as the `posts` directory structure, you need to pass the [paths](https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required) key accordingly.  
And here comes `next-dynamic-route-generator` to rescue you. It provides a method `getPaths` which will generate the `paths` key for you. This method is described [here](#getpaths).

You will also need to work with [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) method. The `getStaticProps` method takes a parameter which has a [params](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) key.

From the `params` key you can get the current route and then fetch the contents(.md/.mdx or other files). Here also we have got your back. If the `params` key is not `undefined` then you can get the route by `generateRoute` method. This method is described [here](#generateroute).

Sometimes you may have some routes and you want to generate `paths`. This is possible using `generatePaths` method. This method is described [here](#generatepaths)

<br/><br/>

<h1 id="setup"> Setup</h1>

The [pages](https://nextjs.org/docs/basic-features/pages) directory is a special directory in `next.js`.
Inside the `pages` directory create a `.js/.ts` file named as `[...slug].js/ts` . Here the `[]` and `...` have special meaning([see here](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes)). The file name can be anything other than `[...slug]` such as `[...param]`, `[...a]` etc.
If the filename is `[...slug].js/ts` then here queryParam is `slug`

#### importing

```typescript
import getPaths, { generateRoute } from "next-dynamic-route-generator";
```

Now on the `[...slug].js/ts` file, `getStaticPaths` and `getStaticProps` are needed to be implemented.

<br/><br/>

<h1 id="getpaths">getPaths</h1>

`getPaths` takes an object as parameter. The keys are,

`dirPath` (type: string, required): the path of the directory from root where your posts or contents remain and the extension of the files you want to capture.  
On the previous example, it is `"../posts"`

`queryParam` (type:string, required): The queryParam. For the previous example, it will be `"slug"`.

`extension` (type:string, optional): The extension of the files we want to capture.  
In the previous example, it is `".md"`.

`globPattern` (type:string, optional): The glob pattern to match the files we want to capture.  
On the previous example, it will be `"**/*.md"`.

<b>Remind, `extension` and `globPattern` are optional individually. But you must pass at least one of them. </b>
If both are passed the files will be captured according to `extension` key.

So, For our previous [example](#example) it will

```typescript
const paths = getPaths({
    dirPath: "../posts",
    queryParam: "slug",
    extension: ".md"
});
```

<br></br>

<h1 id="generateroute">generateRoute</h1>

If the `params` key exists on the parameter of `getStaticProps` and it is an array of strings, then the corresponding route can be generated using `generateRoute` method. The `params` key will always be an array of strings if the paths were generated using getPaths.  
It will return the `route` as a string.

`generateRoute` also takes an object as parameter. The keys are,

`params` (required): params key of the object that is passed on `getStaticProps`.[See here](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)

`queryParam` (type:string, required): The queryParam.

`dirPath` (string, optional): If we want our route to contain the dirPath then we need to pass it.

`extension` (string, optional): To get the route with extension pass one.

`absolute` (boolean, optional): Pass true to get absolute route. `default` is `false`.

So, For our previous [example](#example) it will be

```javascript
export async function getStaticProps(context) {
    if (context.params) {
        const route = generateRoute({
            params: context.params,
            queryParam: "slug",
            dirPath: "post,
            extension: ".md",
            absolute: true
        });
    }
}
```

<h1 id="generatepaths">generatePaths</h1>

This will simple take an object with two keys, they are `routes` and `queryParam`. Both are required.  
`routes` is an array of strings containing routes.  
It will return `paths` of those routes.

### Error handling

The `getStaticPaths` and `getStaticProps` methods are called only at the time of building the static site. They are not something like `express.js` middleware functions, which run for each API request.
So, it is not suitable to catch the error and let it go. Rather the user/developer should be shown directly if anything wrong happens so that he can take measures and build the site perfectly.
So, here we have validated the user input(method arguments) and thrown error with an error message so that the user can easily catch what has gone wrong.
