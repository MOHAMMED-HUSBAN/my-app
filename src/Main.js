import React from "react";
import initState from "./object"; 

function Main() {
  const cardStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
    gap: "15px",
    padding: "60px ", 
  };

  const cardItemStyles = {
    
    padding: "20px", 
    borderRadius: "12px", 
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
    background: "#D1F2EB", 
    color: "#333333", 
    textDecoration: "none",
    textAlign: "left", 
    minHeight: "230px", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const cardTitleStyles = {
    textAlign: "center",
    fontSize: "1.5rem", 
    fontWeight: "bold",
    marginBottom: "10px", 
  };

  const cardDetailStyles = {
    textAlign: "center",
    fontSize: "1rem", 
    marginBottom: "6px", 
    color: "#555555",
  };

  const moreDetailsStyles = {
    marginTop: "auto", 
    color: "#1ABC9C", 
    fontWeight: "bold", 
    textDecoration: "none",
    alignSelf: "center", 
  };

  return (
    <div>
      <div style={cardStyles}>
        {initState.books.map((element) => (
          <a key={element.isbn} href="#" style={cardItemStyles}>
            <div style={{ marginBottom: "15px" }}>
            </div>
            <div >
              <h3 style={cardTitleStyles}>{element.Title}</h3>
              <h6 style={cardDetailStyles}>Author: {element.author}</h6>
              <h6 style={cardDetailStyles}>ISBN: {element.isbn}</h6>
            </div>
            <h6 style={moreDetailsStyles}>More details</h6>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Main;