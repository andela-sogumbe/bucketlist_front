import { BucketlistsPage } from './app.po';

describe('bucketlists App', () => {
  let page: BucketlistsPage;

  beforeEach(() => {
    page = new BucketlistsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
