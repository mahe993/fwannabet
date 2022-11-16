import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";

const AnimatedWords = () => {
  return (
    <Box>
      <AnimateWords
        color="yellow"
        fontSize={20}
        bottom="37%"
        left="5%"
        css={css`
          animation: ${fade} 3s steps(50, jump-both) infinite;
        `}
      >
        $88?
      </AnimateWords>
      <AnimateWords
        color="red"
        fontSize={50}
        top="30%"
        left="5%"
        css={css`
          animation: ${fade1} 2.5s steps(50, jump-both) infinite alternate;
        `}
      >
        O$P$
      </AnimateWords>
      <AnimateWords
        color="teal"
        fontSize={20}
        left="45%"
        top="46%"
        css={css`
          animation: ${fade2} 2s steps(50, jump-both) infinite;
        `}
      >
        Lebron &gt;30points??
      </AnimateWords>
      <AnimateWords
        color="darkolivegreen"
        fontSize={22}
        right="10%"
        top="35%"
        css={css`
          animation: ${fade3} 4s steps(80, jump-both) infinite;
        `}
      >
        Ronaldo 2 goals???
      </AnimateWords>
      <AnimateWords
        color="pink"
        fontSize={15}
        right="10%"
        css={css`
          animation: ${fade4} 3s steps(60, jump-both) infinite;
        `}
      >
        Rain at 1pm!!
      </AnimateWords>
    </Box>
  );
};

export default AnimatedWords;

const fade = keyframes`
0% {
  transform: scale(.75)  translate(10%, 20%) rotate(45deg);
  opacity: .3;
}

100%{
  transform: scale(1)  translate(25%, 0%) rotate(45deg);
  opacity: 0;
}
`;

const fade1 = keyframes`
0% {
  transform: scale(.95) translate(-10%, 0%) rotate(-30deg);
  opacity: 0;
}

33% {
  opacity: .15;
}

66% {
  opacity: 0;
}

100%{
  transform: scale(1) translate(0%, 10%) rotate(-30deg);
  opacity: .15;
}
`;

const fade2 = keyframes`
0% {
  transform: scale(.95) translate(-35%, 0%) rotate(-5deg);
  opacity: .5;
}

100%{
  transform: scale(1) translate(-40%, 10%) rotate(-5deg);
  opacity: 0;
}
`;

const fade3 = keyframes`
0% {
  transform: scale(.8) translate(15%, -35%) rotate(30deg);
  opacity: .5;
}

100%{
  transform: scale(1) translate(15%, -30%) rotate(0deg);
  opacity: 0;
}
`;

const fade4 = keyframes`
0% {
  transform: scale(.9) translate(10%, -190%) rotate(-40deg);
  opacity: .3;
}

100%{
  transform: scale(1) translate(20%, -200%) rotate(-20deg);
  opacity: 0;
}
`;

const AnimateWords = styled(Box)`
  position: absolute;
  z-index: -1;
  font-weight: bold;
  width: min-content;
  white-space: nowrap;
`;
