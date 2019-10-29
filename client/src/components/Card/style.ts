import styled from 'styled-components'

export const Attributes = styled.ul`
  background-color: whitesmoke;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 4px;
`

export const Image = styled.h2`
  align-items: center;
  display: flex;
  font-size: 4rem;
  flex-grow: 1;
  justify-content: center;
  margin: 0;
`

export const ManaCost = styled.div`
  padding: 4px;
  position: absolute;
  right: 4px;
  top: 4px;
`

export const PowerToughness = styled.div`
  background-color: whitesmoke;
  border: 4px solid white;
  border-radius: 2px;
  bottom: 4px;
  padding: 4px;
  position: absolute;
  right: 4px;
`

export const Type = styled.div`
  background-color: whitesmoke;
  border-radius: 2px;
  flex-grow: 0;
  padding: 4px;
`

export const Wrap = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 320px;
  padding: 12px;
  position: relative;
  width: 240px;

  > * + * {
    margin-top: 4px;
  }
`
