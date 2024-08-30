import React, {useState} from 'react';

const PartBox = ({initPartnum, initPartname, initPartcolor, initQty, initQual, onUpdate}) => {
  // local variables
  const [partnum, setPartnum] = useState(initPartnum);
  const [partname, setPartname] = useState(initPartname);
  const [partcolor, setPartcolor] = useState(initPartcolor);
  const [partQty, setPartQty] = useState(initQty);
  const [partQual, setPartQual] = useState(initQual);

  const [imgPath, setImgPath] = useState(`/public/images/${partnum}.png`);
  const defaultImg  = '/public/images/default.png';

  // function to handle image error (probably a missing image)
  const handleImgError = () => {
    setImgPath(defaultImg);
  };

  // function to update quantity, quality
  const updatePart = () => {
    // we pass in the desired updates back up for confirmation
    if (onUpdate) {
      onUpdate({
        partQty,
        partQual
      });
    }
  };

  // update the component when its values change (use this after an update)
  useEffect(() => {
    setPartQty(partQty);
    setPartQual(partQual);
  }, [partQty, partQual]);

  return (
    <div className="partbox">
      <div className="partboximg">
        <img src={imgPath} alt={partname} onError={handleImgError}/>
      </div>

      <div className="partboxdescription"> </div>

      <div className="partboxvars"> </div>
    </div>
  );
}

export default PartBox;