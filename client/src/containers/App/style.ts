import styled from 'styled-components'

export const Battlefield = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  transform: perspective(64rem) rotateX(30deg) scale(0.75);

  > * {
    flex-shrink: 0;
    margin: 8px;

    > * {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
  }
`

export const Hand = styled.div<{ cardCount: number }>`
  align-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  transform: scale(0.9);
  width: 100%;
  z-index: 0;

  > * {
    box-sizing: border-box;
    cursor: pointer;
    max-width: calc(100% / ${props => props.cardCount});
    transition: transform 0.2s;

    & + * {
      margin-left: -16px;
    }

    &:last-child {
      max-width: unset;
    }

    > * {
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.2s;
    }

    &:hover {
      transform: translateY(-8px);
      z-index: 1;

      > * {
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
      }
    }
  }
`

export const LibraryCardWrap = styled.div<{
  index: number
  totalCount: number
}>`
  position: absolute !important;
  transform: translateZ(${props => 2 * (props.totalCount - props.index)}px);
  transform-style: preserve-3d;
  z-index: ${props => props.totalCount - props.index};

  &:last-child {
    height: 320px;
  }

  > * {
    transform: rotateY(180deg);

    > * {
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }
  }
`

export const LibraryWrap = styled.div`
  bottom: 32px;
  height: 320px;
  left: 32px;
  position: absolute;
  transform: perspective(64rem) rotateX(30deg) scale(0.75);
  transform-style: preserve-3d;
  width: 100%;
  z-index: -1;
`

export const ManaPool = styled.span`
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
`

export const Wrap = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`
