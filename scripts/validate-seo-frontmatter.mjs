#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const SITE_URL = 'https://blog.andreszenteno.com';
const folders = ['articles', 'notes', 'docs'];
const errors = [];
const warnings = [];

const TITLE_MIN = 30;
const TITLE_MAX = 65;
const DESCRIPTION_MIN = 70;
const DESCRIPTION_MAX = 180;

const canonicalSeen = new Map();

const pushError = (message) => errors.push(message);
const pushWarning = (message) => warnings.push(message);

for (const folder of folders) {
	const fullFolderPath = path.join(process.cwd(), folder);
	if (!fs.existsSync(fullFolderPath)) continue;

	const files = fs.readdirSync(fullFolderPath).filter((file) => file.endsWith('.md'));
	for (const file of files) {
		const fullFilePath = path.join(fullFolderPath, file);
		const raw = fs.readFileSync(fullFilePath, 'utf8');
		const frontmatter = matter(raw).data;
		const relPath = `${folder}/${file}`;

		const title = typeof frontmatter.title === 'string' ? frontmatter.title.trim() : '';
		const description = typeof frontmatter.description === 'string' ? frontmatter.description.trim() : '';
		const canonical = typeof frontmatter.canonical_url === 'string' ? frontmatter.canonical_url.trim() : '';
		const slug = file.replace(/\.md$/, '');
		const expectedCanonical = `${SITE_URL}/${folder}/${slug}`;

		if (!title) {
			pushWarning(`${relPath}: missing title`);
		} else if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
			pushWarning(`${relPath}: title length ${title.length} out of recommended range (${TITLE_MIN}-${TITLE_MAX})`);
		}

		if (!description) {
			pushWarning(`${relPath}: missing description`);
		} else if (description.length < DESCRIPTION_MIN || description.length > DESCRIPTION_MAX) {
			pushWarning(`${relPath}: description length ${description.length} out of recommended range (${DESCRIPTION_MIN}-${DESCRIPTION_MAX})`);
		}

		if (!canonical) {
			pushWarning(`${relPath}: missing canonical_url`);
		} else {
			if (!canonical.startsWith('https://')) {
				pushError(`${relPath}: canonical_url must use https`);
			}

			if (!canonical.startsWith(SITE_URL)) {
				pushError(`${relPath}: canonical_url must start with ${SITE_URL}`);
			}

			if (canonical !== expectedCanonical) {
				pushWarning(`${relPath}: canonical_url "${canonical}" should be "${expectedCanonical}"`);
			}

			if (canonicalSeen.has(canonical)) {
				pushError(`${relPath}: duplicate canonical_url also used by ${canonicalSeen.get(canonical)}`);
			} else {
				canonicalSeen.set(canonical, relPath);
			}
		}
	}
}

if (errors.length > 0) {
	console.error('SEO frontmatter validation failed:');
	errors.forEach((error) => console.error(`- ${error}`));
	process.exit(1);
}

if (warnings.length > 0) {
	console.warn('SEO frontmatter validation warnings:');
	warnings.forEach((warning) => console.warn(`- ${warning}`));
}

console.log(`SEO frontmatter validation passed${warnings.length ? ` with ${warnings.length} warnings` : ''}.`);
