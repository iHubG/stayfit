import { useEffect, type JSX } from "react";

export default function Page({
  title,
  children,
}: {
  title: string;
  children: JSX.Element;
}) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return children;
}
