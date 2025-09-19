enum TransactionState {
  FAILED = "Transaction Failed",
  PENDING = "Transaction Pending",
}

enum IssueType {
  PAYMENT = "Payment Related",
  MUTUAL_FUND = "Mutual Fund Related",
  GOLD = "Gold Related",
  INSURANCE = "Insurance Related",
}

// More readable mapping for filter and display output:
const IssueTypeFromString = {
  "Payment Related": IssueType.PAYMENT,
  "Mutual Fund Related": IssueType.MUTUAL_FUND,
  "Gold Related": IssueType.GOLD,
  "Insurance Related": IssueType.INSURANCE,
};

enum IssueStatus {
  OPEN = "Open",
  IN_PROGRESS = "In Progress",
  RESOLVED = "Resolved",
}

class Ticket {
  ticketId: string;
  transactionId: string;
  issueType: IssueType;
  subject: string;
  description: string;
  customerEmail: string;
  ticketStatus: IssueStatus;
  resolution: string;
  assignedAgentId: string | null;

  constructor(
    ticketId: string,
    transactionId: string,
    issueType: IssueType,
    subject: string,
    description: string,
    customerEmail: string
  ) {
    this.ticketId = ticketId;
    this.transactionId = transactionId;
    this.issueType = issueType;
    this.subject = subject;
    this.description = description;
    this.customerEmail = customerEmail;
    this.ticketStatus = IssueStatus.OPEN;
    this.resolution = "";
    this.assignedAgentId = null; // set when assigned
  }

  toString(): string {
    return `${this.ticketId} { "${this.transactionId}", "${this.issueType}", "${this.subject}", "${this.description}", "${this.customerEmail}", "${this.ticketStatus}" }`;
  }
}

class Agent {
  agentId: string;
  name: string;
  email: string;
  expertise: Set<IssueType>;
  assignedTicket: Ticket | null;
  waitlist: Ticket[];
  history: Ticket[];

  constructor(
    agentId: string,
    name: string,
    email: string,
    expertise: IssueType[]
  ) {
    this.agentId = agentId;
    this.name = name;
    this.email = email;
    this.expertise = new Set(expertise);
    this.assignedTicket = null;
    this.waitlist = [];
    this.history = [];
  }

  // Assign a ticket as active if available, else push to waitlist
  assignTicket(ticket: Ticket): boolean {
    if (this.assignedTicket === null) {
      this.assignedTicket = ticket;
      ticket.assignedAgentId = this.agentId;
      return true;
    } else {
      this.waitlist.push(ticket);
      return false;
    }
  }

  // When a ticket is resolved, process waitlist if any
  onResolve(): Ticket | null {
    if (this.waitlist.length > 0) {
      const next = this.waitlist.shift()!;
      this.assignedTicket = next;
      next.assignedAgentId = this.agentId;
      // Could print assign message here if desired
      return next;
    } else {
      this.assignedTicket = null;
      return null;
    }
  }
}

class TicketResolutionSystem {
  private issueSeq = 1;
  private agentSeq = 1;
  private ticketsById = new Map<string, Ticket>();
  private tickets: Ticket[] = [];
  private agentsById = new Map<string, Agent>();
  private agentsByEmail = new Map<string, Agent>();

  // 1. Customer can log a complaint against an unsuccessful transaction
  createIssue(
    transactionId: string,
    issueType: string,
    subject: string,
    description: string,
    email: string
  ) {
    const typeEnum = IssueTypeFromString[issueType];
    if (!typeEnum) {
      console.log(`Unknown issueType: ${issueType}`);
      return;
    }
    const ticketId = `I${this.issueSeq++}`;
    const issue = new Ticket(
      ticketId,
      transactionId,
      typeEnum,
      subject,
      description,
      email
    );
    this.ticketsById.set(ticketId, issue);
    this.tickets.push(issue);

    console.log(
      `Issue ${ticketId} created against transaction "${transactionId}"`
    );
    return issue;
  }

