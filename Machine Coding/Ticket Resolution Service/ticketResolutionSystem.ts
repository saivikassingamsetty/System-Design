// ENUMS
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

enum IssueStatus {
  OPEN = "Open",
  IN_PROGRESS = "In Progress",
  RESOLVED = "Resolved",
}

// HELPER Classes
class Agent {
  id: string;
  name: string;
  email: string;
  history: Ticket[] = [];
  backlog: Ticket[] = [];
  issueTypes: Set<IssueType> = new Set();

  constructor(
    id: string,
    name: string,
    email: string,
    issueTypes: IssueType[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.issueTypes = new Set(issueTypes);
  }
}

class Ticket {
  ticketId: string = "";
  transactionId: string = "";
  issueType: IssueType = IssueType.PAYMENT;
  subject: string = "";
  description: string = "";
  customerEmail: string = "";
  ticketStatus: string = "OPEN";
  resolution: string = "";

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
  }
}

// Strategy Design
interface TicketResolutionStrategy {
  assignIssue(issue: Ticket, agents: Agent[]): Agent;
}

class TicketResolutionBasedOnType implements TicketResolutionStrategy {
  assignIssue(issue: Ticket, agents: Agent[]): Agent {
    for (let agent of agents) {
      if (agent.issueTypes.has(issue.issueType)) {
        return agent;
      }
    }

    return agents?.[0];
  }
}

class TicketResolutionBasedOnBandwidth implements TicketResolutionStrategy {
  assignIssue(issue: Ticket, agents: Agent[]): Agent {
    let mostFreeAgent = agents[0];
    let leastTickets = Infinity;

    for (let agent of agents) {
      if (agent.backlog.length < leastTickets) {
        mostFreeAgent = agent;
        leastTickets = agent.backlog.length;
      }
    }

    return mostFreeAgent;
  }
}

// CLIENT CODE
class TicketResolutionSystem {
  agents: Agent[] = [];
  ticketResolutionStrategy: TicketResolutionStrategy =
    new TicketResolutionBasedOnType();
  tickets: Ticket[] = [];
  ticketMap = new Map<string, Ticket>();

  public createIssue(
    transactionId: string,
    issueType: IssueType,
    subject: string,
    description: string,
    email: string
  ) {
    let ticketId = "I" + this.tickets.length;
    let ticket = new Ticket(
      ticketId,
      transactionId,
      issueType,
      subject,
      description,
      email
    );
    this.tickets.push(ticket);
    this.ticketMap.set(ticketId, ticket);

    console.log(
      `Issue ${ticketId} created against transaction "${transactionId}"`
    );
  }

  public addAgent(
    agentEmail: string,
    agentName: string,
    issueTypes: IssueType[]
  ) {
    let agentId = "A" + this.agents.length;
    let agent = new Agent(agentId, agentName, agentEmail, issueTypes);
    this.agents.push(agent);
    console.log(`Agent ${agentId} created`);
  }

  public assignIssue(issueId: string) {
    let issue = this.ticketMap.get(issueId) as Ticket;
    let agent = this.ticketResolutionStrategy.assignIssue(issue, this.agents);
    agent.backlog.push(issue);
    console.log(`Issue ${issue.ticketId} assigned to agent ${agent.id}`);
  }

  public getIssues(filter: Record<string, string>) {
    let filteredIssues: Ticket[];

    if (filter.email) {
      filteredIssues = this.tickets.filter(
        (ticket: Ticket) => ticket.customerEmail == filter.email
      );
    } else if (filter.type) {
      filteredIssues = this.tickets.filter(
        (ticket: Ticket) => ticket.issueType == filter.type
      );
    } else {
      filteredIssues = this.tickets;
    }

    for (let ticket of filteredIssues) {
      console.log(`${ticket.ticketId}, ${ticket}`);
    }
  }

  public updateIssue(issueId: string, status: IssueStatus, resolution: string) {
    let ticket = this.ticketMap.get(issueId) as Ticket;
    ticket.ticketStatus = status;
    ticket.resolution = resolution;

    console.log(`${ticket.ticketId} updated to ${status}`);
  }

  public resolveIssue(issueId: string, resolution: string) {
    let ticket = this.ticketMap.get(issueId) as Ticket;
    ticket.ticketStatus = IssueStatus.RESOLVED;

    console.log(`${ticket.ticketId} marked ${IssueStatus.RESOLVED}`);
  }

  public viewAgentsWorkHistory() {
    for (let agent of this.agents) {
      console.log(`${agent.id} -> {${agent.history.join(", ")}}`);
    }
  }

  setTicketResolutionStrategy(
    ticketResolutionStrategy: TicketResolutionStrategy
  ) {
    this.ticketResolutionStrategy = ticketResolutionStrategy;
  }
}

// TESTING
const ticketResolutionSystem = new TicketResolutionSystem();

ticketResolutionSystem.createIssue(
  "T1",
  IssueType.PAYMENT,
  "Payment Failed",
  "My payment failed but money is debited",
  "testUser1@test.com"
);

ticketResolutionSystem.createIssue(
  "T2",
  IssueType.MUTUAL_FUND,
  "Payment Failed",
  "Unable to purchase Mutual Fund",
  "testUser2@test.com"
);

ticketResolutionSystem.addAgent("agent1@test.com", "Agent 1", [
  IssueType.PAYMENT,
  IssueType.GOLD,
]);

ticketResolutionSystem.addAgent("agent2@test.com", "Agent 2", [
  IssueType.PAYMENT,
]);

ticketResolutionSystem.assignIssue("I1");
ticketResolutionSystem.assignIssue("I2");

ticketResolutionSystem.getIssues({ email: "testUser2@test.com" });
ticketResolutionSystem.getIssues({ type: "Payment Related" });

ticketResolutionSystem.updateIssue(
  "I3",
  IssueStatus.IN_PROGRESS,
  "Waiting for payment confirmation"
);

ticketResolutionSystem.resolveIssue(
  "I3",
  "PaymentFailed debited amount will get reversed"
);

ticketResolutionSystem.viewAgentsWorkHistory();
