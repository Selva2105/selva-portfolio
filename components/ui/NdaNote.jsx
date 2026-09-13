import { LockIcon } from '../icons';

export default function NdaNote() {
  return (
    <div className="nda">
      <LockIcon />
      <p>
        <strong>A note on the interfaces below.</strong> These products ship inside enterprise
        customers under NDA, so I can&apos;t publish real screenshots. Every interface on this page
        is a functional recreation I built in code, matching the real screens I shipped. The
        interactions are real — click them. The data is illustrative.
      </p>
    </div>
  );
}