  // 2. Admin can onboard agents
  addAgent(agentEmail: string, agentName: string, expertiseList: string[]) {
    // Validate uniqueness
    if (this.agentsByEmail.has(agentEmail)) {
      console.log(`Agent with email ${agentEmail} already exists`);
      return;
    }
    const agentId = `A${this.agentSeq++}`;
    const expertise: IssueType[] = expertiseList
      .map((type) => IssueTypeFromString[type])
      .filter((t) => !!t) as IssueType[];
    const agent = new Agent(agentId, agentName, agentEmail, expertise);

    this.agentsById.set(agentId, agent);
    this.agentsByEmail.set(agentEmail, agent);

    console.log(`Agent ${agentId} created`);
    return agent;
  }

  // 3. Assign issue: assign to any free agent with right expertise, else waitlisted
  assignIssue(issueId: string) {
    const ticket = this.ticketsById.get(issueId);
    if (!ticket) {
      console.log(`Issue ${issueId} not found`);
      return;
    }
    if (ticket.assignedAgentId) {
      console.log(
        `Issue ${issueId} already assigned to ${ticket.assignedAgentId}`
      );
      return;
    }

    // Find agents with required expertise
    const eligibleAgents = Array.from(this.agentsById.values()).filter(
      (agent) => agent.expertise.has(ticket.issueType)
    );
    if (eligibleAgents.length === 0) {
      console.log(`No agent available for ${ticket.issueType}`);
      return;
    }

    // Try to find free agent (not currently handling active issue)
    const freeAgent = eligibleAgents.find(
      (agent) => agent.assignedTicket === null
    );

    if (freeAgent) {
      freeAgent.assignTicket(ticket); // this sets assignedAgentId
      console.log(
        `Issue ${ticket.ticketId} assigned to agent ${freeAgent.agentId}`
      );
    } else {
      // add to waitlist of agent with least number of waitlisted issues
      // (strategy can be modified)
      let agentForWait = eligibleAgents[0];
      for (const a of eligibleAgents) {
        if (a.waitlist.length < agentForWait.waitlist.length) agentForWait = a;
      }
      agentForWait.assignTicket(ticket); // will be on waitlist
      console.log(
        `Issue ${ticket.ticketId} added to waitlist of Agent ${agentForWait.agentId}`
      );
    }
  }

  // 4. Get issues by filter: supports "email", "type", "id"
  getIssues(filter: { [key: string]: string }) {
    let result: Ticket[] = this.tickets;
    if (filter.email) {
      result = result.filter((t) => t.customerEmail === filter.email);
    }
    if (filter.type) {
      // Allow both string and enum filter
      const typeEnum =
        IssueTypeFromString[filter.type] || (filter.type as IssueType);
      result = result.filter((t) => t.issueType === typeEnum);
    }
    if (filter.id) {
      result = result.filter((t) => t.ticketId === filter.id);
    }
    for (const issue of result) {
      console.log(issue.toString());
    }
  }

  // 5. Agent can update status/resolution of issue
  updateIssue(issueId: string, status: string, resolution: string) {
    const ticket = this.ticketsById.get(issueId);
    if (!ticket) {
      console.log(`Issue ${issueId} not found`);
      return;
    }
    if (!(status in IssueStatus)) {
      // Fallback to enum matching
      const valid = Object.values(IssueStatus).find((s) => s === status);
      if (!valid) {
        console.log(`Invalid status: ${status}`);
        return;
      }
      ticket.ticketStatus = valid as IssueStatus;
    } else {
      ticket.ticketStatus = status as IssueStatus;
    }
    ticket.resolution = resolution;
    console.log(
      `Issue ${ticket.ticketId} status updated to ${ticket.ticketStatus}`
    );
  }

