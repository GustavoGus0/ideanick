import { Helmet } from 'react-helmet-async'
import ErrorPageComponent from '../../../components/ErrorPageComponent'
import image404 from '../../../assets/images/404.png'
import css from './index.module.scss'

export default function NotFoundPage({
  title = 'Not Found',
  message = 'This page does not exist',
}: {
  title?: string
  message?: string
}) {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <ErrorPageComponent title={title} message={message}>
        <img src={image404} className={css.image} alt="" width="800" height="600" />
      </ErrorPageComponent>
    </>
  )
}
