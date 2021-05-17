import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { Table, Space, Button, Popconfirm, message } from "antd";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import CRUDServiceAdmin from "./CRUDServiceAdmin";

const ServiceTableListAdminPageStyled = styled.div``;

const ServiceTableListAdminPage = (props) => {
   const [deleteService, setDeleteService] = useState(false);

   const onDeleteService = (service) => {
      props
         .deleteService(service.idServices)
         .then((res) => {
            setDeleteService(true);
            message.success("Xóa thành công!");
         })
         .catch((err) => {
            message.error("Xóa thất bại!");
         });
   };
   const columns = [
      {
         title: "Tên dịch vụ",
         dataIndex: "titleService",
         key: "titleService",
         ellipsis: true
      },
      {
         title: "Mô tả",
         dataIndex: "description",
         key: "description",
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
                     props.setCurrentEdit(record);
                  }}></Button>
               <Popconfirm
                  placement='topRight'
                  title={"Bạn có muốn xóa dịch vụ này?"}
                  onConfirm={() => onDeleteService(record)}
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

   const [services, setServices] = useState([]);

   useEffect(() => {
      props
         .getServices()
         .then(({ res }) => {
            setServices(res);
            props.setPagination({
               page: 1,
               size: 5,
               total: res.length
            });
         })
         .catch((err) => {
            console.log("hiendev ~ file: ServiceTableListAdminPage.js ~ line 102 ~ useEffect ~ err", err);
         });
   }, [props.currentEdit, props.isCreateService, deleteService]);

   return (
      <ServiceTableListAdminPageStyled>
         {(props.currentEdit || props.isCreateService) && (
            <CRUDServiceAdmin
               setCurrentEdit={props.setCurrentEdit}
               currentEdit={props.currentEdit}
               setIsCreateService={props.setIsCreateService}
            />
         )}
         {!props.currentEdit && !props.isCreateService && (
            <Table
               onChange={handleChangeTable}
               columns={columns}
               dataSource={services}
               scroll={{ scrollToFirstRowOnChange: true, x: 1200 }}
               pagination={{
                  current: props.pagination?.page || 1,
                  pageSize: props.pagination?.size || 5,
                  total: props.pagination?.total || services.length
               }}
            />
         )}
      </ServiceTableListAdminPageStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => ServiceTableListAdminPage admin , không thì redirect tới homepage
      }),
      {
         // login: appApisActions.login
         getServices: appApisActions.getServices,
         deleteService: appApisActions.deleteService
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(ServiceTableListAdminPage);
