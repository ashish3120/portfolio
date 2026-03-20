---
name: skill-creator
description: "Interactive skill creation tool. Use this skill whenever the user asks to create a new skill, wants to define a reusable workflow, or says something like 'turn this into a skill'. It guides the user through building new skills with an interactive Q&A process."
---

# Skill Creator

This skill helps you collaboratively create new skills with the user in their `.agents/skills` directory. 

At a high level, the process of creating a skill goes like this:
1. **Understand Intent**: Decide what the skill should do and when it should trigger.
2. **Drafting**: Write a draft of the `SKILL.md` file.
3. **Iterate**: Ask the user for feedback and rewrite the skill until they are satisfied.
4. **Finalize**: Save the skill to the `.agents/skills/<skill-name>/` directory.

Your job when using this skill is to guide the user through these stages.

## Step 1: Capture Intent & Interview

Start by understanding the user's intent. The current conversation might already contain a workflow the user wants to capture. If so, extract answers from the conversation history first.

Ask the user these core questions one by one or in a small batch (don't overwhelm them with a massive form):
1. **Goal**: What should this skill enable the AI to do?
2. **Trigger**: When should this skill trigger? What user phrases or contexts should activate it?
3. **Output Format**: What's the expected output format or behavior?
4. **Edge Cases**: Are there any specific edge cases, dependencies, or required context?

*Proactively ask questions about edge cases, input/output formats, example files, success criteria, and dependencies. Wait to write the actual file until you have this information ironed out.*

## Step 2: Write the SKILL.md Draft

Based on the user interview, draft the `SKILL.md` file.

### Skill Anatomy
A standard skill in this environment looks like this:
```
path/to/workspace/.agents/skills/skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter (name, description required)
│   └── Markdown instructions
└── Bundled Resources (optional, e.g., scripts/, references/)
```

### Writing Rules
- **Name**: The skill identifier (lowercase, hyphenated).
- **Description**: When to trigger and what it does. *Crucial*: This is the primary triggering mechanism. Be slightly verbose and specific about *when* to use it.
  * Example of a good description: "Builds a fast dashboard. Make sure to use this skill whenever the user mentions dashboards, data visualization, internal metrics, or wants to display company data."
- **Keep it concise**: Try to keep `SKILL.md` under 500 lines. Use the imperative form for instructions.
- **Provide Examples**: Give examples for arbitrary formats (e.g., commit messages, structure). 

## Step 3: Iterate and Finalize

1. Present the drafted `SKILL.md` (or the core structure) to the user for review.
2. Refine the instructions based on their feedback.
3. Once approved, use the `write_to_file` tool to save the file to `.agents/skills/<skill-name>/SKILL.md`.

*Always communicate clearly and adopt a collaborative tone. The users might be very technical or semi-technical, so adjust your language accordingly based on their prompts.*
