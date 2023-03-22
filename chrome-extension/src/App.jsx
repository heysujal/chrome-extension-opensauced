import './App.css'


function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img style={{width:'70%'}} src="https://raw.githubusercontent.com/open-sauced/assets/main/logos/logo-on-dark.png" alt="open-sauces-logo" />
        <h3>Welcome to OpenSauced Craftwork Browser Extension</h3>
        <p>OpenSauced is a community of open source contributors </p>
        <button style={loginWithOpenSaucedBtn}>Login with OpenSauced</button>
      </div>
    </div>
  )
}

export default App

const loginWithOpenSaucedBtn = {
  width: '70%',
  background: 'linear-gradient(-60deg, #ff5858 0%, #f09819 100%)',
  color: 'white',
  border: 'none', 
  padding: '10px 20px',
  borderRadius: '5px',
  marginTop: '10px',
  cursor: 'pointer',
  fontSize: '16px', 
  fontWeight: '500',

}