import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

function About() {
  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)', minHeight: '100vh' }}>
      {/* Top image section */}
      <div className="w-100 position-relative" style={{ minHeight: 220, maxHeight: 340, overflow: 'hidden' }}>
        <img
          src="/image/coffee-shop.jpg"
          alt="Coffee shop"
          className="w-100"
          style={{
            objectFit: 'cover',
            height: '100%',
            minHeight: 220,
            maxHeight: 340,
            display: 'block'
          }}
        />
        <div
          className="position-absolute top-50 start-0 translate-middle-y px-3 py-2 rounded-3"
          style={{
            background: 'rgba(40,40,40,0.7)',
            color: '#fff',
            left: '2rem',
            maxWidth: '90vw'
          }}
        >
          <h2 className="fw-bold mb-1" style={{ fontSize: '1.6rem' }}>Our story, brewed daily</h2>
          <div style={{ fontSize: '1rem' }}>From farm to cup, we craft warm moments with every pour.</div>
        </div>
      </div>

      {/* Main content */}
      <div className="container-fluid py-4">
        <div className="row g-4">
          {/* Left column */}
          <div className="col-12 col-lg-8">
            {/* About Brew Haven */}
            <div className="rounded-4 p-4 mb-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <h3 className="fw-bold mb-2">About Brew Haven</h3>
              <div className="text-muted mb-2" style={{ fontSize: '0.95rem' }}>
                Founded in 2016 · Beanville, CA
              </div>
              <div className="mb-3">
                We started as a tiny corner café with a big mission: serve ethically sourced coffee and create a cozy space for the community. Our espresso bar blends classic techniques with modern roasting to bring out rich, balanced flavors.
              </div>
              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-success" style={{ borderRadius: 20 }}>
                  <i className="bi bi-cup-hot me-2"></i>Explore our beans
                </button>
                <button className="btn btn-light" style={{ borderRadius: 20, background: 'var(--muted)', color: 'var(--foreground)', border: 'none' }}>
                  <i className="bi bi-restaurant me-2"></i>View menu
                </button>
              </div>
            </div>

            {/* What we stand for */}
            <div className="rounded-4 p-4 mb-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <h4 className="fw-bold mb-3">What we stand for</h4>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="rounded-3 p-3 h-100 d-flex align-items-start gap-2" style={{ background: 'var(--muted)', color: 'var(--foreground)' }}>
                    <i className="bi bi-leaf" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></i>
                    <div>
                      <strong>Sustainable sourcing</strong>
                      <div className="text-muted" style={{ fontSize: '0.95rem' }}>
                        Direct-trade relationships with farms we visit annually.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="rounded-3 p-3 h-100 d-flex align-items-start gap-2" style={{ background: 'var(--muted)', color: 'var(--foreground)' }}>
                    <i className="bi bi-people" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></i>
                    <div>
                      <strong>Community first</strong>
                      <div className="text-muted" style={{ fontSize: '0.95rem' }}>
                        Open mic nights, book swaps, and charity brews every month.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="rounded-3 p-3 h-100 d-flex align-items-start gap-2" style={{ background: 'var(--muted)', color: 'var(--foreground)' }}>
                    <i className="bi bi-tools" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></i>
                    <div>
                      <strong>Craft and care</strong>
                      <div className="text-muted" style={{ fontSize: '0.95rem' }}>
                        Precision extraction and small-batch roasting for consistency.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="rounded-3 p-3 h-100 d-flex align-items-start gap-2" style={{ background: 'var(--muted)', color: 'var(--foreground)' }}>
                    <i className="bi bi-recycle" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></i>
                    <div>
                      <strong>Greener operations</strong>
                      <div className="text-muted" style={{ fontSize: '0.95rem' }}>
                        Compostable cups and zero-waste partners across the supply chain.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our impact */}
            <div className="rounded-4 p-4 mb-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <h4 className="fw-bold mb-3">Our impact</h4>
              <div className="row g-3">
                <div className="col-6">
                  <div className="rounded-3 p-3 text-center" style={{ background: 'var(--muted)', color: 'var(--foreground)' }}>
                    <div className="fw-bold" style={{ fontSize: '1.5rem' }}>250K+</div>
                    <div className="text-muted" style={{ fontSize: '0.95rem' }}>Cups served</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="rounded-3 p-3 text-center" style={{ background: 'var(--muted)', color: 'var(--foreground)' }}>
                    <div className="fw-bold" style={{ fontSize: '1.5rem' }}>98%</div>
                    <div className="text-muted" style={{ fontSize: '0.95rem' }}>Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-12 col-lg-4">
            {/* Meet the team */}
            <div className="rounded-4 p-4 mb-4" style={{ background: 'var(--muted)', border: '1px solid var(--border)' }}>
              <h4 className="fw-bold mb-3">Meet the team</h4>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-2">
                  <img src="/image/ava-santos.jpg" alt="Ava Santos" className="rounded-circle" style={{ width: 40, height: 40, objectFit: 'cover' }} />
                  <div>
                    <strong>Ava Santos</strong>
                    <div className="text-muted" style={{ fontSize: '0.95rem' }}>Head Roaster</div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <img src="/image/liam-chen.jpg" alt="Liam Chen" className="rounded-circle" style={{ width: 40, height: 40, objectFit: 'cover' }} />
                  <div>
                    <strong>Liam Chen</strong>
                    <div className="text-muted" style={{ fontSize: '0.95rem' }}>Lead Barista</div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <img src="/image/maya-patel.jpg" alt="Maya Patel" className="rounded-circle" style={{ width: 40, height: 40, objectFit: 'cover' }} />
                  <div>
                    <strong>Maya Patel</strong>
                    <div className="text-muted" style={{ fontSize: '0.95rem' }}>Community Manager</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Careers */}
            <div className="rounded-4 p-4 mb-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <h4 className="fw-bold mb-3">Careers</h4>
              <div className="mb-3">
                We're growing our team of baristas and roasters. Join us in crafting daily rituals.
              </div>
              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-success" style={{ borderRadius: 20 }}>
                  <i className="bi bi-briefcase me-2"></i>See openings
                </button>
                <button className="btn btn-light" style={{ borderRadius: 20, background: 'var(--muted)', color: 'var(--foreground)', border: 'none' }}>
                  <i className="bi bi-envelope me-2"></i>Email resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;