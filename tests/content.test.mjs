import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS } from '../lib/projects.js';
import { JOURNEY } from '../lib/journey.js';
import { LINKS } from '../lib/links.js';

test('project slugs and indices are unique', () => {
  assert.equal(new Set(PROJECTS.map(({ slug }) => slug)).size, PROJECTS.length);
  assert.equal(new Set(PROJECTS.map(({ idx }) => idx)).size, PROJECTS.length);
});

test('every project has portfolio-ready content', () => {
  for (const project of PROJECTS) {
    assert.ok(project.slug && project.title && project.desc && project.short);
    assert.ok(project.tags.length >= 2);
    assert.ok(project.stats.length >= 2);
  }
});

test('journey and contact links are populated', () => {
  assert.ok(JOURNEY.length >= 1);
  assert.match(LINKS.email, /^[^@]+@[^@]+\.[^@]+$/);
  assert.match(LINKS.linkedin, /^https:\/\//);
  assert.match(LINKS.github, /^https:\/\//);
});
