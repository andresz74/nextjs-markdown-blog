#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const COLLECTIONS = [
	{ folder: 'articles', collection: 'articles' },
	{ folder: 'notes', collection: 'notes' },
];

const args = new Set(process.argv.slice(2));
const isApplyMode = args.has('--apply');
const isDryRun = !isApplyMode || args.has('--dry-run');

const rootDir = process.cwd();

const toDateString = value => {
	if (!value) return '';
	if (value instanceof Date) return value.toISOString();
	if (typeof value === 'string') return value;
	return String(value);
};

const toStringArray = value => {
	if (Array.isArray(value)) {
		return value.filter(item => typeof item === 'string');
	}
	if (typeof value === 'string') return [value];
	return [];
};

const loadMarkdownDocs = () => {
	const docs = [];

	for (const { folder, collection } of COLLECTIONS) {
		const folderPath = path.join(rootDir, folder);
		if (!fs.existsSync(folderPath)) continue;

		const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.md'));
		for (const file of files) {
			const fullPath = path.join(folderPath, file);
			const raw = fs.readFileSync(fullPath, 'utf8');
			const { data, content } = matter(raw);
			const slug = path.basename(file, '.md');

			docs.push({
				collection,
				docId: slug,
				payload: {
					slug,
					author: data.author || '',
					canonical: data.canonical_url || data.canonical || '',
					content,
					date: toDateString(data.date),
					description: data.description || data.bio || '',
					image: data.image || '',
					tags: toStringArray(data.tags),
					title: data.title || '',
				},
			});
		}
	}

	return docs;
};

const getServiceAccount = () => {
	if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
		return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
	}

	const credentialPath =
		process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
		process.env.GOOGLE_APPLICATION_CREDENTIALS ||
		path.join(rootDir, 'serviceAccountKey.json');

	if (!fs.existsSync(credentialPath)) {
		throw new Error(
			`Missing service account key. Set FIREBASE_SERVICE_ACCOUNT_PATH or GOOGLE_APPLICATION_CREDENTIALS (looked for ${credentialPath}).`,
		);
	}

	return JSON.parse(fs.readFileSync(credentialPath, 'utf8'));
};

const sync = async () => {
	const docs = loadMarkdownDocs();
	console.log(`Prepared ${docs.length} markdown document(s) for sync.`);

	if (docs.length === 0) {
		console.log('Nothing to sync.');
		return;
	}

	if (isDryRun) {
		console.log('Dry run mode. Use --apply to write to Firestore.');
		for (const doc of docs) {
			console.log(`- [DRY] ${doc.collection}/${doc.docId}`);
		}
		return;
	}

	const serviceAccount = getServiceAccount();
	const admin = await import('firebase-admin');

	if (admin.apps.length === 0) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
		});
	}

	const db = admin.firestore();

	for (const doc of docs) {
		await db.collection(doc.collection).doc(doc.docId).set(doc.payload, { merge: true });
		console.log(`- [SYNCED] ${doc.collection}/${doc.docId}`);
	}

	console.log('Firestore sync completed.');
};

sync().catch(error => {
	console.error('Sync failed:', error.message);
	process.exit(1);
});
