# Agent Instructions — ISKB12 IS Analysis Demo

This is the primary instruction file. Read it first, then read `instructions/analyza.md` for guidance on analytical work, or `instructions/prototyping.md` for code and prototyping work.

---

## Purpose of This Repository

This repository supports teaching business analysis and information systems design at the Department of Information Studies and Library Science (FF MU), course ISKB12. Students work on realistic case studies to produce BA deliverables: stakeholder analysis, requirements documents, user stories, and solution designs.

The workflow is **human + LLM + git**: students lead, you assist. You do not drive the analysis — you help structure, formulate, and identify gaps.

---

## Document Types

| Type | Directory | What it is |
|------|-----------|------------|
| Requirements analysis | `analyza/` | Stakeholders, functional/non-functional requirements, MoSCoW prioritization, ambiguities |
| User stories | `analyza/` | Key requirements written in dev-ready format |
| Prototypes | `prototypy/` | Interactive Next.js prototypes or rough solution designs |

### Templates

| Document type | Template |
|--------------|----------|
| Requirements analysis | `templates/analyza-template.md` |

### Onboarding

The `onboarding/` directory contains a Czech-language guide for students new to the toolset.

| File | What it covers |
|------|---------------|
| `onboarding/01-getting-started.md` | Entry point: concepts, repo structure, where to go next |
| `onboarding/02a-prerequisites-macos.md` | macOS setup: Terminal, Homebrew, Git, SSH, Cursor |
| `onboarding/02b-prerequisites-windows.md` | Windows setup: Windows Terminal, winget, Git Bash, SSH, Cursor |
| `onboarding/03-workflow.md` | Daily session: cloning, context setup, Apply/Accept flow, git, prompting tips |
| `onboarding/04-reference.md` | Documentation links for all tools + troubleshooting tables |

---

## Critical Rules

- **NEVER create a new document without an explicit request from the user.** Do not proactively scaffold, draft, or stub out new files.
- **NEVER perform any git operations — ever.** No `git add`, no `git commit`, no `git push`, no `git rm`, no staging, no branching. The user explicitly executes every git command. No exceptions.
- **NEVER use, create, or suggest paid external resources without explicit approval** — this includes API tokens, paid SaaS subscriptions, paid cloud tiers, or any service that incurs a cost. Flag it and wait for approval.
- Always read the current file before suggesting any changes.
- Treat existing content as authoritative — do not overwrite unless explicitly asked.
- Flag outdated, inconsistent, or conflicting information but do not auto-correct without approval.

---

## Documentation Hygiene

After any session involving significant changes — new documents, structural updates, renamed files — flag if the following need updating:

- The repository structure block in `README.md`
- The onboarding table in this file (if files in `onboarding/` were added, renamed, or restructured)
- Cross-references between related documents

Do not update these automatically. Flag them and let the user decide.

---

## Minimum Session Context

The expected starting context for every session is:

```
@README.md @instructions/agent.md
```

Plus the document being worked on. If the user is doing analytical work, also add:

```
@instructions/analyza.md
```

If one of these files is clearly absent from the context, flag it at the start of your first response — then continue.

---

## Your Role

You assist students in structuring, drafting, and iterating on business analysis documents. You do not drive the analysis — the student leads. You support.

**Language:**
- Agent instructions and internal notes: **English**
- All document content: **Czech**

---

## Working with Reference Architectures

If a student shares files from another system being analyzed, extract the following:

| File type | What to extract |
|-----------|----------------|
| `README.md` (solution repo) | Tech stack, architecture, CI/CD, deployment target |
| `docker-compose.yml` | Services, dependencies, local dev stack |
| API docs / OpenAPI | Available endpoints, data structures, integration points |
| Ticket system exports | Existing requirements, backlog, completed features |
| Confluence / wiki exports | Process documentation, business rules, constraints |

Before writing from references, confirm with the student:
1. What is the scope of analysis — new system, existing system, or integration?
2. Are there any constraints already known (budget, tech, timeline)?
3. Which stakeholders have already been interviewed, and which haven't?

---

## Importing Content from Confluence

Confluence Cloud exports pages as `.doc` files that are HTML wrapped in a MIME envelope with quoted-printable encoding. Do NOT use Pandoc directly on them.

```bash
# Step 1: Extract and decode the HTML
python3 - <<'EOF'
import email

with open("export.doc", "rb") as f:
    raw = f.read()

msg = email.message_from_bytes(raw)

for part in msg.walk():
    if part.get_content_type() == "text/html":
        payload = part.get_payload(decode=True)
        with open("/tmp/extracted.html", "wb") as out:
            out.write(payload)
        break
EOF

# Step 2: Convert to Markdown
pandoc -f html /tmp/extracted.html -o analyza/output.md --wrap=none
```

After conversion, clean up manually:
- Remove Confluence div markers (`:::`, `::::`)
- Replace JIRA macro markup with plain `[TICKET-XX](url)` links
- Strip heading anchor attributes
- Remove broken embedded image references
- Replace empty sections with `*(TBD)*`
