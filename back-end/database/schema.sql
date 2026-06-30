CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    company TEXT,
    role TEXT,
    source TEXT NOT NULL DEFAULT 'other',
    status TEXT NOT NULL DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CHECK (source IN (
        'linkedin',
        'whatsapp',
        'instagram',
        'referral',
        'event',
        'website',
        'other'
    )),

    CHECK (status IN (
        'new',
        'in_contact',
        'client',
        'partner',
        'archived'
    ))
);

CREATE TABLE IF NOT EXISTS contact_interactions (
    id SERIAL PRIMARY KEY,
    contact_id INTEGER NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);