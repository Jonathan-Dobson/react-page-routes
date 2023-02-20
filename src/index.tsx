import { Routes, Route, NavLink } from 'react-router-dom'
import React, { ReactElement, FC } from 'react'

export function useDirectory(...pages: PageType[]) {
  return {
    Pages: (props: MapperPropsType) => {
      if (pages instanceof Array) {
        if ('map' in props && props.map) {
          return <Routes>{pages.map(props.map)}</Routes>
        } else {
          return <Routes>{pages.map(PageToRoute)}</Routes>
        }
      }
      return <></>
    },
    NavBar: (props: MapperPropsType) => {
      const defaultMapper: MapperType = (E: PageType): ReactElement => (
        <NavLink key={E.path.toString()} to={E.path.toString()}>
          {E.title}
        </NavLink>
      )

      if (pages instanceof Array) {
        return <>{props.map && 'map' in props ? pages.map(props.map) : pages.map(defaultMapper)}</>
      }
      return <></>
    },
  }
}

function PageToRoute(E: PageType): ReactElement {
  return <Route key={String(E.name)} element={<E />} path={'path' in E ? String(E.path) : ''} />
}

export type PageType =
  | (FC & {
      title: string
      path: string
    })
  | never

export type MapperType = (E: PageType) => ReactElement
export type MapperPropsType = {
  map?: MapperType
}
