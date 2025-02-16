import ErrorPageComponent from '../../components/ErrorPageComponent'

export default function NotFoundPage({
  title = 'Not Found',
  message = 'This page does not exist',
}: {
  title?: string
  message?: string
}) {
  return <ErrorPageComponent title={title} message={message} />
}
