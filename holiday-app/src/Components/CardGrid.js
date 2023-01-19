import React from 'react';

/*
npm i bootstrap
npm i reactstrap react react-dom
*/

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';


const CardGrid = (props) => {

  return (
    <div className="d-flex flex-wrap">
        <Card className="mr-3 mb-3">
          <CardImg src={props.ImageLink} alt="Card image cap" />
          <CardBody>
            <CardTitle>{props.HebName}</CardTitle>
            <CardSubtitle>{props.EngName}</CardSubtitle>
            <CardText>{props.Date}</CardText>
            <CardText>{props.Info}</CardText>
          </CardBody>
        </Card>
    </div>
  );
};

export default CardGrid;