import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
      <p style={{ marginBottom: '2rem' }}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/" style={{
        color: '#0070f3',
        textDecoration: 'none',
        fontSize: '1.2rem',
        border: '1px solid #0070f3',
        padding: '0.5rem 1rem',
        borderRadius: '5px'
      }}>
        Go back home
      </Link>
    </div>
  );
}
