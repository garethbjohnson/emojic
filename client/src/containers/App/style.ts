import styled from 'styled-components'

export const MainBattlefield = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  height: 320px;
  justify-content: center;
  margin-bottom: 32px;

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

export const HandWrap = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 2;
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
  flex-shrink: 0;
  margin-right: 16px;
  width: 240px;
`

export const LibraryManaWrap = styled.div`
  display: flex;
  height: 320px;
  z-index: 2;
`

export const ManaWrap = styled.div`
  display: flex;
  flex-grow: 1;

  > * {
    flex-shrink: 1;

    & + * {
      margin-left: 16px;
    }

    > * {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
  }
`

export const ManaPool = styled.span`
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
`

export const Table = styled.div`
  align-content: center;
  display: flex;
  flex-direction: column;
  height: calc(100% - 300px);
  justify-content: center;
  left: 0;
  margin-top: -64px;
  position: absolute;
  top: 0;
  transform: perspective(128rem) rotateX(30deg) scale(0.75);
  transform-style: preserve-3d;
  width: 100%;
  z-index: 1;
`

export const Toolbar = styled.div`
  align-content: center;
  align-items: baseline;
  display: flex;
  justify-content: center;

  > * + * {
    margin-left: 16px;
  }
`

export const Wrap = styled.div`
  align-items: center;
  height: 100%;
  width: 100%;
`
