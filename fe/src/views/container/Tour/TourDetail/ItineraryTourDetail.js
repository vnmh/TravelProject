import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Accordion, Card } from "react-bootstrap";
import { Image, Typography } from "antd";
import { firstImage } from "~/views/utilities/helpers/utilObject";

const ItineraryTourDetailStyled = styled.div``;

function ItineraryTourDetail(props) {
   return (
      <ItineraryTourDetailStyled data-aos='fade-up'>
         <h3 className='title font-size-20 mb-4' name='titleTour'>
            Lịch trình đi
         </h3>
         <Accordion defaultActiveKey='0'>
            {(props.tourDetail?.timelines || []).map((item, index) => {
               return (
                  <Card>
                     <Accordion.Toggle variant='link' as={Card.Header} eventKey={index + ""}>
                        {item.dayIndex} - {item?.title}
                     </Accordion.Toggle>
                     <Accordion.Collapse eventKey={index + ""}>
                        <Card.Body >
                           <div className="row">
                              <div className="col-3">
                                 <Image
                                    src={firstImage("/img/" + item.image)}
                                    alt='-img'
                                 />
                              </div>
                              <div className="col-9 pl-0">
                                 <Typography.Paragraph contenteditable="true" style={{ whiteSpace: "pre-wrap" }}>{item?.description}</Typography.Paragraph>
                              </div>
                           </div>
                        </Card.Body>
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
