I used Runtime Composition. Instead of manually merging schema files every time I added a field in Go or Node, I configured the Gateway to introspect both subgraphs on startup. It stitches them into a single Federated Supergraph, allowing the frontend to treat multiple microservices as a single, unified API.



Service,Port,Database,Role
Inventory,5002,MongoDB,Product Catalog
Bidding,8080,PostgreSQL,High-speed Bidding
Gateway,4000,(N/A),Unified API Entry



I used the node: prefix (e.g., node:http) because it is the modern standard for Node.js built-in modules. It makes it explicitly clear that the module is a built-in Node.js feature and prevents potential naming conflicts with third-party packages installed via NPM.