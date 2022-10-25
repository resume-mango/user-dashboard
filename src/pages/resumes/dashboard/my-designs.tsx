import React, { Fragment, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import DustBinIcon from '../../../components/svgs/dustbin'
import EditIcon from '../../../components/svgs/edit'
import PlusIcon from '../../../components/svgs/plus'
import DownloadBtn from '../../../components/ui/downloadBtn'
import { useViewport } from '../../../contexts/viewPort'
import { Button } from '../../../styled/button'
import ConfirmationBox from '../../../components/ui/confirmation'

import { SK_Wrapper, Spinner } from '../../../styled/loader'
import { getAllResumes, GetResumesParams } from '../../../queries/resumeQueries'
import { useNotify } from '../../../contexts/notify'
import {
  deleteSigleResume,
  handleResumeDownload,
} from '../../../helpers/resume'
import { PaginationWrapper } from '../../../styled/pages'

const MyDesigns = () => {
  const [loading, setLoading] = useState<string | null>(null)

  const [showDownload, setShowDownload] = useState<number | null>(null)
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null)
  const [page, setPage] = useState(0)

  const params: GetResumesParams = {
    page,
    limit: 15,
  }

  const { data, isError, isLoading }: any = getAllResumes(params)
  const { setNotify } = useNotify()
  const { width } = useViewport()
  const history = useHistory()
  const queryClient = useQueryClient()

  const handleDownload = async (
    id: string,
    name: string,
    type: 'pdf' | 'docx' | 'txt'
  ) => {
    if (loading) return
    setLoading(id)
    setShowDownload(null)
    await handleResumeDownload(name, id, type, setNotify)
    setLoading(null)
  }

  const handlePage = (type: 'next' | 'prev') => {
    type === 'next' && setPage((page) => page + 1)
    type === 'prev' && setPage((page) => page - 1)
  }

  return (
    <Fragment>
      {isError ? (
        <div className="align-center" style={{ height: '30vh' }}>
          <h3>Failed to load designs!</h3>
        </div>
      ) : !data || isLoading ? (
        <SK_Wrapper>
          <GridWrapper>
            {[...Array(12)].map((item, i) => (
              <Fragment key={i}>
                <SkeletonItem />
              </Fragment>
            ))}
          </GridWrapper>
        </SK_Wrapper>
      ) : (
        <Fragment>
          <ConfirmationBox
            title="Delete"
            msg="Are you sure?"
            show={deleteItemId ? true : false}
          >
            <Button
              btnType="primary"
              size="lg"
              onClick={() => setDeleteItemId(null)}
            >
              Cancel
            </Button>
            <Button
              btnType="ghost"
              size="lg"
              onClick={() =>
                deleteItemId &&
                deleteSigleResume(
                  deleteItemId,
                  data,
                  loading,
                  setLoading,
                  setDeleteItemId,
                  setNotify,
                  queryClient
                )
              }
            >
              Delete
            </Button>
          </ConfirmationBox>
          <GridWrapper
            style={loading ? { pointerEvents: 'none' } : {}}
            data-test-id="my-designs"
          >
            <CreateNew onClick={() => history.push('/resumes/new')}>
              {loading === 'create' ? (
                <Spinner size="1.5rem" type="primary" />
              ) : (
                <PlusIcon size="1.7rem" />
              )}
              {width > 480 && <p>Create Resume</p>}
            </CreateNew>
            {data.items.map((item: any, i: number) => (
              <ItemWrapper key={i}>
                <Item onClick={() => history.push(`resumes/edit/${item._id}`)}>
                  {item.attachments && item.attachments.thumbnail ? (
                    <img src={item.attachments.thumbnail} />
                  ) : (
                    <img src="https://resume-mango.s3.us-east-2.amazonaws.com/public/template-images/resumes/empty/template10.jpg" />
                  )}
                  <Fragment>
                    {loading === item._id ? (
                      <Loader>
                        <Spinner size="1.5rem" type="primary" />
                      </Loader>
                    ) : null}
                  </Fragment>
                </Item>
                <ToggleWrapper data-test-id="toggle-wrapper">
                  <DownloadBtn
                    id={i}
                    show={showDownload === i}
                    setShow={setShowDownload}
                    handlePdf={() =>
                      handleDownload(item._id, item.title, 'pdf')
                    }
                    handleDocx={() =>
                      handleDownload(item._id, item.title, 'docx')
                    }
                    handleTxt={() =>
                      handleDownload(item._id, item.title, 'txt')
                    }
                  />
                  <ToggleBtn
                    data-test-id="edit-resume"
                    onClick={() => history.push(`resumes/edit/${item._id}`)}
                  >
                    <EditIcon />
                    <p>Edit</p>
                  </ToggleBtn>
                  <ToggleBtn
                    data-test-id="delete-resume"
                    onClick={() => setDeleteItemId(item._id)}
                  >
                    <DustBinIcon />
                    <p>Delete</p>
                  </ToggleBtn>
                </ToggleWrapper>
              </ItemWrapper>
            ))}
          </GridWrapper>
          {data.total > params.limit && (
            <PaginationWrapper className="mb-3">
              <Button
                btnType="secondary"
                disabled={page === 0}
                onClick={() => handlePage('prev')}
              >
                Previous
              </Button>
              <Button
                btnType="secondary"
                disabled={page + 1 >= Math.ceil(data.total / data.limit)}
                onClick={() => handlePage('next')}
              >
                Next
              </Button>
            </PaginationWrapper>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default MyDesigns

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 3rem 2rem;
  padding: 2rem;
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  @media (max-width: 400px) {
    grid-template-columns: (1, 1fr);
  }
`
const CreateNew = styled.div`
  display: flex;
  cursor: pointer;
  user-select: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #fff !important;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23ACACACFF' stroke-width='2' stroke-dasharray='5%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  max-width: 230px;
  max-height: 325px;
  min-height: 325px;
  min-width: 230px;
  height: 100%;
  width: 100%;
  margin: 0 auto;

  svg {
    path {
      fill: #949494;
      stroke-width: 2.5;
    }
  }
  p {
    color: #949494;
    font-size: 0.875rem;
  }
  &:hover {
    svg {
      path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }
    p {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  @media (max-width: 600px) {
    min-width: 160px;
    max-width: 160px;
    min-height: 82%;
    max-height: 82%;
  }
  @media (max-width: 400px) {
    min-height: 50px;
    max-height: 50px;
    max-width: 100%;
  }
`
const Item = styled.div`
  display: flex;
  overflow: hidden;
  background-color: #f7f7f7;
  position: relative;
  margin: 0 auto;
  transition: ease-in-out 0.3s;
  min-height: 325px;
  outline: 8px solid #eee;
  border-radius: 1px;
  &:hover {
    outline-color: ${({ theme }) => theme.shades.primary[3]};
  }
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 600px) {
    min-height: 225px;
  }
  @media (max-width: 400px) {
    min-width: unset;
    max-width: unset;
    min-height: unset;
    max-height: unset;
  }
`

const ItemWrapper = styled.div`
  cursor: pointer;
  user-select: none;
  min-height: 325px;
  min-width: 230px;
  height: 100%;
  width: 100%;
  max-width: 175px;
  margin: 0 auto;

  @media (max-width: 600px) {
    min-height: 225px;
    min-width: 150px;
  }
`

const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  display: block;
  background-color: #cfcfcf5c;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`
const ToggleBtn = styled.div`
  margin-top: 1rem;
  text-align: center;
  cursor: pointer;
  user-select: none;
  &:hover {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
    p {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  p {
    color: #898989;
    margin: 0;
    font-size: 0.8rem;
    text-align: center;
  }
`
const SkeletonItem = styled.div`
  border-radius: 6px;
  background-color: #eee;
  min-height: 325px;
  min-width: 230px;
  max-height: 325px;
  max-width: 230px;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  @media (max-width: 600px) {
    min-height: 225px;
    min-width: 150px;
    max-height: 225px;
    max-width: 150px;
  }
`
