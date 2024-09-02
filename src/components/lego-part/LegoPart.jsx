import React, { useEffect, useState } from "react";

import "./lego-part.css";

const LegoPart = () => {
  const [partId, setPartId] = useState(null);
  const [partTitle, setPartTitle] = useState(null);

  useEffect(() => {
    setPartId(12345678);
    setPartTitle("Lego Module Title Example ");
  }, []);

  return (
    <div className="lego-part-background">
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F347394.jpg&f=1&nofb=1&ipt=53af06f774be36b82ea2ec0fa23ff03f89bccf28e3192fc032405e913d905fee&ipo=images"
        alt="lego img"
        className="lego-part-img"
      />
      <p className="lego-part-id">ID: {partId}</p>
      <p className="lego-part-title">{partTitle}</p>
      <div className="lego-part-vars-background">
        <div className="lego-part-var">
          <label for="lego-quantity">Quantity: </label>
          <input
            className="lego-part-input-box"
            id="lego-quantity"
            type="text"
          />
        </div>
      </div>
      <button className="lego-part-button">Add to List</button>
    </div>
  );
};

export default LegoPart;
