import React from "react";
import UITable from "~/views/presentation/ui/tables/Table";
import { UIButton } from "~/views/presentation/ui/buttons";
import { message, Popconfirm, Space, TreeSelect } from "antd";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import * as PATH from "~/configs/routesConfig";

import { getString, getArray } from "~/views/utilities/helpers/utilObject";
import { UIPagination } from "~/views/presentation/ui/commons";
import { SearchField, SelectField, TreeSelectField } from "~/views/presentation/ui/fields";
import { IMAGE_URL } from "~/configs";
import { getAllProducts, getAllCategories, deleteProduct } from "~/state/ducks/appApis/actions";
import { setCategoryId } from "~/state/ducks/appData/actions";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import { showMessage } from "../showMessage";
import _ from "lodash";
import UtilDate from "~/views/utilities/helpers/UtilDate";

const generateAutoKey = (dataSource) => {
   return getArray(dataSource, undefined, []).map((item, index) => ({
      ...item,
      key: item.id
   }));
};

const actionOptions = [
   { label: strings.CATEGORY_PAGE_TABLE_BUTTON_EDIT, value: 1 },
   { label: strings.CATEGORY_PAGE_TABLE_BUTTON_DELETE, value: 2 }
];

class OriginalProduct extends React.PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         selectedRowKeys: [],
         loading: false,
         imageUrl: undefined
      };
   }

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
    * Handle button action  on table
    */

   handleUpdateProduct = (data) => {
      const { history } = this.props;
      history.push(PATH.MASTER_DATA_PRODUCT_EDIT.replace(":id", data.id));
   };

   handleDelteProduct = (id) => {
      const {
         deleteProduct,
         fetchProducts,
         pagination: { pageSize, current },
         filters: { keyword, categoryId }
      } = this.props;
      deleteProduct(id)
         .then((res) => {
            message.success(strings.ORIGINAL_PRODUCT_PAGE_DELETE_PRODUCT_SUCCESS);
            fetchProducts(keyword, current, pageSize, categoryId);
         })
         .catch((err) => {
            showMessage(err);
         });
   };

   handleViewProduct = (data) => {
      const { history } = this.props;
      history.push(PATH.MASTER_DATA_PRODUCT_VIEW.replace(":id", data.id));
   };

   /**
    *  Handle change filters
    */
   changeCategoryFilter = (value) => {
      const { setFilters, fetchProducts, pagination, setPagination, filters } = this.props;

      setFilters((prev) => ({ ...prev, categoryId: value }));
      setPagination((prev) => ({ ...prev, current: 1 }));

      fetchProducts(filters.keyword, 1, pagination.pageSize, value);
   };

   changeTextSearch = (value) => {
      const { filters, setFilters, fetchProducts, pagination, setPagination } = this.props;
      setFilters((prev) => ({ ...prev, keyword: value }));
      setPagination((prev) => ({ ...prev, current: 1 }));
      fetchProducts(value, 1, pagination.pageSize, filters.categoryId);
   };

   changePage = (page) => {
      const { pagination, setPagination, fetchProducts, filters } = this.props;
      setPagination((prev) => ({ ...prev, current: page }));
      fetchProducts(filters.keyword, page, pagination.pageSize, filters.categoryId);
   };

   //change size of page
   changeFilterPage = (pageSize) => {
      const { setPagination, fetchProducts, filters } = this.props;
      setPagination((prev) => ({ ...prev, pageSize: pageSize, current: 1 }));
      fetchProducts(filters.keyword, 1, pageSize);
   };

   // change type option filter
   changeFilterType = (type) => {
      const { filters, setFilters, fetchProducts, pagination } = this.props;
      setFilters((prev) => ({ ...prev, type }));
      fetchProducts(filters.keyword, 1, pagination.pageSize);
   };

   render() {
      const { dataSource, isLoading, pagination, filters, history, categoryOptions } = this.props;
      const { selectedRowKeys } = this.state;
      let columns = [
         {
            title: strings.ORIGINAL_PRODUCT_TABLE_COLUMN_PICTURE,
            dataIndex: "avatar",
            render: (cellData) => {
               return cellData ? <img style={{ width: "50px" }} src={`${IMAGE_URL}${cellData}`} alt='picture' /> : "";
            }
         },
         {
            title: strings.ORIGINAL_PRODUCT_TABLE_COLUMN_NAME,
            dataIndex: "name",
            render: (cellData, row, index) => {
               return (
                  <>
                     {cellData}
                     <div className={`action-table action-${row.key}`}>
                        <UIButton className='btn-edit' width='20' onClick={() => this.handleUpdateProduct(row)}>
                           {strings.CATEGORY_PAGE_TABLE_BUTTON_EDIT}
                        </UIButton>
                        <Popconfirm
                           title={strings.ORIGINAL_PRODUCT_PAGE_DELETE_PRODUCT_CONFIRM}
                           cancelText={strings.CANCELED}
                           onConfirm={() => this.handleDelteProduct(row.id)}>
                           <UIButton width='20' className='btn-delete mr-1 ml-1'>
                              {strings.CATEGORY_PAGE_TABLE_BUTTON_DELETE}
                           </UIButton>
                        </Popconfirm>
                        <UIButton className='btn-view' width='20' onClick={() => this.handleViewProduct(row)}>
                           {strings.CATEGORY_PAGE_TABLE_BUTTON_VIEW}
                        </UIButton>
                     </div>
                  </>
               );
            }
         },
         {
            title: strings.ORIGINAL_PRODUCT_TABLE_COLUMN_CODE,
            dataIndex: "code",
            render: (cellData, records) => {
               return cellData;
            }
         },
         {
            title: strings.ORIGINAL_PRODUCT_TABLE_COLUMN_CATEGORIES,
            dataIndex: "categoryName",
            render: (cellData, records) => {
               return cellData;
            }
         },
         {
            title: strings.ORIGINAL_PRODUCT_TABLE_COLUMN_TAGS,
            dataIndex: "tags",
            render: (cellData, records) => {
               return cellData;
            }
         },
         {
            title: strings.ORIGINAL_PRODUCT_TABLE_COLUMN_CREATE_DATE,
            dataIndex: "createdDate",
            render: (cellData, records) => {
               return UtilDate.toDateLocal(cellData);
            }
         }
      ];

      const rowSelection = {
         selectedRowKeys,
         onChange: this.onSelectedRowKeysChange
      };

      return (
         <>
            <div className='form-search-header'>
               <SearchField
                  initialValue={filters.keyword}
                  placeholder={strings.product_page_search_placeholder}
                  size='small'
                  onChangeText={this.changeTextSearch}
               />
            </div>
            <div className='category-page'>
               <div className='table-view w-100'>
                  <div className='form-action-header row'>
                     <div className='col-md-6 col-12 clearfix'>
                        <div className='float-left' style={{ width: "200px" }}>
                           <SelectField
                              data={actionOptions}
                              placeholder={strings.CATEGORY_PAGE_FORM_PLACEHOLDER_FILTER}
                              width='200px'
                           />
                        </div>

                        <div className='float-left ml-3' style={{ width: "200px" }}>
                           <TreeSelectField
                              data={categoryOptions}
                              value={filters.categoryId}
                              handleSelect={this.changeCategoryFilter}
                              placeholder={strings.ORIGINAL_PRODUCT_FILTER_CATEGORY_PLACEHOLDER}
                              showSearch={true}
                              filterTreeNode={(input, treeNode) => {
                                 return (
                                    treeNode.title && treeNode.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                 );
                              }}
                           />
                        </div>
                     </div>

                     <div className='col-md-6 col-12 d-flex justify-content-end'>
                        <div className='pagination-right d-flex justify-content-center align-items-center '>
                           <div className='amount-category mr-4'>
                              <p>{`${pagination.total} ${strings.product_page_count_product}`}</p>
                           </div>
                           <UIPagination
                              defaultCurrent={pagination.current}
                              total={pagination.total}
                              pageSize={pagination.pageSize}
                              onChange={(page) => this.changePage(page)}
                           />
                        </div>
                     </div>
                  </div>
                  <UITable
                     dataSource={getArray(dataSource)}
                     rowClassName='cursor-pointer'
                     columns={columns}
                     loading={isLoading}
                     rowSelection={rowSelection}
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
               </div>
            </div>
         </>
      );
   }
}

