import { IImgTransformStyle } from './imageUpload'

export interface IResumeExp {
  company: string | undefined
  designation: string | undefined
  duration: {
    start: string | undefined
    end: string | undefined
  }
  city: string | undefined
  description: string | undefined
}

export interface IResumeEdu {
  institution: string | undefined
  degree: string | undefined
  duration: {
    start: string | undefined
    end: string | undefined
  }
  city: string | undefined
  description: string | undefined
}

export interface IResumeSkill {
  title: string
  rating: number
}

export interface IResumeCourse {
  institution: string | undefined
  course: string | undefined
  duration: {
    start: string | undefined
    end: string | undefined
  }
}

export interface IResumeIntern {
  job_title: string | undefined
  employer: string | undefined
  duration: {
    start: string | undefined
    end: string | undefined
  }
  city: string | undefined
  description: string | undefined
}

export interface IResumeLang {
  language: string | undefined
  level: string | undefined
}

export interface IResumeRef {
  name: string | undefined
  company: string | undefined
  phone_number: string | undefined
  email_address: string | undefined
}

export interface IResumeDefault {
  title: string
  first_name: string
  last_name: string
  email_address: string
  phone_number: string
  avatar: {
    orignal: string
    processed: string
    style: IImgTransformStyle
  }
  designation: string
  address: string
  about_info: string
  experience: IResumeExp[]
  education: IResumeEdu[]
  skills: IResumeSkill[]
  courses: IResumeCourse[]
  languages: IResumeLang[]
  internships: IResumeIntern[]
  references: IResumeRef[]
}
