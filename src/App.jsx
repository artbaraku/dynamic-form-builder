import React, { useState } from "react";
import "./App.css";
import { useForm, Controller } from "react-hook-form";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const formFields = [
  { id: 1, type: "text", label: "Text Input" },
  { id: 2, type: "select", label: "Select" },
  { id: 3, type: "radio", label: "Radio Button" },
  { id: 4, type: "checkbox", label: "Checkbox" },
  { id: 5, type: "date", label: "Date Picker" },
];

const DraggableElement = ({ field }) => {
  const [, drag] = useDrag(() => ({
    type: "FORM_ELEMENT",
    item: { field },
  }));

  return (
    <div ref={drag} className="draggable-element">
      {field.label}
    </div>
  );
};

const FormCanvas = ({ formElements, setFormElements, control }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FORM_ELEMENT",
    drop: (item) => {
      setFormElements((prevElements) => [...prevElements, item.field]);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="form-canvas"
      style={{
        backgroundColor: isOver ? "#f0f0f0" : "#fff",
        minHeight: "300px",
        border: "2px dashed #000",
        padding: "10px",
      }}
    >
      <h4>Drop Form Elements Here</h4>

      {formElements.map((element, index) => {
        return (
          <div key={index} className="form-group">
            <label>{element.label}</label>
            <Controller
              name={element.type + index}
              control={control}
              defaultValue=""
              render={({ field }) => {
                switch (element.type) {
                  case "text":
                    return <input {...field} type="text" />;
                  case "select":
                    return (
                      <select {...field}>
                        <option value="">Select</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                      </select>
                    );
                  case "radio":
                    return (
                      <>
                        <input
                          {...field}
                          type="radio"
                          value="Yes"
                          checked={field.value === "Yes"}
                        />{" "}
                        Yes
                        <input
                          {...field}
                          type="radio"
                          value="No"
                          checked={field.value === "No"}
                        />{" "}
                        No
                      </>
                    );
                  case "checkbox":
                    return (
                      <input
                        {...field}
                        type="checkbox"
                        checked={!!field.value}
                      />
                    );
                  case "date":
                    return <input {...field} type="date" />;
                  default:
                    return null;
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const App = () => {
  const { control, handleSubmit } = useForm();
  const [formElements, setFormElements] = useState([]);
  const [formConfig, setFormConfig] = useState([]);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const saveForm = () => {
    const config = formElements.map((element) => ({
      type: element.type,
      name: element.type + Math.random(),
      rules: {
        required: true,
      },
    }));
    setFormConfig(config);
    console.log("Saved Form Configuration:", JSON.stringify(config, null, 2));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h2>Dynamic Form Builder</h2>
        <div className="builder-container">
          <div className="sidebar">
            <h4>Form Elements</h4>
            {formFields.map((field) => (
              <DraggableElement key={field.id} field={field} />
            ))}
          </div>

          <FormCanvas
            formElements={formElements}
            setFormElements={setFormElements}
            control={control}
          />

          <form onSubmit={handleSubmit(onSubmit)} className="form-preview">
            <h4>Generated Form</h4>

            <button className="submit-btn" type="submit">
              Submit Form
            </button>
          </form>
        </div>

        <button onClick={saveForm} className="save-button">
          Save Form as JSON
        </button>
      </div>
    </DndProvider>
  );
};

export default App;
