import { set } from "lodash"
import DatePicker from "react-mobile-datepicker"
const DateTimePicker = ({ onSelect }) => {
  const time = new Date()
  const handleSelect = date => {
    setIsOpen(false)
    onSelect(date)
  }
  const theme = "ios"

  const monthMap = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
  }

  const dateConfig = {
    month: {
      format: value => monthMap[value.getMonth() + 1],
      caption: "Mon",
      step: 1
    },
    date: {
      format: "DD",
      caption: "Day",
      step: 1
    },
    hour: {
      format: "hh",
      caption: "Hour",
      step: 1
    },
    minute: {
      format: "mm",
      caption: "Min",
      step: 1
    }
  }
  const handleCancel = () => {
    setIsOpen(false)
  }
  return (
    <DatePicker
      dateConfig={dateConfig}
      theme={theme}
      value={time}
      isOpen={isOpen}
      onSelect={handleSelect}
      onCancel={handleCancel}
    />
  )
}
export default DateTimePicker
