import { html } from "npm:htl";

export function link_pr(url) {
  return (x) => html`<div> ${href(x, url)}`;
}

function href(x, url) {
  return JSON.parse(x).map((pr_id) => html`<a href="${url}/${pr_id}">#${pr_id}</a> `);
}