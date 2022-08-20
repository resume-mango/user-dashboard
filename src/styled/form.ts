import styled from 'styled-components'

export const GridForm = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
  margin: 1.5rem 0;
  width: 100%;

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
export const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 3rem;
`
export const FormButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
export const InvalidFeedBack = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.danger};
`
