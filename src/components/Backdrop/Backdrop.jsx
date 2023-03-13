import "./backdrop.css"
const Backdrop = ({navOpen, setNavOpen}) => {
  return (
    <section className={`backdrop ${navOpen ? "backdrop__active" : ""}`} onClick={() => setNavOpen(false)}>
       
    </section>
  )
}

export default Backdrop
