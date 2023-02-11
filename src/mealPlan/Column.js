import React from "react";
import { TextForm } from "./TextForm";

export function Column(props) {
  return (
    <div className="Column">
      <div className="Column__title">
        <div>{props.title}</div>
        <div>{props.totalProteinAmt}</div>
      </div>
      {props.children}
    </div>
  );
}
