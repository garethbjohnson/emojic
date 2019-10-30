import styled, { css } from 'styled-components'

const cardHeight = '320px'
const cardWidth = '240px'

export const Attribute = styled.li<{ onClick?: Function }>`
  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: blue;
      }
    `}
`

export const Attributes = styled.ul`
  background-color: whitesmoke;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 8px;
`

export const Image = styled.h3`
  align-items: center;
  display: flex;
  font-size: 6rem;
  height: 140px;
  justify-content: center;
  margin: 0;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
`

export const Main = styled.div<{ isTapped?: boolean }>`
  backface-visibility: hidden;
  background-color: white;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 320px;
  margin: auto;
  padding: 12px;
  position: relative;
  ${props => props.isTapped && 'transform: rotateZ(90deg);'}
  transition: transform 0.5s;
  user-select: none;
  width: 240px;
  z-index: 2;

  > * + * {
    margin-top: 4px;
  }
`

export const Back = styled(Main)`
  left: 0;
  position: absolute;
  top: 0;
  transform: ${props => props.isTapped && 'rotateZ(90deg)'} rotateY(180deg);
  z-index: 1;
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
  padding: 8px;
  position: absolute;
  right: 4px;
`

export const Type = styled.div`
  background-color: whitesmoke;
  border-radius: 2px;
  flex-grow: 0;
  padding: 8px;
`

export const Wrap = styled.div<{ isTapped?: boolean }>`
  position: relative;
  width: ${props => (props.isTapped ? cardHeight : cardWidth)};
  transform-origin: center;
  transform-style: preserve-3d;
  transition: width 0.2s;
`
