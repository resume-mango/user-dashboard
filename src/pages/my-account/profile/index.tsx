import React, { Fragment, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../../../components/form/Input'
import { ContentWrapper } from '../../../styled/pages'
import { FormButtonWrapper, FormWrapper, GridForm } from '../../../styled/form'
import Message from '../../../components/ui/message'
import { useNotify } from '../../../contexts/notify'
import { yupResolver } from '@hookform/resolvers/yup'
import FormButton from '../../../components/ui/FormButton'
import { changeNameSchema } from '../../../validations/user'
import { Button } from '../../../styled/button'
import { useAuth } from '../../../contexts/authProvider'
import {
  changeUserName,
  handleChangeUserPassword,
} from '../../../helpers/profileHelper'
import Confirmation from '../../../components/ui/confirmation'

interface IName {
  firstName: string
  lastName: string
}

interface StateProps {
  message: string
  type: 'success' | 'danger' | 'info' | 'warning'
  id: number
}

const Profile = () => {
  const [data, setData] = useState<StateProps | undefined>(undefined)
  const [show, setShow] = useState(false)

  const { setNotify } = useNotify()
  const { user, isLoading, setUser, setToken } = useAuth()
  const [loading, setLoading] = useState<any>({
    name: false,
    password: false,
  })

  const isAuth0User = user && user.id && user.id.includes('auth0|')
  const defaultValues = {
    firstName: (user && user.firstName) || '',
    lastName: (user && user.lastName) || '',
  }

  const methods = useForm<IName>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(changeNameSchema),
  })

  const { handleSubmit, setValue } = methods

  useEffect(() => {
    if (!user) return
    user.firstName && setValue('firstName', user.firstName)
    user.lastName && setValue('lastName', user.lastName)
    return
  }, [user])

  const changeName = ({ firstName, lastName }: IName) => {
    if (!user || !isAuth0User) return
    return changeUserName(
      firstName,
      lastName,
      user,
      data,
      setUser,
      setToken,
      setLoading,
      setNotify
    )
  }

  return (
    <Fragment>
      {isLoading || (user && Object.keys(user).length <= 0) ? (
        'Loading'
      ) : (
        <ContentWrapper maxWidth="600px" style={{ marginTop: '1rem' }}>
          <Confirmation
            title="Change Password"
            msg="Are you sure, you want to change password?"
            show={show}
          >
            <Button
              size="lg"
              btnType="secondary"
              onClick={() => {
                setShow(false)
                handleChangeUserPassword(setData, setLoading)
              }}
              disabled={loading.password}
            >
              Confirm
            </Button>
            <Button
              size="lg"
              onClick={() => setShow(false)}
              disabled={loading.password}
            >
              Cancel
            </Button>
          </Confirmation>
          <FormWrapper>
            <h3>Change Name</h3>
            <p>Enter your first and last name below</p>
            <FormProvider {...methods}>
              {/* {(errors.firstName, errors.lastName)} */}

              <GridForm>
                <div>
                  <Input name="firstName" label="First Name" />
                </div>
                <div>
                  <Input name="lastName" label="Last Name" />
                </div>
              </GridForm>
              <FormButtonWrapper>
                {isAuth0User && (
                  <FormButton
                    btnType="secondary"
                    size="lg"
                    onClick={() => setShow(true)}
                    loading={loading.password}
                    style={{ marginRight: '1rem' }}
                  >
                    Change Password
                  </FormButton>
                )}
                <FormButton
                  onClick={() => handleSubmit(changeName)()}
                  loading={loading.name}
                  btnType="primary"
                  size="sm"
                >
                  Save
                </FormButton>
              </FormButtonWrapper>
            </FormProvider>
          </FormWrapper>
          {data && (
            <Message type={data.type} message={data.message} id={data.id} />
          )}
        </ContentWrapper>
      )}
    </Fragment>
  )
}

export default Profile
