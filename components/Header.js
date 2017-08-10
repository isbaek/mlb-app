import Link from 'next/link';

function Header() {
  return (
    <div className="Header" prefetch>
      <Link href="/">
        <img className="HeaderLogo" src="/static/mlb_logo_short.png" />
      </Link>
    </div>
  );
}

export default Header;
