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
    paths: {
        "/api/contacts": {
            get: {
                summary: "Listar contatos",
                description: "Retorna a lista de contatos cadastrados, com suporte a busca e filtros por status e origem.",
                parameters: [
                    {
                        name: "search",
                        in: "query",
                        required: false,
                        description: "Searches contacts by name, email, or company.",
                        schema: {
                            type: "string",
                            example: "marcos"
                        }
                    },
                    {
                        name: "status",
                        in: "query",
                        required: false,
                        description: "Filters contacts by status",
                        schema: {
                            type: "string",
                            enum: ["new", "in_contact", "client", "partner", "archived"],
                            example: "client"
                        }
                    },
                    {
                        name: "source",
                        in: "query",
                        required: false,
                        description: "Filter contacts by source",
                        schema: {
                            type: "string",
                            enum: ["linkedin", "whatsapp", "instagram", "referral", "event", "website", "other"],
                            example: "linkedin"
                        }
                    }

                ],
                responses: {
                    200: {
                        description: "Lista de contatos retornada com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Contact"
                                    }
                                }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno do servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                }
            },

            post: {
                summary: "Create contact",
                description: "Creates a new contact.",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CreateContactRequest"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Contact created successfully",
                        content: {
                            "application/json": {
                                schema: { 
                                    $ref: "#/components/schemas/Contact"
                                }
                            }
                        }
                    },
                    400: {
                        description: "Invalid request data",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },

                    500: {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                }
            }
        },

        "/api/contacts/{id}": {
            get: {
                summary: "Select specific contact",
                description: "Return a specific contact using unique Id",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Contact ID.",
                        schema: {
                            type: "integer",
                            example: 8
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Contact returned successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Contact"
                                }
                            }
                        }
                    },

                    404: {
                        description: "Contact not found",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },

                    500: {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                }
            },
            patch: {
                summary: "Update contact",
                description: "Updates an existing contact by ID.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Contact ID.",
                        schema: {
                            type: "integer",
                            example: 8
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UpdateContactRequest"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Contact updated successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Contact"
                                }
                            }
                        }
                    },
                    400: {
                        description: "Invalid request data",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    404: {
                        description: "Contact not found",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    500: {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                sumamry: "Delete contact",
                description: "Deletes an existing contact by ID.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Contact ID.",
                        schema: {
                            type: "integer",
                            example: 8
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Contact deleted successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/DeleteResponse"
                                }
                            }
                        }
                    },
                    404: {
                        description: "Contact not found",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    500: {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/contacts/{id}/interactions": {
            get: {
                summary: "List contact interactions",
                description: "Returns all interactions registered for a specific contact.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Contact ID.",
                        schema: {
                            type: "integer",
                            example: 8
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Contact interactions returned successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/ContactInteraction"
                                    }
                                }
                            }
                        }
                    },
                    500: {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                }
            },
                post: {
                    summary: "Create contact interaction",
                    description: "Creates a new interaction for a specific contact.",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            description: "Contact ID.",
                            schema: {
                                type: "integer",
                                example: 8
                            }
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/CreateInteractionRequest"
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: "Contact interaction created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/ContactInteraction"
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Invalid request data",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/ErrorResponse"
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Internal server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/ErrorResponse"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    components: {
        schemas: {
            ContactStatus: {
                type: "string",
                enum: ["new", "in_contact", "client", "partner", "archived"],
                example: "client"
            },

            ContactSource: {
                type: "string",
                enum: ["linkedin", "whatsapp", "instagram", "referral", "event", "website", "other"],
                example: "linkedin"
            },

            Contact: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        example: 1
                    },
                    name: {
                        type: "string",
                        example: "Marcos Vinicius"
                    },
                    email: {
                        type: "string",
                        nullable: true,
                        example: "marcos@email.com"
                    },
                    phone: {
                        type: "string",
                        nullable: true,
                        example: "11999999999"
                    },
                    company: {
                        type: "string",
                        nullable: true,
                        example: "ContactFlow"
                    },
                    role: {
                        type: "string",
                        nullable: true,
                        example: "Developer"
                    },
                    source: {
                        $ref: "#/components/schemas/ContactSource"
                    },
                    status: {
                        $ref: "#/components/schemas/ContactStatus"
                    },
                    notes: {
                        type: "string",
                        nullable: true,
                        example: "Potential client from LinkedIn."
                    },
                    created_at: {
                        type: "string",
                        format: "date-time",
                        example: "2026-07-18T21:39:14.065Z"
                    },
                    updated_at: {
                        type: "string",
                        format: "date-time",
                        example: "2026-07-18T21:39:14.065Z"
                    }
                }
            },

            ErrorResponse: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "Internal server error"
                    }
                }
            },

            CreateContactRequest: {
                type: "object",
                required: ["name"],
                properties: {
                    name: {
                        type: "string",
                        example: "Marcos Vinicius"
                    },
                    email: {
                        type: "string",
                        nullable: true,
                        example: "marcos@email.com"
                    },
                    phone: {
                        type: "string",
                        nullable: true,
                        example: "11999999999"
                    },
                    company: {
                        type: "string",
                        nullable: true,
                        example: "ContactFlow"
                    },
                    role: {
                        type: "string",
                        nullable: true,
                        example: "Developer"
                    },
                    source: {
                        $ref: "#/components/schemas/ContactSource"
                    },
                    status: {
                        $ref: "#/components/schemas/ContactStatus"
                    },
                    notes: {
                        type: "string",
                        nullable: true,
                        example: "Potential client from LinkedIn."
                    }

                }
            },

            UpdateContactRequest: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        example: "Marcos Vinicius Updated"
                    },
                    email: {
                        type: "string",
                        nullable: true,
                        example: "updated@email.com"
                    },
                    phone: {
                        type: "string",
                        nullable: true,
                        example: "11988888888",
                    },
                    company: {
                        type: "string",
                        nullable: true,
                        example: "Updated Company"
                    },
                    role: {
                        type: "string",
                        nullable: true,
                        example: "Full Stack Developer"
                    },
                    source: {
                        $ref: "#/components/schemas/ContactSource"
                    },
                    status: {
                        $ref: "#/components/schemas/ContactStatus"
                    },
                    notes: {
                        type: "string",
                        nullable: true,
                        example: "Updated notes."
                    }
                }
            },

            DeleteResponse: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "Contact deleted succesfully"
                    }
                }
            },

            ContactInteraction: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        example: 1
                    },
                    contact_id: {
                        type: "integer",
                        example: 8
                    },
                    content: {
                        type: "string",
                        example: "Followed up with the contact through WhatsApp."
                    },
                    created_at: {
                        type: "string",
                        format: "data-time",
                        example: "2026-07-18T21:39:14.065Z"
                    }
                }
            },

            CreateInteractionRequest: {
                type: "object",
                required: ["content"],
                properties: {
                    content: {
                        type: "string",
                        example: "Followed up with the contact through WhatsApp."
                    }
                }
            }
        }
    }
}

export default openApiDocument