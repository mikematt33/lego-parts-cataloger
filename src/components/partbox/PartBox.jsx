import React, {useState} from 'react';

const PartBox = ({initPartNum, initPartName, initPartColor, initQty, initQual, onUpdate}) => {
  // local variables
  const [partNum, setPartNum] = useState(initPartNum);
  const [partName, setPartName] = useState(initPartName);
  const [partColor, setPartColor] = useState(initPartColor);
  const [partQty, setPartQty] = useState(initQty);
  const [partQual, setPartQual] = useState(initQual);

  const [imgPath, setImgPath] = useState(`/public/images/${partNum}.png`);
  const defaultImg  = '/public/images/default.png';

  // function to handle image error (probably a missing image)
  const handleImgError = () => {
    setImgPath(defaultImg);
  };

  const handleQtyUpdate = (e) => {
    setPartQty(e.target.value);
  };

  const handleQualUpdate = (e) => {
    setPartQual(e.target.value);
  };

  const handleColorUpdate = (e) => {
    setPartColor(e.target.value);
  };

  // update the component when its values change (use this after an update)
  useEffect(() => {
    if (onUpdate) {
      onUpdate({
        partQty,
        partQual,
        partColor,
      });
    }
  }, [partQty, partQual]);

  return (
    <div className="partbox">
      <div className="partboximg">
        <img src={imgPath} alt={partName} onError={handleImgError}/>
      </div>
          
      <div className="partboxdescription"> 
        <p>{partName}</p>
        <p>{partNum}</p>
      </div>
        
      <div className="partboxvars">
        <input type="number" name="partQty" value={partQty} onChange={handleQtyUpdate}/>
      </div>
    </div>
  );
}

export default PartBox;