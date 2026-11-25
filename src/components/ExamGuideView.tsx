import React from 'react';
import { COGNITIVE_LEVELS_GUIDE, PAPER2_STRUCTURE, SAGS_EXCLUSIONS } from '../data/topics';
import { RichText } from './RichText';

export const ExamGuideView: React.FC = () => {
  return (
    <div>
      <div className="cat-top">
        <h1 className="cat-h1">Exam guide</h1>
      </div>

      <div className="cat-card">
        <b style={{ display: 'block', marginBottom: 8 }}>
          Paper 2 structure (<mark className="cat-num">150 marks</mark> ·{' '}
          <mark className="cat-num">3 hours</mark>)
        </b>
        <div className="cat-table-wrap">
          <table className="cat-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Focus</th>
                <th style={{ textAlign: 'right' }}>Marks</th>
              </tr>
            </thead>
            <tbody>
              {PAPER2_STRUCTURE.map((row) => (
                <tr key={row.question}>
                  <td>
                    <span className="cat-term-chip">{row.question}</span>
                  </td>
                  <td>
                    <RichText text={row.focus} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <mark className="cat-num">{row.marks}</mark>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="cat-card">
        <b style={{ display: 'block', marginBottom: 6 }}>
          Cognitive levels (<mark className="cat-num">30%</mark> · <mark className="cat-num">40%</mark>{' '}
          · <mark className="cat-num">30%</mark>)
        </b>
        {COGNITIVE_LEVELS_GUIDE.map((lvl, i) => {
          const condCls = i === 0 ? 'cat-cond-high' : i === 1 ? 'cat-cond-mid' : 'cat-cond-low';
          return (
            <div key={lvl.tier} style={{ marginTop: 10 }}>
              <div className="cat-row" style={{ gap: 6 }}>
                <span className={`cat-pill ${condCls}`}>{lvl.tier}</span>
                <mark className="cat-num">{lvl.marks}</mark>
              </div>
              <p className="cat-mut" style={{ margin: '4px 0 2px' }}>
                <b>Command words:</b> {lvl.commandWords}
              </p>
              <p style={{ margin: '2px 0', fontSize: '0.92rem' }}>
                <RichText text={lvl.strategy} />
              </p>
            </div>
          );
        })}
      </div>

      <div className="cat-card">
        <b style={{ display: 'block', marginBottom: 4 }}>Exam technique</b>
        <ul className="cat-list" style={{ fontSize: '0.94rem' }}>
          <li>
            <RichText text="About 1.2 min per mark: 3 hours for 150 marks." />
          </li>
          <li>
            <RichText text="The integrated scenario (Q8–Q9) carries ±50 marks (a third of the paper). Read it twice, underline needs (budget, users, environment), and justify every recommendation." />
          </li>
          <li>
            <RichText text="Never give one-word answers for a 2-mark or 3-mark Explain or Discuss question." />
          </li>
          <li>
            <RichText text="Whole subject (400 marks): Paper 1 Practical (180→100), Paper 2 Theory (150→100), PAT (170→100), SBA (100)." />
          </li>
        </ul>
      </div>

      <div className="cat-card">
        <b style={{ display: 'block', marginBottom: 6 }}>Strict Grade 12 SAGS Scope &amp; Exclusions</b>
        {SAGS_EXCLUSIONS.map((item) => {
          const included = item.status.includes('Examinable');
          return (
            <div
              key={item.item}
              className={included ? 'cat-callout-good' : 'cat-callout-trap'}
              style={{ marginTop: 8 }}
            >
              <div className="cat-row" style={{ gap: 6 }}>
                <span className="cat-term-chip">{item.item}</span>
                <span className={`cat-pill ${included ? 'cat-cond-high' : 'cat-cond-low'}`}>
                  {item.status}
                </span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '0.9rem' }}>
                <RichText text={item.detail} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
