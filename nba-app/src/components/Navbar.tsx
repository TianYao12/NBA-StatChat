import Link from "next/link";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

function Navbar() {

  return (
    <div className="outside">
      <div className="header">
        <Link href="/" className="link">
          <img src="/nbalogo.png"></img>
        </Link>
        <ul className="main-nav">
          <li>
            <Link href="/" className="link">News</Link>
          </li>
          <li>
            <Link href="/teams" className="link">Teams</Link>
          </li>
          <li>
            <Link href="/players" className="link">Search for Player</Link>
          </li>
          <li>
            <Link href="/chat_page" className="link">Chat</Link>
          </li>
          <li>
            <Link href="/upload" className="link">Upload</Link>
          </li>
        </ul>
          {/* <Link href="/" onClick={handleTranslation} className="translate">
            <strong>{t("translate")}</strong>
          </Link> */}
          <button className="signout" onClick={() => signOut()}>
            <FaSignOutAlt  />
          </button>
      </div>
    </div>
  );
}

export default Navbar;
