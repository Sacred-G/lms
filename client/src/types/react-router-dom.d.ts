declare module 'react-router-dom' {
  import * as React from 'react';

  export interface RouteProps {
    path?: string;
    element?: React.ReactNode;
    children?: React.ReactNode;
    caseSensitive?: boolean;
    index?: boolean;
  }
  export class Route extends React.Component<RouteProps> {}

  export interface RoutesProps {
    children?: React.ReactNode;
    location?: any;
  }
  export class Routes extends React.Component<RoutesProps> {}

  export interface LinkProps {
    to: string | object;
    replace?: boolean;
    state?: any;
    relative?: 'route' | 'path';
    preventScrollReset?: boolean;
    reloadDocument?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }
  export class Link extends React.Component<LinkProps> {}

  export interface NavLinkProps extends LinkProps {
    end?: boolean;
    caseSensitive?: boolean;
    className?: string | ((props: { isActive: boolean }) => string);
    style?: React.CSSProperties | ((props: { isActive: boolean }) => React.CSSProperties);
  }
  export class NavLink extends React.Component<NavLinkProps> {}

  export interface BrowserRouterProps {
    basename?: string;
    children?: React.ReactNode;
  }
  export class BrowserRouter extends React.Component<BrowserRouterProps> {}

  export interface RouterProps {
    basename?: string;
    children?: React.ReactNode;
    location?: any;
    navigationType?: 'POP' | 'PUSH' | 'REPLACE';
    navigator?: any;
    static?: boolean;
  }
  export class Router extends React.Component<RouterProps> {}

  export interface NavigateProps {
    to: string | object;
    replace?: boolean;
    state?: any;
  }
  export class Navigate extends React.Component<NavigateProps> {}

  export interface OutletProps {
    context?: any;
  }
  export class Outlet extends React.Component<OutletProps> {}

  export function useParams<Params = {}>(): Params;
  export function useLocation(): {
    pathname: string;
    search: string;
    hash: string;
    state: any;
    key: string;
  };
  export function useNavigate(): (to: string | number | object, options?: { replace?: boolean; state?: any }) => void;
  export function useOutletContext<Context = any>(): Context;
  export function useSearchParams(defaultInit?: URLSearchParams | Record<string, string | string[]>): [URLSearchParams, (nextInit: URLSearchParams | Record<string, string | string[]>, navigateOptions?: { replace?: boolean; state?: any }) => void];
  export function useNavigationType(): 'POP' | 'PUSH' | 'REPLACE';
  export function useOutlet(): React.ReactElement | null;
  export function useRoutes(routes: any[], locationArg?: any): React.ReactElement | null;
  export function useHref(to: string | object): string;
  export function useMatch<ParamKey extends string = string>(pattern: string | { path: string; caseSensitive?: boolean; end?: boolean }): {
    params: Record<ParamKey, string>;
    pathname: string;
    pattern: {
      path: string;
      caseSensitive?: boolean;
      end?: boolean;
    };
  } | null;
}
