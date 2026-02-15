import React from "react";

type Variant = "primary" | "secondary" | "action" | "drama";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  active?: boolean;
  className?: string;
};

type AnchorProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type Props = AnchorProps | ButtonProps;

const Button: React.FC<Props> = (props) => {
  const {
    children,
    variant = "primary",
    active = false,
    className = "",
    href,
    ...rest
  } = props;

  const classes = `btn btn--${variant} ${
    active ? "btn--active" : ""
  } ${className}`.trim();

  if (href) {
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
