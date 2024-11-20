import {html} from "npm:htl";

export function link_pr(url, id) {
    return html`<a href="${url}/${id}">${id}</a>`
  }
  