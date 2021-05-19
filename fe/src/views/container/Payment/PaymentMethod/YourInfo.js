import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const YourInfoStyled = styled.div``;

function YourInfo(props) {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [address, setAddress] = useState("");

   return (
      <YourInfoStyled>
         <div className='form-box'>
            <div className='form-title-wrap'>
               <h3 className='title'>Thông tin khách hàng</h3>
            </div>
            <div className='form-content '>
               <div className='contact-form-action'>
                  <form method='post'>
                     <div className='row'>
                        <div className='col-lg-6 responsive-column'>
                           <div className='input-box'>
                              <label className='label-text'>Họ và tên</label>
                              <div className='form-group'>
                                 <span className='la la-user form-icon' />
                                 <input
                                    className='form-control'
                                    type='text'
                                    placeholder='Họ và tên'
                                    value={name}
                                 />
                              </div>
                           </div>
                        </div>
                        <div className='col-lg-6 responsive-column'>
                           <div className='input-box'>
                              <label className='label-text'>Email</label>
                              <div className='form-group'>
                                 <span className='la la-envelope-o form-icon' />
                                 <input className='form-control' type='email' placeholder='Email' />
                              </div>
                           </div>
                        </div>
                        <div className='col-lg-6 responsive-column'>
                           <div className='input-box'>
                              <label className='label-text'>Số điện thoại</label>
                              <div className='form-group'>
                                 <span className='la la-phone form-icon' />
                                 <input className='form-control' type='text' placeholder='Số điện thoại' />
                              </div>
                           </div>
                        </div>
                        <div className='col-lg-6 responsive-column'>
                           <div className='input-box'>
                              <label className='label-text'>Địa chỉ</label>
                              <div className='form-group'>
                                 <span className='la la-map-marked form-icon' />
                                 <input className='form-control' type='text' placeholder='Địa chỉ' />
                              </div>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </YourInfoStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(YourInfo);
