import React, { useEffect, useState } from 'react';
import { Scores } from './components/Scores/Scores';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  html {
    box-sizing: border-box;
    max-width: 100%;
    height: 100%;
    font-size: calc(1em + 1vw);
    font-family: 'Lato', sans-serif;

    --co-light: hsl(0, 0%, 99%);
    --co-light-grey: hsl(0, 0%, 96%);

    background: var(--co-light);
  }

body {
  margin: 0;
  height: 100%;
}

#root {
  min-height: 100%;
}

*, *:before, *:after {
  box-sizing: inherit;
}
`;

const ContentBox = styled.main`
display: flex;
justify-content: center;
align-items: center;
`;

const App: React.FC = () => { 

  return (
    <>
      <GlobalStyle />
      <ContentBox>
        <Scores />
      </ContentBox>
    </> 
  )
}

export default App;
