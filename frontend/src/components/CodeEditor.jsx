import React from "react";
import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";
function CodeEditor({
  language,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  return (
    <div className="h-full bg-base-300 flex flex-col">
      <div className="flex items-center justify-between bg-base-100 px-4 py-3 border-t border-base-300">
        <div className="flex items-center gap-3">
          <img
            src={LANGUAGE_CONFIG[language].icon}
            alt={LANGUAGE_CONFIG[language].name}
            className="size-6"
          />
          <select
            className="select select-sm"
            value={LANGUAGE_CONFIG[language].name}
            onChange={(e) => onLanguageChange(e.target.value)}
          >
            {Object.values(LANGUAGE_CONFIG).map((each, i) => {
              return (
                <option key={i} value={each.name}>
                  {each.name}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="btn btn-primary btn-sm gap-2"
          disabled={isRunning}
          onClick={onRunCode}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Running
            </>
          ) : (
            <>
              <span>Run Code</span>
              <PlayIcon className="size-4" />
            </>
          )}
        </button>
      </div>
      <div className="flex-1">
        <Editor
          height={"100%"}
          language={LANGUAGE_CONFIG[language].monacoLang}
          value={code}
          theme="vs-dark"
          onChange={(v)=>onCodeChange(v)}
          options={{
            fontSize: 14, 
            lineNumbers:"on", 
            minimap:{enabled:true}, 
            automaticLayout: true
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
