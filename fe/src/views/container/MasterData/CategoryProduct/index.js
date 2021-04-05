import React from "react";
import { compose, withHandlers, lifecycle, withState } from "recompose";
import { connect } from "react-redux";
import { PageTitle } from "~/views/presentation/ui/commons";

import { ContentWrapper } from "~/views/presentation/ui/container";
import { withRouter } from "react-router-dom";
import CreateCategory from "./category";

class ListProduct extends React.PureComponent {
   render() {
      const { history } = this.props;

      return (
         <ContentWrapper>
            <PageTitle title={strings.SIDEBAR_MENU_CATEGORY} breadcrumb={false} />

            <CreateCategory />
         </ContentWrapper>
      );
   }
}

export default compose(withRouter)(ListProduct);
