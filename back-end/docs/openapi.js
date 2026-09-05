const openApiDocument = {
    openapi: "3.0.0",
    info: {
        title: "ContactFlow API",
        version: "1.0.1",
        description: "API for managing contacts, interactions, and dashboard data in ContactFlow."
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Local server"
        }
    ],
    paths: {
        "/api/contacts": {
            get: {
                summary: "List contacts",
                description: "Returns the list of registered contacts, with support for search and filters by status and source.",
                parameters: [
                    {
                        name: "search",
                        in: "query",
                        required: false,
                        description: "Searches contacts by name, email, or company.",
                        schema: {
                            type: "string",
                            example: "ana"
                        }
                    },
                    {
                        name: "status",
                        in: "query",
                        required: false,
                        description: "Filters contacts by status.",
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
                        description: "Filters contacts by source.",
                        schema: {
                            type: "string",
                            enum: ["linkedin", "whatsapp", "instagram", "referral", "event", "website", "other"],
                            example: "linkedin"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Contacts returned successfully",
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
                summary: "Get contact by ID",
                description: "Returns a specific contact by ID.",
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
                summary: "Delete contact",
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
        },

        "/api/contacts/{id}/interactions/{interactionId}": {
            delete: {
                summary: "Delete contact interaction",
                description: "Deletes a specific interaction from a contact.",
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
                    },
                    {
                        name: "interactionId",
                        in: "path",
                        required: true,
                        description: "Interaction ID.",
                        schema: {
                            type: "integer",
                            example: 21
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Interaction deleted successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/DeleteResponse"
                                }
                            }
                        }
                    },
                    404: {
                        description: "Interaction not found",
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

        "/api/dashboard": {
            get: {
                summary: "Get dashboard data",
                description: "Returns dashboard metrics including total contacts, contacts by status, contacts by source, total interactions, latest contacts, and latest interactions.",
                responses: {
                    200: {
                        description: "Dashboard data returned successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/DashboardResponse"
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
                        example: "Ana Souza"
                    },
                    email: {
                        type: "string",
                        nullable: true,
                        example: "ana.souza@example.com"
                    },
                    phone: {
                        type: "string",
                        nullable: true,
                        example: "(11) 90000-1001"
                    },
                    company: {
                        type: "string",
                        nullable: true,
                        example: "NovaPay"
                    },
                    role: {
                        type: "string",
                        nullable: true,
                        example: "HR Analyst"
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
                        example: "Interested in a dashboard solution for candidate tracking."
                    },
                    created_at: {
                        type: "string",
                        format: "date-time",
                        example: "2026-09-05T00:19:00.000Z"
                    },
                    updated_at: {
                        type: "string",
                        format: "date-time",
                        example: "2026-09-05T01:19:00.000Z"
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
                        example: "Ana Souza"
                    },
                    email: {
                        type: "string",
                        nullable: true,
                        example: "ana.souza@example.com"
                    },
                    phone: {
                        type: "string",
                        nullable: true,
                        example: "(11) 90000-1001"
                    },
                    company: {
                        type: "string",
                        nullable: true,
                        example: "NovaPay"
                    },
                    role: {
                        type: "string",
                        nullable: true,
                        example: "HR Analyst"
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
                        example: "Interested in a dashboard solution for candidate tracking."
                    }
                }
            },

            UpdateContactRequest: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        example: "Ana Souza Updated"
                    },
                    email: {
                        type: "string",
                        nullable: true,
                        example: "ana.updated@example.com"
                    },
                    phone: {
                        type: "string",
                        nullable: true,
                        example: "(11) 90000-2001"
                    },
                    company: {
                        type: "string",
                        nullable: true,
                        example: "NovaPay"
                    },
                    role: {
                        type: "string",
                        nullable: true,
                        example: "People Operations Manager"
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
                        example: "Updated contact notes."
                    }
                }
            },

            DeleteResponse: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "Resource deleted successfully"
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
                        format: "date-time",
                        example: "2026-09-05T01:23:00.000Z"
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
            },

            DashboardStatusItem: {
                type: "object",
                properties: {
                    status: {
                        $ref: "#/components/schemas/ContactStatus"
                    },
                    total: {
                        type: "integer",
                        example: 4
                    }
                }
            },

            DashboardSourceItem: {
                type: "object",
                properties: {
                    source: {
                        $ref: "#/components/schemas/ContactSource"
                    },
                    total: {
                        type: "integer",
                        example: 3
                    }
                }
            },

            LatestInteraction: {
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
                    contact_name: {
                        type: "string",
                        example: "Ana Souza"
                    },
                    content: {
                        type: "string",
                        example: "Followed up with the contact through WhatsApp."
                    },
                    created_at: {
                        type: "string",
                        format: "date-time",
                        example: "2026-09-05T01:23:00.000Z"
                    }
                }
            },

            DashboardResponse: {
                type: "object",
                properties: {
                    totalContacts: {
                        type: "integer",
                        example: 17
                    },
                    contactByStatus: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/DashboardStatusItem"
                        }
                    },
                    contactBySource: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/DashboardSourceItem"
                        }
                    },
                    totalInteractions: {
                        type: "integer",
                        example: 25
                    },
                    latestedContacts: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Contact"
                        }
                    },
                    latestedInteractions: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/LatestInteraction"
                        }
                    }
                }
            }
        }
    }
}

export default openApiDocument