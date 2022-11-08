import React, { Fragment, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import DustBinIcon from '../../components/svgs/dustbin'
import EditIcon from '../../components/svgs/edit'
import PlusIcon from '../../components/svgs/plus'
import DownloadIcon from '../../components/svgs/download'
import PdfIcon from '../../components/svgs/pdf'
import TxtIcon from '../../components/svgs/txt'
import SubNavBar from '../../components/ui/subNavbar'
import { SK_Wrapper, Spinner } from '../../styled/loader'
import { getAllResumes } from '../../queries/resumeQueries'
import DocxIcon from '../../components/svgs/docx'
import { useViewport } from '../../contexts/viewPort'
import detectMultiOusideClick from '../../hooks/detectMultiOusideClick'
import { getAllCoverLetters } from '../../queries/coverLetterQueries'
import ConfirmationBox from '../../components/ui/confirmation'
import { Button } from '../../styled/button'
import { useNotify } from '../../contexts/notify'
import {
  handleResumeCoverLetterDelete,
  handleResumeCoverLetterDownload,
} from '../../helpers/resumeCoverLetter'
import UpgradePlan from '../../components/upcgradeModal'

const getDesigns = (type: 'resume' | 'coverletter') => {
  const params: any = {
    page: 0,
    limit: 15,
  }

  let output
  if (type === 'resume') output = getAllResumes(params)
  if (type === 'coverletter') output = getAllCoverLetters(params)
  return output as any
}

const ResumeCoverLetter = ({ freeUser }: { freeUser?: boolean }) => {
  const [show, setShow] = useState<'resume' | 'coverletter'>('resume')
  const [showCreate, setShowCreate] = useState(true)
  const [loading, setLoading] = useState<string | null>(null)
  const [showDownload, setShowDownload] = useState<number | null>(null)
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null)
  const [limitsReached, setLimitsReached] = useState(false)

  const [count, setCount] = useState(0)
  const { setNotify } = useNotify()
  const history = useHistory()
  const queryClient = useQueryClient()
  const { width } = useViewport()
  const { ref } = detectMultiOusideClick(setShowDownload, 'toggle-download')
  const { data, isLoading, isError } = getDesigns(show)

  const size = 195

  useEffect(() => {
    if (!ref || !ref.current || freeUser) return
    const calc = Math.floor(ref.current.clientWidth / size)
    const height = ref.current.clientHeight
    setCount(width < 550 ? 2 : calc)
    if (ref.current.clientHeight > height) setCount(calc - 1)
  }, [ref, width, freeUser])

  const copyData = data && data.items && [...data.items]

  const filteredData = count
    ? copyData &&
      copyData.splice(
        0,
        width < 550 ? (copyData.length >= 3 ? 3 : 2) : count - 1
      )
    : data && data.items
    ? data.items
    : []

  useEffect(() => {
    if (!data) return
    if (freeUser) {
      if (show === 'resume' && data.length >= 10) setShowCreate(false)
      else if (show === 'coverletter' && data.length >= 5) setShowCreate(false)
      else setShowCreate(true)
    } else {
      setShowCreate(true)
    }
    return
  }, [data, show])

  const handleDownload = async (id: string, type: 'pdf' | 'docx' | 'txt') => {
    return await handleResumeCoverLetterDownload(
      id,
      type,
      loading,
      setLoading,
      show,
      setShowDownload,
      setLimitsReached
    )
  }

  const handleDelete = async (id: string) => {
    return await handleResumeCoverLetterDelete(
      id,
      data,
      queryClient,
      loading,
      setLoading,
      show,
      setDeleteItemId,
      setNotify
    )
  }

  return (
    <Fragment>
      {limitsReached && (
        <UpgradePlan handleClose={() => setLimitsReached(false)} />
      )}
      <SubNavBar>
        <SubNavBar.Link>
          <a
            className={show === 'resume' ? 'active' : ''}
            onClick={() => setShow('resume')}
            data-test-id="resume-toggle"
          >
            My Resume
          </a>
        </SubNavBar.Link>
        <SubNavBar.Link>
          <a
            data-test-id="coverletter-toggle"
            className={show === 'coverletter' ? 'active' : ''}
            onClick={() => setShow('coverletter')}
          >
            Cover Letter
          </a>
        </SubNavBar.Link>
      </SubNavBar>
      <div ref={ref} style={{ margin: `1.25rem 1.25rem 1.7rem` }}>
        {isError ? (
          <div className="align-center" style={{ height: '230px' }}>
            <h3>Failed to load designs!</h3>
          </div>
        ) : !data || isLoading ? (
          <SK_Wrapper>
            <GridWrapper>
              {[...Array(count)].map((item, i) => (
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
                onClick={() => deleteItemId && handleDelete(deleteItemId)}
              >
                Delete
              </Button>
            </ConfirmationBox>
            <GridWrapper data-test-id="designs-wrapper">
              {showCreate && (
                <CreateNew
                  onClick={() =>
                    history.push(
                      show === 'resume' ? `/resumes/new` : `/coverletters/new`
                    )
                  }
                >
                  <PlusIcon size="1.7rem" />
                  {width > 480 && (
                    <p>
                      {show === 'resume'
                        ? 'Create Resume'
                        : 'Create Coverletter'}
                    </p>
                  )}
                </CreateNew>
              )}
              <Fragment>
                {filteredData.map((item: any, i: number) => (
                  <ItemWrapper key={i}>
                    <Item
                      onClick={() =>
                        showDownload !== i &&
                        history.push(
                          show === 'resume'
                            ? `resumes/edit/${item._id}`
                            : `coverletters/edit/${item._id}`
                        )
                      }
                    >
                      <Fragment>
                        {showDownload === i && (
                          <DownloadWrapper
                            className={`download-overlay ${
                              showDownload === i ? 'isVisible' : ''
                            }`}
                          >
                            <DownloadBtn
                              title="Download PDF"
                              className="pdf-icon"
                              onClick={() => handleDownload(item._id, 'pdf')}
                            >
                              <PdfIcon size="1.6rem" className="fill" />
                            </DownloadBtn>
                            <DownloadBtn
                              className="docx-icon"
                              title="Export To Docx"
                              onClick={() => handleDownload(item._id, 'docx')}
                            >
                              <DocxIcon size="1.6rem" className="fill" />
                            </DownloadBtn>
                            <DownloadBtn
                              className="txt-icon"
                              title="Export To Txt"
                              onClick={() => handleDownload(item._id, 'txt')}
                            >
                              <TxtIcon size="1.6rem" className="fill" />
                            </DownloadBtn>
                          </DownloadWrapper>
                        )}
                      </Fragment>
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
                    <ToggleWrapper>
                      <ToggleBtn
                        onClick={() =>
                          showDownload !== i
                            ? setShowDownload(i)
                            : setShowDownload(null)
                        }
                        className="toggle-download"
                        title="Download"
                      >
                        <DownloadIcon className="stroke" />
                      </ToggleBtn>
                      <ToggleBtn
                        onClick={() =>
                          show === 'resume'
                            ? history.push(`resumes/edit/${item._id}`)
                            : history.push(`coverletters/edit/${item._id}`)
                        }
                        className="toggle-edit"
                        title="Edit"
                      >
                        <EditIcon className="fill" />
                      </ToggleBtn>
                      <ToggleBtn
                        onClick={() => setDeleteItemId(item._id)}
                        className="toggle-delete"
                        title="Delete"
                      >
                        <DustBinIcon className="fill" />
                      </ToggleBtn>
                    </ToggleWrapper>
                  </ItemWrapper>
                ))}
              </Fragment>
            </GridWrapper>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

export default ResumeCoverLetter

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  grid-gap: 2rem 1.5rem;
  @media (max-width: 550px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    justify-items: center;
  }
  @media (max-width: 400px) {
    grid-template-columns: (1, 1fr);
  }
`
const CreateNew = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #fff !important;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23ACACACFF' stroke-width='2' stroke-dasharray='5%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  max-width: 170px;
  max-height: 225px;
  min-height: 225px;
  min-width: 160px;
  height: 100%;
  width: 100%;
  margin-right: auto;
  cursor: pointer;
  user-select: none;
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
  @media (max-width: 400px) {
    min-height: 50px;
    max-height: 50px;
    max-width: 100%;
  }
`
const SkeletonItem = styled.div`
  border-radius: 6px;
  background-color: #eee;
  min-height: 225px;
  max-height: 225px;
  min-width: 160px;
  max-width: 160px;
  height: 100%;
  width: 100%;
  @media (max-width: 600px) {
    min-height: 225px;
    min-width: 150px;
    max-height: 225px;
    max-width: 150px;
  }
`
const Item = styled.div`
  display: flex;
  overflow: hidden;
  background-color: #f7f7f7;
  position: relative;
  margin: 0 auto;
  transition: ease-in-out 0.3s;

  min-width: 160px;
  max-width: 160px;
  border-radius: 1px;
  outline: 8px solid #eee;

  &:hover {
    outline-color: ${({ theme }) => theme.shades.primary[3]};
  }
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 400px) {
    min-width: unset;
    max-width: unset;
    min-height: unset;
    max-height: unset;
  }
`

const ItemWrapper = styled.div`
  display: flex;
  cursor: pointer;
  user-select: none;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 550px) {
    flex-direction: column;
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
  padding-left: 1rem;
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 550px) {
    margin-top: 1rem;
    width: 100%;
    justify-content: space-around;
    flex-direction: row;
    max-width: 225px;
    margin: auto;
    padding: 0;
  }
`
const ToggleBtn = styled.div`
  margin-top: 1rem;
  text-align: center;
  cursor: pointer;
  user-select: none;
  svg {
    pointer-events: none;
  }
  &:hover {
    .fill {
      path {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
    .stroke {
      path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
      p {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`

const DownloadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.shades.primary[3]};
`
const DownloadBtn = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  border-radius: 50%;
  background-color: #fff;
  width: 50px;
  height: 50px;
  margin: 0.5rem;
  transition: ease-in-out 0.3s;
  svg {
    path {
      fill: ${({ theme }) => theme.colors.primary};
      transition: ease-in-out 0.3s;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    svg {
      path {
        fill: #fff;
      }
    }
  }
`
