import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { BACKEND_URL, BREAKPOINT } from "../constants";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";

const TestPage = (props) => {
  // useState always right at the top
  const [someState, setSomeState] = useState("state");
  const [cssState, setCssState] = useState("yellow");

  // destructure props next, if any
  const {} = props;

  // any other hooks goes here, if any
  const { userDetails, setUserDetails } = useUserContext(); // put this at the highest level of hooks group as close to state as possible
  const mediaQuery = useMediaQuery(BREAKPOINT.breakpoints.down("tablet")); // anything with width below "tablet" breakpoint, mediaQuery = true, otherwise false
  const { state } = useLocation();
  const navigation = useNavigate();
  const { someParam } = useParams();
  const { register } = useForm({ mode: "onChange" });

  // useEffects and their respective helper fn here
  // Please describe what the useEffect is for using comments
  useEffect(() => {
    helper();
  }, []);

  const helper = () => {
    console.log("hi");
  };

  // Please describe what the useEffect is for using comments
  useEffect(() => {
    helperTwo();
  }, [someState]);

  const helperTwo = () => {
    console.log("hi2");
  };

  return (
    // Try to use Box and flex properties to build layout
    // do all css inline using Box props. if not avail from Box props, use css prop
    // use localhost:3000/test to try out css prop as well as img object-fit: contain
    // we can also try to use kebab-case classname to identify Boxes, but never use classname as rule for css targetting.
    <Box
      className="outer-container"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        className="transform-translate-box"
        display="flex"
        justifyContent="center"
        css={css`
          transform: translate(10px, 500px);
        `}
      >
        E.g. Box has no transform translate prop
      </Box>
      <Box
        className="hover-after-before-css-test"
        color="black"
        css={css`
          --custom-color: ${cssState};
          :hover {
            color: var(--custom-color);
          }
          ::after {
            content: "some content right after this div";
            background-color: black;
            color: white;
            position: relative;
            left: 50px;
          }
          :hover::before {
            content: "content";
            background-color: yellow;
            color: red;
            position: relative;
            right: 100px;
          }
        `}
      >
        Can also do custom CSS variables with css prop
      </Box>
      <Box className="image-container" width="500px">
        <img src="https://picsum.photos/200/300" alt="picsum" width="100%" />
      </Box>
    </Box>
  );
};

export default TestPage;
