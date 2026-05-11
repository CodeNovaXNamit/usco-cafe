export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="loading-screen__mark">USCO</div>
      <p className="loading-screen__label">Always Brewing Something</p>
      <div className="loading-screen__bar" aria-hidden>
        <div className="loading-screen__bar-fill" />
      </div>
    </div>
  );
}
