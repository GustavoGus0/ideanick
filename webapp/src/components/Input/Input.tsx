import { Dispatch, SetStateAction } from 'react'
export default function Input({
  name,
  label,
  state,
  setState,
}: {
  name: string
  label: string
  state: Record<string, any>
  // This any is allowed to be used in this place
  setState: Dispatch<SetStateAction<any>>
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        type="text"
        onChange={(e) => {
          setState({ ...state, [name]: e.target.value })
        }}
        value={state[name]}
        name={name}
        id={name}
      />
    </div>
  )
}
