import React from 'react';
import { splitTermAndExplanation, tokenizeRichSegments } from '../utils/textHighlight';

export const RichText: React.FC<{ text: string }> = ({ text }) => {
  const segments = tokenizeRichSegments(text);
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.kind === 'number') {
          return (
            <mark key={i} className="cat-num">
              {seg.value}
            </mark>
          );
        }
        if (seg.kind === 'term') {
          return (
            <span key={i} className="cat-term-inline">
              {seg.value}
            </span>
          );
        }
        return <React.Fragment key={i}>{seg.value}</React.Fragment>;
      })}
    </>
  );
};

export const TermPoint: React.FC<{ text: string }> = ({ text }) => {
  const { term, body } = splitTermAndExplanation(text);
  if (!term) {
    return (
      <span className="cat-expl">
        <RichText text={body} />
      </span>
    );
  }
  return (
    <>
      <span className="cat-term-chip">{term}</span>{' '}
      <span className="cat-expl">
        <RichText text={body} />
      </span>
    </>
  );
};
