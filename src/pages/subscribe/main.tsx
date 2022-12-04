import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import Logo from '../../public/logo/resume-mango-full-logo.png'
import CheckCircle from '../../public/images/check-filled.svg'
import ItemsInBox from '../../public/images/items-in-box.png'
import { Spinner } from '../../styled/loader'
import Alert from '../../components/ui/alert'
import { NavLink, useHistory } from 'react-router-dom'
import { useViewport } from '../../contexts/viewPort'
import {
  apiCreateSubscription,
  apiUpgradeSubscription,
} from '../../apis/subscribe'
import { useNotify } from '../../contexts/notify'
import CrossIcon from '../../components/svgs/cross'
import getQueryAdvance from '../../hooks/getQueryAdvance'
import axios from 'axios'
import { useQueryClient } from 'react-query'
import { useAuth } from '../../contexts/authProvider'

const MainSubscribe = () => {
  const [plan, setPlan] = useState('')
  const [loadingApi, setLoadingApi] = useState(false)
  const [upgraded, setUpgraded] = useState(false)
  const [alreadyOnPremium, setAlreadyOnPremium] = useState(false)
  const [options, setOptions] = useState([])
  const { setNotify } = useNotify()
  const { setToken } = useAuth()
  const fetcher = async () => {
    const { data } = await axios.get(`/subscribe`)
    return data
  }

  const queryClient = useQueryClient()

  const { width } = useViewport()

  const history = useHistory()

  const { data, isError, isLoading }: any = getQueryAdvance(
    'subscribe',
    () => fetcher(),
    true,
    {
      staleTime: 0,
      cacheTime: 0,
      onError(err: any) {
        if (err && err.response && err.response.status === 409) {
          setAlreadyOnPremium(true)
        }
      },
    }
  )

  useEffect(() => {
    if (!data || !data.plans) return
    setPlan(data.plans[0]._id)
  }, [data])

  // Set plan options
  useEffect(() => {
    if (!plan) return
    const item = data.plans.filter(
      (val: Record<string, any>) => val._id === plan
    )[0]
    if (!item) return

    setOptions(item.highlights)
  }, [plan])

  const handleCheckout = async () => {
    if (loadingApi) return

    setLoadingApi(true)
    const { data, error } = await apiCreateSubscription(plan)
    if (!data || error) {
      setNotify({
        type: 'danger',
        heading: 'Err',
        message: 'Something went wrong!',
      })
      setLoadingApi(false)
    } else {
      window.location.replace(data)
    }
  }

  useEffect(() => {
    if (!upgraded) return
    const timer = setTimeout(() => {
      history.replace('/my-account/membership')
    }, 3000)
    return () => clearTimeout(timer)
  }, [upgraded])

  const handleUpgrade = async () => {
    if (loadingApi || upgraded) return
    setLoadingApi(true)
    const { data, error } = await apiUpgradeSubscription(plan)
    if (!data || error) {
      setNotify({
        type: 'danger',
        heading: 'Err',
        message: 'Failed to upgrade plan!',
      })
      setLoadingApi(false)
    } else {
      setToken('')
      setLoadingApi(false)
      setUpgraded(true)
      queryClient.setQueryData('activeSubscription', data)
      return true
    }
  }

  return (
    <Fragment>
      {isLoading && !data ? (
        <div className="align-center">
          <Spinner size="40px" type="primary" />
        </div>
      ) : isError ? (
        <Fragment>
          {alreadyOnPremium ? (
            <Alert
              show={true}
              type="warning"
              message="You are already on premium membership"
            />
          ) : (
            <Alert
              show={true}
              type="warning"
              heading="Oops"
              message="Failed to fetch plans from server."
            />
          )}
        </Fragment>
      ) : (
        <Main>
          {width > 1000 && (
            <LHSWrapper>
              <img
                src={Logo}
                alt="resume-mango logo"
                width="200px"
                style={{ margin: '1.5rem' }}
              />

              <Section>
                <h1> Upgrade your plan to unlock these features</h1>
                <PlansWrapper>
                  <div>
                    <ul>
                      {options.map(
                        (option: { key: string; bool: boolean }, i: number) => (
                          <li key={i}>
                            {option.bool ? (
                              <img src={CheckCircle} alt="check circle" />
                            ) : (
                              <CrossCircle>
                                <CrossIcon size="0.5rem" />
                              </CrossCircle>
                            )}

                            {option.key}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div>
                    <img
                      src={ItemsInBox}
                      alt="putting items in basket"
                      width="100%"
                    />
                  </div>
                </PlansWrapper>
              </Section>
            </LHSWrapper>
          )}
          <RHSWrapper>
            <div className="rhs-section">
              {width < 1000 && (
                <img
                  src={Logo}
                  alt="resume-mango logo"
                  width="200px"
                  style={{ margin: '.5rem' }}
                />
              )}
              <NavLink to="/">
                <CloseWrapper>
                  <CrossIcon size="1.3rem" />
                </CloseWrapper>
              </NavLink>
            </div>
            <Section>
              {width < 1000 && (
                <MobileImg>
                  <img
                    src={ItemsInBox}
                    alt="putting items in basket"
                    width="100%"
                  />
                </MobileImg>
              )}
              {/* <h2>
                Your resume is ready. Enter your payment details to download the
                resume
              </h2> */}
              <h3>
                {data.subscription_type === 'new'
                  ? 'Select Plan'
                  : 'Upgrade Plan'}
              </h3>
              {data?.plans.map((item: any, i: number) => (
                <PlanSelect key={i} onClick={() => setPlan(item._id)}>
                  <div>
                    <Circle checked={plan === item._id} />
                    <p>
                      <b>{item.name}&nbsp;Plan</b>
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>${item.price} </b>/{' '}
                      {item.type === 'pro'
                        ? `${item.interval_count * 24} Hrs`
                        : item.interval}
                    </p>
                  </div>
                </PlanSelect>
              ))}
              {data.invoice &&
                data.invoice.data &&
                data.invoice.data.length > 0 && (
                  <InvoiceWrapper>
                    <div className="item">
                      <p className="label">Description</p>
                      <p className="label end">Amount</p>
                    </div>
                    {data.invoice.data.map((item: any, i: number) => (
                      <div className="item" key={i}>
                        <p>{item.description}</p>
                        <p
                          className={`amount ${item.amount < 0 && 'negative'}`}
                        >
                          ${Math.abs(item.amount)}
                        </p>
                      </div>
                    ))}
                    <div className="item">
                      <p className="total">NEXT INVOICE</p>
                      <p
                        className={`total amount ${
                          data.invoice.total < 0 && 'negative'
                        }`}
                      >
                        ${data.invoice.total}&nbsp;
                        {data.invoice.currency && data.invoice.currency}
                      </p>
                    </div>
                  </InvoiceWrapper>
                )}
              {data.subscription_type === 'new' ? (
                <CheckoutBtn
                  disabled={loadingApi}
                  onClick={() => handleCheckout()}
                  background="#343434"
                  hoverBackground="#202020"
                  data-test-id="proceed-checkout"
                >
                  {loadingApi ? (
                    <Fragment>
                      Processing
                      <Spinner size="1.3rem" style={{ marginLeft: '1rem' }} />
                    </Fragment>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </CheckoutBtn>
              ) : data.subscription_type === 'exists' ? (
                <CheckoutBtn
                  onClick={() => handleUpgrade()}
                  // onClick={() => setUpgraded(!upgraded)}
                  background={upgraded ? '#26bf7b' : '#343434'}
                  hoverBackground={upgraded ? '#26bf7b' : '#202020'}
                >
                  {upgraded ? (
                    <Fragment>
                      Upgraded
                      <SuccessTickMark>
                        <svg
                          className="checkmark"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 52 52"
                        >
                          <circle
                            className="checkmark__circle"
                            cx="26"
                            cy="26"
                            r="25"
                            fill="none"
                          />
                          <path
                            className="checkmark__check"
                            fill="none"
                            d="M14.1 27.2l7.1 7.2 16.7-16.8"
                          />
                        </svg>
                      </SuccessTickMark>
                    </Fragment>
                  ) : loadingApi ? (
                    <Fragment>
                      Upgrading
                      <Spinner size="1.3rem" style={{ marginLeft: '1rem' }} />
                    </Fragment>
                  ) : (
                    'Upgrade Plan '
                  )}
                </CheckoutBtn>
              ) : null}
            </Section>
          </RHSWrapper>
        </Main>
      )}
    </Fragment>
  )
}

export default MainSubscribe

const SuccessTickMark = styled.div`
  .checkmark {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: block;
    stroke-width: 4;
    stroke: #fff;
    stroke-miterlimit: 10;
    box-shadow: inset 0px 0px 0px #26bf7b;
    animation: fill 0.4s ease-in-out 0.4s forwards,
      scale 0.3s ease-in-out 0.9s both;
    margin-left: 1rem;
  }
  .checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 4;
    stroke-miterlimit: 10;
    stroke: #fff;
    fill: #26bf7b;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }

  .checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes scale {
    0%,
    100% {
      transform: none;
    }

    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }

  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 30px #4bb71b;
    }
  }
`

const InvoiceWrapper = styled.div`
  border-radius: 7px;
  box-shadow: 5px 5px 10px 5px rgb(237 237 237 / 50%);
  border: 1px solid rgb(237 237 237 / 40%);
  padding: 1rem;
  .item {
    display: grid;
    grid-template-columns: 80% 20%;
    width: 100%;
    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
    p {
      font-size: 0.8rem;
    }
    .end {
      text-align: end;
    }
    .label {
      font-weight: 600;
      font-size: 0.7rem;
      text-transform: uppercase;
    }

    .amount {
      font-weight: 600;
      text-align: end;

      color: #888;

      letter-spacing: 1.5px;
    }
    .negative:before {
      content: '-';
    }
    .total {
      font-weight: 600;
      color: #343434;
    }
  }
`

const Main = styled.main`
  display: grid;
  grid-template-columns: 60% 40%;
  width: 100%;
  height: 100%;
`
const LHSWrapper = styled.div`
  height: 100%;
  background-color: #f7f7f7;
`

const RHSWrapper = styled.div`
  height: 100%;
  .rhs-section {
    padding-bottom: 2rem;
    &:first-child {
      display: flex;
      justify-content: flex-end;
    }
  }
  @media (max-width: 1000px) {
    width: 100%;
    .rhs-section {
      &:first-child {
        justify-content: space-between;
        align-items: center;
      }
    }
  }
`

const Section = styled.div`
  padding-bottom: 4rem;
  width: 80%;
  margin: auto;
  h1 {
    max-width: 567px;
  }
  h2 {
    font-size: 1.5rem;
  }
  h1,
  h2 {
    margin-bottom: 2rem;
  }
  @media (max-width: 1000px) {
    width: 95%;
    h2 {
      font-size: 1.2rem;
    }
  }
`

const PlansWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;

  ul {
    margin-bottom: 2.3rem;
    li {
      display: flex;
      font-size: 1rem;
      padding: 0.5rem 0;
      img {
        margin-right: 15px;
      }
    }
  }
`

const PlanSelect = styled.div`
  user-select: none;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 7px;
  box-shadow: 5px 5px 10px 5px rgb(237 237 237 / 50%);
  border: 1px solid rgb(237 237 237 / 40%);
  padding: 1.5rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  div {
    display: flex;
    align-items: center;
  }
  p {
    text-transform: capitalize;
    margin: 0;
  }
`
const Circle = styled.div<{ checked: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 1.5rem;
  border: 3px solid #fff;
  outline: 2px solid
    ${({ checked }) => (checked ? 'rgba(240, 132, 56, 1)' : '#ddd')};
  background-color: ${({ checked }) =>
    checked ? 'rgba(240, 132, 56, 1)' : '#fff'};
`

const MobileImg = styled.div`
  max-width: 480px;
  padding: 2rem;
  margin: auto;
`
const CheckoutBtn = styled.button<{
  background: string
  hoverBackground: string
}>`
  width: 100%;
  height: 50px;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ background }) => background};
  color: #fff;
  border-radius: 6px;
  font-size: 1rem;
  &:disabled {
    background-color: ${({ background }) => background};
    opacity: 0.5;
  }
  &:hover {
    background-color: ${({ hoverBackground }) => hoverBackground};
  }
  img {
    height: auto;
    width: 70px;
  }
`
const CrossCircle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background-color: ${({ theme }) => theme.shades.danger};
  border-radius: 50%;
  margin-right: 15px;
  svg {
    path {
      stroke: ${({ theme }) => theme.colors.danger};
    }
  }
`
const CloseWrapper = styled.div`
  width: 30px;
  height: 30px;
  margin: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    svg {
      path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`
