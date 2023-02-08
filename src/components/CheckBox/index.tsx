import './styles.scss'

export function CheckBox ({onChange, daysCheckeds, today}: any) {


  // console.log(daysCheckeds);
  
  return (
    <input
      className='checkBox'
      type='checkbox'
      checked={daysCheckeds.indexOf(today) !== -1 ? true : false}
      onChange={() => onChange()}
    >
    </input>
  )
}