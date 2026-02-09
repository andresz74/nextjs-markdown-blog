#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const folders = ['articles', 'notes', 'docs'];
const requiredFields = ['title', 'date', 'description'];

const errors = [];

const isValidDate = (value) => {
	if (value instanceof Date) return !Number.isNaN(value.getTime());
	if (typeof value !== 'string') return false;
	const normalized = value.replace(/\s\([^)]+\)$/, '');
	const parsed = new Date(normalized);
	return !Number.isNaN(parsed.getTime());
};

for (const folder of folders) {
	const fullFolderPath = path.join(process.cwd(), folder);
	if (!fs.existsSync(fullFolderPath)) continue;

	const files = fs.readdirSync(fullFolderPath).filter(file => file.endsWith('.md'));
	for (const file of files) {
		const fullFilePath = path.join(fullFolderPath, file);
		const raw = fs.readFileSync(fullFilePath, 'utf8');
		const frontmatter = matter(raw).data;

		for (const field of requiredFields) {
			if (!frontmatter[field]) {
				errors.push(`${folder}/${file}: missing required field "${field}"`);
			}
		}

		if (frontmatter.date && !isValidDate(frontmatter.date)) {
			errors.push(`${folder}/${file}: invalid "date" value "${frontmatter.date}"`);
		}

		if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
			errors.push(`${folder}/${file}: "tags" must be an array when provided`);
		}
	}
}

if (errors.length > 0) {
	console.error('Content frontmatter validation failed:');
	for (const error of errors) {
		console.error(`- ${error}`);
	}
	process.exit(1);
}

console.log('Content frontmatter validation passed.');
