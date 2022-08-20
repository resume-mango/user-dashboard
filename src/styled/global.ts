import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  
font-size: 16px;
  font-weight: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: 0.035em;
  font-family: 'Product Sans', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    /* font-family:  'Product Sans', BlinkMacSystemFont; */
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.dark};
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: auto !important;

}
/* 
body::-webkit-scrollbar {
  width: 0.4rem;
  border-radius: 50rem;
}
body::-webkit-scrollbar-track {
  background: transparent;
}
body::-webkit-scrollbar-thumb {
  background: #e4e4e4;
} */

* {
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) =>
    theme.colors.primary + ' ' + theme.colors.light};

}

*::-webkit-scrollbar {
  height: 0.4rem; 
  width: 0.4rem;
  border-radius: 50rem;
}

*::-webkit-scrollbar-track {
  background: ${({ theme }) => theme.colors.light};
}

*::-webkit-scrollbar-thumb {
  background-color: ${({ theme }) => theme.shades.primary[4]};
  border-radius: 50rem;
  border: 3px solid ${({ theme }) => theme.shades.primary[4]};
}
  
.hide-scrollbar{
  -ms-overflow-style: none;  
  scrollbar-width: none;  
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

#root {

width: 100%;
height: 100%;
margin: 0;
padding: 0;
box-sizing: border-box;

}
a {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}
/* img{
  image-rendering: -moz-crisp-edges;        
image-rendering:   -o-crisp-edges;         
image-rendering: -webkit-optimize-contrast;
image-rendering: crisp-edges;
-ms-interpolation-mode: nearest-neighbor; 
} */
*,
::after,
::before {
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-weight: bold;
  line-height: 1.2;
  letter-spacing: 2px;
}

h1, h2 {
  letter-spacing: 2px;

}

h3, h4, h5 {
  letter-spacing: 1.5px;

}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.75rem;
}

h3 {
  font-size: 1.25rem;
}

h4 {
  font-size: 1rem;
}
p {
  font-size: 0.875rem;
}
p:focus {
  outline: none;
  border-bottom: 1px solid #06c;
}
 li, a {
  color: ${({ theme }) => theme.colors.dark};
  font-size: 0.875rem;
  font-style: normal;
font-weight: normal;
}
ul , ol{
  list-style-type: none;
    margin: 0;
    padding: 0;
}
hr{
  border: 1px solid #e7e7e7;
}

input,
select,
textarea {
  width: 100%;
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.light};
  border-radius: 4px;
  height: fit-content;
  font-family: inherit;
}

input:focus,
select:focus,
textarea:focus {
  outline: 0;
}

input::placeholder {
  color: #A8A8A8;
}

label {
  margin-bottom: 0.3rem;
  font-size: ${({ theme }) => theme.fonts.small};
  color: rgba(135, 135, 135, 1);
  display: flex;
}
button {
  font-family: 'Product Sans';
  appearance: none;
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  cursor: pointer;
}
button[disabled] {
  background: ${({ theme }) => theme.colors.grey};
  color: #fff;
  user-select: none;
  pointer-events: none;
}

table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  padding: 1.25rem;
  font-size: 1rem;
  font-weight: normal;
  text-transform: inherit;
}

th {
  text-align: start;
  font-weight: 700;
}

thead tr{
  border-top: 1px solid #E7E7E7;
  border-bottom: 1px solid #E7E7E7;
}

tbody tr {
  border-bottom: 1px solid #E7E7E7;
}
.link{
  font-size: 0.875rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  position: relative;
  width: fit-content;
  display: block;
  &:after {
    content: '';
    display: block;
    height: 2px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transition: all ease 0.3s;
    transform-origin: 0;
  }
  &:hover::after {
    transform: scaleX(1);
  }
}
.orange-hover:hover{
color: ${({ theme }) => theme.colors.primary};
transition: color ease-in-out .2s;
}
.bold{
  font-weight: 800;
}.semibold{
  font-weight: 600;
}
.invisible{
  visibility: hidden;
}
.align-center {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center !important;
  justify-content: center !important;
}

.flex-center {
  flex: 1;
  display: flex;
  align-items: center !important;
  justify-content: center !important;
}

.text-center {
  text-align: center;
}
.capitalize {
  text-transform: capitalize;
}
.h-100{
  height: 100%;
}
.w-100{
  width: 100%;
}
.smb{
  margin-bottom: 0.2rem;

}
.mb {
  margin-bottom: 0.5rem;
}

.mb-1 {
  margin-bottom: 1rem;
}
.mb-2 {
  margin-bottom: 1.5rem;

}
.mb-3 {
  margin-bottom: 2rem;
}
.mb-4 {
  margin-bottom: 3rem;
}
.truncate {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

@media (max-width: 1400px){
  h1 {
  font-size: 1.7rem;
}

h2 {
  font-size: 1.5rem;
}

h3 {
  font-size: 1.25rem;
}
p{
  font-size: .875rem;
  margin: 0.5rem 0;
}

}
@media (max-width: 480px){
  h1 {
  font-size: 1.5rem;
}

h2 {
  font-size: 1.2rem;
}

h3 {
  font-size: 1rem;
}
td,th{
  font-size: 0.7rem;
  padding: 0.5rem;
}
}
`
