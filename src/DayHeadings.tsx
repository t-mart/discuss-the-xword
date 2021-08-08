export function DayHeadings() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayHeadings = daysOfWeek.map((dayName) => (
    <span>
      {dayName}
    </span>
  ))

  return (
    <>
      {dayHeadings}
    </>
  )
}
