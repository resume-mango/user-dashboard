export const resumeTemplate = [
  {
    _id: '6228aa20cfe4dad975568d50',
    name: 'template7',
    image: true,
    thumbnail:
      'https://resume-mango.s3.us-east-2.amazonaws.com/public/template-images/resumes/filled/template7.jpg',
    blank:
      'https://resume-mango.s3.us-east-2.amazonaws.com/public/template-images/resumes/empty/template7.jpg',
    fonts: [
      {
        name: 'Raleway',
        url: 'https://resume-mango.s3.us-east-2.amazonaws.com/public/fonts/raleway/Raleway-Medium.ttf',
        format: 'truetype',
        style: 'normal',
        weight: 400,
        _id: '6228aa20cfe4dad975568d51',
      },
    ],
    layout: {
      name: 'element',
      tag: 'div',
      class: 'template_page',
      children: [
        {
          name: 'element',
          tag: 'div',
          class: 'template_header',
          children: [
            {
              name: 'element',
              tag: 'div',
              class: 'LHS',
              children: [
                {
                  name: 'element',
                  tag: 'div',
                  class: 'template_avatar',
                  children: [
                    { name: 'avatar.processed', tag: 'img', children: [] },
                  ],
                },
              ],
            },
            {
              name: 'element',
              tag: 'div',
              class: 'RHS',
              children: [
                {
                  name: 'element',
                  tag: 'h1',
                  class: 'title uppercase',
                  children: [
                    { name: 'first_name', tag: 'span', children: [] },
                    {
                      name: 'last_name',
                      tag: 'span',
                      class: 'space_before',
                      children: [],
                    },
                  ],
                },
                {
                  name: 'element',
                  tag: 'div',
                  class: 'template_head_divider',
                  children: [],
                },
                {
                  name: 'designation',
                  tag: 'p',
                  class: 'uppercase',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: 'element',
          tag: 'div',
          class: 'template_body',
          children: [
            {
              name: 'element',
              tag: 'div',
              blocks: [
                'contact',
                'education',
                'courses',
                'languages',
                'references',
              ],
              class: 'LHS',
              children: [],
            },
            {
              name: 'element',
              tag: 'div',
              blocks: ['about_info', 'experience', 'internships', 'skills'],
              class: 'RHS',
              children: [],
            },
          ],
        },
      ],
    },
    blocks: {
      contact: {
        title: 'Contact',
        multiple: false,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            {
              name: 'element',
              tag: 'ul',
              class: 'template-contact no-list-style blocks-wrapper',
              children: [
                {
                  name: 'element',
                  tag: 'li',
                  children: [
                    {
                      name: 'element',
                      tag: 'span',
                      class: 'template_icon phone_icon',
                      children: [
                        {
                          name: 'element',
                          tag: 'img',
                          src: 'https://resume-mango.s3.us-east-2.amazonaws.com/public/svgs/phone_white.svg',
                          parent: 'phone_number',
                          text: '',
                          children: [],
                        },
                      ],
                    },
                    { name: 'phone_number', tag: 'span', children: [] },
                  ],
                },
                {
                  name: 'element',
                  tag: 'li',
                  children: [
                    {
                      name: 'element',
                      tag: 'span',
                      class: 'template_icon email_icon',
                      children: [
                        {
                          name: 'element',
                          tag: 'img',
                          src: 'https://resume-mango.s3.us-east-2.amazonaws.com/public/svgs/email_white.svg',
                          parent: 'email_address',
                          text: '',
                          children: [],
                        },
                      ],
                    },
                    { name: 'email_address', tag: 'span', children: [] },
                  ],
                },
                {
                  name: 'element',
                  tag: 'li',
                  children: [
                    {
                      name: 'element',
                      tag: 'span',
                      class: 'template_icon address_icon',
                      children: [
                        {
                          name: 'element',
                          tag: 'img',
                          src: 'https://resume-mango.s3.us-east-2.amazonaws.com/public/svgs/map-marker_white.svg',
                          parent: 'address',
                          text: '',
                          children: [],
                        },
                      ],
                    },
                    { name: 'address', tag: 'span', children: [] },
                  ],
                },
              ],
            },
          ],
        },
      },
      about_info: {
        title: 'About',
        multiple: false,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            {
              name: 'about_info',
              tag: 'div',
              class: 'blocks-wrapper',
              children: [],
            },
          ],
        },
      },
      skills: {
        title: 'Skills',
        multiple: true,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'template_skills block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            {
              name: 'blocks-wrapper',
              tag: 'div',
              columns: '2',
              class: 'sub-block',
              children: [],
            },
          ],
        },
        block: { name: 'title', tag: 'p', children: [] },
      },
      languages: {
        title: 'Languages',
        multiple: true,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            {
              name: 'blocks-wrapper',
              tag: 'ul',
              class: 'template-languages',
              children: [],
            },
          ],
        },
        block: {
          name: 'element',
          tag: 'li',
          children: [
            { name: 'language', tag: 'b', children: [] },
            {
              name: 'element',
              tag: 'span',
              parent: 'level',
              text: ' - ',
              children: [],
            },
            { name: 'level', tag: 'em', children: [] },
          ],
        },
      },
      experience: {
        title: 'Work Experience',
        multiple: true,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'template_experience block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            { name: 'blocks-wrapper', tag: 'div', children: [] },
          ],
        },
        block: {
          name: 'element',
          tag: 'div',
          class: 'sub-block',
          children: [
            {
              name: 'element',
              tag: 'div',
              class: 'experience_head',
              children: [
                {
                  name: 'element',
                  tag: 'div',
                  children: [
                    { name: 'designation', tag: 'b', children: [] },
                    {
                      name: 'element',
                      tag: 'em',
                      children: [
                        {
                          name: 'element',
                          tag: 'p',
                          children: [
                            { name: 'company', tag: 'span', children: [] },
                            {
                              name: 'element',
                              tag: 'span',
                              parent: 'city',
                              text: ' - ',
                              children: [],
                            },
                            { name: 'city', tag: 'span', children: [] },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'element',
                  tag: 'p',
                  children: [
                    { name: 'duration.start', tag: 'span', children: [] },
                    {
                      name: 'element',
                      tag: 'span',
                      parent: 'duration.end',
                      text: ' - ',
                      children: [],
                    },
                    { name: 'duration.end', tag: 'span', children: [] },
                  ],
                },
              ],
            },
            { name: 'description', tag: 'p', children: [] },
          ],
        },
      },
      education: {
        title: 'Education',
        multiple: true,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            { name: 'blocks-wrapper', tag: 'div', children: [] },
          ],
        },
        block: {
          name: 'element',
          tag: 'div',
          class: 'sub-block',
          children: [
            {
              name: 'element',
              tag: 'p',
              children: [{ name: 'degree', tag: 'b', children: [] }],
            },
            {
              name: 'element',
              tag: 'p',
              children: [
                { name: 'duration.start', tag: 'span', children: [] },
                {
                  name: 'element',
                  tag: 'span',
                  parent: 'duration.end',
                  text: ' - ',
                  children: [],
                },
                { name: 'duration.end', tag: 'span', children: [] },
              ],
            },
            {
              name: 'element',
              tag: 'p',
              children: [
                {
                  name: 'element',
                  tag: 'em',
                  children: [
                    { name: 'institution', tag: 'span', children: [] },
                    {
                      name: 'element',
                      tag: 'span',
                      parent: 'city',
                      text: ', ',
                      children: [],
                    },
                    { name: 'city', tag: 'span', children: [] },
                  ],
                },
              ],
            },
          ],
        },
      },
      internships: {
        title: 'InternShip',
        multiple: true,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'template_internship block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            { name: 'blocks-wrapper', tag: 'div', children: [] },
          ],
        },
        block: {
          name: 'element',
          tag: 'div',
          class: 'sub-block',
          children: [
            {
              name: 'element',
              tag: 'div',
              class: 'internships_head',
              children: [
                {
                  name: 'element',
                  tag: 'div',
                  children: [
                    { name: 'job_title', tag: 'b', children: [] },
                    {
                      name: 'element',
                      tag: 'em',
                      children: [
                        {
                          name: 'element',
                          tag: 'p',
                          children: [
                            { name: 'employer', tag: 'span', children: [] },
                            {
                              name: 'element',
                              tag: 'span',
                              parent: 'city',
                              text: ' - ',
                              children: [],
                            },
                            { name: 'city', tag: 'span', children: [] },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'element',
                  tag: 'p',
                  children: [
                    { name: 'duration.start', tag: 'span', children: [] },
                    {
                      name: 'element',
                      tag: 'span',
                      parent: 'duration.end',
                      text: ' - ',
                      children: [],
                    },
                    { name: 'duration.end', tag: 'span', children: [] },
                  ],
                },
              ],
            },
            { name: 'description', tag: 'p', children: [] },
          ],
        },
      },
      courses: {
        title: 'Courses',
        multiple: true,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            {
              name: 'blocks-wrapper',
              tag: 'ul',
              class: 'template-courses no-list-style',
              children: [],
            },
          ],
        },
        block: {
          name: 'element',
          tag: 'li',
          class: 'sub-block',
          children: [
            {
              name: 'element',
              tag: 'p',
              children: [{ name: 'course', tag: 'b', children: [] }],
            },
            {
              name: 'element',
              tag: 'p',
              children: [
                { name: 'duration.start', tag: 'span', children: [] },
                {
                  name: 'element',
                  tag: 'span',
                  parent: 'duration.end',
                  text: ' - ',
                  children: [],
                },
                { name: 'duration.end', tag: 'span', children: [] },
              ],
            },
            { name: 'institution', tag: 'em', children: [] },
          ],
        },
      },
      references: {
        title: 'References',
        multiple: true,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            {
              name: 'blocks-wrapper',
              tag: 'ul',
              class: 'template-reference no-list-style',
              children: [],
            },
          ],
        },
        block: {
          name: 'element',
          tag: 'li',
          class: 'sub-block',
          children: [
            {
              name: 'element',
              tag: 'p',
              children: [{ name: 'name', tag: 'b', children: [] }],
            },
            {
              name: 'element',
              tag: 'p',
              children: [{ name: 'company', tag: 'em', children: [] }],
            },
            {
              name: 'element',
              tag: 'p',
              children: [
                {
                  name: 'element',
                  tag: 'b',
                  parent: 'email_address',
                  text: 'Email: ',
                  children: [],
                },
                { name: 'email_address', tag: 'span', children: [] },
              ],
            },
            {
              name: 'element',
              tag: 'p',
              children: [
                {
                  name: 'element',
                  tag: 'b',
                  parent: 'phone_number',
                  text: 'Phone: ',
                  children: [],
                },
                { name: 'phone_number', tag: 'span', children: [] },
              ],
            },
          ],
        },
      },
    },
    secondaryLayout: {
      name: 'element',
      tag: 'div',
      class: 'template_page',
      children: [
        {
          name: 'element',
          tag: 'div',
          class: 'template_body',
          children: [
            {
              name: 'element',
              tag: 'div',
              blocks: [
                'contact',
                'education',
                'courses',
                'languages',
                'references',
              ],
              class: 'LHS',
              children: [],
            },
            {
              name: 'element',
              tag: 'div',
              blocks: ['about_info', 'experience', 'internships', 'skills'],
              class: 'RHS',
              children: [],
            },
          ],
        },
      ],
    },
    __v: 0,
    createdAt: '2022-03-09T13:22:40.455Z',
    updatedAt: '2022-03-09T13:22:40.455Z',
  },
  {
    _id: '6228aa20cfe4dad975568d50',
    name: 'template8',
    image: true,
    thumbnail:
      'https://resume-mango.s3.us-east-2.amazonaws.com/public/template-images/resumes/filled/template7.jpg',
    blank:
      'https://resume-mango.s3.us-east-2.amazonaws.com/public/template-images/resumes/empty/template7.jpg',
    fonts: [
      {
        name: 'Raleway',
        url: 'https://resume-mango.s3.us-east-2.amazonaws.com/public/fonts/raleway/Raleway-Medium.ttf',
        format: 'truetype',
        style: 'normal',
        weight: 400,
        _id: '6228aa20cfe4dad975568d51',
      },
    ],
    layout: {
      name: 'element',
      tag: 'div',
      class: 'template_page',
      children: [
        {
          name: 'element',
          tag: 'div',
          class: 'template_header',
          children: [
            {
              name: 'element',
              tag: 'div',
              class: 'LHS',
              children: [
                {
                  name: 'element',
                  tag: 'div',
                  class: 'template_avatar',
                  children: [
                    { name: 'avatar.processed', tag: 'img', children: [] },
                  ],
                },
              ],
            },
            {
              name: 'element',
              tag: 'div',
              class: 'RHS',
              children: [
                {
                  name: 'element',
                  tag: 'h1',
                  class: 'title uppercase',
                  children: [
                    { name: 'first_name', tag: 'span', children: [] },
                    {
                      name: 'last_name',
                      tag: 'span',
                      class: 'space_before',
                      children: [],
                    },
                  ],
                },
                {
                  name: 'element',
                  tag: 'div',
                  class: 'template_head_divider',
                  children: [],
                },
                {
                  name: 'designation',
                  tag: 'p',
                  class: 'uppercase',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: 'element',
          tag: 'div',
          class: 'template_body',
          children: [
            {
              name: 'element',
              tag: 'div',
              blocks: [
                'contact',
                'education',
                'courses',
                'languages',
                'references',
              ],
              class: 'LHS',
              children: [],
            },
            {
              name: 'element',
              tag: 'div',
              blocks: ['about_info', 'experience', 'internships', 'skills'],
              class: 'RHS',
              children: [],
            },
          ],
        },
      ],
    },
    blocks: {
      contact: {
        title: 'Contact',
        multiple: false,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            {
              name: 'element',
              tag: 'ul',
              class: 'template-contact no-list-style blocks-wrapper',
              children: [
                {
                  name: 'element',
                  tag: 'li',
                  children: [
                    {
                      name: 'element',
                      tag: 'span',
                      class: 'template_icon phone_icon',
                      children: [
                        {
                          name: 'element',
                          tag: 'img',
                          src: 'https://resume-mango.s3.us-east-2.amazonaws.com/public/svgs/phone_white.svg',
                          parent: 'phone_number',
                          text: '',
                          children: [],
                        },
                      ],
                    },
                    { name: 'phone_number', tag: 'span', children: [] },
                  ],
                },
                {
                  name: 'element',
                  tag: 'li',
                  children: [
                    {
                      name: 'element',
                      tag: 'span',
                      class: 'template_icon email_icon',
                      children: [
                        {
                          name: 'element',
                          tag: 'img',
                          src: 'https://resume-mango.s3.us-east-2.amazonaws.com/public/svgs/email_white.svg',
                          parent: 'email_address',
                          text: '',
                          children: [],
                        },
                      ],
                    },
                    { name: 'email_address', tag: 'span', children: [] },
                  ],
                },
                {
                  name: 'element',
                  tag: 'li',
                  children: [
                    {
                      name: 'element',
                      tag: 'span',
                      class: 'template_icon address_icon',
                      children: [
                        {
                          name: 'element',
                          tag: 'img',
                          src: 'https://resume-mango.s3.us-east-2.amazonaws.com/public/svgs/map-marker_white.svg',
                          parent: 'address',
                          text: '',
                          children: [],
                        },
                      ],
                    },
                    { name: 'address', tag: 'span', children: [] },
                  ],
                },
              ],
            },
          ],
        },
      },
      about_info: {
        title: 'About',
        multiple: false,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            {
              name: 'about_info',
              tag: 'div',
              class: 'blocks-wrapper',
              children: [],
            },
          ],
        },
      },
      skills: {
        title: 'Skills',
        multiple: true,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'template_skills block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            {
              name: 'blocks-wrapper',
              tag: 'div',
              columns: '2',
              class: 'sub-block',
              children: [],
            },
          ],
        },
        block: { name: 'title', tag: 'p', children: [] },
      },
      languages: {
        title: 'Languages',
        multiple: true,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            {
              name: 'blocks-wrapper',
              tag: 'ul',
              class: 'template-languages',
              children: [],
            },
          ],
        },
        block: {
          name: 'element',
          tag: 'li',
          children: [
            { name: 'language', tag: 'b', children: [] },
            {
              name: 'element',
              tag: 'span',
              parent: 'level',
              text: ' - ',
              children: [],
            },
            { name: 'level', tag: 'em', children: [] },
          ],
        },
      },
      experience: {
        title: 'Work Experience',
        multiple: true,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'template_experience block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            { name: 'blocks-wrapper', tag: 'div', children: [] },
          ],
        },
        block: {
          name: 'element',
          tag: 'div',
          class: 'sub-block',
          children: [
            {
              name: 'element',
              tag: 'div',
              class: 'experience_head',
              children: [
                {
                  name: 'element',
                  tag: 'div',
                  children: [
                    { name: 'designation', tag: 'b', children: [] },
                    {
                      name: 'element',
                      tag: 'em',
                      children: [
                        {
                          name: 'element',
                          tag: 'p',
                          children: [
                            { name: 'company', tag: 'span', children: [] },
                            {
                              name: 'element',
                              tag: 'span',
                              parent: 'city',
                              text: ' - ',
                              children: [],
                            },
                            { name: 'city', tag: 'span', children: [] },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'element',
                  tag: 'p',
                  children: [
                    { name: 'duration.start', tag: 'span', children: [] },
                    {
                      name: 'element',
                      tag: 'span',
                      parent: 'duration.end',
                      text: ' - ',
                      children: [],
                    },
                    { name: 'duration.end', tag: 'span', children: [] },
                  ],
                },
              ],
            },
            { name: 'description', tag: 'p', children: [] },
          ],
        },
      },
      education: {
        title: 'Education',
        multiple: true,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            { name: 'blocks-wrapper', tag: 'div', children: [] },
          ],
        },
        block: {
          name: 'element',
          tag: 'div',
          class: 'sub-block',
          children: [
            {
              name: 'element',
              tag: 'p',
              children: [{ name: 'degree', tag: 'b', children: [] }],
            },
            {
              name: 'element',
              tag: 'p',
              children: [
                { name: 'duration.start', tag: 'span', children: [] },
                {
                  name: 'element',
                  tag: 'span',
                  parent: 'duration.end',
                  text: ' - ',
                  children: [],
                },
                { name: 'duration.end', tag: 'span', children: [] },
              ],
            },
            {
              name: 'element',
              tag: 'p',
              children: [
                {
                  name: 'element',
                  tag: 'em',
                  children: [
                    { name: 'institution', tag: 'span', children: [] },
                    {
                      name: 'element',
                      tag: 'span',
                      parent: 'city',
                      text: ', ',
                      children: [],
                    },
                    { name: 'city', tag: 'span', children: [] },
                  ],
                },
              ],
            },
          ],
        },
      },
      internships: {
        title: 'InternShip',
        multiple: true,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'template_internship block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            { name: 'blocks-wrapper', tag: 'div', children: [] },
          ],
        },
        block: {
          name: 'element',
          tag: 'div',
          class: 'sub-block',
          children: [
            {
              name: 'element',
              tag: 'div',
              class: 'internships_head',
              children: [
                {
                  name: 'element',
                  tag: 'div',
                  children: [
                    { name: 'job_title', tag: 'b', children: [] },
                    {
                      name: 'element',
                      tag: 'em',
                      children: [
                        {
                          name: 'element',
                          tag: 'p',
                          children: [
                            { name: 'employer', tag: 'span', children: [] },
                            {
                              name: 'element',
                              tag: 'span',
                              parent: 'city',
                              text: ' - ',
                              children: [],
                            },
                            { name: 'city', tag: 'span', children: [] },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'element',
                  tag: 'p',
                  children: [
                    { name: 'duration.start', tag: 'span', children: [] },
                    {
                      name: 'element',
                      tag: 'span',
                      parent: 'duration.end',
                      text: ' - ',
                      children: [],
                    },
                    { name: 'duration.end', tag: 'span', children: [] },
                  ],
                },
              ],
            },
            { name: 'description', tag: 'p', children: [] },
          ],
        },
      },
      courses: {
        title: 'Courses',
        multiple: true,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            {
              name: 'blocks-wrapper',
              tag: 'ul',
              class: 'template-courses no-list-style',
              children: [],
            },
          ],
        },
        block: {
          name: 'element',
          tag: 'li',
          class: 'sub-block',
          children: [
            {
              name: 'element',
              tag: 'p',
              children: [{ name: 'course', tag: 'b', children: [] }],
            },
            {
              name: 'element',
              tag: 'p',
              children: [
                { name: 'duration.start', tag: 'span', children: [] },
                {
                  name: 'element',
                  tag: 'span',
                  parent: 'duration.end',
                  text: ' - ',
                  children: [],
                },
                { name: 'duration.end', tag: 'span', children: [] },
              ],
            },
            { name: 'institution', tag: 'em', children: [] },
          ],
        },
      },
      references: {
        title: 'References',
        multiple: true,
        layout: {
          name: 'element',
          tag: 'div',
          class: 'block',
          children: [
            { name: 'title', tag: 'h3', class: 'heading', children: [] },
            {
              name: 'blocks-wrapper',
              tag: 'ul',
              class: 'template-reference no-list-style',
              children: [],
            },
          ],
        },
        block: {
          name: 'element',
          tag: 'li',
          class: 'sub-block',
          children: [
            {
              name: 'element',
              tag: 'p',
              children: [{ name: 'name', tag: 'b', children: [] }],
            },
            {
              name: 'element',
              tag: 'p',
              children: [{ name: 'company', tag: 'em', children: [] }],
            },
            {
              name: 'element',
              tag: 'p',
              children: [
                {
                  name: 'element',
                  tag: 'b',
                  parent: 'email_address',
                  text: 'Email: ',
                  children: [],
                },
                { name: 'email_address', tag: 'span', children: [] },
              ],
            },
            {
              name: 'element',
              tag: 'p',
              children: [
                {
                  name: 'element',
                  tag: 'b',
                  parent: 'phone_number',
                  text: 'Phone: ',
                  children: [],
                },
                { name: 'phone_number', tag: 'span', children: [] },
              ],
            },
          ],
        },
      },
    },
    secondaryLayout: {
      name: 'element',
      tag: 'div',
      class: 'template_page',
      children: [
        {
          name: 'element',
          tag: 'div',
          class: 'template_body',
          children: [
            {
              name: 'element',
              tag: 'div',
              blocks: [
                'contact',
                'education',
                'courses',
                'languages',
                'references',
              ],
              class: 'LHS',
              children: [],
            },
            {
              name: 'element',
              tag: 'div',
              blocks: ['about_info', 'experience', 'internships', 'skills'],
              class: 'RHS',
              children: [],
            },
          ],
        },
      ],
    },
    __v: 0,
    createdAt: '2022-03-09T13:22:40.455Z',
    updatedAt: '2022-03-09T13:22:40.455Z',
  },
]
