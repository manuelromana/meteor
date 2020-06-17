import React from "react";
import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import Appbar from "./Appbar";

// const Container = styled.div`
//   display: flex;
// `;

// const ContainerPage = styled.div`
//   padding: 32px;
//   flex-grow: 1;
// `;

// const useStyles = makeStyles(theme => ({
//   toolbar: theme.mixins.toolbar,
// }));

function UserLayout(props) {
  return (
    <div>
      <Appbar></Appbar>
      <div>{props.children}</div>
    </div>
  );
}

export default UserLayout;
