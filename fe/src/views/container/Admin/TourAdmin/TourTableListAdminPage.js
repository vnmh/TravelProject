import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { authActions } from "~/state/ducks/authUser";
import * as PATH from "~/configs/routesConfig";
import { Table, Tag, Space, Button, Image } from "antd";

import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { firstImage } from "~/views/utilities/helpers/utilObject";
import CRUDTourAdmin from "./CRUDTourAdmin";

const TourTableListAdminPageStyled = styled.div``;

const TourTableListAdminPage = (props) => {
   const columns = [
      {
         title: "image",
         dataIndex: "images",
         key: "images",
         render: (images, record) => {
            return (
               <Image
                  width={100}
                  src={
                     _.get(_.head(images), "url")
                        ? firstImage(_.get(_.head(images), "url", ""))
                        : "images/destination-img7.jpg"
                  }
                  alt='Destination-img'
               />
            );
         }
      },
      {
         title: "Tên Tour",
         dataIndex: "titleTour",
         key: "titleTour",
         ellipsis: true
      },
      {
         title: "Địa chỉ khởi hành",
         dataIndex: "departureAddress",
         key: "departureAddress",
         ellipsis: true
      },
      {
         title: "Ngày khởi hành",
         dataIndex: "departureDay",
         key: "departureDay",
         ellipsis: true
      },
      {
         title: "Giá",
         dataIndex: "price",
         key: "price",
         ellipsis: true
      },
      {
         title: "Địa chỉ",
         dataIndex: "address",
         key: "address",
         ellipsis: true
      },
      {
         title: "Mô tả",
         dataIndex: "describe",
         key: "describe",
         ellipsis: true
      },
      {
         title: "Trạng thái",
         dataIndex: "action",
         key: "action",
         fixed: "right",
         width: 100,
         render: (text, record) => (
            <Space size='middle'>
               <Button
                  className='btn-primary'
                  icon={<i className='fa fa-pencil-square-o' aria-hidden='true'></i>}
                  onClick={() => {
                     setCurrentEdit(record);
                  }}></Button>
               <Button
                  className='btn-danger'
                  type='dashed'
                  icon={<i class='fa fa-trash-o' aria-hidden='true'></i>}></Button>
            </Space>
         ),
         width: 130
      }
   ];

   const [tours, setTours] = useState([]);
   useEffect(() => {
      props
         .getTours()
         .then(({ res }) => {
            props
               .getAllImagesTour()
               .then((resImg) => {
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
                  console.log("hiendev ~ file: CardItemListTour.js ~ line 34 ~ .then ~ err", err);
               });
         })
         .catch((err) => {
            console.log("hiendev ~ file: CardItemListTour.js ~ line 24 ~ useEffect ~ err", err);
         });
   }, []);

   const [currentEdit, setCurrentEdit] = useState();

   return (
      <TourTableListAdminPageStyled>
         {(currentEdit || props.isCreateTour) && (
            <CRUDTourAdmin setCurrentEdit={setCurrentEdit} currentEdit={currentEdit} setIsCreateTour={props.setIsCreateTour}/>
         )}
         {(!currentEdit && !props.isCreateTour) && (
            <Table columns={columns} dataSource={tours} scroll={{ scrollToFirstRowOnChange: true, x: 1200 }} />
         )}
      </TourTableListAdminPageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => TourTableListAdminPage admin , không thì redirect tới homepage
      }),
      {
         // postLogin: appApisActions.postLogin
         getTours: appApisActions.getTours,
         getAllImagesTour: appApisActions.getAllImagesTour
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(TourTableListAdminPage);
