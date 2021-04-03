import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { appApisActions } from "~/state/ducks/appApis/index";
import { message } from "antd";
import MyCKEditor from "~/views/container/commons/MyCKEditor";

const ContainerStyled = styled.div``;

function Overview(props) {
   const [data, setData] = useState([]);
   useEffect(() => {
      props
         .getTours()
         .then(({ res }) => {
            setData(_.get(res, undefined, []));
         })
         .catch((err) => {
            message.error("Lỗi load dữ liệu tour rồi nha");
         });
   }, []);
   return (
      <ContainerStyled>
         Tính năng đang được mockup
         <MyCKEditor />
         {data.map((o) => {
            return <p>{o?.titleTour} </p>;
         })}
      </ContainerStyled>
   );
}

export default connect(
   (state) => ({
      user: state["authUser"].user
   }),
   {
      getTours: appApisActions.getTours
   }
)(Overview);
