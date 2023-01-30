import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { CloseSquareOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Tag } from "antd";
import "../Styles/mealPlan.css";

const { Title, Text } = Typography;

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 10px`,

  // change background colour if dragging
  background: isDragging ? "lightblue" : "red",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "",
  padding: grid,
  width: "100%",
});

const getMeal1 = () => {
  return [
    {
      id: "draggable-id-1",
      name: "Paneer",
      protein: "18g",
      qty: "100g",
    },
    {
      id: "draggable-id-2",
      name: "Eggs",
      protein: "12g",
      qty: 2,
    },
  ];
};
const getMeal2 = () => {
  return [
    {
      id: "draggable-id-3",
      name: "Chicken breast",
      protein: "22g",
      qty: "100g",
    },
    {
      id: "draggable-id-4",
      name: "Dal",
      protein: "12g",
      qty: "100g",
    },
  ];
};
const getMeal3 = () => {
  return [
    {
      id: "draggable-id-5",
      name: "Fish",
      protein: "18g",
      qty: "100g",
    },
    {
      id: "draggable-id-6",
      name: "Dark Chocolate",
      protein: "12g",
      qty: 2,
    },
  ];
};
const getMeal4 = () => {
  return [
    {
      id: "draggable-id-7",
      name: "Rice",
      protein: "18g",
      qty: "100g",
    },
    {
      id: "draggable-id-8",
      name: "Maggie",
      protein: "12g",
      qty: "100g",
    },
  ];
};

function MealPlan() {
  const [state, setState] = useState([
    // getItems(5),
    // getItems(5, 6),
    // getItems(5, 10),
    // getItems(5, 14),
    getMeal1(),
    getMeal2(),
    getMeal3(),
    getMeal4(),
  ]);

  const arr = Array.from({ length: 4 }, (_, index) => index + 1);
  const mealOptions = arr.map((i) => {
    return { id: i, ind: "draggable-id-" + i };
  });

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }

  return (
    <div>
      <Row className="headerRow">
        <Col span={4}></Col>
        <Col span={5} className="headerElement">
          <Text>Meal 1</Text>
        </Col>
        <Col span={5} className="headerElement">
          <Text>Meal 2</Text>
        </Col>
        <Col span={5} className="headerElement">
          <Text>Meal 3</Text>
        </Col>
        <Col span={5} className="headerElement">
          <Text>Meal 4</Text>
        </Col>
      </Row>
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {mealOptions.map((el, ind) => (
            <Col span={5}>
              <Droppable key={ind} droppableId={`${ind}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {state[el.id - 1].map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Tag
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="tagStyle"
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <Text className="foodElementStyle">
                              {item.name} {item.protein}
                              <CloseSquareOutlined
                                style={{ paddingTop: "4px" }}
                                // onClick={() => {
                                //   const newState = [...state];
                                //   newState[ind].splice(index, 1);
                                //   setState(
                                //     newState.filter((group) => group.length)
                                //   );
                                // }}
                              />
                            </Text>
                          </Tag>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          ))}
        </DragDropContext>
      </div>
      <Row>
        <Col span={4}>
          <Text>Total Protein</Text>
        </Col>
        <Col span={5}></Col>
        <Col span={5}></Col>
        <Col span={5}></Col>
        <Col span={5}></Col>
      </Row>
      <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button>
      <button
        type="button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add new item
      </button>
      <Row className="headerRow">
        <Col span={8} className="headerElement">
          <Text>Vegetarian</Text>
        </Col>
        <Col span={8} className="headerElement">
          <Text>Non-Vegeterian</Text>
        </Col>
        <Col span={8} className="headerElement">
          <Text>Eggitarian</Text>
        </Col>
      </Row>
    </div>
  );
}

export default MealPlan;
