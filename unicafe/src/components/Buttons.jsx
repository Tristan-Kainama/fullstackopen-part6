import { useGoodControls, useBadControls, useNeutralControls } from './store'

const Buttons = () => {
  const goodIncrement = useGoodControls()
  const badIncrement = useBadControls()
  const neutralIncrement = useNeutralControls()

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={goodIncrement}>good</button>
      <button onClick={neutralIncrement}>neutral</button>
      <button onClick={badIncrement}>bad</button>
    </div>
  )
}

export default Buttons
