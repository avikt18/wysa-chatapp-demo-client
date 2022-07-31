import { useState } from 'react'

function Counter({ delayValue, setDelayValue }) {
  return (
    <div>
      <button className='btn' onClick={()=>setDelayValue(delayValue-1000)} disabled={delayValue<1}>-</button>
      {`${delayValue/1000}s`}
      <button className='btn' onClick={()=>setDelayValue(delayValue+1000)} disabled={delayValue>9000}>+</button>
    </div>
  )
}

export default Counter