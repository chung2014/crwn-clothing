import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  //   background-color: pink;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
  //   background-color: yellow;
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const OptionsContainer = styled.div`
  // background-color: yellow;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

// const OptionContainerStyles = css`
//   padding: 10px 15px;
//   cursor: pointer;
// `;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
// export const OptionDiv = styled.div`
//     ${OptionContainerStyles}
// `
