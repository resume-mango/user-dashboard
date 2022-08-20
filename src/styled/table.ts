import styled from 'styled-components'

export const TableList = styled.table<{
  borderTop?: boolean
  size?: 'sm' | 'lg'
}>`
  margin-bottom: 2rem;

  p,
  td,
  th {
    font-size: 0.875rem;
  }
  th,
  td {
    text-align: start;
    padding: 0.5rem 1.25rem;
    height: ${({ size }) => (size === 'sm' ? '50px' : '75px')};
  }

  thead {
    tr {
      border-top-width: ${({ borderTop }) => (borderTop ? 1 : 0)};
    }
  }
  tbody {
    tr {
      transition: background ease 0.3s;
      &:hover {
        background-color: #dddddd40;
      }
    }
  }
  @media (max-width: 1300px) {
    td {
      font-size: 0.7rem;
    }
  }
`

TableList.defaultProps = {
  borderTop: true,
  size: 'lg',
}

export const TableThumbnail = styled.div<{ size?: string; rounded?: boolean }>`
  width: ${({ size }) => (size ? size : '70px')};
  height: ${({ size }) => (size ? size : '70px')};
  min-width: ${({ size }) => (size ? size : '70px')};
  min-height: ${({ size }) => (size ? size : '70px')};
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  border-radius: ${({ rounded }) => (rounded ? '50%' : 0)};
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`
export const TableDetailsThumbnailWrapper = styled.div`
  text-align: start !important;
  display: flex;
  align-items: center;
  p {
    margin: 0;
    color: #777;
  }
  &:hover {
    b {
      text-decoration: underline;
      text-decoration-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
      text-underline-position: under;
    }
  }
`
