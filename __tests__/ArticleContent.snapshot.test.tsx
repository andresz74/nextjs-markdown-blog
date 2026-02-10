import React from 'react';
import { render } from '@testing-library/react';
import ArticleContent from '@/components/ArticleContent';

describe('ArticleContent snapshot', () => {
  it('matches snapshot for simple markdown', () => {
    const markdown = `# Snapshot Test\n\nThis is **bold** and _italic_.`;
    const { container } = render(
      <ArticleContent
        articleContent={markdown}
        loading={false}
        articleTitle="Snapshot Test"
        folder="articles"
        slug="snapshot-test"
      />
    );

    expect(container).toMatchSnapshot();
  });
});
