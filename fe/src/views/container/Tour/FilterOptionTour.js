import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Select } from "antd";
import { PROVINCES } from "~/configs/VNprovinces";

const { Option } = Select;

const FilterOptionBlogStyled = styled.div``;

function FilterOptionBlog(props) {
   const handleChange = (value) => {
      props.setSortType(value);
      console.log(`selected ${value}`);
   };
   const handleChangeAddress = (value) => {
      props.setAddressType(value);
      console.log(`selected ${value}`);
   };
   return (
      <FilterOptionBlogStyled>
         <div className='filter-bar d-flex align-items-center justify-content-between'>
            <div className='filter-bar-filter d-flex flex-wrap align-items-center'>
               <div className='filter-option pt-2'>
                  <h3 className='title font-size-16'>Lọc theo:</h3>
               </div>
               <div className='filter-option'>
                  <Select
                     onChange={handleChangeAddress}
                     showSearch
                     style={{ width: 150 }}
                     placeholder='Chọn địa chỉ'
                     optionFilterProp='children'
                     filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                     {PROVINCES.map((province) => {
                        return <Option value={province}>{province}</Option>;
                     })}
                  </Select>
               </div>
            </div>

            <div className=''>
               <Select defaultValue='Mặc định' style={{ width: 150 }} onChange={handleChange}>
                  <Option value='filter-default'>Mặc định</Option>
                  <Option value='new-tour'>Tour mới</Option>
                  <Option value='price-low-to-high'>Giá: thấp đến cao</Option>
                  <Option value='price-high-to-low'>Giá: cao đến thấp</Option>
                  <Option value='a-to-z'>A đến Z</Option>
               </Select>
            </div>
         </div>
      </FilterOptionBlogStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(FilterOptionBlog);
