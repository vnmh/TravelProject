import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";

const YourInfoStyled = styled.div``;

function YourInfo(props) {
   const [name, setName] = useState(props.user?.name);
   const [email, setEmail] = useState(props.user?.email);
   const [phone, setPhone] = useState(props.user?.phone);
   const [address, setAddress] = useState(props.user?.address);

   useEffect(() => {
      setName(props.user?.name);
      setEmail(props.user?.email);
      setPhone(props.user?.phone);
      setAddress(props.user?.address);
      props.user?.email && props.setInfoTrue(true);
      props.setInfo(props.user);
   }, [props.user?.email]);

   const onChangeFields = (e, field) => {
      switch (field) {
         case "name":
            setName(e?.target?.value);
            props.setInfo({
               name: e?.target?.value,
               email,
               phone,
               address
            });
            break;
         case "email":
            setEmail(e?.target?.value);
            props.setInfo({
               name,
               email: e?.target?.value,
               phone,
               address
            });
            break;
         case "phone":
            setPhone(e?.target?.value);
            props.setInfo({
               name,
               email,
               phone: e?.target?.value,
               address
            });
            break;
         case "address":
            setAddress(e?.target?.value);
            props.setInfo({
               name,
               email,
               phone,
               address: e?.target?.value
            });
            break;
         default:
            break;
      }
      if (name && email && phone && address) props.setInfoTrue(true);
      else props.setInfoTrue(false);
   };

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
                                    onChange={(e) => onChangeFields(e, "name")}
                                 />
                              </div>
                           </div>
                        </div>
                        <div className='col-lg-6 responsive-column'>
                           <div className='input-box'>
                              <label className='label-text'>Email</label>
                              <div className='form-group'>
                                 <span className='la la-envelope-o form-icon' />
                                 <input
                                    className='form-control'
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => onChangeFields(e, "email")}
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
                                    state
                                    placeholder='Số điện thoại'
                                    value={phone}
                                    onChange={(e) => onChangeFields(e, "phone")}
                                 />
                              </div>
                           </div>
                        </div>
                        <div className='col-lg-6 responsive-column'>
                           <div className='input-box'>
                              <label className='label-text'>Địa chỉ</label>
                              <div className='form-group'>
                                 <span className='la la-map-marked form-icon' />
                                 <input
                                    className='form-control'
                                    type='text'
                                    placeholder='Địa chỉ'
                                    value={address}
                                    onChange={(e) => onChangeFields(e, "address")}
                                 />
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
