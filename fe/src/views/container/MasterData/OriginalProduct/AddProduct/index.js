import React from "react";

import { PageTitle } from "~/views/presentation/ui/commons";
import { ContentWrapper } from "~/views/presentation/ui/container";
import { EditorField, InputField } from "~/views/presentation/ui/fields";
import { withFormik } from "formik";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import * as yup from "yup";
import { stringRequiredField } from "~/views/utilities/validation/input";
import { withRouter } from "react-router-dom";
import Category from "./Category";
import Tag from "./Tags";
import Avatar from "./Avatar";
import { UIButton } from "~/views/presentation/ui/buttons";
import styled from "styled-components";
import LicenceUploader from "~/views/presentation/ui/upload/LicencesUpload";
import { createProduct, getProduct, updateProduct, getCategoryOptions } from "~/state/ducks/appApis/actions";
import { connect } from "react-redux";

import { message } from "antd";
import _ from "lodash";
import { showMessage } from "../showMessage";
import * as PATH from "~/configs/routesConfig";

const Label = styled.h4`
   font-weight: 500;
`;
const Wrapper = styled.div`
   border-radius: 0.5em;
   border: 1px solid #ccc;
   overflow: hidden;
`;

const validationSchema = yup.object().shape({
   name: stringRequiredField(),
   categoryId: stringRequiredField()
});

const emptyValues = {
   name: "",
   tags: "",
   categoryId: "",
   avatar: "",
   images: "",
   description: "",
   shortDescription: ""
};

// check category has subCategory ?
const hasChildren = (obj) => {
   if (!_.isNil(obj.subCategories)) {
      let arr = obj.subCategories.map((t) => {
         let temp = { key: t.id, title: t.name };

         const subChild = hasChildren(t);
         if (subChild) temp.children = subChild;

         return temp;
      });
      return arr;
   }
   return null;
};

class AddProduct extends React.Component {
   constructor(props) {
      super(props);
   }

   handleSubmit = () => {
      const { values, createProduct, setSubmitting, isEdit, updateProduct, history } = this.props;

      if (!isEdit) {
         createProduct(values)
            .then(({ res }) => {
               setSubmitting(false);
               message.success(strings.product_page_message_add_success);
               history.push(PATH.MASTER_DATA_PRODUCT_ALL);
            })
            .catch((err) => {
               setSubmitting(false);
               console.error(`ithoangtan ~ err`, err)
            });
      } else {
         updateProduct(values)
            .then(({ res }) => {
               setSubmitting(false);
               message.success(strings.product_page_message_update_success);
               history.push(PATH.MASTER_DATA_PRODUCT_ALL);
            })
            .catch((err) => {
               setSubmitting(false);
               console.error(`ithoangtan ~ err`, err)
            });
      }
   };
   renderTitlePage = () => {
      const { isEdit, isView } = this.props;
      if (isEdit) {
         return strings.product_page_title_edit;
      } else if (isView) {
         return strings.product_page_title_view;
      }
      return strings.product_page_title_add;
   };

