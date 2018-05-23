const MAXIMUM_PAGE_LIMIT = 2000;

class Book {
  constructor() {
    this.pages = [];
    this.queued = [];
    this.pageRefs = [];
    this.isComplete = false;
    this.estimatedProgress = 0;
  }

  get pageCount() {
    return this.pages.length;
  }

  // arguments: selector : String
  // return: pages : [ Int ]
  // if no matches: []
  pagesForSelector(sel) {
    return this.pagesForTest(page => page.element.querySelector(sel));
  }
  // arguments: testFunc : (element) => bool
  // return: pages : [ Int ]
  // if no matches: []
  pagesForTest(testFunc) {
    return this.pages.filter(pg => testFunc(pg.element)).map(pg => pg.number);
  }

  onComplete(func) {
    if (!this.isComplete) this.queued.push(func);
    else func();
  }

  didAddPage() {
    this.validate();
    this.updatePageReferences();
  }

  registerPageReference(test, renderUpdate) {
    this.pageRefs.push({ test, renderUpdate });
  }

  updatePageReferences() {
    // querySelector first, then rerender
    const results = this.pageRefs.map(ref => this.pagesForTest(ref.test));
    this.pageRefs.forEach((ref, i) => ref.renderUpdate(results[i]));
  }

  setCompleted() {
    this.isComplete = true;
    this.estimatedProgress = 1;
    this.updatePageReferences();
    this.queued.forEach(func => func());
    this.queued = [];
  }

  validate() {
    if (this.pageCount > MAXIMUM_PAGE_LIMIT) {
      throw Error('Bindery: Maximum page count exceeded. Suspected runaway layout.');
    }
  }
}

export default Book;