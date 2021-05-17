import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Accordion, Card } from "react-bootstrap";

const ItineraryTourDetailStyled = styled.div``;

function ItineraryTourDetail(props) {
   return (
      <ItineraryTourDetailStyled>
         <Accordion defaultActiveKey='0'>
            {(props.tourDetail?.timelines || []).map((item, index) => {
               return (
                  <Card>
                     <Accordion.Toggle variant='link' as={Card.Header} eventKey={index + ""}>
                        {item.dayIndex} - {item?.title}
                     </Accordion.Toggle>
                     <Accordion.Collapse eventKey={index + ""}>
                        <Card.Body>{item?.description}</Card.Body>
                     </Accordion.Collapse>
                  </Card>
               );
            })}
         </Accordion>
      </ItineraryTourDetailStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(ItineraryTourDetail);
