import { ReactNode } from "react";
import Link from "next/link";

interface LinkHandlerProps {
  href?: string;
  children: ReactNode;
}

export function LinkHandler({ children, href }: LinkHandlerProps) {
  if (!href) return null;

  const isInternalLink: boolean =
    (href && href.startsWith("/")) || href.startsWith("#");

  if (isInternalLink) {
    return <Link href={href}>{children}</Link>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
