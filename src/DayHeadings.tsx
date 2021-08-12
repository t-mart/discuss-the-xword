export function DayHeadings() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayHeadings = daysOfWeek.map((dayName) => (
    <div>
      <span class="md:block hidden">
        {dayName}
      </span>
      <span class="md:hidden block">
        {dayName.substring(0, 1)}
      </span>
    </div>
  ))

  return (
    <>
      {dayHeadings}
    </>
  )
}
