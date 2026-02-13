export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#c4ff0d',
      fontFamily: 'monospace'
    }}>
      <h2>[SYSTEM] 404 - SECTOR NOT FOUND</h2>
      <p>The requested relay does not exist_</p>
      <a href="/" style={{ 
        marginTop: '2rem', 
        color: '#00d9ff', 
        textDecoration: 'none',
        border: '1px solid #00d9ff',
        padding: '0.5rem 1rem'
      }}>RETURN TO HUB</a>
    </div>
  )
}
