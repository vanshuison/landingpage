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
          <a href="https://github.com/udithavithanage" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/uditha-vithanage-06589631b"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://x.com/uditha_2003" target="_blank" rel="noreferrer">
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a href="https://www.instagram.com/uditha_vithanage" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
        </span>
      </div>
    </div>
  );
};

export default SocialIcons;
