import { forwardRef } from 'react'
import sparkImg from '../assets/spark_background_bottom.png'

const ScreenShell = forwardRef(function ScreenShell(
  { children, className = '', spark = true },
  ref,
) {
  return (
    <section ref={ref} className={`screen ${className}`.trim()}>
      <div className="screen-body">{children}</div>
      {spark && <img src={sparkImg} alt="" className="spark-bg" />}
    </section>
  )
})

export default ScreenShell
