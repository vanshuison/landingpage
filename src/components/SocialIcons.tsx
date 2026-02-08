import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import "./styles/SocialIcons.css";

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/whoovanshu" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="www.linkedin.com/in/vansh-patel-301413397"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://x.com/whoovansh" target="_blank" rel="noreferrer">
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a href="https://www.instagram.com/whoovansh" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
        </span>
      </div>
    </div>
  );
};

export default SocialIcons;
