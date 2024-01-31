# VinUni Launchpad Frontend

## Environment Setup

1. Install [node.js](https://nodejs.org/)
2. Install vite 4.4.5 or higher <code>npm install vite</code>

Required dependencies:
```json
"dependencies": {
  "axios": "^1.6.5",
  "bootstrap": "^5.3.2",
  "react": "^18.2.0",
  "react-beautiful-dnd": "^13.1.1",
  "react-bootstrap": "^2.9.1",
  "react-dnd": "^16.0.1",
  "react-dnd-html5-backend": "^16.0.1",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.1"
}
```

## How to start the repo

1. Clone the [backend repo](https://github.com/AmbiakaTT/vseven_backend) to your computer
2. Setup the backend repo
3. Start the backend
4. Clone the this repo to your computer
5. Open the repo directory in your terminal
6. Type <code>npm run dev</code> to start front end
7. Access website via <code>localhost:8080</code> via browser

## Developer Workflow

1. Read user story
2. Discuss details with project manager
3. Implementation
4. Testing
5. Fix any bugs

## Codebase Structure
- ./src/assets - stores assets
- ./src/css - stores css files
- ./src/json - stores data about sections and links (temporary only, will be replaced by backend)

- ./src/Api.ts - api handler class

- ./src/App.ts - outermost component and route manager

- ./src/Launchpad.tsx - main launchpad page
- ./src/Admin.tsx - admin variant of Launchpad

- ./src/Header.tsx - header component
- ./src/Login.tsx - login component
- ./src/LaunchpadEdit.tsx - save/load component
- ./src/QuickLinks.tsx - bookmarked links component
- ./src/About.tsx - about/footer component
 
- ./src/Link.tsx - default link componenent
- ./src/LinkDraggable.tsx - drag and drop link variant, for customized page
- ./src/SectionDefault.tsx -  default section component
- ./src/SectionContainer.tsx - drag and drop section variant
- ./src/SectionLinks.tsx - link generator component for SectionContainer

Admin:
- ./src/LinkDraggableAdmin.tsx - admin variant of LinkDraggable
- ./src/LinkAdd.tsx - link add form
- ./src/LinkEdit.tsx - link edit form
- ./src/SectionContainerAdmin.tsx - admin variant of SectionContainer
- ./src/SectionLinksAdmin.tsx - admin variant of SectionLinks
- ./src/SectionAdd.tsx - section add form
- ./src/SectionEdit.tsx - section edit form


Depreciated:
- ./src/LinkJson.tsx - json link variant, replaced by Link and LinkDraggable
