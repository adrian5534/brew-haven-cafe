import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import '../styles/contact.css';

export default function Contact() {
  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <section className="container-fluid p-0 mb-4">
        <div className="position-relative" style={{ height: 260  }}>
          <img
            src="/image/contact-hero.jpg"
            alt="Cafe interior"
            className="w-100 h-100"
            style={{ objectFit: 'cover', filter: 'brightness(70%)' }}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end">
            <div className="bg-white bg-opacity-75 p-3 rounded-3 ms-4 mb-3" style={{ maxWidth: 340 }}>
              <h3 className="fw-bold mb-1" style={{ color: 'var(--primary)' }}>Get in touch</h3>
              <div className="small" style={{ color: 'var(--muted-foreground)' }}>
                Questions, feedback, or catering requests? We’re here to help.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-5">
        <div className="row g-4">
          {/* Left: Map & Find Us */}
          <div className="col-12 col-lg-8">
            <div className="card p-4 mb-4" style={{ background: 'var(--card)' }}>
              <h5 className="fw-bold mb-3" style={{ color: 'var(--primary)' }}>Find us</h5>
              <div className="bg-light rounded-3 d-flex flex-column justify-content-center align-items-center mb-3" style={{ height: 220, background: 'var(--input)' }}>
                <i className="bi bi-geo-alt" style={{ fontSize: 24, color: 'var(--secondary)' }}></i>
                <span className="text-muted mt-2">Google Map embed placeholder</span>
              </div>
              <div>
                <button className="btn btn-outline-secondary me-2 mb-2" style={{ borderRadius: 8 }}>
                  <i className="bi bi-geo-alt me-1"></i>Open in Maps
                </button>
                <button className="btn btn-outline-secondary mb-2" style={{ borderRadius: 8 }}>
                  <i className="bi bi-send me-1"></i>Get directions
                </button>
              </div>
            </div>
            {/* Message Form */}
            <div className="card p-4" style={{ background: 'var(--card)' }}>
              <h5 className="fw-bold mb-3" style={{ color: 'var(--primary)' }}>Send us a message</h5>
              <form>
                <input type="text" className="form-control mb-2" placeholder="Name" style={{ background: 'var(--input)' }} />
                <input type="email" className="form-control mb-2" placeholder="Email" style={{ background: 'var(--input)' }} />
                <textarea className="form-control mb-3" rows={4} placeholder="Message" style={{ background: 'var(--input)' }} />
                <button type="submit" className="btn" style={{ background: 'var(--secondary)', color: 'var(--background)', borderRadius: 8 }}>
                  <i className="bi bi-send me-"></i>Send Message
                </button>
              </form>
            </div>
          </div>
          {/* Right: Contact Details & Hours */}
          <div className="col-12 col-lg-4">
            <div className="card p-4 mb-4" style={{ background: 'var(--primary-foreground)', border: '1px solid var(--border)' }}>
              <h5 className="fw-bold mb-3" style={{ color: 'var(--primary)' }}>Contact details</h5>
              <div className="mb-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <i className="bi bi-geo-alt me-2" style={{ color: 'var(--secondary)' }}></i>
                <span className="fw-semibold">Address</span><br />
                <span className="text-muted">123 Roast Street, Suite 5, Beanville, CA 94110</span>
              </div>
              <div className="mb-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <i className="bi bi-telephone me-2" style={{ color: 'var(--secondary)' }}></i>
                <span className="fw-semibold">Phone</span><br />
                <span className="text-muted">(415) 555-0199</span>
              </div>
              <div>
                <i className="bi bi-envelope me-2" style={{ color: 'var(--secondary)' }}></i>
                <span className="fw-semibold">Email</span><br />
                <span className="text-muted">hello@brewhaven.cafe</span>
              </div>
            </div>
            <div className="card p-4" style={{ background: 'var(--card)' }}>
              <h5 className="fw-bold mb-3" style={{ color: 'var(--primary)' }}>Hours</h5>
              <div className="mb-1">
                <span className="fw-semibold">Mon-Fri:</span> 7:00 AM &ndash; 6:00 PM
              </div>
              <div>
                <span className="fw-semibold">Sat-Sun:</span> 8:00 AM &ndash; 5:00 PM
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}