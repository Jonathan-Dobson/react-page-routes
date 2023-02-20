# react-page-routes

Control routing from attributes in your component.

## How it works

Provide an array of Page Components to be mapped to a React-Router `<Route />` component using a `title` and `path` attribute that should be define in each Page component.

## Setup

### Install

```shell
npm install react-page-routes
```

### 1. Create Page Components

  Add both `path` and `title` attributes to all of your Page Components.

```javascript
Logout.path = "/shop";
Logout.title = "Shop Now!";

export default function Shop() {
  return <h1>Shop Now Page!!!</h1>;
}
```

The `path` will be provided to `<Route path={}>` in the `Pages` component and `<NavLink to={}>` in the `NavBar` component.

The `title` will be provided to `<NavLink>{title}</Navlink>` in the `NavBar` component

### 2. Create a directory index of all pages

1.  Import the `directory` function.
2.  Import all of your page components
3.  Invoke the `directory` function, passing all of your page components as props.
4.  `export default` the results

```javascript
// Example.ts

import { routes } from "react-page-routes";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";

export default routes(
  Home,
  Shop
  // <- add in any additional Page Components here.
);
```

### 3. Use

```javascript
// App.tsx
import { Example } from "./Example.ts";

function App() {
  return (
    <div>
      <Example.NavBar />
      <Example.Pages />
    </div>
  );
}
```