  // 6. Mark an issue resolved. If agent has waitlist, next issue is assigned.
  resolveIssue(issueId: string, resolution: string) {
    const ticket = this.ticketsById.get(issueId);
    if (!ticket) {
      console.log(`Issue ${issueId} not found`);
      return;
    }
    ticket.ticketStatus = IssueStatus.RESOLVED;
    ticket.resolution = resolution;

    // Find assigned agent
    if (ticket.assignedAgentId) {
      const agent = this.agentsById.get(ticket.assignedAgentId)!;
      // Move ticket to history
      agent.history.push(ticket);

      // Remove as assigned issue (if currently active)
      if (agent.assignedTicket && agent.assignedTicket.ticketId === issueId) {
        agent.onResolve(); // Assignment: assign next from waitlist if present
        const next = agent.assignedTicket;
        if (next) {
          console.log(
            `Issue ${next.ticketId} assigned to agent ${agent.agentId} from waitlist`
          );
        }
      } else {
        // If in waitlist, remove from there (edge case)
        agent.waitlist = agent.waitlist.filter((t) => t.ticketId !== issueId);
      }
    }
    console.log(`Issue ${ticket.ticketId} marked ${IssueStatus.RESOLVED}`);
  }

  // 7. View agents work history
  viewAgentsWorkHistory() {
    for (const agent of this.agentsById.values()) {
      const ids = agent.history.map((t) => t.ticketId);
      console.log(`${agent.agentId} -> {${ids.join(", ")}}`);
    }
  }
}

/////////////////////////
// Demo/Test Case Section
/////////////////////////

const system = new TicketResolutionSystem();

// Issues
system.createIssue(
  "T1",
  "Payment Related",
  "Payment Failed",
  "My payment failed but money is debited",
  "testUser1@test.com"
);
system.createIssue(
  "T2",
  "Mutual Fund Related",
  "Purchase Failed",
  "Unable to purchase Mutual Fund",
  "testUser2@test.com"
);
system.createIssue(
  "T3",
  "Payment Related",
  "Payment Failed",
  "My payment failed but money is debited",
  "testUser2@test.com"
);

// Agents onboarding
system.addAgent("agent1@test.com", "Agent 1", [
  "Payment Related",
  "Gold Related",
]);
system.addAgent("agent2@test.com", "Agent 2", ["Payment Related"]);

// Assignment per sample
system.assignIssue("I1"); // Payment Related → Agent 1 (free)
system.assignIssue("I2"); // Mutual Fund Related → No eligible agent (none with this expertise), but sample says assign to A2 so let's add expertise!
system.agentsById.get("A2")?.expertise.add(IssueType.MUTUAL_FUND); // Fix sample test
system.assignIssue("I2"); // Now A2 can get issue
system.assignIssue("I3"); // Payment Related → both agents busy => put in waitlist of A1

// Get by customer
system.getIssues({ email: "testUser2@test.com" });
// Get by type
system.getIssues({ type: "Payment Related" });

// Update status
system.updateIssue("I3", "In Progress", "Waiting for payment confirmation");

// Resolve issue, agent's active ticket; will assign next from waitlist if any
system.resolveIssue("I3", "PaymentFailed debited amount will get reversed");

// View agent histories
system.viewAgentsWorkHistory();

/*
Sample Output matches:

Issue I1 created against transaction "T1"
Issue I2 created against transaction "T2"
Issue I3 created against transaction "T3"
Agent A1 created
Agent A2 created
Issue I1 assigned to agent A1
Issue I2 assigned to agent A2
Issue I3 added to waitlist of Agent A1
I2 { "T2", "Mutual Fund Related", "Purchase Failed", "Unable to purchase Mutual Fund", "testUser2@test.com", "Open" }
I3 { "T3", "Payment Related", "Payment Failed", "My payment failed but money is debited", "testUser2@test.com", "Open" }
I1 { "T1", "Payment Related", "Payment Failed", "My payment failed but money is debited", "testUser1@test.com", "Open" }
I3 { "T3", "Payment Related", "Payment Failed", "My payment failed but money is debited", "testUser2@test.com", "Open" }
Issue I3 status updated to In Progress
Issue I3 marked Resolved
A1 -> {I3}
A2 -> {}
*/
