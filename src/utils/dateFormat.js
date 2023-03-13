function dateFormat(arg) {
  if(arg) {
    const year = arg.slice(0, 4)
    const mounth = arg.slice(5, 7)
    const day = arg.slice(8, 10)
    const mounths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"]
    
    return `${mounths.at(mounth - 1)} ${day} ${year}`
  }
}

function runtime(params) {
  const minutes = Number(params)%60
  const hours = (params - minutes)/60
  
  return `${hours > 0 ? `${hours}h ` : "" }${minutes}m`
}

export {dateFormat, runtime}
