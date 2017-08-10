import React from "react";

export default function ErrorView(props) {
  const msg = props.msg || "Baseball not found";
  return (
    <div className="container">
      <img className="ghost-icon" src="/static/ghost.png" />
      <div className="text-container">
        <h1>
          Error 404
        </h1>
        <h3>{msg}</h3>
        <a href="mailto:contact@inseobaek.com">Notify someone</a>
      </div>
    </div>
  );
}
