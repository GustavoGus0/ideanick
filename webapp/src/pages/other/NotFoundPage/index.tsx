import { Helmet } from 'react-helmet-async'
import ErrorPageComponent from '../../../components/ErrorPageComponent'

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
      <ErrorPageComponent title={title} message={message} />
    </>
  )
}
