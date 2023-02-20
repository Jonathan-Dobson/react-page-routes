import { Routes, Route, NavLink } from "react-router-dom";
import React, { ReactElement, FC } from "react";

export function useDirectory(...pages: PageType[]) {
  return {
    Pages: (props: MapperPropsType) => {
      if (pages instanceof Array) {
        return (
          <Routes>
            {props.map && "map" in props
              ? pages.map(props.map)
              : pages.map(PageToRoute)}
          </Routes>
        );
      }
      return <></>;
    },
    NavBar: (props: MapperPropsType) => {
      const defaultMapper: MapperType = (E: PageType): ReactElement => (
        <NavLink key={E.path.toString()} to={E.path.toString()}>
          {E.title}
        </NavLink>
      );

      if (pages instanceof Array) {
        return (
          <>
            {props.map && "map" in props
              ? pages.map(props.map)
              : pages.map(defaultMapper)}
          </>
        );
      }
      return <></>;
    },
  };
}

function PageToRoute(E: PageType): ReactElement {
  return (
    <div key={String(E.name)}>
      <Route element={<E />} path={"path" in E ? String(E.path) : ""} />
    </div>
  );
}

export type PageType =
  | (FC & {
      title: string;
      path: string;
    })
  | never;

export type MapperType = (E: PageType) => ReactElement;
export type MapperPropsType = {
  map?: MapperType;
};