export default compose(
   withRouter,
   connect(
      (state) => ({
         categoryId: state["appData"].categoryId
      }),
      {
         getAllProducts,
         getAllCategories,
         deleteProduct,
         setCategoryId
      }
   ),
   withState("dataSource", "setDataSource", []),
   withState("pagination", "setPagination", {
      total: 0,
      current: 1,
      pageSize: 5,
      hideOnSinglePage: false
   }),
   withState("filters", "setFilters", { categoryId: undefined, keyword: "" }),
   withState("isLoading", "setIsLoading", false),
   withState("categoryOptions", "setCategoryOptions", []),
   withHandlers({
      fetchProducts: (props) => (keyword, current, pageSize, categoryId) => {
         const { getAllProducts, setPagination, setDataSource, setIsLoading } = props;

         setIsLoading(true);
         getAllProducts(keyword, current, pageSize, categoryId)
            .then(({ header, res }) => {
               setIsLoading(false);
               setDataSource(generateAutoKey(res));

               const total = getString(header, "x-total-count");
               setPagination((prev) => ({ ...prev, total: total }));
            })
            .catch((err) => {
               setIsLoading(false);
               console.error(`ithoangtan ~ err`, err)
            });
      }
   }),
   lifecycle({
      componentDidMount() {
         const {
            filters,
            setFilters,
            fetchProducts,
            pagination,
            getAllCategories,
            setCategoryOptions,
            categoryId,
            setCategoryId
         } = this.props;

         fetchProducts(filters.keyword, pagination.current, pagination.pageSize, categoryId);

         if (!_.isNil(categoryId)) {
            setFilters(
               (prev) => ({
                  ...prev,
                  categoryId: categoryId
               }),
               () => {
                  setCategoryId(undefined);
               }
            );
         }

         getAllCategories(10000)
            .then(({ res }) => {
               setCategoryOptions(
                  res.map((cate) => {
                     let item = { label: cate.name, value: cate.id };
                     if (!_.isNil(cate.subCategories)) {
                        const children =
                           cate.subCategories.length > 0 &&
                           cate.subCategories.map((sub) => ({
                              label: sub.name,
                              value: sub.id
                           }));

                        if (children) item.items = children;
                     }
                     return item;
                  })
               );
            })
            .catch((err) => showMessage(err));
      }
   })
)(OriginalProduct);
