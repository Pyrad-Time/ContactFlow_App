/*
openapi
→ versão da especificação OpenAPI

info
→ informações da sua API

servers
→ onde sua API roda

paths
→ endpoints documentados

components
→ schemas reutilizáveis

 */

const openApiDocument = {
    openapi: "3.0.0",
    info: {
        title: "ContactFlow API",
        version: "1.0.0",
        description: "API para gerenciamento de contatos, interaçções e dashboard do ContactFlow."
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Servidor local"
        }
    ],
    paths: {},
    components: {
        schemas: {}
    }
}

export default openApiDocument