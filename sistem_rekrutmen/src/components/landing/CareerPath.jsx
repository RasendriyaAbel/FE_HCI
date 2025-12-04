import './CareerPath.css';

function CareerPath() {
  const careerSteps = [
    { id: 1, label: 'Karir 1' },
    { id: 2, label: 'Karir 2' },
    { id: 3, label: 'Karir 3' },
    { id: 4, label: 'Karir 4' },
    { id: 5, label: 'Karir 5' }
  ];

  return (
    <section className="career-path">
      <div className="career-path-container">
        <h2 className="career-path-title">Jenjang Karir</h2>
        <div className="career-path-timeline">
          <div className="timeline-line"></div>
          {careerSteps.map((step, index) => (
            <div key={step.id} className="timeline-step">
              <div className="timeline-circle"></div>
              <span className="timeline-label">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CareerPath;

