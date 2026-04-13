
 PostgreSQL database dump

 Dumped from database version 17.5
 Dumped by pg_dump version 17.5

 Started on 2026-04-11 10:07:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


 TOC entry 4938 (class 0 OID 40966)
 Dependencies: 217
 Data for Name: accomplishments; Type: TABLE DATA; Schema: public; Owner: postgres


 TOC entry 4940 (class 0 OID 40975)
 Dependencies: 219
 Data for Name: action_items; Type: TABLE DATA; Schema: public; Owner: postgres

INSERT INTO public.action_items (id, name, criticality, date_started, date_finished, created_at, updated_at, description, completed) VALUES (9, 'Do TDP Impact Survey', 'HIGH', '2026-04-10', NULL, '2026-04-11 01:22:04.792249', '2026-04-11 01:22:04.792249', '', false);
INSERT INTO public.action_items (id, name, criticality, date_started, date_finished, created_at, updated_at, description, completed) VALUES (3, 'Start reviewing and Perpping for interviews', 'HIGH', '2026-04-09', NULL, '2026-04-09 20:33:00.722422', '2026-04-11 01:22:51.264306', '', false);
INSERT INTO public.action_items (id, name, criticality, date_started, date_finished, created_at, updated_at, description, completed) VALUES (7, 'Do recommendations that Marilyn had for the Sims and devices', 'MEDIUM', '2026-04-09', NULL, '2026-04-09 20:36:30.922875', '2026-04-11 01:23:17.180887', '', false);
INSERT INTO public.action_items (id, name, criticality, date_started, date_finished, created_at, updated_at, description, completed) VALUES (5, 'Complete Study on Spring Boot', 'LOW', '2026-04-09', NULL, '2026-04-09 20:35:38.723623', '2026-04-11 01:23:26.363188', '', false);
INSERT INTO public.action_items (id, name, criticality, date_started, date_finished, created_at, updated_at, description, completed) VALUES (6, 'Study and continue build on MCP', 'LOW', '2026-04-09', NULL, '2026-04-09 20:36:00.436163', '2026-04-11 01:23:47.216846', '', false);
INSERT INTO public.action_items (id, name, criticality, date_started, date_finished, created_at, updated_at, description, completed) VALUES (10, 'Continue study adn build of K3s Cluster', 'LOW', '2026-04-09', NULL, '2026-04-11 01:24:01.224376', '2026-04-11 01:24:01.224376', '', false);


 TOC entry 4942 (class 0 OID 40981)
 Dependencies: 221
 Data for Name: business_commitments; Type: TABLE DATA; Schema: public; Owner: postgres

