interface ThirdPartyYTLib {
  listVideos(): void;
  getVidInfo(id: string): void;
  downloadVideo(id: string): void;
}

class ThirdPartyYTClass implements ThirdPartyYTLib {
  listVideos(): void {
    // Send an API request to YouTube.
  }

  getVidInfo(id: string): void {
    // Get metadata about some video.
  }

  downloadVideo(id: string): void {
    // Download a video file from YouTube.
  }
}

class CachedYTClass implements ThirdPartyYTLib {
  private service: ThirdPartyYTClass;
  private videoCache: any;
  private listCache: any;

  constructor(service: ThirdPartyYTClass) {
    this.service = service;
  }

  listVideos(): void {
    //do some operation like logging, checking access etc.
    if (!this.listCache) {
      this.listCache = this.service.listVideos();
    }

    return this.listCache;
  }

  getVidInfo(id: string): void {
    //do some operation like logging, checking access etc.
    if (!this.videoCache) {
      this.videoCache = this.service.getVidInfo(id);
    }

    return this.videoCache;
  }

  downloadVideo(id: string): void {
    //do some operation like logging, checking access etc.
    this.service.downloadVideo(id);
  }
}

class YTManger {
  private service: ThirdPartyYTLib;

  constructor(service: ThirdPartyYTLib) {
    this.service = service;
  }

  renderVideoPage() {
    const id = "some id";
    const info = this.service.getVidInfo(id);
    // Render the video page.
  }

  renderListPanel() {
    const list = this.service.listVideos();
    // Render the list of video thumbnails.
  }

  reactOnUserInput() {
    this.renderVideoPage();
    this.renderListPanel();
  }
}

const aYTService = new ThirdPartyYTClass();
const aYTProxy = new CachedYTClass(aYTService);
const aYTManager = new YTManger(aYTProxy);
aYTManager.reactOnUserInput();
