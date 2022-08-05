export default function waitingComponent (props) {
  return (
    <div style={{
      position: "fixed",
      width: "100%",
      height: "100%",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: "rgba(13, 13, 13, 0.88)",
      borderRadius: '1rem',
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}> 
      <p style={{
        padding: "1.2rem",
        backgroundColor: "#ff0000",
        borderRadius: "5px",
        width: '100%',
        color: "#ffffff",
        fontSize: "1.1rem",  
        textAlign: 'center'      
      }}>
        {props}
      </p>
    </div>
  )
}