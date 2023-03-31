import "./errorMessage.css"

const ErrorMessage = ({message, error}) => {
  return (
    <section className={`error-message ${error ? "error-message-active" : ""}`} >
      <h1> Oops...! Something Went Wrong !</h1>
      <p>{message}</p>
    </section>
  )
}

export default ErrorMessage
