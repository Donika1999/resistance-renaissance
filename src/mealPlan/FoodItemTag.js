import React, { useState } from "react";
import cn from "classnames";
import { InputNumber } from "antd";

export function FoodItemTag(props) {
  const [proteinAmt, setProteinAmt] = useState(
    props.defaultqty * props.proteinContentPerUnit
  );

  function onChange(value) {
    setProteinAmt(value * props.proteinContentPerUnit);
  }
  return (
    <div className={cn("Card", props.type)}>
      <div>{props.title}</div>
      <InputNumber
        step={props.defaultqty >= 100 ? 50 : 1}
        defaultValue={props.defaultqty}
        onChange={onChange}
      />
      <div>
        {" "}
        {props.unit} {proteinAmt}g
      </div>
    </div>
  );
}
