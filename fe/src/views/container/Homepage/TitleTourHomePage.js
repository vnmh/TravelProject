import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { DatePicker } from "antd";
import { authActions } from "~/state/ducks/authUser";
import { appApisActions } from "~/state/ducks/appApis";
import { Tooltip, Typography } from "antd";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import SearchTour from "./SearchTour";

const TitleTourHomePageStyled = styled.div`
   .sec__title {
   }
`;

const TitleTourHomePage = (props) => {
   const [tours, setTours] = useState([]);

   useEffect(() => {
      props
         .getTours()
         .then(({ res }) => {
            props
               .getAllImagesTour()
               .then((resImg) => {
                  // setImages(res);
                  const tourWithImage = res.map((tour) => {
                     return {
                        ...tour,
                        images: resImg.res.filter((image) => {
                           return tour.idTour === image.idTour;
                        })
                     };
                  });
                  setTours(tourWithImage);
               })
               .catch((err) => {
                  console.log("hiendev ~ file: CardItemHomePage.js ~ line 27 ~ useEffect ~ err", err);
               });
         })
         .catch((err) => {
            console.log("hiendev ~ file: CardItemHomePage.js ~ line 27 ~ useEffect ~ err", err);
         });
   }, []);
   return (
      <TitleTourHomePageStyled>
         {/* {tours.map((item, index) => {
            return ( */}
         <div className='hero-content pb-5 text-center'>
            <div className='section-heading'>
               <h2 className='sec__title font-size-50 pb-3 pt-5'>
                  {" "}
                  {/* <Tooltip title={item.titleTour}>
                           <Link to='/tour-detail'>
                              <Typography.Paragraph className='text_link' ellipsis={{ rows: 2 }}>
                                 {item.titleTour}
                              </Typography.Paragraph>
                           </Link>
                        </Tooltip> */}
               </h2>
               <p className='sec__desc font-size-25 font-weight-medium'>Trải nghiệm trọn vẹn - Giá cả phải chăng</p>
            </div>
         </div>
         {/* );
         })}
         ; */}
      </TitleTourHomePageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user
      }),
      {
         // postLogin: appApisActions.postLogin
         login: authActions.login,
         getTours: appApisActions.getTours,
         getAllImagesTour: appApisActions.getAllImagesTour
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu
)(TitleTourHomePage);
