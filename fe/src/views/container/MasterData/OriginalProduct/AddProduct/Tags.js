import React, { useEffect, useState } from "react";
import { Card } from "antd";

import { InputField } from "~/views/presentation/ui/fields";
import { UIButton } from "~/views/presentation/ui/buttons";
import styled from "styled-components";
const Wrapper = styled.div`
   border-radius: 0.5em;
   border: 1px solid #ccc;
   overflow: hidden;
   .ant-card-head {
      background: #fafafa;
   }
`;

function Tags({ changed, value }) {
   return (
      <Wrapper className='mt-5'>
         <Card
            title='Tags'
            bordered={false}
            style={{ width: "100%" }}
            headStyle={{
               height: "30px",
               lineHeight: "30px",
               display: "flex",
               flexDirection: "column",
               justifyContent: "center"
            }}>
            <div className='d-flex justify-content-between align-items-center'>
               <InputField placeholder='Tags' name='tags' onChange={(e) => changed(e.target.value)} value={value} />
               <div className='ml-3 mb-3'>
                  <UIButton type='primary' width='110px' ghost>
                     {strings.add_tags}
                  </UIButton>
               </div>
            </div>

            <i style={{ fontSize: "13px" }}>{strings.text_note_tags}</i>
         </Card>
      </Wrapper>
   );
}

export default Tags;
