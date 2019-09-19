import React, { useState } from 'react';
import { useReleaseHistory } from '../hooks/useReleaseHistory';
import Hero from '../components/hero';
import Layout from '../components/layout';
import ReleaseTable from '../components/release-table';
import ReleaseToggle from '../components/release-toggle';
import ReleaseCards from '../components/release-cards';

export default function DownloadPage(): JSX.Element {
  const releaseHistory = useReleaseHistory().slice(0, 50);
  const [ltsSelected, setLtsSelected] = useState(true);
  const title = 'Download Node.js';
  const description = 'Come get me!';

  const lts = releaseHistory.find((release): boolean => release && release.lts);
  const current = releaseHistory.find(
    (release): boolean => release && !release.lts
  );

  const selectedLine = ltsSelected ? lts : current;

  return (
    <Layout title={title} description={description}>
      <Hero title={title} />
      <article style={{ width: '100%' }} className="article-reader">
        <p>
          Download the Node.js source code, a pre-built installer for your
          platform, or install via package manager.
        </p>
        <ReleaseToggle selected={ltsSelected} onToggle={setLtsSelected} />
        <ReleaseCards line={selectedLine} />
        <ReleaseTable releases={releaseHistory} />
      </article>
    </Layout>
  );
}
