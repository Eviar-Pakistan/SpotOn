import sparkImg from '../assets/spark_background_bottom.png'

export default function ScreenShell({ children, className = '', spark = true }) {
  return (
    <section className={`screen ${className}`.trim()}>
      <div className="screen-body">{children}</div>
      {spark && <img src={sparkImg} alt="" className="spark-bg" />}
    </section>
  )
}
