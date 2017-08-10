import React from "react";
import Link from "next/link";

export default function ErrorView(props) {
  const msg = props.msg;
  return (
    <div className="Container">
      <img src="/static/ghost.png" />
      <div>
        <h1>
          Error 404
        </h1>
        <h3>{msg}</h3>
        <a href="mailto:contact@inseobaek.com">Notify someone</a>
        <Link href="/" prefetch>
          <a>Back to games</a>
        </Link>
      </div>
    </div>
  );
}
