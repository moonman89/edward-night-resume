import { useMemo, useState } from "react";
import {
  calculateRoi,
  formatCurrency,
  formatNumber,
  roiDefaults,
  roiDisclaimer,
} from "../data/roi";

export function RoiSection() {
  const [teamSize, setTeamSize] = useState(roiDefaults.teamSize);
  const [hourlyCost, setHourlyCost] = useState(roiDefaults.hourlyCost);
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(
    roiDefaults.hoursSavedPerWeek,
  );
  const [monthlyCostPerSeat, setMonthlyCostPerSeat] = useState(
    roiDefaults.monthlyCostPerSeat,
  );

  const result = useMemo(
    () =>
      calculateRoi(
        teamSize,
        hourlyCost,
        hoursSavedPerWeek,
        monthlyCostPerSeat,
      ),
    [teamSize, hourlyCost, hoursSavedPerWeek, monthlyCostPerSeat],
  );

  return (
    <section id="roi" className="section">
      <p className="section-label">03 — ROI</p>
      <h2 className="section-title">Return on investment</h2>
      <p className="section-subtitle">
        Estimate the monthly value of AI tooling against subscription cost.
        Adjust the inputs to match your team.
      </p>
      <div className="roi-grid">
        <div className="roi-inputs">
          <div className="roi-field">
            <label htmlFor="team-size">Team size (developers)</label>
            <input
              id="team-size"
              type="number"
              min={1}
              max={500}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value) || 1)}
            />
          </div>
          <div className="roi-field">
            <label htmlFor="hourly-cost">Avg hourly cost ($)</label>
            <input
              id="hourly-cost"
              type="number"
              min={1}
              max={500}
              value={hourlyCost}
              onChange={(e) => setHourlyCost(Number(e.target.value) || 1)}
            />
          </div>
          <div className="roi-field">
            <label htmlFor="hours-saved">Hours saved per dev / week</label>
            <input
              id="hours-saved"
              type="number"
              min={0}
              max={40}
              step={0.5}
              value={hoursSavedPerWeek}
              onChange={(e) =>
                setHoursSavedPerWeek(Number(e.target.value) || 0)
              }
            />
          </div>
          <div className="roi-field">
            <label htmlFor="monthly-cost">Monthly tool cost per seat ($)</label>
            <input
              id="monthly-cost"
              type="number"
              min={0}
              max={500}
              value={monthlyCostPerSeat}
              onChange={(e) =>
                setMonthlyCostPerSeat(Number(e.target.value) || 0)
              }
            />
          </div>
        </div>
        <div className="roi-results">
          <div className="roi-result-row">
            <span className="roi-result-label">Monthly tool cost</span>
            <span className="roi-result-value">
              {formatCurrency(result.monthlyToolCost)}
            </span>
          </div>
          <div className="roi-result-row">
            <span className="roi-result-label">Hours saved / month</span>
            <span className="roi-result-value">
              {formatNumber(result.monthlyHoursSaved, 0)} hrs
            </span>
          </div>
          <div className="roi-result-row">
            <span className="roi-result-label">Value of time saved</span>
            <span className="roi-result-value">
              {formatCurrency(result.monthlyValueSaved)}
            </span>
          </div>
          <div className="roi-result-row">
            <span className="roi-result-label">Net ROI / month</span>
            <span
              className={`roi-result-value highlight ${result.netRoi >= 0 ? "positive" : ""}`}
            >
              {formatCurrency(result.netRoi)}
            </span>
          </div>
          <div className="roi-result-row">
            <span className="roi-result-label">ROI multiple</span>
            <span className="roi-result-value">
              {formatNumber(result.roiMultiple)}×
            </span>
          </div>
          <div className="roi-result-row">
            <span className="roi-result-label">Payback per dev</span>
            <span className="roi-result-value">
              {formatNumber(result.hoursToPayback, 1)} hrs / month
            </span>
          </div>
        </div>
      </div>
      <p className="roi-disclaimer">{roiDisclaimer}</p>
    </section>
  );
}
