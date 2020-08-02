import styled from 'styled-components'

export const Name = styled.h1`
  color: gold;
  font-family: Georgia, serif;
  font-size: 8rem;
  font-style: italic;
  font-weight: bold;
  margin: 0;
  text-align: center;
  text-shadow: 0 0.25rem red, 0 -0.125rem white, 0 0.25rem 0.67rem black;
`

export const Options = styled.div`
  margin: 0 auto;
  text-align: center;
`

export const Wrap = styled.div`
  align-items: center;
  background: radial-gradient(
      circle at 0 0,
      rgba(255, 0, 0, 0.25),
      rgba(255, 0, 0, 0) 67%
    ),
    radial-gradient(
      circle at 0 100%,
      rgba(0, 127, 255, 0.25),
      rgba(0, 127, 255, 0) 67%
    ),
    radial-gradient(
      circle at 100% 0,
      rgba(0, 255, 0, 0.25),
      rgba(0, 255, 0, 0) 67%
    ),
    radial-gradient(
      circle at 100% 100%,
      rgba(255, 255, 0, 0.25),
      rgba(255, 255, 0, 0) 67%
    );
  flex-direction: column;
  height: 100%;
  display: flex;
  justify-content: center;
  width: 100%;
`
