import React, { useState } from "react";
import "../Styles/proteinGuide.css";
import { Row, Col, Select, InputNumber, Typography, Radio } from "antd";

const { Title } = Typography;

function ProteinGuide() {
  const [protein, setProtein] = useState(0);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState("");
  const [bfPercent, setBfPercent] = useState("");
  const [mealType, setMealType] = useState("nonVeg");

  const handleGender = (gender) => {
    console.log(`selected ${gender}`);
    setGender(gender);
  };

  const handleWeight = (weight) => {
    console.log(`selected ${weight}`);
    setWeight(weight);
  };

  const calculateProteinRequired = () => {
    setProtein(weight);
  };

  const handleBodyFatPercentage = (bfpercent) => {
    console.log(`selected %{bfpercent}`);
    setBfPercent(bfPercent);
    calculateProteinRequired();
  };

  const handleMealType = (mealType) => {
    console.log(`selected ${mealType}`);
    setMealType(mealType);
  };

  return (
    <div className="proteinGuide">
      <Row className="pageStyle">
        <Col style={{ width: "100%" }}>
          <Row>
            <Col span={12}>
              <Title level={3} className="titleStyle">
                create a protein guide for me:
              </Title>
            </Col>
            <Col span={3} className="selectStyle">
              <Select
                defaultValue="male"
                onChange={handleGender}
                options={[
                  {
                    value: "male",
                    label: "Male",
                  },
                  {
                    value: "female",
                    label: "Female",
                  },
                  {
                    value: "other",
                    label: "Other",
                  },
                ]}
              />
            </Col>
            <Col span={3} className="selectStyle">
              <InputNumber
                min={40}
                max={200}
                defaultValue={55}
                onChange={handleWeight}
              />
            </Col>
            <Col span={3} className="selectStyle">
              <InputNumber
                defaultValue={100}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                onChange={handleBodyFatPercentage}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Title level={3} className="titleStyle">
                You need {protein}g Protein daily. You have Planned 0g / 120g
              </Title>
            </Col>
          </Row>
          <Row>
            <Col>
              <Title level={3} className="titleStyle">
                Initiate a
              </Title>
            </Col>
            <Col className="selectStyle">
              <Radio.Group
                options={[
                  {
                    label: "Non-Vegetarian",
                    value: "nonVeg",
                  },
                  {
                    label: "Eggitarian",
                    value: "eggitarian",
                  },
                  {
                    label: "Vegetarian",
                    value: "veg",
                  },
                ]}
                onChange={handleMealType}
                value={mealType}
                optionType="button"
              />
            </Col>
            <Col>
              <Title level={3} className="titleStyle">
                Plan
              </Title>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Title level={3} className="titleStyle">
                Meal Guide
              </Title>
            </Col>
            <Col>
              <Title level={2}></Title>
            </Col>
            <Col>{}</Col>
            {/* <Col span={6}>{<MealGuide />}</Col>
            <Col span={6}>{<MealGuide />}</Col>
            <Col span={6}>{<MealGuide />}</Col>
            <Col span={6}>{<MealGuide />}</Col> */}
          </Row>
          <Row>Options</Row>
        </Col>
      </Row>
    </div>
  );
}

export default ProteinGuide;
