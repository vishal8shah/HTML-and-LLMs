# Enterprise HTML Effectiveness

A static collection of self-contained HTML artifacts for enterprise-focused work
created with LLMs. Each page embeds its CSS and JavaScript, opens directly in the
browser, uses no framework, no backend, and no build step.

The site is designed to support an AI guild presentation and public sharing from
[vishalshah.app](https://vishalshah.app). It demonstrates how HTML can turn AI-assisted
output into browser-native artifacts that people can inspect, interact with, present,
and export. The visual direction is dark-first and aligned with
[vishalshah.app](https://vishalshah.app), with a persistent light/dark toggle.

## Attribution

Inspired by [Thariq's original HTML effectiveness examples](https://thariqs.github.io/html-effectiveness/).
This repository uses original enterprise scenarios, original copy, original styling,
and fictional sample data.

## What is included

- `index.html` - the public showcase page with inline CSS and inline JavaScript.
- `samples/` - twelve self-contained browser-native artifacts. Each sample is a
  `.html` file with inline CSS and inline JavaScript.
- `assets/social-preview.html` - editable source for the social preview image.
- `assets/social-preview.png` - Open Graph/Twitter preview image used by metadata.

There are no runtime external CSS or JavaScript dependencies for the landing page
or demos. The `assets/` folder remains only for the social preview files.

## Enterprise lenses

Business user samples:

- Decision brief explorer
- Meeting action tracker
- Policy/process navigator
- CSV triage workspace
- Risk acceptance brief
- Customer conversation simulator

Engineering samples:

- Architecture decision record
- Change-impact map
- Pull request reviewer aid
- Incident timeline
- Control evidence pack
- Feature-flag risk editor

## Credibility boundaries

These samples are public-safe demonstrations. They do not claim to provide:

- production approval
- compliance attestation
- real customer or enterprise data access
- governed identity, authorization, audit logging, or retention
- backend integration
- AI quality assurance

Every claim should either be visible in the demo or supported by public references
such as WHATWG HTML, MDN Web Docs, W3C WCAG, or OWASP guidance.

## Local preview

Open `index.html` or any file under `samples/` directly in a browser. A static
server is optional and useful when checking the GitHub Pages path:

```powershell
python -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```

## GitHub Pages

This repository is intended to publish from the `main` branch and repository root.

In GitHub:

1. Go to repository Settings.
2. Open Pages.
3. Choose "Deploy from a branch".
4. Select `main` and `/root`.
5. Save.

After GitHub Pages is enabled, the expected path is:

```text
vishal8shah.github.io/HTML-and-LLMs/
```
