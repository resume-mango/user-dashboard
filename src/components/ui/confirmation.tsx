import React, { Fragment, ReactNode } from 'react'
import styled, { DefaultTheme, withTheme } from 'styled-components'
import WarningIcon from '../svgs/warning'

interface IProps {
  theme: DefaultTheme
  show: boolean
  title: string
  msg: string
  children: ReactNode
}

const ConfirmationBox: React.FC<IProps> = ({
  theme,
  show,
  msg,
  title,
  children,
}) => {
  return (
    <Fragment>
      {show && (
        <Wrapper className="confirmation-box">
          <Box>
            <WarningIcon size="100px" color={theme.colors.primary} />
            <h2>{title}</h2>
            <p>{msg}</p>
            <ChildWrapper> {children}</ChildWrapper>
          </Box>
        </Wrapper>
      )}
    </Fragment>
  )
}

export default withTheme(ConfirmationBox)

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.shades.dark[3]};
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center !important;
  align-items: center;
  max-width: 500px;
  max-height: 400px;
  height: 100%;
  width: 100%;
  padding: 2rem;
  border: 1px solid rgb(237 237 237 / 20%);
  border-radius: 1rem;
  background-color: #fff;

  h2,
  p {
    text-align: center;
    margin: 0 0 1rem;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  svg {
    margin-bottom: 2rem;
  }
`

const ChildWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
`
