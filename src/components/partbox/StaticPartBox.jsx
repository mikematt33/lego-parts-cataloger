import React, {useState} from 'react';

const StaticPartBox = ({initPartNum, initPartName}) => {
  // local variables
  const [partNum, setPartNum] = useState(initPartNum);
  const [partName, setPartName] = useState(initPartName);

  const [imgPath, setImgPath] = useState(`/public/images/${partNum}.png`);
  const defaultImg  = '/public/images/default.png';

  // function to handle image error (probably a missing image)
  const handleImgError = () => {
    setImgPath(defaultImg);
  };

  return (
    <div className="staticpartbox">
      <div className="staticpartboximg">
        <img src={imgPath} alt={`${partName} - Part Image`} onError={handleImgError}/>
      </div>
          
      <div className="staticpartboxdescription"> 
        <p>{partName}</p>
        <p>{partNum}</p>
      </div>
    </div>
  );
}

export default StaticPartBox;