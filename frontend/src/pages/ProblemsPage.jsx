import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { PROBLEMS } from '../data/problems.js'
import { Link } from 'react-router';
import { ArrowRightIcon, ChevronRightIcon, Code2Icon } from 'lucide-react';
import { getCount, getDifficultyBadge } from '../lib/utils.js';
import { useActiveSessions } from '../hooks/useSessions.js';

function ProblemsPage() {

  const problems = Object.values(PROBLEMS);

  const {data} = useActiveSessions();
  console.log(data);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 flex items-center justify-center flex-col">
        <div className="max-w-6xl px-6 py-12">
          {/*Header */}
          <div className="mb-8 w-full">
            <h1 className="font-bold text-4xl">Practice Problems</h1>
            <p className="text-base-content/70">
              Sharpen your coding skills with these curated problems.
            </p>
          </div>
          {/* Problems List */}
          <div className="space-y-8 w-full">
            {problems.map((each) => {
              return (
                <Link
                  to={`/problem/${each.id}`}
                  key={each.id}
                  className="card bg-base-100 hover:scale-[1.01] transition-transform"
                >
                  <div className="card-body">
                    <div className="flex items-center justify-between gap-4">
                      {/*Left Side */}
                      <div className="flex flex-col">
                        <div className="flex items-center justify-start gap-3">
                          <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Code2Icon className="size-6 text-primary" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-base-content text-xl font-bold flex gap-2 items-center justify-center">
                              {each.title}
                              <div
                                className={`badge ${getDifficultyBadge(each.difficulty)}`}
                              >
                                {each.difficulty}
                              </div>
                            </span>
                            <span className="text-sm text-base-content/70">
                              {each.category}
                            </span>
                          </div>
                        </div>
                        <p className="text-base-content/90 pt-1">
                          {each.description.text}
                        </p>
                      </div>
                      {/* Right Side */}
                      <div className="mb-auto text-primary flex items-center justify-center">
                        <span className="text-sm">Solve</span>
                        <ChevronRightIcon className="size-5 flex items-center mt-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Stats */}
          <div className="mt-12 card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="stats stats-vertical lg:stats-horizontal">
                <div className="stat">
                  <div className="stat-title">Total Problems</div>
                  <div className="stat-value text-primary">
                    {problems.length}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Easy</div>
                  <div className="stat-value text-success">
                    {getCount(problems, "Easy")}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Medium</div>
                  <div className="stat-value text-warning">
                    {getCount(problems, "Medium")}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Hard</div>
                  <div className="stat-value text-error">
                    {getCount(problems,"Hard")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProblemsPage
