import React from "react";
import { compose, withHandlers, lifecycle, withState } from "recompose";
import { connect } from "react-redux";
import { PageTitle } from "~/views/presentation/ui/commons";

import { ContentWrapper } from "~/views/presentation/ui/container";
import { withRouter } from "react-router-dom";
import OriginalProduct from "./OriginalProduct";
import { UIButton } from "~/views/presentation/ui/buttons";
import * as PATH from "~/configs/routesConfig";

class AllProducts extends React.PureComponent {
   render() {
      const { history } = this.props;

      return (
         <ContentWrapper>
            <div className='d-flex align-items-center'>
               <PageTitle title={strings.ORIGINAL_PAGE_TITLE} breadcrumb={false} />
               <UIButton
                  type='primary'
                  className='ml-3 btn-pd-add'
                  onClick={() =>
                     history.push({
                        pathname: PATH.MASTER_DATA_PRODUCT_ADD
                     })
                  }>
                  Thêm mới
               </UIButton>
               <UIButton type='default' className='mr-2 ml-2 btn-pd-import' disabled>
                  Nhập file
               </UIButton>
               <UIButton className='btn-pd-export' disabled>
                  Xuất file
               </UIButton>
            </div>

            <OriginalProduct />
         </ContentWrapper>
      );
   }
}

export default compose(withRouter)(AllProducts);
