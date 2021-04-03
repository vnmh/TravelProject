import React from "react";
import UITable from "~/views/presentation/ui/tables/Table";
import { UIButton } from "~/views/presentation/ui/buttons";
import { Form, Col, Row, message, Upload, Popconfirm } from "antd";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import { withFormik } from "formik";
import { connect } from "react-redux";

import * as yup from "yup";
import _ from "lodash";
import * as PATH from "~/configs/routesConfig";
import { stringRequiredField, stringNRFieldValidate } from "~/views/utilities/validation/input";
import { getString, getArray } from "~/views/utilities/helpers/utilObject";
import { UIPagination } from "~/views/presentation/ui/commons";
import { InputField, SearchField, SelectField, TextAreaField } from "~/views/presentation/ui/fields";
import {
   createCategory,
   getAllCategories,
   getViewProducts,
   getParentCategories,
   updateCategory,
   deleteCategory
} from "~/state/ducks/appApis/actions";
import { setCategoryId } from "~/state/ducks/appData/actions";

import { withRouter } from "react-router-dom";
import { API_UPLOAD_URL, IMAGE_URL } from "~/configs";
import { checkAvartarImage } from "~/views/presentation/ui/upload/checkUploadFile";
import { showMessage } from "./showMessage";

const validationSchema = yup.object().shape({
   name: stringRequiredField(),
   slug: stringRequiredField(),
   note: stringNRFieldValidate(1000)
});

const typeOptions = [
   { label: strings.CATEGORY_PAGE_OPTION_LABEL_PRODUCT, value: "PRODUCT" },
   { label: strings.CATEGORY_PAGE_OPTION_LABEL_MATERIAL, value: "MATERIAL" }
];

const actionOptions = [
   { label: strings.CATEGORY_PAGE_TABLE_BUTTON_EDIT, value: 1 },
   { label: strings.CATEGORY_PAGE_TABLE_BUTTON_DELETE, value: 2 }
];

const generateAutoKey = (dataSource) => {
   return getArray(dataSource, undefined, []).map((item, index) => {
      let newItem = {
         ...item,
         key: item.id
      };
      if (item.subCategories && item.subCategories.length > 0) {
         let children = item.subCategories.map((child) => ({
            ...child,
            key: child.id
         }));
         newItem.children = children;
      }
      return newItem;
   });
};

