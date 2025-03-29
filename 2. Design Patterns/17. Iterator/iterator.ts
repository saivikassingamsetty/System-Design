interface SocialNetwork {
  createFriendsIterator(profileId: string): ProfileIterator;
  createCoworkersIterator(profileId: string): ProfileIterator;
}

class FaceBook implements SocialNetwork {
  createFriendsIterator(profileId: string): ProfileIterator {
    return new FaceBookIterator(this, profileId, "friends");
  }

  createCoworkersIterator(profileId: string): ProfileIterator {
    return new FaceBookIterator(this, profileId, "coworkers");
  }
}

class Linkedin implements SocialNetwork {
  createFriendsIterator(profileId: string): ProfileIterator {
    return new LinkedinIterator(this, profileId, "friends");
  }

  createCoworkersIterator(profileId: string): ProfileIterator {
    return new LinkedinIterator(this, profileId, "coworkers");
  }
}

class Profile {
  constructor(
    private id: string,
    private email: string
  ) {}

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }
}

interface ProfileIterator {
  getNext(): Profile | undefined;
  hasMore(): boolean;
}

class FaceBookIterator implements ProfileIterator {
  private cache: Profile[] = [];
  private currentPos: number = 0;

  constructor(
    private network: SocialNetwork,
    private profileId: string,
    private type: string
  ) {}

  lazyInit() {
    if (!this.cache.length) {
      if (this.type === "friends") {
        this.cache = fetchFaceBookFriends(this.profileId);
      } else if (this.type === "coworkers") {
        this.cache = fetchFaceBookCoworkers(this.profileId);
      }
    }
  }

  getNext(): Profile | undefined {
    this.lazyInit();
    if (this.hasMore()) {
      return this.cache[this.currentPos++];
    }
  }

  hasMore(): boolean {
    return this.currentPos < this.cache.length;
  }
}

class LinkedinIterator implements ProfileIterator {
  private cache: Profile[] = [];
  private currentPos: number = 0;

  constructor(
    private network: SocialNetwork,
    private profileId: string,
    private type: string
  ) {}

  lazyInit() {
    if (!this.cache.length) {
      if (this.type === "friends") {
        this.cache = fetchLinkedinFriends(this.profileId);
      } else if (this.type === "coworkers") {
        this.cache = fetchLinkedinCoworkers(this.profileId);
      }
    }
  }

  getNext(): Profile | undefined {
    this.lazyInit();
    if (this.hasMore()) {
      return this.cache[this.currentPos++];
    }
  }

  hasMore(): boolean {
    return this.currentPos < this.cache.length;
  }
}

class SocialSpammer {
  send(iterator: ProfileIterator) {
    while (iterator.hasMore()) {
      const profile = iterator.getNext();
      if (profile) {
        sendEmail(profile.getEmail());
      }
    }
  }
}

class SpamApplication {
  private network: SocialNetwork = new FaceBook();
  private spammer: SocialSpammer = new SocialSpammer();

  config() {
    if (isWorkingWith("FaceBook")) {
      this.network = new FaceBook();
    } else {
      this.network = new Linkedin();
    }
  }

  spamFriends(profile: Profile) {
    const iterator = this.network.createFriendsIterator(profile.getId());
    this.spammer.send(iterator);
  }

  spamCoworkers(profile: Profile) {
    const iterator = this.network.createCoworkersIterator(profile.getId());
    this.spammer.send(iterator);
  }
}

// Util functions for simulated data fetching and emailing
function fetchFaceBookFriends(profileId: string): Profile[] {
  console.log(`Fetching FaceBook friends for ${profileId}`);
  return [
    new Profile("fb_id_1", "friend1@facebook.com"),
    new Profile("fb_id_2", "friend2@facebook.com"),
  ];
}

function fetchFaceBookCoworkers(profileId: string): Profile[] {
  console.log(`Fetching FaceBook coworkers for ${profileId}`);
  return [
    new Profile("fb_id_3", "coworker1@facebook.com"),
    new Profile("fb_id_4", "coworker2@facebook.com"),
  ];
}

function fetchLinkedinFriends(profileId: string): Profile[] {
  console.log(`Fetching LinkedIn friends for ${profileId}`);
  return [
    new Profile("linkedin_id_1", "friend1@linkedin.com"),
    new Profile("linkedin_id_2", "friend2@linkedin.com"),
  ];
}

function fetchLinkedinCoworkers(profileId: string): Profile[] {
  console.log(`Fetching LinkedIn coworkers for ${profileId}`);
  return [
    new Profile("linkedin_id_3", "coworker1@linkedin.com"),
    new Profile("linkedin_id_4", "coworker2@linkedin.com"),
  ];
}

function sendEmail(email: string) {
  console.log(`Sending email to: ${email}`);
}

function isWorkingWith(platformName: string): boolean {
  return platformName === "FaceBook"; // Example logic
}

// Example to run the Spam Application
const profile = new Profile("test_id", "test@example.com");
const app = new SpamApplication();
app.config();
app.spamFriends(profile);
app.spamCoworkers(profile);