   renderButtons = () => {
      const { isEdit, isView, isSubmitting, isValid, values, history } = this.props;
      if (isEdit) {
         return (
            <>
               <UIButton
                  type='primary'
                  className='btn-pd-add'
                  loading={isSubmitting}
                  disabled={!isValid || !values.categoryId}
                  onClick={this.handleSubmit}>
                  {strings.product_page_update_button}
               </UIButton>

               <UIButton
                  type='secondary'
                  htmlType='button'
                  loading={isSubmitting}
                  className='ml-5'
                  onClick={() => history.push(PATH.MASTER_DATA_PRODUCT_ALL)}>
                  {strings.CANCELED}
               </UIButton>
            </>
         );
      } else if (isView) {
         return (
            <UIButton
               type='secondary'
               htmlType='button'
               loading={isSubmitting}
               onClick={() => history.push(PATH.MASTER_DATA_PRODUCT_ALL)}
               width={200}>
               {strings.product_page_back_button}
            </UIButton>
         );
      }
      return (
         <UIButton
            type='primary'
            className='btn-pd-add'
            loading={isSubmitting}
            disabled={!isValid || !values.categoryId}
            onClick={this.handleSubmit}>
            {strings.add_new_product}
         </UIButton>
      );
   };
   render() {
      const { values, handleBlur, handleChange, touched, errors, setFieldValue, categoryOptions } = this.props;
      return (
         <ContentWrapper>
            <div className='ml-2'>
               <PageTitle title={this.renderTitlePage()} breadcrumb={false} />
            </div>

            <div className='row'>
               {/** start left column */}
               <div className='col-md-8 col-12 pt-5'>
                  <InputField
                     placeholder={strings.product_name}
                     name='name'
                     value={values.name}
                     validatestatus={touched.name && errors.name ? "error" : undefined}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     help={touched.name && errors.name ? errors.name : ""}
                  />

                  <div className='mt-5'>
                     <EditorField
                        value={values.shortDescription}
                        onChange={(value) => setFieldValue("shortDescription", value)}
                        label={strings.product_description}
                        placeholder={strings.product_description}
                     />
                  </div>
                  <div>
                     <EditorField
                        value={values.description}
                        onChange={(value) => setFieldValue("description", value)}
                        label={strings.product_description_detail}
                        placeholder={strings.product_description_detail}
                     />
                  </div>

                  <div className='mt-5'>
                     <Label>{strings.product_images}</Label>
                     <Wrapper>
                        <div className='d-flex justify-content-center  pb-5 bg-white br-2'>
                           <div className='mt-5' style={{ width: "85%" }}>
                              <LicenceUploader
                                 title={strings.title_upload_images}
                                 images={values.images}
                                 onChange={(value) => setFieldValue("images", value)}
                              />
                           </div>
                        </div>
                     </Wrapper>
                  </div>
               </div>
               {/** end left column */}

               {/** start right column */}
               <div className='col-md-4 col-12 pt-5'>
                  <Category
                     changed={(value) => setFieldValue("categoryId", value)}
                     options={categoryOptions}
                     checked={values.categoryId}
                  />
                  <Tag changed={(value) => setFieldValue("tags", value)} value={values.tags} />
                  <Avatar imageName={values.avatar} changed={(value) => setFieldValue("avatar", value)} />
               </div>
               {/** end left column */}
            </div>
            <div className='mt-5'>{this.renderButtons()}</div>
         </ContentWrapper>
      );
   }
}

export default compose(
   withRouter,
   connect(null, {
      createProduct,
      getCategoryOptions,
      getProduct,
      updateProduct
   }),
   withState("categoryOptions", "setCategoryOptions", []),
   withState("isEdit", "setIsEdit", false),
   withState("isView", "setIsView", false),
   withFormik({
      validationSchema: validationSchema,
      mapPropsToValues: (props) => {
         return emptyValues;
      }
   }),
   lifecycle({
      componentDidMount() {
         const {
            getCategoryOptions,
            setCategoryOptions,
            setIsEdit,
            setIsView,
            setValues,
            match,
            getProduct,
            history
         } = this.props;

         if (match && match.path === PATH.MASTER_DATA_PRODUCT_EDIT) {
            setIsEdit(true);
            getProduct(match.params.id)
               .then(({ res }) => {
                  const { id, name, tags, categoryId, avatar, images, description, shortDescription } = res;
                  setValues({
                     id,
                     name,
                     tags,
                     categoryId,
                     avatar,
                     images,
                     description,
                     shortDescription
                  });
               })
               .catch((err) => {
                  showMessage(err);
                  history.push(PATH.MASTER_DATA_PRODUCT_ALL);
               });
         } else if (match && match.path === PATH.MASTER_DATA_PRODUCT_VIEW) {
            setIsView(true);
            getProduct(match.params.id)
               .then(({ res }) => {
                  const { id, name, tags, categoryId, avatar, images, description, shortDescription } = res;
                  setValues({
                     id,
                     name,
                     tags,
                     categoryId,
                     avatar,
                     images,
                     description,
                     shortDescription
                  });
               })
               .catch((err) => {
                  showMessage(err);
                  history.push(PATH.MASTER_DATA_PRODUCT_ALL);
               });
         }

         getCategoryOptions()
            .then(({ res }) => {
               const arr = res.map((category) => {
                  let obj = { key: category.id, title: category.name };

                  const arr = hasChildren(category);
                  if (arr) obj.children = arr;
                  return obj;
               });
               setCategoryOptions(arr);
            })
            .catch((err) => showError(err));
      }
   })
)(AddProduct);
