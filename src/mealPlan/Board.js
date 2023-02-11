import React from "react";
import { Column } from "./Column";
import { DraggableCard } from "./Card";
import { TextForm } from "./TextForm";
import { Col } from "antd";

export function Board({ cards, columns, moveCard, addCard, addColumn }) {
  return (
    <div className="Board">
      {columns.map((column) => (
        <Column
          key={column.id}
          title={column.title}
          totalProteinAmt="200g"
          addCard={addCard.bind(null, column.id)}
        >
          {column.cardIds
            .map((cardId) => cards.find((card) => card.id === cardId))
            .map((card, index) => (
              <DraggableCard
                key={card.id}
                id={card.id}
                columnId={column.id}
                columnIndex={index}
                title={card.title}
                type={card.type}
                moveCard={moveCard}
                defaultqty={card.defaultqty}
                unit={card.unit}
                proteinContentPerUnit={card.proteinContentPerUnit}
              />
            ))}
          {column.cardIds.length === 0 && (
            <DraggableCard
              isSpacer
              moveCard={(cardId) => moveCard(cardId, column.id, 0)}
            />
          )}
        </Column>
      ))}
    </div>
  );
}
