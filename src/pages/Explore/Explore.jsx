import { useState } from "react"
import Select from "react-select"
import "./explore.css"

const options = [
  {value: "popularity ass", label: "Populaires"},
  {value: "popularity dess", label: "impopulaire"},
  {value: "Action", label: "action"}
]

const Explore = () => { 
  
  const [selectOption, setSelectOption] = useState() 
  const handleChange = (val) => {
    console.log(val)
    setSelectOption(val)
  }

  return (
    <section className="explore">
      <Select 
        isMulti
        value={selectOption}
        options={options}
        onChange={handleChange}
      />
      <Select 
        value={selectOption}
        options={options}
        onChange={handleChange}
      />
    </section>
  )
}

export default Explore
