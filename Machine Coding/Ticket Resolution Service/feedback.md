# Machine Coding Review: Customer Issue Resolution System

## Strengths

- **Structured OOP Design**

  - Used classes (Agent, Ticket), enums for types/status
  - Code is readable and maintainable

- **Extensible Assignment Logic**

  - Used strategy pattern for agent allocation
  - Easy to enhance for future business logic

- **Clear API Flow**
  - Functions match business process in the prompt
  - Test/demo examples included

## Suggestions & Gaps

### Core Functionalities

- **Agent Assignment**

  - Agents should work on _one_ active issue
  - Overflow tickets must be placed in agent’s _waitlist_

- **Work History**

  - When an issue is resolved, _add it to agent's history_
  - Ensure work history is reflected in view function

- **Issue-Agent Mapping**

  - Each Ticket should store `assignedAgentId` for traceability

- **Assignment after Resolve**

  - When resolving, automatically assign next issue from agent’s waitlist

- **Robust Filtering**

  - Match filters (email, type) correctly using enums (not bare strings)

- **Error Handling**
  - Always check existence of agent/ticket, handle gracefully

### Output & Sample Matching

- **Pretty Output**
  - Implement display method for tickets to match sample output
  - Print according to problem demo for clarity

### Data Structures & Scalability

- Use Maps for agents/tickets for O(1) lookup and scalable design

### Interview Best Practices

- Clarify requirements/edge cases with interviewer before coding
- Mention optimization opportunities (scale, DB storage, sharding, etc.)
- Point out "next steps" if time runs out

### Running TypeScript Code

- **TypeScript needs to be compiled to JavaScript:**
  1. `npm install -g typescript`
  2. `tsc solution.ts`
  3. `node solution.js`
- Or use `ts-node` for direct execution

## Example Golden Patterns

```typescript
class Agent {
  agentId: string;
  expertise: Set<IssueType>;
  activeTicket: Ticket | null;
  waitlist: Ticket[];
  history: Ticket[];
}

class Ticket {
  ticketId: string;
  assignedAgentId: string | null;
}
```

## Summary Checklist

- [ ] Agent handles at most 1 active issue, waitlist for rest
- [ ] Ticket tracks its assigned agent
- [ ] Issue added to agent's history when resolved
- [ ] Filtering and output match sample
- [ ] Error handling present in all methods
- [ ] Compiled/run TypeScript properly
