import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { authActions } from "~/state/ducks/authUser";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import Avatar from "./Avatar";
import { message } from "antd";

const ProfileSystemStyled = styled.div``;

const ProfileSystem = (props) => {
   const [avatar, setAvatar] = useState("");
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [address, setAddress] = useState("");

   const handleSubmit = () => {
      const body = {
         idAccount: props.profile?.idAccount,
         avatar: avatar ? avatar : props.profile.avatar,
         name: name ? name : props.profile.name,
         phone: phone ? phone : props.profile.phone,
         address: address ? address : props.profile.address
      };
      props
         .updateProfile(body)
         .then((res) => {
            message.success("Cập nhật thành công");
         })
         .catch((err) => {
            message.error("Cập nhật thất bại");
         });
   };

   const handleChange = (e, field) => {
      switch (field) {
         case "name":
            setName(e.target?.value || "");
            break;
         case "phone":
            setPhone(e.target?.value || "");
            break;
            case "address":
            setAddress(e.target?.value || "");
            break;
         default:
            break;
      }
   };

   useEffect(() => {
      if (props.profile?.email) {
         setName(props.profile?.name);
         setEmail(props.profile?.email);
         setPhone(props.profile?.phone);
         setAddress(props.profile?.address);
      }
   }, [props.profile?.email]);

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
                     <Avatar avatarAPI={props.profile?.avatar} setAvatar={setAvatar} />
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
                                       value={name}
                                       onChange={(e) => handleChange(e, "name")}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>Email</label>
                                 <div className='form-group'>
                                    <span className='la la-envelope form-icon' />
                                    <input
                                       onChange={(e) => handleChange(e, "email")}
                                       className='form-control'
                                       type='text'
                                       value={email}
                                       disabled
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>Số điện thoại</label>
                                 <div className='form-group'>
                                    <span className='la la-phone form-icon' />
                                    <input
                                       className='form-control'
                                       type='text'
                                       value={phone}
                                       onChange={(e) => handleChange(e, "phone")}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-6 responsive-column'>
                              <div className='input-box'>
                                 <label className='label-text'>Địa chỉ</label>
                                 <div className='form-group'>
                                    <span className='la la-map form-icon' />
                                    <input
                                       className='form-control'
                                       type='text'
                                       value={address}
                                       onChange={(e) => handleChange(e, "address")}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className='col-lg-12'>
                              <div className='btn-box'>
                                 <button className='theme-btn' type='button' onClick={handleSubmit}>
                                    Lưu thông tin
                                 </button>
                              </div>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
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
         login: authActions.login,
         updateProfile: authActions.updateProfile
      }
   ),
   withRouter
)(ProfileSystem);
