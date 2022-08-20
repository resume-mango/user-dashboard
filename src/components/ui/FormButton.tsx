import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Spinner } from '../../styled/loader'

export interface BtnProps {
  btnType: 'primary' | 'secondary' | 'ghost' | 'text' | 'link'
  btnSize: 'lg' | 'sm' | 'xl'
  fontSize?: string
  backgroundColor?: string
  color?: string
  type?: 'button' | 'reset' | 'submit' | undefined
  width?: string
  setLoading: (val: boolean) => void
}

interface IProps {
  loading?: boolean
  disabled?: boolean

  children: any
}

const FormButton: React.FC<IProps & any> = ({
  loading,
  disabled,
  children,
  style,
  ...rest
}) => {
  return (
    <Fragment>
      <StyledButton
        {...rest}
        disabled={disabled ? disabled : loading}
        style={style}
      >
        {loading ? (
          <Spinner
            size="20px"
            type={
              rest.btnType === 'primary' ||
              rest.btnType === 'secondary' ||
              rest.btnType === 'ghost'
                ? 'white'
                : 'primary'
            }
          />
        ) : (
          children
        )}
      </StyledButton>
    </Fragment>
  )
}

export default FormButton

export const StyledButton = styled.button<BtnProps>`
  background-color: ${({ btnType, theme, backgroundColor }) =>
    backgroundColor
      ? backgroundColor
      : btnType === 'secondary' || btnType === 'text' || btnType === 'link'
      ? theme.colors.white
      : btnType === 'ghost'
      ? theme.colors.light
      : theme.colors.primary};
  height: ${({ btnSize }) =>
    btnSize === 'xl' ? '48px' : btnSize === 'lg' ? '40px' : '32px'};
  color: ${({ btnType, theme, disabled }) =>
    !disabled
      ? btnType === 'secondary' || btnType === 'link'
        ? theme.colors.primary
        : btnType === 'ghost' || btnType === 'text'
        ? theme.colors.dark
        : theme.colors.white
      : theme.colors.white};
  border: 1px solid
    ${({ btnType, theme }) =>
      btnType === 'secondary' || btnType === 'primary'
        ? theme.colors.primary
        : 'transparent'};
  user-select: none;
  font-size: ${({ fontSize }) => fontSize || '0.875rem'};
  text-align: center;
  justify-content: center;
  font-weight: normal;
  font-style: normal;
  letter-spacing: 0.035em;
  width: ${({ width }) => (width ? width : 'fit-content')};
  padding: 0 1.5rem;
  border-radius: 4px;
  margin: 0;
  transition: background 300ms ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: center;
  transition: all 150ms ease-in-out;
  &:hover,
  &:focus {
    ${({ btnType, theme }) =>
      btnType === 'primary' || btnType === 'secondary'
        ? `box-shadow: 0 0 1px 3px ${theme.shades.primary[3]}`
        : btnType === 'ghost'
        ? `background-color: #e6e6e6`
        : null};
  }
  &:disabled {
    color: ${({ theme }) => theme.colors.dark};
    border: transparent;
    background-color: ${({ theme }) => theme.colors.light};
  }
  @media (max-width: 834px) {
    height: ${({ btnSize }) =>
      btnSize === 'xl' ? '40px' : btnSize === 'lg' ? '40px' : '32px'};
    font-size: 0.875rem;
  }
  @media (max-width: 480px) {
    height: ${({ btnSize }) =>
      btnSize === 'xl' ? '32px' : btnSize === 'lg' ? '40px' : '32px'};
    font-size: 0.75rem;
  }
`
