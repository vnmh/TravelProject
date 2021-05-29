import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import styled from "styled-components"; // Dùng để ghi đè style bên trong component hoặc để code style như một css thông thường
import { appApisActions } from "~/state/ducks/appApis";
import { Form, Input, Button, Select, message } from "antd";
import MyCKEditor from "../../commons/MyCKEditor";
const { Option } = Select;
const CRUDBlogAdminStyled = styled.div``;

const { TextArea } = Input;

const layout = {
   labelCol: { span: 4 },
   wrapperCol: { span: 16 }
};

const CRUDBlogAdmin = (props) => {
   const [dataContentPost, setDataContentPost] = useState(props.currentEdit?.contentPost);

   const onFinish = (values) => {
      if (props.currentEdit) {
         const bodyUpdate = {
            ...values,
            idPost: props.currentEdit?.idPost,
            contentPost: dataContentPost
         };
         props
            .putPost(bodyUpdate)
            .then((res) => {
               message.success("Sửa thành công!");
               props.setCurrentEdit(undefined);
            })
            .catch((err) => {
               message.error(JSON.stringify(err));
            });
      } else {
         const bodyCreate = { ...values, idAccount: props.user?.idAccount, contentPost: dataContentPost };
         props
            .postPost(bodyCreate)
            .then((res) => {
               message.success("Tạo bài viết thành công!");
               // props.setCurrentEdit(bodyCreate);
               props.setIsCreatePost(false);
            })
            .catch((err) => {
               console.log("🚀 ~ file: CRUDBlogAdmin.js ~ line 45 ~ onFinish ~ err", err);
               message.error("Thất bại!");
            });
      }
   };

   const onFinishFailed = (errorInfo) => {
      console.log("maidev ~ file: CRUDBlogAdmin.js ~ line 57 ~ onFinishFailed ~ errorInfo", errorInfo);
   };

   const onChangeDetail = (event, editor) => {
      setDataContentPost(editor.getData());
   };

   return (
      <CRUDBlogAdminStyled>
         <Form
            {...layout}
            name='basic'
            initialValues={{
               ...props.currentEdit
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
               label='Tiêu đề'
               name='titlePost'
               rules={[
                  {
                     required: true,
                     message: "Hãy nhập tiêu đề!"
                  }
               ]}>
               <Input />
            </Form.Item>
            <Form.Item label='Mô tả' name='describe' rules={[{ required: true, message: "Hãy nhập mô tả!" }]}>
               <TextArea rows={6} />
            </Form.Item>
            <Form.Item label='Mô tả chi tiết'>
               <MyCKEditor data={dataContentPost} onChange={onChangeDetail} />
            </Form.Item>
            <div className='w-100 d-flex justify-content-center align-items-center'>
               <Button type='primary' htmlType='submit' className='mr-4'>
                  {props.currentEdit ? "Sửa" : "Thêm"}
               </Button>
               <Button
                  onClick={() => {
                     props.setCurrentEdit(undefined);
                     props.setIsCreatePost && props.setIsCreatePost(undefined);
                  }}>
                  Đóng
               </Button>
            </div>
         </Form>
      </CRUDBlogAdminStyled>
   );
};

export default compose(
   connect(
      (state) => ({
         user: state["authUser"].user,
         isAuthenticated: state["authUser"].isAuthenticated
         // có thể check user?.role === ROLE.administrator && isAuthenticated => CRUDBlogAdmin admin , không thì redirect tới homepage
      }),
      {
         getPosts: appApisActions.getPosts,
         getPost: appApisActions.getPost,
         getAllImagesPost: appApisActions.getAllImagesPost,
         putPost: appApisActions.putPost,
         postPost: appApisActions.postPost
      }
   ),
   withRouter //để push(nhảy qua trang khác) là chủ yếu,
)(CRUDBlogAdmin);
