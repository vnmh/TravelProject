import React, { useState } from "react";
import { Card } from "antd";

import AvatarUpload from "~/views/presentation/ui/upload/AvatarUpload";
import styled from "styled-components";
const Wrapper = styled.div`
   border-radius: 0.5em;
   border: 1px solid #ccc;
   overflow: hidden;
   .ant-card-head {
      background: #fafafa;
   }
`;

function Avatar({ imageName, changed }) {
   const handleChangeAvatar = (imageName) => {
      changed(imageName);
   };
   return (
      <Wrapper className='mt-5'>
         <Card
            title={strings.avatar}
            bordered={false}
            style={{ width: "100%" }}
            headStyle={{
               height: "30px",
               lineHeight: "30px",
               display: "flex",
               flexDirection: "column",
               justifyContent: "center"
            }}>
            <AvatarUpload avatarUrl={imageName} onChange={handleChangeAvatar} icon={<span>Avartar</span>} />
         </Card>
      </Wrapper>
   );
}

export default Avatar;
