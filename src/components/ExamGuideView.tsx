import React from 'react';
import { COGNITIVE_LEVELS_GUIDE, PAPER2_STRUCTURE, SAGS_EXCLUSIONS } from '../data/topics';

export const ExamGuideView: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-5 dark:border-slate-800">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          IEB National Senior Certificate · Subject Assessment Guidelines (SAGS)
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Paper 2 Exam Blueprint &amp; SAGS Scope
        </h1>
      </div>

      {/* Paper 2 Structure Table */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Paper 2 Structure (150 Marks · 3 Hours · ~1.2 min/mark)
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:text-slate-400">
                <th className="py-2.5 pr-4">Section</th>
                <th className="py-2.5 pr-4">SAGS Focus</th>
                <th className="py-2.5 text-right">Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {PAPER2_STRUCTURE.map((row) => (
                <tr key={row.question}>
                  <td className="py-3 pr-4 font-semibold text-slate-900 whitespace-nowrap dark:text-slate-100">
                    {row.question}
                  </td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">{row.focus}</td>
                  <td className="py-3 text-right font-mono font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                    {row.marks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cognitive Levels */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Cognitive Levels &amp; Command Words (30% · 40% · 30%)
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {COGNITIVE_LEVELS_GUIDE.map((lvl) => (
            <article
              key={lvl.tier}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="font-mono text-xs font-semibold tabular-nums text-blue-700 dark:text-blue-400">
                {lvl.marks}
              </p>
              <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-slate-100">{lvl.tier}</h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                <strong className="text-slate-700 dark:text-slate-200">Command words:</strong> {lvl.commandWords}
              </p>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{lvl.strategy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Strict SAGS Scope & Exclusions */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Strict Grade 12 SAGS Scope &amp; Exclusions
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {SAGS_EXCLUSIONS.map((item) => (
            <article
              key={item.item}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{item.status}</p>
              <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-slate-100">{item.item}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Whole Subject Weighting */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Whole Subject Assessment Breakdown (400 Marks)
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
          <li>
            <strong>Paper 1 (Practical):</strong> 3 hours, 180 marks scaled to 100 (File Management 20, Word 50,
            Excel 50, Access 40, HTML 20; ±5 marks).
          </li>
          <li>
            <strong>Paper 2 (Theory):</strong> 3 hours, 150 marks scaled to 100 (tested in this app).
          </li>
          <li>
            <strong>PAT (Practical Assessment Task):</strong> 170 marks scaled to 100 (Presentations are assessed ONLY
            in the PAT).
          </li>
          <li>
            <strong>SBA (School-Based Assessment):</strong> 100 marks across tests, assignments, and prelim exams.
          </li>
        </ul>
      </section>
    </div>
  );
};
