
## ⭐ Features

- Drag and Drop elements from sidebar to board
- Edit element configuration
- Delete element from board
- Element position can be changed by dragging it across the board
- Board Elements state stored on Local Storage to persist state across page refresh

## 💻 Tech / Libraries

- [React](https://reactjs.org/)
- [react-draggable](https://github.com/react-grid-layout/react-draggable) (dragging elements within the board)
- [react-drag-drop-container](https://github.com/peterh32/react-drag-drop-container) (dragging elements from sidebar to board)
- [uuid](https://github.com/uuidjs/uuid) (generating unique ID for each element)
- [Iconify](https://www.npmjs.com/package/@iconify/react-with-api) (icons)

## 🕹 Usage

1. Drag and Drop Elements from Sidebar to the Board.

1. Drag the Elements on the board to change their position.

1. Click on an element on the board to select it.

1. Pressing `Delete` on keyboard will delete the element from the board.

1. Pressing `Enter` on keyboard will open a modal where you can edit element configurations.

1. Edit Element configurations (Text, X, Y, Font Size, Font Weight) and click `Save Changes` to update element state.

   ![Screenshot2](https://user-images.githubusercontent.com/8324407/115888757-e928f500-a470-11eb-9e21-109c530bbfc5.PNG)


## 🔧 Local Environment Setup

1. Install [Node.js](https://nodejs.org/en/)
1. Install project dependencies
   ```bash
   npm install
   ```
1. Launch live server
   ```bash
   npm run start
   ```

