export function DesktopStoryCards() {
  return (
    <section className="desktop-story-section" aria-label="USCO moments">
      <div className="desktop-story-shell">
        <div className="desktop-story-intro">
          <p>USCO Moments</p>
          <h2>Small pauses, warm cups, and corners made for staying.</h2>
        </div>

        <div className="desktop-story-stack">
          <article className="desktop-story-row">
            <div className="desktop-story-media">
              <video
                className="desktop-story-video"
                src="/media/phone/coffee-home.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
            <div className="desktop-story-glass">
              <p className="desktop-story-kicker">Some of Our Speciality</p>
              <h3>Coffee that feels like your coffee.</h3>
              <p>
                Slow pours, soft milk, deeper roasts, and the kind of cup that makes you stay for
                one more minute.
              </p>
              <p className="desktop-story-pill">Made for quiet mornings and slower evenings</p>
            </div>
          </article>

          <article className="desktop-story-row desktop-story-row--reverse">
            <div className="desktop-story-media">
              <span className="desktop-story-media-chip">Quiet Workspace</span>
              <video
                className="desktop-story-video"
                src="/media/phone/workspace-home.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
            <div className="desktop-story-glass">
              <p className="desktop-story-kicker">Work From Here</p>
              <h3>A quiet table for deep work and slower hours.</h3>
              <p>
                Settle in with coffee, let the room stay calm around you, and get through the work
                that needs a little peace.
              </p>
              <p className="desktop-story-pill">
                Best for reading, writing, and long laptop sessions
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
