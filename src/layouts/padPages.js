const padPages = (pages, makePage) => {
  if (pages.length % 2 !== 0) {
    const pg = makePage();
    pages.push(pg);
  }
  const spacerPage = makePage();
  const spacerPage2 = makePage();
  spacerPage.element.style.visibility = 'hidden';
  spacerPage2.element.style.visibility = 'hidden';
  pages.unshift(spacerPage);
  pages.push(spacerPage2);

  return pages;
};

export default padPages;
