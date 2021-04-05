import { css } from "styled-components";
import { sizes } from "~/configs";

export const mediaMax = Object.keys(sizes).reduce((acc, label) => {
   acc[label] = (...args) => css`
      @media (max-width: ${sizes[label]}) {
         ${css(...args)}
      }
   `;
   return acc;
}, {});

export const mediaMin = Object.keys(sizes).reduce((acc, label) => {
   acc[label] = (...args) => css`
      @media (min-width: ${sizes[label]}) {
         ${css(...args)}
      }
   `;
   return acc;
}, {});
