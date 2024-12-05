import React, { useEffect, useState } from "react";
import LegoPart from "../lego-part/LegoPart";

const conditionMap = {
  any: 0,
  new: 1,
  used: 2,
};

function TempComponent() {
  const [currentListId, setCurrentListId] = useState("FirstList");
  const [currentList, setCurrentList] = useState({});

  useEffect(() => {
    let retrievedList = localStorage.getItem("FirstList");
    if (!retrievedList) {
      createDefaultList();
      setCurrentListId("FirstList");
    }
  }, []);

  useEffect(() => {
    let retrievedList = localStorage.getItem(currentListId);
    if (retrievedList) {
      setCurrentList(JSON.parse(retrievedList));
    } else {
      console.log("No list found for", currentListId);
      setCurrentList({});
    }
  }, [currentListId]);

  function createDefaultList() {
    let defaultList = {
      FirstList: {
        listName: "First List",
        items: {},
      },
    };
    localStorage.setItem("FirstList", JSON.stringify(defaultList["FirstList"]));
  }

  function handleListChange(event) {
    setCurrentListId(event.partId);

    let retrievedList = localStorage.getItem(event.partId);
    if (retrievedList) {
      setCurrentList(JSON.parse(retrievedList));
    } else {
      console.log("No list found for", event.partId);
      setCurrentList({});
    }
  }

  function addToList(
    partId,
    partTitle,
    colorName,
    colorHex,
    condition,
    quantity,
    colorId
  ) {
    let newIdBase = partId + colorId + conditionMap[condition];
    let newId = newIdBase;
    let suffix = 0;

    while (currentList.items[newId] !== undefined) {
      suffix++;
      newId = `${newIdBase}_${suffix}`;
    }

    let listAddition = {
      [newId]: {
        partId: partId,
        partTitle: partTitle,
        quantity: quantity,
        color: {
          colorName: colorName,
          colorHex: colorHex,
        },
        condition: condition,
      },
    };
    currentList.items = { ...currentList.items, ...listAddition };
    console.log(currentList);
    localStorage.setItem(currentListId, JSON.stringify(currentList));
  }

  return (
    <LegoPart
      partIdInput={"003402"}
      partTitleInput={"Sticker Sheet for Sets 310-3, 311-1, 312-3"}
      addToList={addToList}
    />
  );
}

export default TempComponent;
