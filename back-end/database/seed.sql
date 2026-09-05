TRUNCATE TABLE contact_interactions, contacts RESTART IDENTITY CASCADE;

INSERT INTO contacts 
(name, email, phone, company, role, source, status, notes)
VALUES
('Ana Souza', 'ana.souza@example.com', '(11) 90000-1001', 'NovaPay', 'HR Analyst', 'linkedin', 'client', 'Interested in a dashboard solution for candidate tracking.'),
('Lucas Pereira', 'lucas.pereira@example.com', '(11) 90000-1002', 'CloudBridge', 'IT Coordinator', 'whatsapp', 'in_contact', 'Asked for a follow-up next week.'),
('Marina Costa', 'marina.costa@example.com', '(11) 90000-1003', 'DataWise', 'Product Manager', 'referral', 'partner', 'Potential partnership for small business CRM tools.'),
('Carlos Mendes', 'carlos.mendes@example.com', '(11) 90000-1004', 'TechNova', 'Operations Manager', 'website', 'new', 'Contact came from the website form.'),
('Julia Almeida', 'julia.almeida@example.com', '(11) 90000-1005', 'MarketFlow', 'Marketing Lead', 'instagram', 'archived', 'No current interest, but may be contacted again in the future.'),
('Rafael Lima', 'rafael.lima@example.com', '(11) 90000-1006', 'CodeHub', 'Software Engineer', 'event', 'in_contact', 'Met at a technology event.'),
('Beatriz Santos', 'beatriz.santos@example.com', '(11) 90000-1007', 'FinanceCore', 'Business Analyst', 'linkedin', 'client', 'Requested a CRM demo focused on follow-up control.'),
('Gabriel Rocha', 'gabriel.rocha@example.com', '(11) 90000-1008', 'StartMind', 'Founder', 'whatsapp', 'new', 'Looking for a simple contact management system.'),
('Amanda Ribeiro', 'amanda.ribeiro@example.com', '(11) 90000-1009', 'PeopleTech', 'Recruitment Specialist', 'linkedin', 'in_contact', 'Interested in using ContactFlow to organize candidate and company contacts.'),
('Thiago Martins', 'thiago.martins@example.com', '(11) 90000-1010', 'DevSolutions', 'Tech Lead', 'referral', 'partner', 'Possible technical partnership for small business automation projects.'),
('Camila Fernandes', 'camila.fernandes@example.com', '(11) 90000-1011', 'GrowthLab', 'Sales Manager', 'website', 'new', 'Filled out the contact form asking about lead management tools.'),
('Felipe Andrade', 'felipe.andrade@example.com', '(11) 90000-1012', 'CloudWorks', 'Infrastructure Analyst', 'event', 'in_contact', 'Met during a technology meetup. Wants to discuss CRM workflow improvements.'),
('Renata Oliveira', 'renata.oliveira@example.com', '(11) 90000-1013', 'SmartFinance', 'Operations Coordinator', 'whatsapp', 'client', 'Needs a simple way to track follow-ups with business contacts.'),
('Bruno Carvalho', 'bruno.carvalho@example.com', '(11) 90000-1014', 'WebCore Studio', 'Founder', 'instagram', 'new', 'Reached out through Instagram after seeing a project post.'),
('Larissa Gomes', 'larissa.gomes@example.com', '(11) 90000-1015', 'TalentBridge', 'HR Coordinator', 'linkedin', 'archived', 'Conversation paused. No active need at the moment.'),
('Eduardo Nunes', 'eduardo.nunes@example.com', '(11) 90000-1016', 'DataPilot', 'Business Intelligence Analyst', 'referral', 'client', 'Asked for better visibility of contact sources and relationship status.');

INSERT INTO contact_interactions
(contact_id, content)
VALUES
(1, 'Initial meeting completed. Ana showed interest in using ContactFlow for HR follow-ups.'),
(1, 'Sent project overview and dashboard screenshots.'),
(2, 'Lucas requested more details about contact filters and interaction history.'),
(3, 'Discussed possible partnership and future integration ideas.'),
(4, 'New lead received from website. Needs first contact.'),
(6, 'Met Rafael at a tech event and added him to the pipeline.'),
(7, 'Beatriz asked for a second conversation about CRM metrics.'),
(8, 'Gabriel wants a lightweight solution for managing startup leads.'),
(9, 'Amanda asked for a quick overview of the dashboard and contact filters.'),
(10, 'Thiago suggested a possible partnership for automation projects.'),
(11, 'Camila submitted a request through the website and needs first contact.'),
(12, 'Felipe wants to schedule a conversation about infrastructure-related workflows.'),
(13, 'Renata confirmed interest in tracking follow-ups with clients.'),
(14, 'Bruno contacted through Instagram and asked for more project details.'),
(15, 'Larissa said there is no active demand right now. Contact archived.'),
(16, 'Eduardo requested a dashboard view focused on status and source metrics.');