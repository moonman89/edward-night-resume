import { compareRows } from "../data/tools";

export function CompareSection() {
  return (
    <section id="compare" className="section">
      <p className="section-label">02 — Compare</p>
      <h2 className="section-title">Side by side</h2>
      <p className="section-subtitle">
        High-level comparison — check each product&apos;s site for current
        pricing and feature details.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table className="compare-table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Cursor</th>
              <th scope="col">Antigravity</th>
            </tr>
          </thead>
          <tbody>
            {compareRows.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>{row.cursor}</td>
                <td>{row.antigravity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
