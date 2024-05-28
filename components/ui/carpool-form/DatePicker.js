import DatePicker from "react-mobile-datepicker"
const DateTimePicker = ({ time, isOpen }) => {
  const handleSelect = date => {
    console.log(date)
  }

  const handleCancel = () => {
    console.log("cancel")
  }
  return (
    <DatePicker
      value={time}
      isOpen={isOpen}
      onSelect={this.handleSelect}
      onCancel={this.handleCancel}
    />
  )
}
export default DateTimePicker
