import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { firstImage } from "~/views/utilities/helpers/utilObject";
import Avatar from "./Avatar";

const ProfileSystemStyled = styled.div``;

const ProfileSystem = (props) => {
   const [fileList, setFileList] = useState(
      (props.currentEdit?.images || []).map((im) => {
         return {
            idImage: im.idImage,
            name: im.name,
            status: "done",
            url: firstImage(im.url)
         };
      })
   );

   const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
   };

   return (
      <ProfileSystemStyled>
         <div className='col-lg-12 d-flex justify-content-center'>
            <div className='form-box '>
               <div className='form-title-wrap'>
                  <h1 className='title d-flex justify-content-center pt-2' style={{ fontWeight: 700, fontSize: 28 }}>
                     THÔNG TIN CÁ NHÂN
                  </h1>
               </div>
               <div className='form-content'>
                  <div className='user-profile-action d-flex align-items-center pb-4'>
                     <Avatar />
                  </div>
                  <div className='contact-form-action'>
                     <form action='#'>
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
                                       value={props.profile?.name}
                                    />
                                 </div>
                              </div>
                           </div>
                           {/* end col-lg-6 */}
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>Email</label>
                                 <div className='form-group'>
                                    <span className='la la-envelope form-icon' />
                                    <input className='form-control' type='text' placeholder={props.user?.email} />
                                 </div>
                              </div>
                           </div>
                           {/* end col-lg-6 */}
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>Phone</label>
                                 <div className='form-group'>
                                    <span className='la la-phone form-icon' />
                                    <input className='form-control' type='text' defaultValue='+ 00 222 44 5678' />
                                 </div>
                              </div>
                           </div>
                           {/* end col-lg-6 */}
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>Address</label>
                                 <div className='form-group'>
                                    <span className='la la-map form-icon' />
                                    <input className='form-control' type='text' defaultValue='124/6 Street view, USA' />
                                 </div>
                              </div>
                           </div>
                           {/* end col-lg-6 */}
                           <div className='col-lg-12'>
                              <div className='btn-box'>
                                 <button className='theme-btn' type='button'>
                                    Save Changes
                                 </button>
                              </div>
                           </div>
                           {/* end col-lg-12 */}
                        </div>
                        {/* end row */}
                     </form>
                  </div>
               </div>
            </div>
            {/* end form-box */}
         </div>
         {/* end col-lg-6 */}
      </ProfileSystemStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => dashboard admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         login: authActions.login
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(ProfileSystem);
