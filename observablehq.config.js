// See https://observablehq.com/framework/config for documentation.
export default {
  // The app’s title; used in the sidebar and webpage titles.
  title: "Dora The Explorer",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    {
      name: "Sections",
      pages: [
        {name: "Pull Requests", path: "/index"},
        {name: "Tests", path: "/index"},
        {name: "Full view", path: "/"}
      ]
    }
  ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: '<link rel="icon" href="assets/logo.png" type="image/png" sizes="32x32">',

  // The path to the source root.
  root: "src",

  // Some additional configuration options and their defaults:
// theme: "dashboard", // try "light", "dark", "slate", etc.
header: `
  <div style="display: flex; flex-grow: 1; align-items: center; justify-content: space-between; white-space: nowrap;">
  <div></div>
  <div style="display: flex; align-items: center; gap: 1rem; font-size: 12px; white-space: nowrap;">
    <a class="hide-if-large" target="_blank" title="GitHub repository" href="https://github.com/BenJoyenConseil/github_insights/">
      <span style="display: flex; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
          <path d="M19.625 5.60534C18.7083 4.03477 17.4649 2.79135 15.8945 1.87479C14.3238 0.958185 12.6091 0.5 10.7492 0.5C8.88947 0.5 7.17422 0.958325 5.60388 1.87479C4.0333 2.7913 2.78997 4.03477 1.87332 5.60534C0.956814 7.17587 0.498535 8.89089 0.498535 10.7504C0.498535 12.984 1.15021 14.9926 2.4539 16.7766C3.75744 18.5607 5.44142 19.7952 7.50571 20.4803C7.746 20.5249 7.92388 20.4936 8.03954 20.387C8.15524 20.2804 8.21302 20.1467 8.21302 19.9868C8.21302 19.9601 8.21073 19.7199 8.20629 19.266C8.20171 18.8122 8.19956 18.4162 8.19956 18.0783L7.89256 18.1315C7.69682 18.1673 7.44989 18.1825 7.15178 18.1782C6.8538 18.174 6.54446 18.1428 6.22419 18.0847C5.90377 18.0272 5.60575 17.8937 5.32988 17.6846C5.05416 17.4755 4.85842 17.2018 4.74272 16.8639L4.60925 16.5568C4.52029 16.3523 4.38023 16.1251 4.18888 15.8761C3.99754 15.6269 3.80405 15.458 3.60831 15.369L3.51486 15.3021C3.45259 15.2577 3.39481 15.204 3.34138 15.1418C3.28799 15.0796 3.24802 15.0173 3.22132 14.955C3.19458 14.8926 3.21674 14.8414 3.28804 14.8012C3.35933 14.761 3.48817 14.7416 3.67512 14.7416L3.94196 14.7814C4.11993 14.8171 4.34007 14.9236 4.60266 15.1017C4.86511 15.2796 5.08085 15.5109 5.24994 15.7956C5.4547 16.1605 5.7014 16.4385 5.99072 16.6299C6.27982 16.8212 6.5713 16.9167 6.86488 16.9167C7.15846 16.9167 7.41203 16.8945 7.62567 16.8502C7.83908 16.8057 8.0393 16.7388 8.22625 16.6499C8.30633 16.0535 8.52437 15.5953 8.88017 15.275C8.37304 15.2217 7.9171 15.1414 7.51212 15.0347C7.10736 14.9278 6.6891 14.7544 6.25761 14.5139C5.82589 14.2738 5.46774 13.9756 5.18309 13.6198C4.89839 13.2639 4.66474 12.7966 4.48247 12.2183C4.3001 11.6399 4.20889 10.9726 4.20889 10.2163C4.20889 9.13941 4.56044 8.22304 5.26341 7.46665C4.93411 6.65705 4.96519 5.74947 5.35676 4.744C5.61482 4.66382 5.9975 4.72399 6.50463 4.92412C7.01186 5.12434 7.38323 5.29587 7.61912 5.43808C7.85502 5.58024 8.04402 5.70071 8.18642 5.79842C9.01411 5.56715 9.86825 5.45149 10.7491 5.45149C11.6299 5.45149 12.4843 5.56715 13.312 5.79842L13.8192 5.47823C14.166 5.26459 14.5756 5.06881 15.0469 4.89083C15.5185 4.71295 15.8791 4.66396 16.1284 4.74414C16.5286 5.74966 16.5643 6.65719 16.2349 7.46679C16.9378 8.22318 17.2895 9.13978 17.2895 10.2164C17.2895 10.9727 17.198 11.6421 17.0159 12.225C16.8336 12.808 16.5979 13.2749 16.3088 13.6265C16.0194 13.9781 15.659 14.274 15.2275 14.5141C14.7959 14.7544 14.3775 14.9278 13.9728 15.0347C13.5678 15.1415 13.1119 15.2219 12.6047 15.2752C13.0673 15.6755 13.2986 16.3073 13.2986 17.1704V19.9864C13.2986 20.1464 13.3542 20.2799 13.4656 20.3867C13.5768 20.4932 13.7524 20.5246 13.9927 20.4799C16.0573 19.7949 17.7413 18.5603 19.0448 16.7762C20.3481 14.9922 21 12.9837 21 10.75C20.9996 8.89075 20.541 7.17587 19.625 5.60534Z" fill="currentColor" />
        </svg>
      </span>
    </a>
  </div>`,
  footer: `Github insights`,
  sidebar: true, // whether to show the sidebar
  toc: true, // whether to show the table of contents
  pager: true, // whether to show previous & next links in the footer
  output: "dist", // path to the output root for build
  // search: true, // activate search
  linkify: true, // convert URLs in Markdown to links
  typographer: false, // smart quotes and other typographic improvements
  cleanUrls: true, // drop .html from URLs
};
