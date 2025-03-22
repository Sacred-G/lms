declare module 'react-bootstrap' {
  import * as React from 'react';

  export interface ContainerProps {
    fluid?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    className?: string;
    children?: React.ReactNode;
  }
  export class Container extends React.Component<ContainerProps> {}

  export interface RowProps {
    className?: string;
    children?: React.ReactNode;
  }
  export class Row extends React.Component<RowProps> {}

  export interface ColProps {
    xs?: number | 'auto';
    sm?: number | 'auto';
    md?: number | 'auto';
    lg?: number | 'auto';
    xl?: number | 'auto';
    xxl?: number | 'auto';
    className?: string;
    children?: React.ReactNode;
  }
  export class Col extends React.Component<ColProps> {}

  export interface CardProps {
    bg?: string;
    text?: string;
    border?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }
  export class Card extends React.Component<CardProps> {
    static Body: React.FC<{
      className?: string;
      children?: React.ReactNode;
    }>;
    static Title: React.FC<{
      className?: string;
      children?: React.ReactNode;
    }>;
    static Subtitle: React.FC<{
      className?: string;
      children?: React.ReactNode;
    }>;
    static Text: React.FC<{
      className?: string;
      children?: React.ReactNode;
    }>;
    static Header: React.FC<{
      className?: string;
      children?: React.ReactNode;
    }>;
    static Footer: React.FC<{
      className?: string;
      children?: React.ReactNode;
    }>;
    static Img: React.FC<{
      src: string;
      alt?: string;
      variant?: 'top' | 'bottom';
      className?: string;
    }>;
  }

  export interface NavbarProps {
    bg?: string;
    variant?: 'light' | 'dark';
    expand?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    fixed?: 'top' | 'bottom';
    sticky?: 'top';
    className?: string;
    children?: React.ReactNode;
  }
  export class Navbar extends React.Component<NavbarProps> {
    static Brand: React.FC<{
      href?: string;
      as?: React.ElementType;
      className?: string;
      children?: React.ReactNode;
    }>;
    static Toggle: React.FC<{
      as?: React.ElementType;
      label?: string;
      className?: string;
      children?: React.ReactNode;
    }>;
    static Collapse: React.FC<{
      id?: string;
      className?: string;
      children?: React.ReactNode;
    }>;
    static Text: React.FC<{
      className?: string;
      children?: React.ReactNode;
    }>;
  }

  export interface NavProps {
    activeKey?: string;
    onSelect?: (key: string) => void;
    variant?: 'tabs' | 'pills' | 'underline';
    className?: string;
    children?: React.ReactNode;
  }
  export class Nav extends React.Component<NavProps> {
    static Item: React.FC<{
      active?: boolean;
      disabled?: boolean;
      eventKey?: string;
      className?: string;
      children?: React.ReactNode;
    }>;
    static Link: React.FC<{
      active?: boolean;
      disabled?: boolean;
      eventKey?: string;
      href?: string;
      onClick?: (event: React.MouseEvent) => void;
      className?: string;
      children?: React.ReactNode;
      as?: React.ElementType;
      to?: string;
    }>;
  }

  export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'link' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-dark' | 'outline-light';
    size?: 'sm' | 'lg';
    active?: boolean;
    disabled?: boolean;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: React.MouseEvent) => void;
    className?: string;
    children?: React.ReactNode;
    as?: React.ElementType;
    to?: string;
  }
  export class Button extends React.Component<ButtonProps> {}

  export interface AlertProps {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
    dismissible?: boolean;
    show?: boolean;
    onClose?: () => void;
    className?: string;
    children?: React.ReactNode;
  }
  export class Alert extends React.Component<AlertProps> {
    static Heading: React.FC<{
      className?: string;
      children?: React.ReactNode;
    }>;
    static Link: React.FC<{
      href?: string;
      className?: string;
      children?: React.ReactNode;
    }>;
  }

  export interface TabContainerProps {
    id?: string;
    defaultActiveKey?: string;
    activeKey?: string;
    onSelect?: (key: string) => void;
    transition?: boolean;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
    generateChildId?: (key: string, type: string) => string;
    children?: React.ReactNode;
  }
  export class TabContainer extends React.Component<TabContainerProps> {}

  export interface ProgressBarProps {
    now: number;
    min?: number;
    max?: number;
    label?: React.ReactNode;
    srOnly?: boolean;
    striped?: boolean;
    animated?: boolean;
    variant?: 'success' | 'info' | 'warning' | 'danger';
    className?: string;
    style?: React.CSSProperties;
  }
  export class ProgressBar extends React.Component<ProgressBarProps> {}

  export interface ModalProps {
    show?: boolean;
    onHide: () => void;
    size?: 'sm' | 'lg' | 'xl';
    centered?: boolean;
    backdrop?: boolean | 'static';
    keyboard?: boolean;
    animation?: boolean;
    dialogClassName?: string;
    contentClassName?: string;
    className?: string;
    children?: React.ReactNode;
  }
  export class Modal extends React.Component<ModalProps> {
    static Header: React.FC<{
      closeButton?: boolean;
      closeLabel?: string;
      onHide?: () => void;
      className?: string;
      children?: React.ReactNode;
    }>;
    static Title: React.FC<{
      className?: string;
      children?: React.ReactNode;
    }>;
    static Body: React.FC<{
      className?: string;
      children?: React.ReactNode;
    }>;
    static Footer: React.FC<{
      className?: string;
      children?: React.ReactNode;
    }>;
  }

  export interface FormProps {
    id?: string;
    className?: string;
    validated?: boolean;
    noValidate?: boolean;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    children?: React.ReactNode;
  }
  export class Form extends React.Component<FormProps> {
    static Group: React.FC<{
      controlId?: string;
      className?: string;
      children?: React.ReactNode;
    }>;
    static Label: React.FC<{
      htmlFor?: string;
      column?: boolean;
      className?: string;
      children?: React.ReactNode;
    }>;
    static Control: React.FC<{
      type?: string;
      as?: React.ElementType;
      id?: string;
      name?: string;
      value?: any;
      defaultValue?: any;
      placeholder?: string;
      disabled?: boolean;
      readOnly?: boolean;
      onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
      isValid?: boolean;
      isInvalid?: boolean;
      className?: string;
      children?: React.ReactNode;
      rows?: number;
      required?: boolean;
      minLength?: number;
      Feedback?: React.FC<{
        type?: 'valid' | 'invalid';
        tooltip?: boolean;
        className?: string;
        children?: React.ReactNode;
      }>;
    }>;
    static Check: React.FC<{
      type?: 'checkbox' | 'radio';
      id?: string;
      name?: string;
      label?: React.ReactNode;
      checked?: boolean;
      disabled?: boolean;
      onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
      className?: string;
      children?: React.ReactNode;
    }>;
    static Range: React.FC<{
      id?: string;
      name?: string;
      min?: number;
      max?: number;
      step?: number;
      value?: number;
      onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
      className?: string;
    }>;
  }

  export interface ListGroupProps {
    variant?: 'flush';
    horizontal?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    className?: string;
    children?: React.ReactNode;
  }
  export class ListGroup extends React.Component<ListGroupProps> {
    static Item: React.FC<{
      action?: boolean;
      active?: boolean;
      disabled?: boolean;
      variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
      onClick?: (event: React.MouseEvent) => void;
      className?: string;
      children?: React.ReactNode;
    }>;
  }

  export interface BadgeProps {
    bg?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
    pill?: boolean;
    text?: string;
    className?: string;
    children?: React.ReactNode;
  }
  export class Badge extends React.Component<BadgeProps> {}

  export interface AccordionProps {
    defaultActiveKey?: string;
    activeKey?: string;
    onSelect?: (eventKey: string) => void;
    flush?: boolean;
    className?: string;
    children?: React.ReactNode;
  }
  export class Accordion extends React.Component<AccordionProps> {
    static Item: React.FC<{
      eventKey: string;
      className?: string;
      children?: React.ReactNode;
    }>;
    static Header: React.FC<{
      className?: string;
      children?: React.ReactNode;
    }>;
    static Body: React.FC<{
      className?: string;
      children?: React.ReactNode;
    }>;
  }
}
