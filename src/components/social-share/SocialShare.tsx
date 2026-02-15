import "./SocialShare.css";

import {
  returnFacebookLink,
  returnTwitterLink,
} from "../../utils/social-links";
import { shareLink } from "../../utils/share-link";

const pageUrl = "https://luxexperience-movies.com";

const SocialShare = ({ description }: { description: string }) => {
  return (
    <div className="share-product">
      <p className="share-title">Share this movie</p>

      <div className="share-icons">
        <a
          href={returnFacebookLink(pageUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="share-link facebook"
        >
          <FacebookIcon />
        </a>

        <a
          href={returnTwitterLink(pageUrl, description)}
          target="_blank"
          rel="noopener noreferrer"
          className="share-link twitter"
        >
          <TwitterIcon />
        </a>

        <a
          target="_blank"
          rel="noopener noreferrer"
          className="share-link whatsapp"
        >
          <WhatsappIcon />
        </a>
        <button className="share-toggle" onClick={() => shareLink(description)}>
          <ShareIcon />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default SocialShare;

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.02-4.11A2.99 2.99 0 0018 7.91a3 3 0 10-3-3c0 .24.04.47.09.7L8.07 9.72A3 3 0 006 9a3 3 0 100 6c1.3 0 2.4-.84 2.82-2l7.12 4.18c-.05.2-.08.42-.08.64a3 3 0 103-3z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M22 12.07C22 6.49 17.52 2 12 2S2 6.49 2 12.07C2 17.08 5.66 21.17 10.44 22v-7.02H7.9v-2.91h2.54V9.41c0-2.5 1.48-3.89 3.75-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.77l-.44 2.91h-2.33V22C18.34 21.17 22 17.08 22 12.07z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M18.9 2H22l-6.9 7.88L23 22h-6.6l-5.2-6.8L5.2 22H2l7.4-8.46L1 2h6.6l4.7 6.2L18.9 2z" />
  </svg>
);

const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M20.52 3.48A11.83 11.83 0 0012.01 0C5.37 0 0 5.37 0 12a11.93 11.93 0 001.64 6.03L0 24l6.15-1.61A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 21.82c-1.84 0-3.63-.5-5.2-1.45l-.37-.22-3.65.96.98-3.56-.24-.37A9.8 9.8 0 012.18 12c0-5.42 4.4-9.82 9.82-9.82S21.82 6.58 21.82 12 17.42 21.82 12 21.82zm5.38-7.28c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.17.19-.33.22-.62.07-.29-.15-1.24-.46-2.36-1.47-.87-.77-1.46-1.72-1.63-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.33.43-.49.14-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.1-.23-.56-.47-.48-.64-.49l-.55-.01c-.19 0-.49.07-.75.36-.26.29-1 1-1 2.44 0 1.44 1.02 2.84 1.16 3.04.15.19 2.01 3.07 4.88 4.3.68.29 1.2.46 1.61.59.68.22 1.3.19 1.79.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34z" />
  </svg>
);
