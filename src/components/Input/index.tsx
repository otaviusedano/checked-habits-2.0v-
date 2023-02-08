import './styles.scss'

export function Input ({setHabit, placeholder}: any) {
  return (
    <div>
      <input className='input' type="text" placeholder={placeholder} onChange={(e: any) => setHabit({name: e.target.value})} />
    </div>
  )
}