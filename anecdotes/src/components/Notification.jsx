import { useNotification } from '../store'

const Notification = () => {
  const message = useNotification()

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: message ? 'block' : 'none'
  }

  return (
    <div style={style} data-testid="notification">
      {message}
    </div>
  )
}

export default Notification
