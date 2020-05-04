# Moneris React

This project provides a library to easily use Moneris Hybrid Tokenization with React  

## Development

### Testing

```shell
npm run test
```

### Building

```shell
npm run build
```

### Storybook

To run a live-reload Storybook server on your local machine:

```shell
npm run storybook
```

To export your Storybook as static files:

```shell
npm run storybook:export
```

You can then serve the files under `storybook-static` using S3, GitHub pages, Express etc. I've hosted this library at: https://www.harveydelaney.com/react-component-library

### Generating New Components

I've included a handy NodeJS util file under `util` called `create-component.js`. Instead of copy pasting components to create a new component, you can instead run this command to generate all the files you need to start building out a new component. To use it:

```shell
npm run generate YourComponentName
```

This will generate:

```shell
/src
  /YourComponentName
    YourComponentName.tsx
    YourComponentName.stories.tsx
    YourComponentName.test.tsx
    YourComponentName.types.ts
    YourComponentName.scss
```

The default templates for each file can be modified under `util/templates`.

Don't forget to add the component to your `index.ts` exports if you want the library to export the component!

### Installing Component Library Locally

Let's say you have another project (`test-app`) on your machine that you want to try installing the component library into without having to first publish the component library. In the `test-app` directory, you can run:

```shell
npm i --save ../react-component-library
```

which will install the local component library as a dependency in `test-app`. It'll then appear as a dependency in `package.json` like:

```json
  "dependencies": {
    ...
    "react-component-library": "file:../react-component-library",
    ...
  },
```

Your components can then be imported and used in that project.

## Publishing

First make sure that you've updated the `name` field in `package.json` to reflect your NPM package name in your private or public NPM registry. Then run:

```shell
npm publish
```

### Component Usage

Let's say you created a public NPM package called `harvey-component-library` with the `CheckoutComponent` component created in this repository.

Usage of the component (after the library installed as a dependency into another project) will be:

```javascript
import React from "react";
import { CheckoutComponent } from "harvey-component-library";

const App = () => (
  <div className="app-container">
    <h1>Hello I'm consuming the component library</h1>
    <CheckoutComponent theme="primary" />
  </div>
);

export default App;
```

### Can I code split my components?

Yes you can.

[Read this section of my blog post](https://blog.harveydelaney.com/creating-your-own-react-component-library/#introducing-code-splitting-optional-) to find out how.

Or check out [this commit](https://github.com/HarveyD/react-component-library/commit/94631be5a871f3b39dbc3e9bd3e75a8ae5b3b759) to see what changes are neccesary to implement it.

## Thanks

Started with @HarveyD's https://github.com/HarveyD/react-component-library
