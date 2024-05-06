//Select all contents of an input field for easy editing
const handleFocus = (event) => event.target.select()

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase()+string.slice(1).toLowerCase()

export {
  handleFocus,
  capitalizeFirstLetter
}