import React, { useEffect, useState } from "react";
import "../App.css";
import gripVertical from "../assets/grip-vertical.svg";
import Modal from "../Components/Modal";

const MiniPageBuilder = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);
  const [coordinates, setCoordinates] = useState({
    clientX: "",
    clientY: "",
    mode: "",
    type: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);


  const handleDragStart = (event, type, index = "") => {
    event.target.classList.add("dragging"); 
    const boundingRect = event.target.getBoundingClientRect(); 

    const offsetX = event.clientX - boundingRect.left;
    const offsetY = event.clientY - boundingRect.top;
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ type, index, offsetX, offsetY }) 
    );
  };

  const handleDragEnd = (event) => {
    event.target.classList.remove("dragging"); 
  };


  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain"); 
    const { type, index, offsetX, offsetY } = JSON.parse(data); 
    const { clientX, clientY } = event; 

    const updatedComponents = [...components];


    if (updatedComponents[index]) {
      updatedComponents[index] = {
        ...updatedComponents[index],
        type,
        clientX: clientX - offsetX,
        clientY: clientY - offsetY,
      };
      setComponents(updatedComponents); 
      saveToLocalStorage(updatedComponents); 
      return;
    }

    setCoordinates({
      ...coordinates,
      clientX: clientX - offsetX,
      clientY: clientY - offsetY + 20, 
      mode: "",
      type,
    });
    setIsOpen(true); 
  };


  const handleSelect = (index) => {
    setSelectedComponentIndex(index);
  };


  const handleSaveChanges = (inputValues, mode, index) => {
    const updatedComponents = [...components];
    if (mode == "edit") {
  
      if (updatedComponents[index]) {
        updatedComponents[index] = {
          ...updatedComponents[index],
          ...inputValues,
          clientX: inputValues.clientX,
          clientY: inputValues.clientY,
        };
        setComponents(updatedComponents); 
        saveToLocalStorage(updatedComponents);
      }
    } else {
  
      updatedComponents.push({
        type: coordinates.type,
        clientX: inputValues.clientX,
        clientY: inputValues.clientY,
        text: inputValues.text,
        fontSize: inputValues.fontSize,
        fontWeight: inputValues.fontWeight,
      });
      setComponents(updatedComponents); 
      saveToLocalStorage(updatedComponents); 
        }
    setIsOpen(false);
  };


  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleKeyPress = (event) => {
    debugger;
    
    if (event.key === "Enter") {
      event.preventDefault();
      setCoordinates({ ...coordinates, mode: "edit" });
      setIsOpen(true);
    } 
    else if (event.key === "Backspace" && !focused) {
      event.preventDefault();
      let x = components.filter((_, index) => index !== selectedComponentIndex);
      setComponents(x);
      saveToLocalStorage(x);
    }
  };


  const saveToLocalStorage = (updatedComponents) => {
    localStorage.setItem("components", JSON.stringify(updatedComponents));
  };
 
  useEffect(() => {
    setSelectedComponentIndex(null);
  }, [components.length]);


  useEffect(() => {
    const storedComponents = JSON.parse(localStorage.getItem("components"));
    if (storedComponents) {
      setComponents(storedComponents);
    }
  }, []);

  const handleExport = () => {
    const jsonData = JSON.stringify(components);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pageBuilderConfiguration.json";
    link.click();
  };


  const handleChange = (event, index) => {
    const updatedComponents = [...components];
    if (updatedComponents[index]) {
      updatedComponents[index] = {
        ...updatedComponents[index],
        [event.target.name]: event.target.value,
      };
      setComponents(updatedComponents);
      saveToLocalStorage(updatedComponents);
    }
  };

  return (
    <div>
      <div
        className="pageBuilderContainer"
        tabIndex={0}
        onKeyDown={(e) => handleKeyPress(e)}
      >
    
        <div
          className="blankContainer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          >
   
          {components.map((component, index) => (
            <div
              draggable
              key={index}
              onDragStart={(e) => handleDragStart(e, component.type, index)}
              onDragEnd={handleDragEnd}
              onClick={() => handleSelect(index)}
              style={{
                left: component.clientX + "px",
                top: component.clientY + "px",
                fontSize: component.fontSize + "px" || "auto",
                fontWeight: component.fontWeight || "auto",
                position: "absolute",
                width: component?.type == "Input" ? "20%" : "auto",
              }}
              className={`draggableElem component_${
                selectedComponentIndex === index ? "selected" : ""
              }`}
            >
              {component?.type === "Label" ? (
                component?.text || component?.type
              ) : component?.type === "Input" ? (
                <input
                  type="text"
                  name="text"
                  value={component?.text}
                  onChange={(event) => handleChange(event, index)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              ) : (
                <button>{component?.text || component?.type}</button>
              )}
            </div>
          ))}
        </div>
    
        <div className="sidebarContainer">
          <div>
            <h3>Blocks</h3>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, "Label")}
              onDragEnd={handleDragEnd}
            >
              <img
                src={gripVertical}
                alt="Grip Vertical Image"
                className="verticalGripImg"
              />
              <p>Label</p>
            </div>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, "Input")}
              onDragEnd={handleDragEnd}
            >
              <img
                src={gripVertical}
                alt="Grip Vertical Image"
                className="verticalGripImg"
              />
              <p>Input</p>
            </div>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, "Button")}
              onDragEnd={handleDragEnd}
            >
              <img
                src={gripVertical}
                alt="Grip Vertical Image"
                className="verticalGripImg"
              />
              <p>Button</p>
            </div>
             <div className="configBtn">
               <button onClick={handleExport}>Json Data Downlode</button>
             </div>
          </div>
          
          
        </div>
        
      </div>
      {/* rendering modal */}
      <Modal
        handleSaveChanges={handleSaveChanges}
        handleCloseModal={handleCloseModal}
        isOpen={isOpen}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        components={components}
        selectedComponentIndex={selectedComponentIndex}
      />
    </div>
  );
};

export default MiniPageBuilder;