class CreateCategory extends React.PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         selectedRowKeys: [],
         loading: false // loading for upload image
      };
   }

   /**
    * Handle change value of form
    */

   //change image upload
   handleChange = (info) => {
      if (info.file.status === "uploading") {
         this.setState({ loading: true });
         return;
      }
      if (info.file.status === "done") {
         const { response } = info.file;
         const avatarUrl = getString(_.first(getArray(response, undefined, [])), "pathImage");
         this.setState({
            loading: false
         });
         const { setFieldValue } = this.props;
         setFieldValue("image", avatarUrl);
      }
   };

   handleChangeSelectType = (type) => {
      const { setFieldValue, fetchParentCategories } = this.props;
      setFieldValue("type", type);
      fetchParentCategories(type);
      setFieldValue("parentId", undefined);
   };

   /**
    * Handle button action  on table
    */

   handleUpdateCategory = (data) => {
      const { setValues, setIsEdit, fetchParentCategories, setIsParent } = this.props;

      if (this.state.selectedRowKeys[0] === data.id) {
         this.handleCancelButton();
      } else {
         this.setState({ selectedRowKeys: [data.id] });
         setIsEdit(true);
         const { id, name, slug, parentId, note, image, type } = data;

         if (parentId !== null) {
            setIsParent(false);
         } else {
            setIsParent(true);
         }

         fetchParentCategories(type).then(() => {
            setValues({ id, name, slug, parentId, note, image, type });
         });
      }
   };

   handleDelteCategory = (id) => {
      const {
         deleteCategory,
         fetchCategories,
         isEdit,
         pagination: { pageSize, current },
         filters: { keyword, type }
      } = this.props;
      deleteCategory(id)
         .then((res) => {
            message.success(strings.CATEGORY_PAGE_DELETE_SUCCESS);
            fetchCategories(pageSize, current, keyword, type);
            if (isEdit) {
               this.handleCancelButton();
            }
         })
         .catch((err) => {
            // console.error(`ithoangtan ~ err`, err)
            showMessage(err);
         });
   };

   handleViewCategory = (data) => {
      const { setCategoryId, history } = this.props;
      setCategoryId(data.id);
      history.push(PATH.MASTER_DATA_PRODUCT_ALL);
   };

   handleCancelButton = () => {
      const { setIsEdit, resetForm, setIsParent } = this.props;
      setIsEdit(false);
      resetForm();
      setIsParent(false);
      this.setState({ selectedRowKeys: [] });
   };

   /**
    * Handle select row on table
    */

   selectRow = (record) => {
      const selectedRowKeys = [...this.state.selectedRowKeys];
      if (selectedRowKeys.indexOf(record.key) >= 0) {
         selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
      } else {
         selectedRowKeys.push(record.key);
      }
      this.setState({ selectedRowKeys });
   };

   onSelectedRowKeysChange = (selectedRowKeys) => {
      this.setState({ selectedRowKeys });
   };

   /**
    *  Handle filter table
    */
   changeTextSearch = (value) => {
      const { setFilters, fetchCategories, filters, pagination, setPagination } = this.props;
      setFilters((prev) => ({ ...prev, keyword: value }));
      setPagination((prev) => ({ ...prev, current: 1 }));
      fetchCategories(pagination.pageSize, 1, value, filters.type);
   };

   // change curent page
   changePage = (page) => {
      const { pagination, setPagination, fetchCategories, filters } = this.props;
      setPagination((prev) => ({ ...prev, current: page }));
      fetchCategories(pagination.pageSize, page, filters.keyword, filters.type);
   };
   handleChangeType = (type) => {
      const { pagination, setPagination, fetchCategories, filters, setFilters } = this.props;
      setFilters((prev) => ({ ...prev, type }));
      setPagination((prev) => ({ ...prev, current: 1 }));
      fetchCategories(pagination.pageSize, 1, filters.keyword, type);
   };

   render() {
      const {
         handleSubmit,
         values,
         handleChange,
         handleBlur,
         setFieldValue,
         touched,
         errors,
         isSubmitting,
         dataSource,
         pagination,
         filters,
         parentOptions,
         isEdit
      } = this.props;

      const columns = [
         {
            title: strings.CATEGORY_PAGE_TABLE_COLUMN_TITLE_PICTURE,
            dataIndex: "image",
            render: (cellData) => {
               return cellData ? <img style={{ width: "50px" }} src={`${IMAGE_URL}${cellData}`} alt='picture' /> : "";
            }
         },
         {
            title: strings.CATEGORY_PAGE_TABLE_COLUMN_TITLE_CATEGORY_NAME,
            dataIndex: "name",
            render: (cellData, row, index) => {
               return (
                  <>
                     {cellData}
                     <div className={`action-table action-${row.key}`}>
                        <UIButton className='btn-edit' width='20' onClick={() => this.handleUpdateCategory(row)}>
                           {strings.CATEGORY_PAGE_TABLE_BUTTON_EDIT}
                        </UIButton>

                        <Popconfirm
                           title={strings.CATEGORY_PAGE_DELETE_CATEGORY_CONFIRM}
                           cancelText={strings.CANCELED}
                           onConfirm={() => this.handleDelteCategory(row.id)}>
                           <UIButton width='20' className='btn-delete mr-1 ml-1'>
                              {strings.CATEGORY_PAGE_TABLE_BUTTON_DELETE}
                           </UIButton>
                        </Popconfirm>

                        <UIButton className='btn-view' width='20' onClick={() => this.handleViewCategory(row)}>
                           {strings.CATEGORY_PAGE_TABLE_BUTTON_VIEW}
                        </UIButton>
                     </div>
                  </>
               );
            }
         },
         {
            title: strings.CATEGORY_PAGE_TABLE_COLUMN_TITLE_DESCRIPTION,
            dataIndex: "note",
            render: (cellData, records) => {
               return cellData;
            }
         },
         {
            title: strings.CATEGORY_PAGE_TABLE_COLUMN_TITLE_SLUG,
            dataIndex: "slug",
            render: (cellData, records) => {
               return cellData;
            }
         },
         {
            title: strings.CATEGORY_PAGE_TABLE_COLUMN_TITLE_AMOUNT_PRODUCT,
            dataIndex: "productsCount",
            render: (cellData, records) => {
               return cellData;
            }
         }
      ];

      const { selectedRowKeys, listProducts } = this.state;

      const rowSelection = {
         selectedRowKeys,
         onChange: this.onSelectedRowKeysChange
      };

      const uploadButton = (
         <div>
            {/* <Icon type={this.state.loading ? "loading" : "plus"} /> */}
            <div className='ant-upload-text'>{strings.CATEGORY_PAGE_FORM_UPLOAD}</div>
         </div>
      );

      return (
         <>
            <div className='form-search-header'>
               <SearchField
                  initialValue={filters.keyword}
                  placeholder={strings.HEADER_PLACEHOLDER_SEARCH}
                  size='small'
                  onChangeText={this.changeTextSearch}
               />
            </div>
            <div className='category-page row'>
               {/* start left column*/}
               <div className='col-5'>
                  <div className='content-head mt-2'>
                     <p>{strings.CATEGORY_PAGE_FIRST_DESCRIPTION}</p>
                  </div>
                  <div className='form-category'>
                     <h4 className='mt-5 mb-5'>
                        {isEdit ? strings.CATEGORY_PAGE_FORM_BUTTON_EDIT_CATEGORY : strings.CATEGORY_PAGE_TITLE_FORM}
                     </h4>
                     <Form onFinish={handleSubmit}>
                        <Row>
                           <Form.Item>
                              <Col>
                                 <InputField
                                    name='name'
                                    required
                                    placeholder={strings.CATEGORY_PAGE_FORM_LABLE_NAME}
                                    value={values.name}
                                    validatestatus={touched.name && errors.name ? "error" : undefined}
                                    help={touched.name && errors.name ? errors.name : ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 />
                                 <div className='short-desciption'>
                                    <p>{strings.CATEGORY_PAGE_FORM_SHORT_DESCRIPTION_NAME}</p>
                                 </div>
                              </Col>
                           </Form.Item>
                           <Form.Item>
                              <Col span={24}>
                                 <InputField
                                    name='slug'
                                    placeholder={strings.CATEGORY_PAGE_FORM_LABLE_SLUG}
                                    value={values.slug}
                                    validatestatus={touched.slug && errors.slug ? "error" : undefined}
                                    help={touched.slug && errors.slug ? errors.slug : ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 />
                                 <div className='short-desciption'>
                                    <p>{strings.CATEGORY_PAGE_FORM_SHORT_DESCRIPTION_SLUG}</p>
                                 </div>
                              </Col>
                           </Form.Item>
                           <Form.Item>
                              <Col span={24}>
                                 <SelectField
                                    name='parentId'
                                    value={values.parentId}
                                    onChange={(val) => setFieldValue("parentId", val)}
                                    onBlur={handleBlur}
                                    placeholder={strings.CATEGORY_PAGE_FORM_LABLE_CATEGORY}
                                    data={parentOptions}
                                    disabled={this.props.isParent}
                                    showSearch={true}
                                    filterOption={(input, option) => {
                                       return (
                                          option.children &&
                                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                       );
                                    }}
                                 />
                                 <div className='short-desciption'>
                                    <p>{strings.CATEGORY_PAGE_FORM_SHORT_DESCRIPTION_PARENT}</p>
                                 </div>
                              </Col>
                           </Form.Item>
                           <Form.Item>
                              <Col span={24}>
                                 <TextAreaField
                                    name='note'
                                    value={values.note}
                                    validatestatus={touched.note && errors.note ? "error" : undefined}
                                    help={touched.note && errors.note ? errors.note : ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    label={strings.CATEGORY_PAGE_FORM_LABLE_DESCRIPTION}
                                 />
                                 <div className='short-desciption'>
                                    <p>{strings.CATEGORY_PAGE_FORM_SHORT_DESCRIPTION_DESCRIPTION}</p>
                                 </div>
                              </Col>
                           </Form.Item>
                           <Form.Item>
                              <Col span={24}>
                                 <SelectField
                                    name='type'
                                    value={values.type}
                                    onChange={this.handleChangeSelectType}
                                    onBlur={handleBlur}
                                    placeholder={strings.CATEGORY_PAGE_FORM_LABLE_CATEGORY_TYPE}
                                    data={typeOptions}
                                    label={strings.CATEGORY_PAGE_FORM_SHORT_DESCRIPTION_TYPE}
                                 />
                              </Col>
                           </Form.Item>
                           <Form.Item>
                              <Col>
                                 <div className='ant-col ant-form-item-label'>
                                    <label title={strings.CATEGORY_PAGE_FORM_LABLE_THUMBNAIL}>
                                       {strings.CATEGORY_PAGE_FORM_LABLE_THUMBNAIL}
                                    </label>
                                 </div>
                              </Col>
                              <Col span={24}>
                                 <Upload
                                    name='files'
                                    listType='picture-card'
                                    className='avatar-uploader'
                                    showUploadList={false}
                                    action={API_UPLOAD_URL}
                                    beforeUpload={checkAvartarImage}
                                    onChange={this.handleChange}>
                                    {values.image ? (
                                       <img
                                          src={`${IMAGE_URL}${values.image}`}
                                          alt='avatar'
                                          style={{ width: "100%" }}
                                       />
                                    ) : (
                                       uploadButton
                                    )}
                                 </Upload>
                              </Col>
                           </Form.Item>
                           <Form.Item>
                              <UIButton
                                 type='primary'
                                 htmlType='submit'
                                 loading={isSubmitting}
                                 onClick={() => {
                                    window.scroll({
                                       top: 65,
                                       left: 0,
                                       behavior: "smooth"
                                    });
                                 }}>
                                 {isEdit
                                    ? strings.CATEGORY_PAGE_FORM_BUTTON_EDIT_CATEGORY
                                    : strings.CATEGORY_PAGE_FORM_BUTTON_CREATE_CATEGORY}
                              </UIButton>

                              {isEdit && (
                                 <UIButton
                                    type='secondary'
                                    htmlType='button'
                                    loading={isSubmitting}
                                    className='ml-5'
                                    onClick={this.handleCancelButton}>
                                    {strings.CANCELED}
                                 </UIButton>
                              )}
                           </Form.Item>
                        </Row>
                     </Form>
                  </div>
               </div>
               {/* end left column*/}

               {/* start right column*/}
               <div className='col-7 table-view'>
                  <div className='form-action-header d-flex'>
                     <SelectField
                        data={typeOptions}
                        placeholder={strings.CATEGORY_PAGE_FORM_PLACEHOLDER_FILTER}
                        onChange={this.handleChangeType}
                     />
                     <div className='pagination-right d-flex justify-content-between align-items-center mb-3 ml-3'>
                        <div className='amount-category mr-4'>
                           <p>{`${pagination.total} ${strings.CATEGORY_PAGE_COUNT_PRODUCT}`}</p>
                        </div>
                        <UIPagination
                           defaultCurrent={pagination.current}
                           total={pagination.total}
                           pageSize={pagination.pageSize}
                           onChange={(page) => this.changePage(page)}
                        />
                     </div>
                  </div>
                  <UITable
                     data={getArray(dataSource)}
                     rowClassName='cursor-pointer'
                     columns={columns}
                     loading={this.props.isLoading}
                     rowSelection={rowSelection}
                     changePage={this.changePage}
                  />
                  <div className='mt-3 d-flex form-action-footer'>
                     <SelectField data={actionOptions} placeholder={strings.CATEGORY_PAGE_FORM_PLACEHOLDER_FILTER} />
                     <div className='pagination-right d-flex justify-content-between align-items-center mb-3'>
                        <UIPagination
                           defaultCurrent={pagination.current}
                           total={pagination.total}
                           pageSize={pagination.pageSize}
                           onChange={(page) => this.changePage(page)}
                        />
                     </div>
                  </div>
                  <div className='note-footer short-desciption'>
                     <p>{strings.CATEGORY_PAGE_FORM_FOOTER_NOTE}</p>
                  </div>
               </div>
               {/* end right column*/}
            </div>
         </>
      );
   }
}

export default compose(
   withRouter,
   connect(null, {
      createCategory,
      getAllCategories,
      getViewProducts,
      getParentCategories,
      updateCategory,
      deleteCategory,
      setCategoryId
   }),
   withState("dataSource", "setDataSource", []),
   withState("pagination", "setPagination", {
      total: 0,
      current: 1,
      pageSize: 5,
      hideOnSinglePage: false
   }),
   withState("filters", "setFilters", { keyword: "", type: undefined }),
   withState("parentOptions", "setParentOptions", []),
   withState("isEdit", "setIsEdit", false),
   withState("isLoading", "setIsLoading", false),
   withState("isParent", "setIsParent", false),
   withHandlers({
      fetchCategories: (props) => (pageSize, current, keyword, type) => {
         const { getAllCategories, setPagination, setDataSource, setIsLoading } = props;
         setIsLoading(true);
         getAllCategories(pageSize, current, keyword, type)
            .then(({ header, res }) => {
               setIsLoading(false);
               const total = getString(header, "x-total-count");
               setDataSource(generateAutoKey(res));
               setPagination((prev) => ({ ...prev, total: total }));
            })
            .catch((err) => {
               setIsLoading(false);
               console.error(`ithoangtan ~ err`, err)
            });
      },

      fetchParentCategories: (props) => (type) => {
         const { getParentCategories, setParentOptions } = props;
         return getParentCategories(type)
            .then(({ res }) => {
               setParentOptions(res.map((cate) => ({ label: cate.name, value: cate.id })));
            })
            .catch((err) => {
               console.error(`ithoangtan ~ err`, err)
            });
      }
   }),
   withFormik({
      displayName: "addCategories",
      mapPropsToValues: () => ({
         name: "",
         slug: "",
         parentId: undefined,
         note: "",
         image: undefined,
         type: "PRODUCT"
      }),
      validationSchema,
      handleSubmit: (values, { props, setSubmitting, resetForm }) => {
         const {
            createCategory,
            isEdit,
            updateCategory,
            fetchCategories,
            pagination,
            filters,
            setFilters,
            setPagination,
            getAllCategories
         } = props;

         if (isEdit) {
            updateCategory(values)
               .then((result) => {
                  message.success(strings.CATEGORY_PAGE_EDIT_SUCCESS);
                  setSubmitting(false);
                  fetchCategories(pagination.pageSize, pagination.current, filters.keyword, filters.type);
               })
               .catch((err) => {
                  setSubmitting(false);
                  showMessage(err);
               });
         } else {
            createCategory(values)
               .then((result) => {
                  message.success(strings.CATEGORY_PAGE_CREATE_SUCCESS);
                  setSubmitting(false);
                  resetForm();

                  getAllCategories(parseInt(pagination.total) + 1, 1, "", "").then(({ res }) => {
                     let index = -1;
                     let id = result.res.parentId ? result.res.parentId : result.res.id;
                     res.map((cate, i) => {
                        if (id === cate.id) index = i;
                     });

                     const page = Math.ceil((index + 1) / pagination.pageSize);
                     fetchCategories(pagination.pageSize, page, "", "");
                     setPagination((prev) => ({ ...prev, current: page }));
                     setFilters({ keyword: "", type: undefined });
                  });
               })
               .catch((err) => {
                  setSubmitting(false);
                  showMessage(err);
               });
         }
      }
   }),
   lifecycle({
      componentDidMount() {
         const { filters, pagination, fetchCategories, fetchParentCategories, values } = this.props;

         fetchCategories(pagination.pageSize, pagination.current, filters.keyword, filters.type);

         fetchParentCategories(values.type);
      }
   })
)(CreateCategory);
