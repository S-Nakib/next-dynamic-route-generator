![version1.1.0](https://img.shields.io/badge/version-1.1.0-green) ![contributions:welcome](https://img.shields.io/badge/contributions-welcome-red)
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

`path`: The elements of `paths` array.

`route`: The url string. Such as `"about/about_me"`

<h3 id="example">For example,</h3>

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
And here comes `next-dynamic-route-generator` to rescue you. It provides a method `getPaths` which will generate the `paths` key for you. You just need to point out the directory where you have kept your contents and the file extension of your contents. This method is described [here](#getpaths).

You will also need to work with [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) method, which takes a parameter of the same type as elements of the `paths` array. Here the whole array won't be passed at once but each element at a time.

On `getStaticProps`, you need to fetch the `.md` files. But here you don't have the file routes but an object containing `params` key which you get as a parameter. Here also we have got your back. Just pass the parameter you get on `getStaticProps` as it is to the method `generateRoute` which will return the `route` string without any extension.
You can also pass an optional second argument string defining the extension of your files to get the route with the extension. This method is described [here](#generateroute).

### By the way, to make `generateRoute` work on `getStaticProps`, you have to use `getPaths` on `getStaticPaths`.

<br/><br/>

<h1 id="setup"> Setup</h1>

The [pages](https://nextjs.org/docs/basic-features/pages) directory is a special directory in `next.js`.
Inside the `pages` directory create a `.js/.ts` file named as `[...slug].js/ts` . Here the `[]` and `...` have special meaning([see here](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes)).

According to `next.js` documentation, you can use any identifier other than `slug`.

### But remind, to use this package you must name this as `slug`. Otherwise, it won't work.

Since we are using `slug` as the key on `paths`, the `generateRoute` will also check for `slug`, so to use `generateRoute` you must get the `paths` with `getPaths`.

#### importing

```typescript
import getPaths, { generateRoute } from "next-dynamic-route-generator";
```

Now on the `[...slug].js/ts` file, `getStaticPaths` and `getStaticProps` are needed to be implemented.

### Here, It is recommended to keep your contents(.md, .mdx, etc files) in one directory and to keep all the contents files with the same extension.

That means the all the contents files should be either `.md` or `.mdx` or any other but don't mix two different extensions such as creating files with `.md` and `.mdx` both.  
This will prevent duplication of elements of the `paths` key. But still, if you want to do otherwise then you will need to call `getPaths` more than once and handle duplication on your own.
The static files which will not be converted to URL such as image, etc can have any extension since they will not generate any route.

Here if you create a file named as `index`(i.e. `index.md` here) in a subdirectory then it will be as `/` in the site.

<br/><br/>

<h1 id="getpaths">getPaths</h1>

`getPaths` takes two string parameters. They are, the path of the directory from root where your posts or contents remain and the extension of the files you want to capture.
For our previous [example](#example) it will be,

```typescript
const paths = getPaths("posts", "md");
```

Here if we wanted the routes only for contents of `posts/javascript`, then it would be

```typescript
const paths = getPaths("posts/javascript", "md");
```

<br></br>

<h1 id="generateroute">generateRoute</h1>

Pass the parameter of `getStaticProps` directly(without any destructuring) to the `generateRoute` method. It will return the `route` as a string. You can also pass an optional parameter extension to get the route with the extension. Without passing an extension, you will get the route without an extension.

```javascript
export async function getStaticProps(data) {
    const route = generateRoute(data, "md");
}
```

### Error handling

The `getStaticPaths` and `getStaticProps` methods are called only at the time of building the static site. They are not something like `express.js`s middleware functions, which run for each request.
So, it is not suitable to catch the error and let it go. Rather the user should be shown directly if anything wrong happens so that the user can take measures and build the site perfectly.
So, here we have validated the user input(method arguments) and thrown error with an error message so that the user can easily catch what has gone wrong.
