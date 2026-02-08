import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Financial Foundations</h4>
                <h5>Developing awareness</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
             Understanding money flow, savings, and spending behavior.
             Learning financial discipline and basic budgeting.
             Developing awareness of risk and financial responsibility.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Financial Thinking</h4>
                <h5>& Decision-Making</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
             Evaluating financial choices with a long-term mindset.
             Understanding risk vs reward in real-world scenarios.
             Improving planning, prioritization, and financial judgment.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Financial Strategy</h4>
                <h5>& Growth</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Thinking in terms of sustainability and long-term value.
              Understanding structured financial systems and governance.
              Strengthening strategic thinking around money and growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
