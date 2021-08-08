const SPAN_CLASSES: Record<number, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
}

interface Props {
  span: number
}

export function DayOffsetter(props: Props) {
  const { span } = props;

  if (span === 0) {
    return <></>
  }

  return (
    <div class={SPAN_CLASSES[span]}></div>
  )
}
