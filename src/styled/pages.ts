import styled from 'styled-components'

export const ContentWrapper = styled.div<{ maxWidth: string }>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  p {
    max-width: 575px;
  }
`
export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    width: fit-content;
    padding: 0 1rem;
    margin: 0 1rem;
  }
`
export const DashHeader = styled.header`
  min-height: 175px;
  max-height: 175px;
  width: 100%;
  height: 100%;
  display: flex;
  border-bottom: 1px solid #e2e9f3;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  h1 {
    margin-bottom: 0;
    span {
      font-weight: normal;
    }
  }
  div:last-child {
    display: flex;
    button {
      margin: 0 1rem;
    }
  }
  @media (max-width: 768px) {
    div:last-child {
      flex-direction: column;
    }
  }
  @media (max-width: 480px) {
    max-height: 100px;
    min-height: 100px;
    h1 {
      margin: 0;
    }
    div:last-child {
      display: block;
      width: 100%;
    }
  }
`
