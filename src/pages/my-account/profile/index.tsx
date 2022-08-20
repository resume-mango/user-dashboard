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
  const { setNotify } = useNotify()
  const { user, isLoading, setUser, setToken } = useAuth()
  const [loading, setLoading] = useState<any>({
    name: false,
    password: false,
  })

  const defaultValues = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
  }

  const methods = useForm<IName>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(changeNameSchema),
  })

  const { handleSubmit, setValue } = methods

  useEffect(() => {
    setValue('firstName', user.firstName)
  }, [user.firstName])

  useEffect(() => {
    setValue('lastName', user.lastName)
  }, [user.lastName])

  const changeName = ({ firstName, lastName }: IName) =>
    changeUserName(
      firstName,
      lastName,
      user,
      data,
      setUser,
      setToken,
      setLoading,
      setNotify
    )

  return (
    <Fragment>
      {isLoading || Object.keys(user).length <= 0 ? (
        'Loading'
      ) : (
        <ContentWrapper maxWidth="600px" style={{ marginTop: '1rem' }}>
          <FormWrapper>
            <h3>Change Name</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse a mauris ornare.
            </p>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(changeName)}>
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
                  <FormButton
                    loading={loading.name}
                    btnType="secondary"
                    size="sm"
                    type="submit"
                  >
                    Save
                  </FormButton>
                </FormButtonWrapper>
              </form>
            </FormProvider>
          </FormWrapper>

          <FormWrapper>
            <h3>Change Password</h3>
            <p>
              Please choose a storng password including the numbers and letters
              for better security.
            </p>
            <FormButtonWrapper>
              <FormButton
                btnType="primary"
                size="lg"
                type="submit"
                onClick={() => handleChangeUserPassword(setData, setLoading)}
                loading={loading.password}
              >
                Change Password
              </FormButton>
            </FormButtonWrapper>
            {data && (
              <Fragment>
                {data.message.split('//')[0] !== 'https:' ? (
                  <Message
                    type={data.type}
                    message={data.message}
                    id={data.id}
                  />
                ) : (
                  <Fragment>
                    <Message
                      type={'info'}
                      message={
                        'As you are not signed in with tech email you will not recieve password reset email to change password instead click on button below'
                      }
                      id={data.id}
                      interval={-1}
                    />

                    <Button
                      as="a"
                      btnType="secondary"
                      size="sm"
                      href={data.message}
                    >
                      Reset
                    </Button>
                  </Fragment>
                )}
              </Fragment>
            )}
          </FormWrapper>
        </ContentWrapper>
      )}
    </Fragment>
  )
}

export default Profile
