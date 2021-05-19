import React from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import { FAMOUS_PROVINCES } from "~/configs/FamousVNprovinces";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường

const FamousPlaceHomePageStyled = styled.div``;

const FamousPlaceHomePage = (props) => {
   return (
      <FamousPlaceHomePageStyled>
         <div className='row padding-top-50px'>
            {FAMOUS_PROVINCES.map((province) => {
               return (
                  <div className='col-lg-3 responsive-column'>
                     <div className='flip-box'>
                        <div className='flip-box-front'>
                           <img src={province.image} alt='' className='flip-img' width='100px' height='160px' />
                           <Link to='/' className='flip-content d-flex align-items-end justify-content-start'>
                              {" "}
                              <h3 className='flip-title' value={province}>
                                 {province.name}
                              </h3>
                           </Link>
                           {/* end flip-content */}
                        </div>
                        {/* end flip-box-front */}
                        <div className='flip-box-back'>
                           <img src={province.image} alt='' className='flip-img' width='100px' height='160px' />
                           <a href='#' className='flip-content d-flex align-items-center justify-content-center'>
                              <div>
                                 <div className='icon-element mx-auto mb-3 bg-white text-color-2'>
                                    <i className='la la-arrow-right' />
                                 </div>
                                 <h3 className='flip-title'>Khám phá thêm</h3>
                              </div>
                           </a>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
      </FamousPlaceHomePageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user
      }),
      {
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(FamousPlaceHomePage);
