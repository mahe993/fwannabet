import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";

const AnimatedWords = () => {
  return (
    <Box display="flex" flexWrap="wrap">
      <AnimateWords
        color="yellow"
        fontSize={20}
        css={css`
          animation: ${fade} 3s steps(50, jump-both) infinite;
        `}
      >
        $88?
      </AnimateWords>
      <AnimateWords
        color="red"
        fontSize={50}
        css={css`
          animation: ${fade1} 2.5s steps(50, jump-both) infinite alternate;
        `}
      >
        O$P$
      </AnimateWords>
      <AnimateWords
        color="teal"
        fontSize={20}
        css={css`
          animation: ${fade2} 2s steps(50, jump-both) infinite;
        `}
      >
        Lebron &gt;30points??
      </AnimateWords>
      <AnimateWords
        color="darkolivegreen"
        fontSize={22}
        css={css`
          animation: ${fade3} 4s steps(80, jump-both) infinite;
        `}
      >
        Ronaldo 2 goals???
      </AnimateWords>
      <AnimateWords
        color="pink"
        fontSize={15}
        css={css`
          transform: translate(15px, -50px) rotate(-30deg);
          animation: ${fade4} 3s steps(50, jump-both) infinite;
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
  transform: scale(.75) translate(40px, -55px) rotate(45deg);
  opacity: .3;
}

100%{
  transform: scale(1) translate(40px, -55px) rotate(45deg);
  opacity: 0;
}
`;

const fade1 = keyframes`
0% {
  transform: scale(.95) translate(-10px, -250px) rotate(-30deg);
  opacity: 0;
}

33% {
  opacity: .15;
}

66% {
  opacity: 0;
}

100%{
  transform: scale(1) translate(-10px, -250px) rotate(-30deg);
  opacity: .15;
}
`;

const fade2 = keyframes`
0% {
  transform: scale(.95) translate(-65px, -140px) rotate(-5deg);
  opacity: .5;
}

100%{
  transform: scale(1) translate(-70px, -140px) rotate(-5deg);
  opacity: 0;
}
`;

const fade3 = keyframes`
0% {
  transform: scale(.8) translate(170px, -350px) rotate(30deg);
  opacity: .5;
}

100%{
  transform: scale(1) translate(170px, -300px) rotate(0deg);
  opacity: 0;
}
`;

const fade4 = keyframes`
0% {
  transform: scale(.9) translate(60px, -120px) rotate(-40deg);
  opacity: .3;
}

100%{
  transform: scale(1) translate(80px, -130px) rotate(-10deg);
  opacity: 0;
}
`;

const AnimateWords = styled(Box)`
  z-index: -1;
  font-weight: bold;
  width: min-content;
  white-space: nowrap;
`;
