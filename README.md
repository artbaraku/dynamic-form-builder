# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Dynamic Form Builder

## Description

This project implements a **Dynamic Form Builder** using **React**. The application allows users to drag and drop form elements (such as text input, select, radio button, checkbox, and date picker) into a form canvas to build custom forms. Once the form is built, users can submit the form and save the configuration in JSON format.

### Technologies Used:

- **React.js** for building the user interface.
- **React Hook Form** for managing form state and validation.
- **React DnD** for drag-and-drop functionality.
- **Vite** for fast development and build.

## Features

### 1. Drag and Drop Form Elements:

The form builder provides a sidebar with various form elements that users can drag into a drop zone. The elements include:
- Text Input
- Select Dropdown
- Radio Button
- Checkbox
- Date Picker

### 2. Rendering Dropped Elements in the Form:

Once dropped, the elements are rendered in the drop zone (form canvas), where users can interact with them (e.g., typing into text inputs).

### 3. Form Validation and Submission:

The form utilizes **React Hook Form** to manage form inputs, including validation rules (e.g., required fields). The form can be submitted, and the submitted data is logged in the browser's developer console.

### 4. Saving Form as JSON:

After form elements are added to the canvas, the user can save the form's layout and configuration as a JSON object. The JSON configuration is logged to the console for further use or storage.

## Project Structure

- **`src/App.jsx`**: The main React component that handles the layout, form rendering, and logic for the drag-and-drop functionality.
- **`src/App.css`**: The styling file that defines the visual layout of the form builder, sidebar, form elements, and buttons.
- **`README.md`**: This document explaining the project's functionality and how it was built.

## Components Overview

### 1. DraggableElement

This component is responsible for rendering each individual form element in the sidebar. It uses the **`useDrag`** hook from **React DnD** to make each element draggable.

**Props**:
- `field`: The form field object (e.g., Text Input, Checkbox).

**Drag behavior**:
- When dragged, the element is added to the drop zone (form canvas).

### 2. FormCanvas

This component represents the drop zone where users can drop the form elements. It uses the **`useDrop`** hook from **React DnD** to handle the drop behavior.

**Props**:
- `formElements`: The list of dropped elements in the canvas.
- `setFormElements`: A function to update the `formElements` state.
- `control`: The control object from **React Hook Form** to handle the form inputs.

**Drop behavior**:
- When a form element is dropped, it is added to the `formElements` state.

**Form rendering**:
- Dynamically renders the form elements inside the drop zone and binds them to **React Hook Form**.

### 3. App

The main application component that integrates all the pieces together:
- **Form elements** are defined and rendered in the sidebar.
- **FormCanvas** serves as the drop zone and renders the dropped elements.

Provides two key functionalities:
- **Submit Form**: Submits the form and logs the entered data.
- **Save Form as JSON**: Saves the current form configuration as JSON and logs it to the console.

