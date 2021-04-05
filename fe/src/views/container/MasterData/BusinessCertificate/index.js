import React from "react";
import { compose } from "recompose";
import { PageTitle } from "~/views/presentation/ui/commons";

import { ContentWrapper } from "~/views/presentation/ui/container";
import { withRouter } from "react-router-dom";
import Certificate from "./Certificate";

class BusinessCertificate extends React.PureComponent {
   render() {
      return (
         <ContentWrapper>
            <PageTitle title={strings.BUSINESS_CER_PAGE_TITLE} breadcrumb={false} />

            <Certificate />
         </ContentWrapper>
      );
   }
}

export default BusinessCertificate;
