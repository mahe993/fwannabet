# Frontend react app template

Boilerplate for new create react app including personalized preferred practices in test files

# CSS defaults

1. CSS rule reset to `box-sizing: border-box, padding: 0, margin: 0`
2. All `<img>` elements are to be wrapped within a container with explicit width. `<img>` own width set to 100%. default css style on all `<img>` elements have been set to `object-fit: contain`

# Packages

1. emotion for styling
2. material ui
3. axios
4. react-hook-form
5. react-router-dom

# Preferred practices

1. Develop for 360px viewport width (smallest size we should develop for imo) first. Set min-width on this viewport as much as possible.
2. Use MUI `<Box>` for general layout.
3. CSS to be applied inline either with `<Box>` properties or
   use next two lines at top of file and use `{css={css`insert css here`}}` prop on component.

```javascript
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
```

4. Animations to be applied using styled components.
5. Refactor static variables/helper fns to `constants.js` as much as possible.
6. Important to note never to use `100vw` as width on any component.
7. Horizontal scrolling should never appear on the app. Fix horizontal scrolling the moment it appears.
8. Forms should always be a component on their own
9. Refer to `<TestPage />` component as example.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
