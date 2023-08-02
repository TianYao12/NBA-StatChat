import Link from "next/link";
function Navbar() {
  return (
    <div className="outside">
      <div className="header">
        <Link href="/" className="link">
          <img src="/nbalogo.png"></img>
        </Link>
        <ul className="main-nav">
          <li>
            <Link href="/" className="link">
              News
            </Link>
          </li>
          <li>
            <Link href="/teams" className="link">
              Teams{" "}
            </Link>
          </li>
          <li>
            <Link href="/players" className="link">
              Players
            </Link>
          </li>
          <li>
            <a href="/compare.js" className="link">
              Compare
            </a>
          </li>
          <li>
            <a href="/fantasyteam.js" className="link">
              Fantasy Team
            </a>
          </li>
        </ul>
        <div className="signin">
          <a href="../signin.js">
            <img src="/signin.png" alt="Sign In" />
          </a>
          <div className="message">Sign in</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
