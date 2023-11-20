import $ from 'jquery';
import {parseIssueHref} from '../utils.js';
import {svg} from '../svg.js';

const {appSubUrl} = window.config;

export function initInlineIssueText() {
  const refIssues = $('.ref-issue');
  replaceRefIssueText(refIssues);
}

export function replaceRefIssueText(refIssues) {
  for (const refIssue of refIssues) {
    if (refIssue.classList.contains("ref-external-issue")) {
      return;
    }

    const { owner, repo, index } = parseIssueHref(refIssue.getAttribute("href"));
    if (!(owner && repo && index)) {
      return;
    }

    $.get(`${appSubUrl}/${owner}/${repo}/issues/${index}/info`).done((issue) => {
      const isOpen = issue.state == "open";
      const name = isOpen ? "octicon-issue-opened" : "octicon-issue-closed";
      const color = isOpen ? "green" : "red";
      refIssue.innerHTML = `${svg(name, 14, "text " + color)}${issue.title}`;
    });
  }
}