INSERT INTO public.business_commitments (id, work_item, started, date_completed, application_context, description, problem_opportunity, who_benefited, impact, value_categories, improved_outcomes, improved_outcomes_text, increased_efficiency, increased_efficiency_text, reduced_risk_cost, reduced_risk_cost_text, enhanced_customer_experience, enhanced_customer_experience_text, enhanced_employee_experience, enhanced_employee_experience_text, alignment, status_notes, created_at) VALUES (1, 'Sim MVNX Intake and Order Form', '2026-02-01', '2026-03-01', 'The Onboarding leads on the Sims and Devices team wanted a way for MVNO partners to interact and fill out the MVNX intake form and SIM Order form in a more streamlined process. Their ask was for integration into a platform, have the MVNO partners enter their information and upload desired files, and have the MVNO information viewable and emailed to the onboarding Leads. Before, the Sim Leads would have to go back and forth exchanging data that could have delays, miscommunication, and is error prone. We need to add this action as under self-service as an action MVNO''s can perform. We also want this functionality to be portable to other apps services, ownable, updatable, single source of truth with little back and forth, and able to be passed on easily to a new team.', '- Developed npm package suite Created Npm package artifact for Sim Ordering and the Sim Intake form

* Created automated scripts Created an environment for building, testing, and publishing to npm registry for any sim and device artifact
* Implemented dual-environment approach:
  * Development environment with hot reload for rapid iteration
  * Integration test environment simulating real npm installation
* Integrated backend functionality:
  * MongoDB data storage for form submissions
  * Azure file handling for uploaded documents
  * Automated email notifications to onboarding leads with PDF and HTML versions of form data
* Designed for reusability: Component can be dropped into any application (ATT or external clients) with customization, and minor security setup so all data is verified in ServiceX.
* Built comprehensive documentation (Development, Testing, Publishing, and Structure guides)', '- MVNO partners had manual back-and-forth communication delays with onboarding leads
* No standardized UI component for form intake across different applications
* Inconsistent look and feel, versioning conflicts, and maintenance challenges across multiple implementations
* Form logic was difficult to maintain and update centrally
* Manual data handling and email notifications were error-prone and time-consuming for onboarding team
* Developers had no clear path to manage, version, or hand off component ownership', '- MVNO partners: Self-service form submission capability in ServiceX portal instead of manual communication
* ATT and external clients: Drop-in React component with consistent UX and professional appearance. The clients can drag and drop with minimal setup for usage of our component, and we also benefit because we retain control.
* Onboarding leads: Automated email notifications with complete form data in PDF and HTML format
* Developers and SIMs & Devices team: Streamlined workflows, reduced maintenance burden, clear handoff procedures
* Future maintainers: Well-documented, easily transferable component with clear development and deployment processes', '- Eliminated manual delays: MVNO partners can submit forms immediately without waiting for onboarding team communication
* Centralized control: Single source of truth for component updates, versioning, styling, and functionality across all consumer applications
* Reduced development friction: Developers don''t need to build custom form implementations and there is a development suite for easing testing.
* Improved data consistency: Automatic data storage in MongoDB ensures standardized format and reduces manual data entry errors
* Automated notifications: Email system delivers form data in multiple formats (PDF + HTML) automatically to onboarding leads
* Enabled knowledge transfer: Architecture and documentation support easy handoff of component development to other team members without knowledge loss', '{}', true, '- Automated build/test/VNO partners achieve independent self-service form submission without manual back-and-forth
* Onboarding leads receive complete, formatted form data automatically', true, '- Automated email notifications with form data remove manual email composition and data copying
* Developers save significant time using drop-in component vs building custom implementations
* Single-source component updates benefit all consuming applications instantly', true, '- Centralized component reduces duplicate code maintenance across multiple implementations
* Single point of versioning reduces incompatibility risks
* Automated testing ensures quality before deployment
* Reduced manual data handling minimizes errors and support requests', true, '- Professional, consistent UI component for external clients and MVNO partners
* Self-service capability improves user experience for form submission
* Instant form processing without manual delays', true, '- Developers benefit from clear automation scripts and dual-environment testing approach
* Onboarding team benefits from automated email notifications with complete form data
* Streamlined component handoff process enables team flexibility
* Well-documented development process reduces onboarding time for new maintainers', 'N/A', 'I need to go back and add Sim Artwork functionality in the Sim Order Form. Once that happens and merged to dev, I''ll have the Sims team review what they want and dont want.', '2026-04-09 14:26:34.620243-05');
INSERT INTO public.business_commitments (id, work_item, started, date_completed, application_context, description, problem_opportunity, who_benefited, impact, value_categories, improved_outcomes, improved_outcomes_text, increased_efficiency, increased_efficiency_text, reduced_risk_cost, reduced_risk_cost_text, enhanced_customer_experience, enhanced_customer_experience_text, enhanced_employee_experience, enhanced_employee_experience_text, alignment, status_notes, created_at) VALUES (2, 'SIM Intake and Carrier App Form Improvements (@mvnx/sims-and-devices)', '2026-03-30', '2026-04-03', 'ServiceX self-service forms used by AT&T Vendors for SIM provisioning and Carrier App registration', 'Updated the SIM Intake and Carrier App forms with terminology improvements, field simplifications, and separated the Carrier App into a standalone self-service form with dedicated email routing.', 'Terminology in the existing forms was inconsistent and outdated (e.g. non-standard SIM terms). Carrier App registration was embedded inside the SIM Intake flow, causing confusion and routing all submissions to the same email regardless of form type. Vendors could not independently access or submit the Carrier App form.', 'AT&T Vendors submitting SIM intake requests and Carrier App registrations; Marilyn''s team who receives Carrier App submissions separately', 'Cleaner, more accurate form terminology reduces vendor confusion. Separating Carrier App into a standalone self-service form streamlines the submission process and ensures Carrier App emails route directly to the correct recipient (SIM_CARRIER_APP_EMAIL_RECIPIENTS) rather than the general SIM intake inbox. Route-specific email recipient configuration makes future routing changes low-risk.', '{}', false, '', false, '', false, '', true, '- Terminology accuracy: Updated SIM-related labels to industry-standard terms (SM-DS, SM-DP+, QR Code)
* Removed irrelevant fields (SIM Vendor Select, SIM provider & contact) reducing vendor friction', true, '- Enhanced employee experience:   - Separation of concerns: Carrier App moved to standalone form with its own API route and email recipient
* Email routing: Route-specific recipient env vars (SIM_INTAKE, SIM_ORDER, SIM_CARRIER_APP) enable precise delivery', '', 'The Sims and Devices team need to get back to the billing and OEM team to figure out exactly what fields are needed from the Vendor, since there has been changes in the org, structure, and what is believed to be required of MVNOS in terms of information''s as it pertains to the licensing agreement. Other than that, this work item is completed: hanges include terminology updates (SM-DS, SM-DP+, QR Code), field simplifications (removed SIM Vendor Select, simplified artwork request, renamed form to AT&T SIM Intake Form), added Yes/No Carrier App checkbox to intake form, created standalone Carrier App form with dedicated API endpoint (/api/sims/carrier-app) and CarrierAppApprovalFormClient component integrated into Self-Service sidebar', '2026-04-09 14:32:18.756445-05');


 TOC entry 4948 (class 0 OID 41011)
 Dependencies: 227
 Data for Name: innovation_events; Type: TABLE DATA; Schema: public; Owner: postgres

INSERT INTO public.innovation_events (id, event_name, type, done, started, finished, required, description, created_at, updated_at) VALUES (1, 'Intern Innovation Challenge Coach (PLANNED)', 'Role', false, NULL, NULL, false, '', '2026-04-09 20:27:29.796017', '2026-04-09 20:27:29.796017');
INSERT INTO public.innovation_events (id, event_name, type, done, started, finished, required, description, created_at, updated_at) VALUES (2, 'Hackathon (Signed Up)', '', false, NULL, NULL, true, '', '2026-04-09 20:27:43.185651', '2026-04-09 20:27:43.185651');


 TOC entry 4944 (class 0 OID 40993)
 Dependencies: 223
 Data for Name: event_sub_items; Type: TABLE DATA; Schema: public; Owner: postgres


 TOC entry 4946 (class 0 OID 41001)
 Dependencies: 225
 Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres


 TOC entry 4950 (class 0 OID 41021)
 Dependencies: 229
 Data for Name: innovation_subevents; Type: TABLE DATA; Schema: public; Owner: postgres


 TOC entry 4952 (class 0 OID 41030)
 Dependencies: 231
 Data for Name: leadership_events; Type: TABLE DATA; Schema: public; Owner: postgres

INSERT INTO public.leadership_events (id, event_name, type, done, started, finished, required, description, created_at, updated_at) VALUES (1, 'Phantom Forums', 'Role', false, '2026-01-01', NULL, false, '', '2026-04-09 19:36:27.186491', '2026-04-09 19:36:27.186491');
INSERT INTO public.leadership_events (id, event_name, type, done, started, finished, required, description, created_at, updated_at) VALUES (2, 'Mentor Pillars (Planned)', 'Role', false, NULL, NULL, true, '', '2026-04-09 19:36:40.463866', '2026-04-09 19:36:40.463866');
INSERT INTO public.leadership_events (id, event_name, type, done, started, finished, required, description, created_at, updated_at) VALUES (3, 'inspireAsian', 'Mentee/Circle Lead Contact', false, '2026-03-04', NULL, false, '', '2026-04-09 19:37:32.66671', '2026-04-09 19:37:32.66671');
INSERT INTO public.leadership_events (id, event_name, type, done, started, finished, required, description, created_at, updated_at) VALUES (4, 'TDP Hiring Team', 'Interviewer', false, '2026-01-01', NULL, false, '12 Interviews in total since Jan.', '2026-04-09 19:38:12.791439', '2026-04-09 19:38:12.791439');
INSERT INTO public.leadership_events (id, event_name, type, done, started, finished, required, description, created_at, updated_at) VALUES (5, 'TDP Systems Tech Circle Lead', 'Lead/Role', false, '2026-04-03', NULL, false, '', '2026-04-09 19:38:29.452169', '2026-04-09 19:38:29.452169');


 TOC entry 4954 (class 0 OID 41036)
 Dependencies: 233
 Data for Name: leadership_subevents; Type: TABLE DATA; Schema: public; Owner: postgres

INSERT INTO public.leadership_subevents (id, event_id, subevent_name, done, started, finished, description, created_at, updated_at) VALUES (1, 3, 'Networking Event', true, '2026-04-04', '2026-04-04', '- Jacques Saive - Talked about his jouney throughout the company. His organization gets around 6 billion in capex each year, and its his organizations job to decided where to spend that money and if where they spend that money, if it will be profitable. Sounds like his org had a massive amount of opportunity cost projects like one of them he talked about, was an expensive add on to add 600 GHZ radio antennas to cell towers. He remarked that the farther you work up in the company, the more business units, opportunities, skills, and domain knowledge you have to grasp

* Pavan Tammana - Pavan talked more about how required it is to learn more skills and network with more business units in order to function at his job. he mentioned that he collaborates with data, network, business and finance engineers and teams.', '2026-04-09 19:39:54.752853', '2026-04-09 19:39:54.752853');


 TOC entry 4956 (class 0 OID 41042)
 Dependencies: 235
 Data for Name: learning_items; Type: TABLE DATA; Schema: public; Owner: postgres

INSERT INTO public.learning_items (id, item_name, created_at, updated_at, item_date) VALUES (3, 'K3s Infrastructure Production-Like Homelab with GitOps', '2026-04-09 19:44:01.225939', '2026-04-09 19:44:01.225939', NULL);
INSERT INTO public.learning_items (id, item_name, created_at, updated_at, item_date) VALUES (4, 'K3s-MCP - AI-Powered Kubernetes Diagnostics', '2026-04-09 20:06:00.722506', '2026-04-09 20:06:00.722506', NULL);
INSERT INTO public.learning_items (id, item_name, created_at, updated_at, item_date) VALUES (5, 'Commitment Tracker - Full-Stack Application with GitOps', '2026-04-09 20:08:09.019315', '2026-04-09 20:08:09.019315', NULL);
INSERT INTO public.learning_items (id, item_name, created_at, updated_at, item_date) VALUES (6, 'Kubernetes Tutorial For beginers', '2026-04-09 20:18:25.674738', '2026-04-09 20:18:25.674738', NULL);
INSERT INTO public.learning_items (id, item_name, created_at, updated_at, item_date) VALUES (7, 'ImersiveLabs Kubernetes Fundamentals', '2026-04-09 20:19:46.66623', '2026-04-09 20:19:46.66623', NULL);
INSERT INTO public.learning_items (id, item_name, created_at, updated_at, item_date) VALUES (8, 'Spring Boot and Spring Data JPA', '2026-04-09 20:22:03.315011', '2026-04-09 20:22:03.315011', NULL);
INSERT INTO public.learning_items (id, item_name, created_at, updated_at, item_date) VALUES (9, 'AZ 104', '2026-04-09 20:23:17.524206', '2026-04-09 20:23:17.524206', NULL);
INSERT INTO public.learning_items (id, item_name, created_at, updated_at, item_date) VALUES (10, 'Nextjs', '2026-04-09 20:23:22.76849', '2026-04-09 20:23:22.76849', NULL);
INSERT INTO public.learning_items (id, item_name, created_at, updated_at, item_date) VALUES (11, 'AI agent workflow commitment tracker', '2026-04-09 20:24:22.853014', '2026-04-09 20:24:22.853014', NULL);
INSERT INTO public.learning_items (id, item_name, created_at, updated_at, item_date) VALUES (12, 'LeetCode ', '2026-04-09 20:25:24.24256', '2026-04-09 20:25:24.24256', NULL);
INSERT INTO public.learning_items (id, item_name, created_at, updated_at, item_date) VALUES (13, 'PyTorch', '2026-04-09 20:26:26.114822', '2026-04-09 20:26:26.114822', NULL);


 TOC entry 4958 (class 0 OID 41050)
 Dependencies: 237
 Data for Name: learning_modules; Type: TABLE DATA; Schema: public; Owner: postgres

INSERT INTO public.learning_modules (id, item_id, module_name, type, hours, date_started, date_finished, finished, required, description, created_at, updated_at) VALUES (17, 12, 'Feb and March', '', NULL, '2026-02-01', '2026-03-31', true, false, '- Valid Soduku

* Temperatures
* Minimum Stack
* Longest Consecutive Sequence
* Reverse Polish Notation

', '2026-04-09 20:26:14.917211', '2026-04-09 20:26:14.917211');
INSERT INTO public.learning_modules (id, item_id, module_name, type, hours, date_started, date_finished, finished, required, description, created_at, updated_at) VALUES (4, 3, 'Learning: Initial Kubernetes Learning (Minikube/Kind)', 'Hands on', 10.00, '2026-03-09', '2026-03-20', true, false, '- Local Cluster Setup - Minikube and Kind for learning

* Pods & Containers - Basic workload deployment
* Services - ClusterIP, NodePort, LoadBalancer types
* Ingress Controllers - Routing external traffic to services
* Volumes - Persistent storage and volume claims
* Namespaces - Resource isolation and organization
* kubectl Commands - Managing resources via CLI', '2026-04-09 19:51:35.002193', '2026-04-09 19:55:42.985306');
INSERT INTO public.learning_modules (id, item_id, module_name, type, hours, date_started, date_finished, finished, required, description, created_at, updated_at) VALUES (5, 3, 'K3s Multi-Node Cluster Infrastructure', 'Hands On', 10.00, '2026-03-20', '2026-03-27', false, false, '- Vagrant - Infrastructure-as-code for VM provisioning
* k3s - Lightweight Kubernetes distribution
* Multi-node Networking - Master + worker node configuration
* MetalLB - LoadBalancer implementation for bare-metal clusters
* Traefik - Ingress controller and reverse proxy
* Flannel CNI - Container Network Interface for pod networking
* VirtualBox Networking - NAT, host-only, and bridged configurations
* Private Container Registry - Self-hosted Docker registry setup
* Registry Trust Configuration - Insecure registries and certificate management', '2026-04-09 19:54:58.862001', '2026-04-09 19:55:57.584203');
INSERT INTO public.learning_modules (id, item_id, module_name, type, hours, date_started, date_finished, finished, required, description, created_at, updated_at) VALUES (6, 3, 'Observability Stack', 'Hands On', 4.00, '2026-03-26', '2026-03-30', true, false, '- Prometheus - Metrics collection and querying (PromQL)
* Grafana - Dashboard creation and visualization
* Loki - Log aggregation (like Prometheus but for logs)
* Promtail - Log shipping DaemonSet
* kube-prometheus-stack - Comprehensive monitoring setup via Helm
* LogQL - Loki query language for log analysis
* Headlamp - Kubernetes dashboard for cluster management
* Resource Limits - Preventing unbounded resource consumption', '2026-04-09 19:58:25.980918', '2026-04-09 19:58:25.980918');
INSERT INTO public.learning_modules (id, item_id, module_name, type, hours, date_started, date_finished, finished, required, description, created_at, updated_at) VALUES (7, 3, ' GitOps & CI/CD Pipeline', 'Hands On', 5.00, '2026-03-27', '2026-04-03', false, false, '- ArgoCD - Kubernetes-native GitOps operator
  * Auto-sync and self-healing configurations
  * Git as source of truth for cluster state
  * Application-of-applications pattern
* Jenkins - CI/CD automation server
  * Pipeline-as-code with Jenkinsfile
  * Docker image builds
  * GitOps manifest updates
* Separate Repo Pattern - App code vs. k8s manifests in different repos
* Docker Registry Integration - Private registry for image storage', '2026-04-09 20:00:47.113012', '2026-04-09 20:00:55.036257');
INSERT INTO public.learning_modules (id, item_id, module_name, type, hours, date_started, date_finished, finished, required, description, created_at, updated_at) VALUES (8, 4, 'MCP Protocol & Spring AII', 'Hands On', 3.00, '2026-03-30', '2026-03-30', false, false, '- Model Context Protocol (MCP) - Standardized protocol for AI tool integration
* Spring AI 2.0 - Building AI-accessible tools with Spring Boot
* Tool Annotations - @Tool for exposing methods to AI assistants
* SSE Transport - Server-Sent Events for streaming responses
* STDIO Transport - Standard input/output communication', '2026-04-09 20:07:06.725493', '2026-04-09 20:07:06.725493');
INSERT INTO public.learning_modules (id, item_id, module_name, type, hours, date_started, date_finished, finished, required, description, created_at, updated_at) VALUES (9, 4, 'Reactive Programming with Spring WebFlux', 'Hands On', 0.00, '2026-03-30', '2026-03-30', false, false, '- Spring WebFlux - Reactive web framework
* Reactive Streams - Non-blocking, event-driven architecture
* Mono and Flux - Reactive types for single and multiple values
* Backpressure - Flow control in reactive systems', '2026-04-09 20:07:53.456209', '2026-04-09 20:07:53.456209');
INSERT INTO public.learning_modules (id, item_id, module_name, type, hours, date_started, date_finished, finished, required, description, created_at, updated_at) VALUES (10, 5, 'Frontend Development', 'Hands On', 2.00, '2026-03-02', NULL, false, false, '- Next.js 16 App Router - Server Components and Server Actions (RSC pattern)
* TypeScript + Zod - Type safety and runtime validation
* Tailwind CSS - Utility-first styling approach
', '2026-04-09 20:09:08.302212', '2026-04-09 20:09:08.302212');
INSERT INTO public.learning_modules (id, item_id, module_name, type, hours, date_started, date_finished, finished, required, description, created_at, updated_at) VALUES (11, 5, 'Spring Boot Backend Development', 'Hands On', NULL, '2026-03-23', NULL, false, false, '- Spring Boot 4.0 - Modern Java application framework
* Spring Data JPA - Database abstraction and ORM
* PostgreSQL - Relational database management
* REST API Design - RESTful endpoints and request handling
* Entity Relationships - JPA mapping and database design', '2026-04-09 20:09:47.744809', '2026-04-09 20:09:47.744809');
INSERT INTO public.learning_modules (id, item_id, module_name, type, hours, date_started, date_finished, finished, required, description, created_at, updated_at) VALUES (12, 6, 'Kubernetes Tutorial For Beginers', 'Video', 3.50, '2026-03-09', '2026-03-17', true, false, 'https://www.youtube.com/watch?v=X48VuDVv0do&pp=ygUTa3ViZXJuZXRlcyB0dXRvcmlhbA%3D%3D', '2026-04-09 20:19:28.066086', '2026-04-09 20:19:28.066086');
INSERT INTO public.learning_modules (id, item_id, module_name, type, hours, date_started, date_finished, finished, required, description, created_at, updated_at) VALUES (13, 7, 'Imersive Labs Kubernetes Fundamentals', 'Lab', 3.75, '2026-04-06', '2026-04-08', true, false, 'Kubernetes is a popular tool used in cloud environments for orchestration, automating computer application deployment, scaling, and management. This series will take you from the basics of securely configuring and using Kubernetes through to attacking a Kubernetes cluster.
https://att.us.immersivelabs.com/series/kubernetes-ce827e86-a531-4f13-a65c-11a775ebd2af/labs', '2026-04-09 20:20:58.433691', '2026-04-09 20:20:58.433691');
INSERT INTO public.learning_modules (id, item_id, module_name, type, hours, date_started, date_finished, finished, required, description, created_at, updated_at) VALUES (14, 8, 'Spring Boot and Spring Data JPA', 'Video', 5.00, '2026-04-06', NULL, false, false, 'https://www.youtube.com/watch?v=LSPWnwFhpJI', '2026-04-09 20:22:34.517137', '2026-04-09 20:22:34.517137');
INSERT INTO public.learning_modules (id, item_id, module_name, type, hours, date_started, date_finished, finished, required, description, created_at, updated_at) VALUES (15, 10, 'Server and Client Data Fetching', 'Video', 1.00, '2026-02-02', '2026-02-16', true, false, '', '2026-04-09 20:24:10.891885', '2026-04-09 20:24:10.891885');
INSERT INTO public.learning_modules (id, item_id, module_name, type, hours, date_started, date_finished, finished, required, description, created_at, updated_at) VALUES (16, 11, 'AI agent workflow commitment tracker', 'Hands On', NULL, '2026-02-27', NULL, false, false, 'I created an ai agent workflow that pulls from my PR''s, commits, readme from a given date range, and stores them to generate a polished, professional TDP business commitment given the template and agent instructions I set for it. I have to better increase productivity and incorporate AI into my workflow process to be more efficient. Planning later to incorporate functionality to have this automatically done via my ui, so that with a click of a button I can get a polished commitment  likely a GH CLI action.', '2026-04-09 20:25:05.771529', '2026-04-09 20:25:05.771529');


 TOC entry 4960 (class 0 OID 41060)
 Dependencies: 239
 Data for Name: one_on_one_documents; Type: TABLE DATA; Schema: public; Owner: postgres

INSERT INTO public.one_on_one_documents (id, document_date, business_partner_work, workload_concerns, utilization_percentage, tdp_contributions, training_skills, pursuing_degrees, compliance_percentage, ehs_training_percentage, growth_hub_progress, success_pathways_updated, contingency_training_percentage, innovation_events, accomplishments, challenges, goals, questions, receiving_support, additional_items, out_of_office_plans, created_at, updated_at) VALUES (2, '2026-04-13', 'Application Context :

This work improved the ServiceX self-service experience for AT&T vendors and leads when submitting SIM Intake and Carrier App requests. Carrier App registration was separated from the SIM Intake form so vendors can complete it independently and on their own timeline, especially when they do not yet have all the required Carrier App details. The Intake process now only captures the limited information needed by onboarding leads, while full Carrier App submissions are routed directly to Marilyn for approval instead of the SIM intake team.

This work also happened while the broader ServiceX experience is still being built out and refined. Because of recent organizational changes, the SIMs team is continuing to confirm exactly what information should be collected from vendors and how different request types should be routed going forward.

Summary:

I updated the SIM Intake and Carrier App experience to improve terminology, simplify fields, and separate Carrier App registration into its own standalone self-service form. This included refining SIM inputs and introducing dedicated routing for Carrier App submissions so they no longer flow through the general SIM intake path.

Problem / Opportunity:
The existing forms in Production had terminology that could confuse vendors and onboarding leads. In addition, Carrier App registration was embedded within the SIM Intake flow, making it harder for vendors to access independently and causing all submissions to route to the same email inbox regardless of request type.

What I Changed:
I updated the form language to use clearer industry-standard SIM terminology such as SM-DS, SM-DP+, and QR Code. I simplified the experience by removing unnecessary fields, including SIM Vendor Select and certain provider/contact inputs, and I renamed the form to AT&T SIM Intake Form for clarity. I also added a Yes/No Carrier App checkbox to the intake flow and created a separate standalone Carrier App form with its own API endpoint and dedicated UI integration in the Self-Service sidebar. To support cleaner operations, I configured route-specific email recipients so Carrier App requests now go directly to the correct distribution instead of the general SIM intake inbox.

Link to ServiceXDev: ServiceX (For me to use)

Who Benefited:
This work benefits AT&T vendors submitting SIM intake and Carrier App requests by making the process clearer and easier to complete. It also benefits Marilyn''s team and other internal stakeholders by ensuring Carrier App submissions are routed directly to the appropriate recipients.

Impact:
The updates could reduce vendor friction by making the forms easier to understand and complete. Separating the Carrier App into its own flow improved usability and reduced confusion around submission type. The new routing setup also improved operational accuracy by sending each request type to the right audience, while making future routing changes lower risk through route-specific configuration.

Status Notes:
Some notes I recieved on 4/10/26 on the next updates/revisions to make, which shouldn''t take long:

SIM Intake Form:
Modify "Do you want to request SIM Artwork" to "Do you want to request Physical SIM Artwork"?
Add a field above the "artwork question": Will you purchase Physical SIMs?
 
SIM Order Form
Add PO dollar amount field to support financial tracking.
Remove PSIM profile Customization header and the free-text entry field below it.
Replace "Billing" with "Shipping" everywhere "Billing" is shown on the SIM Order form; the intake form remains the billing system of record.
Add note with guidance to contact Success Manager for billing changes

Value Delivered:
This work improved the customer experience by making the form terminology more accurate and reducing unnecessary steps for vendors. It also improved the employee experience by separating concerns between SIM intake and Carrier App processing, giving each workflow its own routing path and making support and future maintenance more manageable.
', 'None', '50', '- Selected for the TDP Systems Tech Circle Lead role, with kickoff beginning this week.

* Participating in inspireAsian and serving as the Circle Lead contact for coordination and scheduling.
* Planning to participate in Mentor Pillars when the program launches.
* Continuing to support the TDP Hiring Team as an interviewer.
* Participating in Phantom Forums and serving as a point of contact in that space as needed.', 'Learning Item: K3s Infrastructure Production-Like Homelab with GitOps
* Module: Initial Kubernetes Learning (Minikube/Kind)
Type: Hands On
Hours: 10
Started: 2026-03-09
Finished: 2026-03-20
Description:
Built foundational Kubernetes knowledge through hands-on local cluster setup with Minikube and Kind. Covered pods and containers, service types including ClusterIP, NodePort, and LoadBalancer, ingress controllers, persistent volumes and claims, namespaces, and day-to-day kubectl usage.
* Module: K3s Multi-Node Cluster Infrastructure
Type: Hands On
Hours: 10
Started: 2026-03-20
Finished: 2026-03-27
Description:
Built a production-like multi-node K3s environment using Vagrant and VirtualBox. Worked through master and worker node networking, MetalLB, Traefik, Flannel CNI, private container registry setup, and registry trust configuration.
* Module: Observability Stack
Type: Hands On
Hours: 4
Started: 2026-03-26
Finished: 2026-03-30
Description:
Set up observability tooling for Kubernetes, including Prometheus, Grafana, Loki, Promtail, kube-prometheus-stack, LogQL, Headlamp, and resource limits to support monitoring, logging, and cluster visibility.
* Module: GitOps and CI/CD Pipeline
Type: Hands On
Hours: 5
Started: 2026-03-27
Finished: 2026-04-03
Description:
Implemented GitOps and CI/CD patterns using ArgoCD and Jenkins. Covered auto-sync and self-healing, Git as the source of truth, application-of-applications, Docker image builds, GitOps manifest updates, separate repository patterns, and private registry integration.

---

Learning Item: K3s-MCP - AI-Powered Kubernetes Diagnostics

* Module: MCP Protocol and Spring AI
Type: Hands On
Hours: 3
Started: 2026-03-30
Finished: 2026-03-30
Description:
Learned MCP concepts and applied Spring AI to build AI-accessible tools in Spring Boot. Covered tool annotations, SSE transport, and STDIO transport.
* Module: Reactive Programming with Spring WebFlux
Type: Hands On
Started: 2026-03-30
Finished: 2026-03-30
Description:
Practiced reactive programming concepts using Spring WebFlux, including reactive streams, Mono, Flux, and backpressure.

---

Learning Item: Commitment Tracker - Full-Stack Application with GitOps

* Module: Frontend Development
Type: Hands On
Hours: 2
Started: 2026-03-02
Description:
Built frontend functionality with Next.js 16 App Router, Server Components, Server Actions, TypeScript, Zod, and Tailwind CSS.
* Module: Spring Boot Backend Development
Type: Hands On
Started: 2026-03-23
Description:
Built backend features using Spring Boot, Spring Data JPA, PostgreSQL, REST API design, and entity relationship modeling.

---

Learning Item: Kubernetes Tutorial for Beginners

* Module: Kubernetes Tutorial for Beginners
Type: Video
Hours: 3.5
Started: 2026-03-09
Finished: 2026-03-17
Description:
Completed introductory Kubernetes training focused on core concepts and platform fundamentals.

---

Learning Item: Immersive Labs Kubernetes Fundamentals

* Module: Immersive Labs Kubernetes Fundamentals
Type: Lab
Hours: 3.75
Started: 2026-04-06
Finished: 2026-04-08
Description:
Completed hands-on Kubernetes fundamentals labs covering orchestration, secure configuration, platform usage, and cluster security concepts.

---

Learning Item: Spring Boot and Spring Data JPA

* Module: Spring Boot and Spring Data JPA
Type: Video
Hours: 5
Started: 2026-04-06
Description:
Continued backend development learning focused on Spring Boot and Spring Data JPA.

---

Learning Item: AZ-104

* Module: AZ-104
Description:
Ongoing Azure Administrator learning and certification preparation.

---

Learning Item: Next.js

* Module: Server and Client Data Fetching
Type: Video
Hours: 1
Started: 2026-02-02
Finished: 2026-02-16
Description:
Reviewed server-side and client-side data fetching patterns in Next.js.

---

Learning Item: AI Agent Workflow for Commitment Tracker

* Module: AI Agent Workflow for Commitment Tracker
Type: Hands On
Started: 2026-02-27
Description:
Built an AI agent workflow that pulls from pull requests, commits, and README content across a selected date range to generate polished TDP business commitments based on a defined template and custom instructions. This work supports productivity improvements and broader AI enablement in day-to-day workflow, with future plans to expose the workflow through the UI.

---

Learning Item: PyTorch

* Module: PyTorch
Description:
Ongoing learning in PyTorch and machine learning fundamentals.

---

Training Skills Progress

* Intermediate:
Kubernetes, K3s, Next.js, Minikube, Kind
* Basic:
Vagrant, Grafana, JPA/Hibernate, MCP, Spring Boot, PostgreSQL, ArgoCD, Jenkins
* Beginner:
Terraform, Loki, Prometheus, Spring AI', 'N/A', '100', '33', 'Making Progress', 'true', '100', '- Planning to participate as an Intern Innovation Challenge Coach.
* Signed up for the Hackathon and planning to participate.
', '- Built out a much more complete full-stack Kubernetes learning environment than I originally planned, progressing from Kind to Minikube, then to K3s, and eventually to a multi-node VM-based setup with Vagrant to better understand traffic routing, node behavior, and production-like infrastructure patterns.
* Expanded the environment beyond cluster setup by adding GitOps and CI/CD tooling with ArgoCD and Jenkins, which gave me a better understanding of how application delivery fits into Kubernetes-based workflows.
* Continued improving the realism of the environment by adding observability tools and building an AI-powered cluster diagnostics MCP, which helped me connect infrastructure learning with practical debugging and operational use cases.
* Took on more visible and collaborative opportunities outside of core technical work, including inspireAsian, TDP interviewing, and the Systems Tech Circle Lead role.', '- One of the biggest challenges was that I started with only surface-level Kubernetes knowledge, so a lot of the work involved learning by iteration and realizing that each earlier setup had limitations.
* As I learned more, I kept finding gaps in my environment that made me rethink the design, such as moving from single-node local clusters to a multi-node K3s setup, and then to VM-based infrastructure to better emulate routing and cluster behavior.
* Another challenge has been understanding the supporting infrastructure needed to make these environments practical, especially around authentication, secrets management, and securely connecting tools like an MCP service to a cluster.
* A broader challenge has been balancing fast experimentation with building something that actually reflects more realistic infrastructure and GitOps practices.', '- Continue expanding my infrastructure knowledge, especially around Kubernetes, multi-node environments, and GitOps workflows.
* Deepen my understanding of Spring Boot while continuing to explore Spring AI and how it can be used in practical development workflows.
* Learn more about cluster security, authentication, and secrets management so I can better support real-world integrations between applications, AI tools, and Kubernetes environments.
* Keep building on this foundation by turning what started as learning projects into more complete and production-aware development patterns.', 'None', 'Yes', 'Intermediate: Kubernetes, K3s, NextJs, MiniKube and Kind
Basic: Vagrant, Grafana, JPA/Hibernate, MCP, SpringBoot, Postgres, ArgoCd, Jenkins
Beginner: Terraform , Loki, Prometheus, Spring AI', 'None', NULL, NULL);


 TOC entry 4965 (class 0 OID 41149)
 Dependencies: 244
 Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres

INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (2, 'Vagrant', 2, '2026-04-09 20:37:45.790466', '2026-04-09 20:37:45.790466', NULL);
INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (3, 'Prometheus', 1, '2026-04-10 13:22:39.986203', '2026-04-10 13:22:39.986203', NULL);
INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (4, 'Loki', 1, '2026-04-10 13:22:44.629233', '2026-04-10 13:22:44.629233', NULL);
INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (5, 'Grafana', 2, '2026-04-10 13:22:51.598936', '2026-04-10 13:22:51.598936', NULL);
INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (6, 'Kubernetes', 3, '2026-04-10 13:22:57.067156', '2026-04-10 13:22:57.067156', NULL);
INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (7, 'K3s', 3, '2026-04-10 13:23:03.058085', '2026-04-10 13:23:03.058085', NULL);
INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (8, 'Terraform ', 1, '2026-04-10 13:24:32.425432', '2026-04-10 13:24:32.425432', NULL);
INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (9, 'ArgoCd', 2, '2026-04-10 13:24:42.17766', '2026-04-10 13:24:42.17766', NULL);
INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (10, 'Jenkins', 2, '2026-04-10 13:24:46.559426', '2026-04-10 13:24:46.559426', NULL);
INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (11, 'JPA/Hibernate', 2, '2026-04-10 13:25:07.406818', '2026-04-10 13:25:07.406818', NULL);
INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (12, 'MCP', 2, '2026-04-10 13:25:41.724309', '2026-04-10 13:25:41.724309', NULL);
INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (13, 'SpringBoot', 2, '2026-04-10 13:26:13.475296', '2026-04-10 13:26:13.475296', NULL);
INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (14, 'Postgres', 2, '2026-04-10 13:27:34.224039', '2026-04-10 13:27:34.224039', NULL);
INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (15, 'NextJs', 3, '2026-04-10 13:28:19.298689', '2026-04-10 13:28:19.298689', NULL);
INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (16, 'MiniKube and Kind', 3, '2026-04-10 13:28:29.018059', '2026-04-10 13:28:29.018059', NULL);
INSERT INTO public.skills (id, name, proficiency, created_at, updated_at, date) VALUES (17, 'Spring AI', 1, '2026-04-10 13:29:41.185711', '2026-04-10 13:29:41.185711', NULL);


 TOC entry 4962 (class 0 OID 41068)
 Dependencies: 241
 Data for Name: subevents; Type: TABLE DATA; Schema: public; Owner: postgres


 TOC entry 4971 (class 0 OID 0)
 Dependencies: 218
 Name: accomplishments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

SELECT pg_catalog.setval('public.accomplishments_id_seq', 1, false);


 TOC entry 4972 (class 0 OID 0)
 Dependencies: 220
 Name: action_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

SELECT pg_catalog.setval('public.action_items_id_seq', 10, true);


 TOC entry 4973 (class 0 OID 0)
 Dependencies: 222
 Name: business_commitments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

SELECT pg_catalog.setval('public.business_commitments_id_seq', 2, true);


 TOC entry 4974 (class 0 OID 0)
 Dependencies: 224
 Name: event_sub_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

SELECT pg_catalog.setval('public.event_sub_items_id_seq', 1, false);


 TOC entry 4975 (class 0 OID 0)
 Dependencies: 226
 Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

SELECT pg_catalog.setval('public.events_id_seq', 1, false);


 TOC entry 4976 (class 0 OID 0)
 Dependencies: 228
 Name: innovation_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

SELECT pg_catalog.setval('public.innovation_events_id_seq', 2, true);


 TOC entry 4977 (class 0 OID 0)
 Dependencies: 230
 Name: innovation_subevents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

SELECT pg_catalog.setval('public.innovation_subevents_id_seq', 1, false);


 TOC entry 4978 (class 0 OID 0)
 Dependencies: 232
 Name: leadership_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

SELECT pg_catalog.setval('public.leadership_events_id_seq', 5, true);


 TOC entry 4979 (class 0 OID 0)
 Dependencies: 234
 Name: leadership_subevents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

SELECT pg_catalog.setval('public.leadership_subevents_id_seq', 1, true);


 TOC entry 4980 (class 0 OID 0)
 Dependencies: 236
 Name: learning_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

SELECT pg_catalog.setval('public.learning_items_id_seq', 13, true);


 TOC entry 4981 (class 0 OID 0)
 Dependencies: 238
 Name: learning_modules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

SELECT pg_catalog.setval('public.learning_modules_id_seq', 17, true);


 TOC entry 4982 (class 0 OID 0)
 Dependencies: 240
 Name: one_on_one_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

SELECT pg_catalog.setval('public.one_on_one_documents_id_seq', 2, true);


 TOC entry 4983 (class 0 OID 0)
 Dependencies: 243
 Name: skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

SELECT pg_catalog.setval('public.skills_id_seq', 18, true);


 TOC entry 4984 (class 0 OID 0)
 Dependencies: 242
 Name: subevents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres

SELECT pg_catalog.setval('public.subevents_id_seq', 1, false);

 Completed on 2026-04-11 10:07:40


 PostgreSQL database dump complete