import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { Table, Space, Button, Image, message, Popconfirm, Typography } from "antd";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { firstImage } from "~/views/utilities/helpers/utilObject";
import CRUDTourAdminContainer from "./CRUDTourAdminContainer";
import UtilDate from "~/views/utilities/helpers/UtilDate";
import { currencyFormat } from "~/views/utilities/helpers/currency";
import { SCHEDULE_ENUM } from "~/configs/const";

const TourTableListAdminPageStyled = styled.div``;

const TourTableListAdminPage = (props) => {
   const [deleteTour, setDeleteTour] = useState(false);
   const [tours, setTours] = useState([]);
   const [loading, setLoading] = useState(false);
   const [services, setServices] = useState([]);
   const [serviceTourTrue, setServiceTourTrue] = useState([]);

   const onDeleteTour = (tour) => {
      props
         .deleteTour(tour.idTour)
         .then((res) => {
            setDeleteTour(true);
            message.success("Xóa thành công!");
         })
         .catch((err) => {
            message.error("Xóa thất bại!");
         });
   };

   useEffect(() => {
      props
         .getServices()
         .then(({ res }) => {
            setServices(res || []);
         })
         .catch((err) => {
            console.log("maidev ~ file: DescriptionTourDetail.js ~ line 20 ~ useEffect ~ err", err);
         });
   }, []);

   useEffect(() => {
      const serviceTour = props.tourDetail?.services?.split(",") || [];
      const temp = serviceTour.map((item, index) => {
         return _.find(services, (s) => {
            return s.idServices + "" === item + "";
         });
      });
      console.log(`ithoangtan -  ~ file: DescriptionTourDetail.js ~ line 31 ~ temp ~ temp`, temp);
      setServiceTourTrue(temp);
   }, [props.tourDetail?.services?.split(",").length, services.length]);


   const columns = [
      {
         title: "Hình ảnh",
         dataIndex: "images",
         key: "images",
         width: 100,
         render: (images, record) => {
            return (images || []).length > 0 ? (
               <Image.PreviewGroup>
                  {(images || []).map((image, index) => {
                     return (
                        <Image
                           width={80}
                           style={{ display: index !== 0 ? "none" : "unset" }}
                           src={
                              _.get(image, "url") ? firstImage(_.get(image, "url", "")) : "images/destination-img7.jpg"
                           }
                           alt='Destination-img'
                        />
                     );
                  })}
               </Image.PreviewGroup>
            ) : (
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
         width: 300
      },
      {
         title: "Địa chỉ khởi hành",
         dataIndex: "departureAddress",
         key: "departureAddress"
      },
      {
         title: "Ngày khởi hành",
         dataIndex: "departureDate",
         key: "departureDate",
         render: (departureDate) => {
            return UtilDate.toDateLocal(departureDate);
         }
      },
      {
         title: "Giá",
         dataIndex: "price",
         key: "price",
         render: (price) => {
            return currencyFormat(price);
         }
      },
      {
         title: "Địa chỉ",
         dataIndex: "address",
         key: "address",
         render: (address) => {
            return address.join(", ");
         }
      },
      {
         title: "Dịch vụ",
         dataIndex: "services",
         key: "services",
         render: (services) => {
            return services.join(", ");
         }
      },
      {
         title: "Mô tả",
         dataIndex: "describe",
         key: "describe",
         render: (describe) => {
            return <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{describe}</div>;
         },
         width: 300
      },
      {
         title: "Độ tuổi thấp nhất",
         dataIndex: "minAge",
         key: "minAge"
      },
      {
         title: "Số người tối đa",
         dataIndex: "groupSize",
         key: "groupSize"
      },
      {
         title: "Lặp lại",
         dataIndex: "schedule",
         key: "schedule",
         render: (cell, row) => {
            let schedule = row?.schedule;

            return schedule ? SCHEDULE_ENUM[schedule] : row?.scheduleLoop
         }
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
                     props.setCurrentEdit(record);
                  }}></Button>
               <Popconfirm
                  placement='topRight'
                  title={"Bạn có muốn xóa tour này?"}
                  onConfirm={() => onDeleteTour(record)}
                  okText='Có'
                  cancelText='Không'>
                  <Button
                     className='btn-danger'
                     type='dashed'
                     icon={<i class='fa fa-trash-o' aria-hidden='true'></i>}></Button>
               </Popconfirm>
            </Space>
         ),
         width: 130
      }
   ];
   const handleChangeTable = (pagination) => {
      props.setPagination({
         ...props.pagination,
         page: pagination?.current,
         size: pagination?.pageSize
      });
   };

   useEffect(() => {
      if (!props.currentEdit || props.isCreateTour === false || deleteTour) {
         setLoading(true);
         props
            .getTours()
            .then(({ res }) => {
               props
                  .getAllImagesTour()
                  .then((resImg) => {
                     const tourWithImage = res.map((tour) => {
                        return {
                           ...tour,
                           // Khi lưu ở CSDL tour.address có dạng: Đồng Tháp, Hà Nội
                           // Chúng ta sẽ chuyển chuỗi đó thành mảng với hàm split(',') // dấu , là dấu hiệu để cắt
                           address: (tour?.address || "").split(","), // vì address phải là mảng mới truyền vào Select Multiple được
                           services: (tour?.services || "").split(","),
                           images: resImg.res.filter((image) => {
                              return tour.idTour === image.idTour;
                           })
                        };
                     });
                     props.setPagination({
                        page: 1,
                        size: 10,
                        total: tourWithImage.length
                     });
                     setTours(tourWithImage);
                     setLoading(false);
                     setDeleteTour(false);
                  })
                  .catch((err) => {
                     setLoading(false);
                     console.log("hiendev ~ file: CardItemListTour.js ~ line 34 ~ .then ~ err", err);
                  });
            })
            .catch((err) => {
               console.log("hiendev ~ file: CardItemListTour.js ~ line 24 ~ useEffect ~ err", err);
            });
      }
   }, [props.currentEdit, props.isCreateTour, deleteTour]);

   return (
      <TourTableListAdminPageStyled>
         {(props.currentEdit || props.isCreateTour) && (
            <CRUDTourAdminContainer
               // for submit
               setIsSubmit={props.setIsSubmit}
               isSubmit={props.isSubmit}
               // for edit
               setCurrentEdit={props.setCurrentEdit}
               currentEdit={props.currentEdit}
               setIsCreateTour={props.setIsCreateTour}
            />
         )}
         {!props.currentEdit && !props.isCreateTour && (
            <Table
               loading={loading}
               onChange={handleChangeTable}
               columns={columns}
               dataSource={tours}
               scroll={{ scrollToFirstRowOnChange: true, x: 1600 }}
            />
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
         getAllImagesTour: appApisActions.getAllImagesTour,
         deleteTour: appApisActions.deleteTour,
         getServices: appApisActions.getServices
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu
)(TourTableListAdminPage);
