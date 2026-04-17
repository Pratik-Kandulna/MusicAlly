import "./QuickCards.css"
function QuickCards() {
  const data = [
    { title: "Liked Songs", sub: "324 tracks" },
    { title: "Recent", sub: "Last played" },
    { title: "Trending", sub: "What's hot" },
    { title: "On Repeat", sub: "Your favorites" },
  ];

  return (
    <section className="cards">
      {data.map((item, i) => (
        <div key={i} className="card">
          <h3>{item.title}</h3>
          <p>{item.sub}</p>
        </div>
      ))}
    </section>
  );
}

export default QuickCards;