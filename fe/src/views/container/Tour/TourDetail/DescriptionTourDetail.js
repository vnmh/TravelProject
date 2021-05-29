import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const DescriptionTourDetailStyled = styled.div``;

const DescriptionTourDetail = (props) => {
   const [services, setServices] = useState([]);

   useEffect(() => {
      props
         .getServices()
         .then(({ res }) => {
            setServices(res);
         })
         .catch((err) => {
            console.log("maidev ~ file: DescriptionTourDetail.js ~ line 20 ~ useEffect ~ err", err);
         });
   }, []);

   const serviceTour = props.tourDetail?.services?.split(",") || [];

   const serviceTourTrue = serviceTour.map((item, index) => {
      return _.find(services, (s) => {
         return s.idServices + "" === item + "";
      });
   });

   return (
      <DescriptionTourDetailStyled>
         <div>
            <h3 className='title font-size-20' name='titleTour'>
               Mô tả ngắn
            </h3>
            <p className='py-3'>{props.tourDetail?.describe}</p>
            <div className='row'>
               <div className='col-lg-6 responsive-column'>
                  <h3 className='title font-size-20 font-weight-medium pb-3'>Đã bao gồm</h3>
                  <ul className='list-items'>
                     {serviceTourTrue.map((item, index) => {
                        return (
                           <li>
                              <i className='la la-check text-success mr-2' />
                              {item?.titleService}
                           </li>
                        );
                     })}
                  </ul>
               </div>
            </div>
         </div>
      </DescriptionTourDetailStyled>
   );
};

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTour: appApisActions.getTour,
      getAllImagesTour: appApisActions.getAllImagesTour,
      getServices: appApisActions.getServices
   }
)(DescriptionTourDetail);
