import React, { Fragment } from 'react'
import styled from 'styled-components'
import WarningIcon from '../../components/svgs/warning'
import BreifCase from '../../public/images/breif-case.svg'
import Callback from '../../public/images/callback.svg'
import Degree from '../../public/images/degree-hat.svg'
import Todo from '../../public/images/todo.svg'
import { getCounts } from '../../queries/dashboardQueries'
import { SK_Wrapper } from '../../styled/loader'

const InfoBoxes = () => {
  const { data, isLoading, isError } = getCounts()

  const pad = (num: number, places: number) => String(num).padStart(places, '0')

  const info = [
    {
      name: 'Jobs Applied',
      value: (data && data.jobs_applied && pad(data.jobs_applied, 2)) || 0,
      icon: BreifCase,
    },
    {
      name: 'To-dos',
      value: (data && data.todos && pad(data.todos, 2)) || 0,
      icon: Todo,
    },
    {
      name: 'Call backs',
      value: (data && data.callbacks && pad(data.callbacks, 2)) || 0,
      icon: Callback,
    },
    {
      name: 'Interviews',
      value: (data && data.interviews && pad(data.interviews, 2)) || 0,
      icon: Degree,
    },
  ]

  return (
    <Fragment>
      {isError ? (
        <ErrorWrapper>
          <WarningIcon size="1.2rem" color="red" />
          <h4>Failed to load counts</h4>
        </ErrorWrapper>
      ) : isLoading ? (
        <SK_Wrapper>
          <Wrapper>
            <LoadingItem />
            <LoadingItem />
            <LoadingItem />
            <LoadingItem />
          </Wrapper>
        </SK_Wrapper>
      ) : data ? (
        <Wrapper>
          {info.map((item, i) => (
            <Box key={i}>
              <div>
                <img src={item.icon} />
              </div>
              <div>
                <p>{item.name}</p>
                <h3 data-test-id={item.name.replace(/\s+/g, '-').toLowerCase()}>
                  {item.value}
                </h3>
              </div>
            </Box>
          ))}
        </Wrapper>
      ) : null}
    </Fragment>
  )
}

export default InfoBoxes

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.5rem;
  padding: 1.25rem;
  @media (max-width: 1400px) {
    grid-gap: 0.8rem;
  }
`
const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  border: 1px solid #e2e9f3;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  align-items: center;
  grid-gap: 1rem;
  div {
    &:first-child {
      display: inline-flex;
      align-items: center;
    }
    img {
      max-width: 35px;
      width: 100%;
    }
    h3 {
      font-size: 1.5rem;
      margin: 0;
    }
    p {
      font-size: 0.75rem;
      margin: 0;
      color: #878787;
    }
  }
  &:first-child {
    background: rgba(255, 219, 193, 0.11);
    border: 1px solid #f08438;

    p,
    h3 {
      color: #f08438;
    }
  }

  @media (max-width: 1400px) {
    padding: 0.5rem;
    grid-gap: 0.5rem;
    div {
      h3 {
        font-size: 1.2rem;
      }
    }
  }
`
const LoadingItem = styled.div`
  background-color: #eee;
  height: 60px;
  border-radius: 6px;
`
const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  border-bottom: 1px solid #e2e9f3;
  height: 60px;
  h4 {
    margin: 0 0 0 1rem;
  }
`
