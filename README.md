# react-page-routes

Simplify coding your `react-router-dom` `<Routes/>` and `<NavLinks/>` by using attributes in your component.

## How it works

You provide page components containing `title` and `path` attributes, and pass them to the package as an array. The package will map the pages to a React-Router component and handle setup for both react router-routes and react-router links.

## Setup

### Install

```shell
npm install react-page-routes
```

Install react-router-dom and prepare a context provider in a parent component:

```shell
npm install react-router-dom
```

```javascript
// index.tsx
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### 1. Create Page Components

Add both `path` and `title` attributes to all of your Page Components.

```javascript
Logout.path = '/shop'
Logout.title = 'Shop Now!'

export default function Shop() {
  return <h1>Shop Now Page!!!</h1>
}
```

The `path` will be provided to `<Route path={}>` in the `Pages` component and `<NavLink to={}>` in the `NavBar` component.

The `title` will be provided to `<NavLink>{title}</Navlink>` in the `NavBar` component

### 2. Create a directory index of all pages

1. Create `Directory.ts` file.
2. Import the `directory` function.
3. Import all of your page components
4. Invoke the `directory` function, passing all of your page components as props.
5. `export default` the results

```javascript
// Directory.ts

import { routes } from 'react-page-routes'
import Home from './Pages/Home'
import Shop from './Pages/Shop'

export default routes(
  Home,
  Shop,
  // <- add in any additional Page Components here.
)
```

### 3. Use in your App

1. Import the `Directory.ts` file from step 2
2. Use the `Navbar` for handling `<NavLinks/>`
3. Use `Pages` for handling react-router `<Routes/>`

```javascript
// App.tsx
import { Directory } from './Directory.ts'

function App() {
  return (
    <div>
      <Directory.NavBar />
      <Directory.Pages />
    </div>
  )
}
```

### 4. Customize with a Mapper Function (Optional)

```javascript
// App.tsx
import { Directory } from './Directory.ts'

const MyCustomPagesMapper = (E) => (
  <Route element={<E />} path={'path' in E ? String(E.path) : ''} key={String(E.name)} />
)

const MyCustomNavBarMapper = (E) => (
  <NavLink key={E.path.toString()} to={E.path.toString()}>
    {E.title}
  </NavLink>
)

function App() {
  return (
    <div>
      <Directory.NavBar map={MyCustomNavBarMapper} />
      <Directory.Pages map={MyCustomPagesMapper} />
    </div>
  )
}
```
