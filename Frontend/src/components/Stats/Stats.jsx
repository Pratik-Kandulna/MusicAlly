import "./stats.css";

const stats = [
  { value: "50K+", label: "Tracks" },
  { value: "10K+", label: "Artists" },
  { value: "100K+", label: "Users" },
  { value: "150+", label: "Countries" }
];

function Stats() {
  return (
    <section className="stats">
      <h2>Our Impact</h2>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <h3>{s.value}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;