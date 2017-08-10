import React from "react";
import "../styles/ErrorView.css";

const GhostIcon = require("../static/ghost.png");

export default function ErrorPage() {
  return (
    <div className="container">
      <img className="ghost-icon" src={GhostIcon} />
      <div className="text-container">
        <h1>
          Error 404
        </h1>
        <h3>Unable to get Reddit posts</h3>
        <a href="mailto:contact@inseobaek.com">Notify someone</a>
      </div>
    </div>
  );
}
