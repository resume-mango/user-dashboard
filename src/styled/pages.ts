import styled from 'styled-components'

export const ContentWrapper = styled.div<{ maxWidth: string }>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  p {
    max-width: 575px;
  }
`
