import "./TopCharts.css";

const charts = [
  { rank: 1, title: "Song A" },
  { rank: 2, title: "Song B" },
  { rank: 3, title: "Song C" },
  { rank: 4, title: "Song D" }
];

function TopCharts() {
  return (
    <div className="charts">
      <h2>📊 Top Charts</h2>

      <ul>
        {charts.map((c, i) => (
          <li key={i}>
            <span>{c.rank}</span> {c.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopCharts;