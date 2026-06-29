import { useNavigate, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { PROBLEMS } from '../data/problems';
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import ProblemDescription from '../components/ProblemDescription';
import CodeEditor from '../components/CodeEditor';
import OutputPanel from '../components/OutputPanel';
import { executeCode } from '../lib/piston';
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

function ProblemPage() {
 
    const {id} = useParams();
    const navigate = useNavigate();

    const [currentProblemId, setcurrentProblemId] = useState("two-sum"); 
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode[selectedLanguage]);
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] =  useState(false);

    const currentProblem = PROBLEMS[currentProblemId];
    
    useEffect(()=>{
        if(id&& PROBLEMS[id]){
            setcurrentProblemId(id);
            setCode(PROBLEMS[id].starterCode[selectedLanguage.toLowerCase()]);
            setOutput(null);
        }
    },[id,selectedLanguage]);

    const handleLanguageChange = function(language){
        console.log(language);
        setSelectedLanguage(language);
        setCode(PROBLEMS[id].starterCode[selectedLanguage.toLowerCase()]);
        setOutput(null);
    }
    const handleProblemChange = function(id){
        navigate(`/problem/${id}`);
    }
    const normalizeOutput = function (output) {
      // normalize output for comparison (trim whitespace, handle different spacing)
      return output
        .trim()
        .split("\n")
        .map((line) =>
          line
            .trim()
            // remove spaces after [ and before ]
            .replace(/\[\s+/g, "[")
            .replace(/\s+\]/g, "]")
            // normalize spaces around commas to single space after comma
            .replace(/\s*,\s*/g, ","),
        )
        .filter((line) => line.length > 0)
        .join("\n");
    };
    const checkTestsPassed = function (actualOutput, expectedOutput) {
      const normalizedActualOutput = normalizeOutput(actualOutput);
      const normalizedExpectedOutput = normalizeOutput(expectedOutput);
      return normalizedActualOutput === normalizedExpectedOutput;
    };
    const handleExecuteCode = async function(){
        setIsRunning(true);
        const response = await executeCode(selectedLanguage.toLowerCase(), code);
        setOutput(response);
        setIsRunning(false);

        if(response.sucess){
          const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
          const isTestsPassed = checkTestsPassed(response.output, expectedOutput);

          if(isTestsPassed){
             toast.success("All tests passed!");
             showConfetti();
          }
          else{
            toast.error("Tests failed, check output");
          }
        }else{
          toast.error("Code execution failed");
        }
    }
    
    
    const showConfetti = function(){
      var end = Date.now() + 15 * 100;

      // go Buckeyes!
      var colors = ["#bb0000", "#ffffff"];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
    



  return (
    <>
      <div className="h-screen w-full bg-base-100 flex flex-col">
        <Navbar />
        <div className="flex-1">
          <PanelGroup direction="horizontal">
            <Panel defaultSize={40} minSize={30}>
              <ProblemDescription
                problem={currentProblem}
                problemId={currentProblemId}
                onProblemChange={handleProblemChange}
                allProblems={Object.values(PROBLEMS)}
              />
            </Panel>
            <PanelResizeHandle className="w-2 bg-base-200 hover:bg-primary transition-colors cursor-col-resize" />
            <Panel defaultSize={60} minSize={30}>
              <PanelGroup direction="vertical">
                <Panel defaultSize={70} minSize={30}>
                  <CodeEditor
                    language={selectedLanguage.toLocaleLowerCase()}
                    code={code}
                    isRunning={isRunning}
                    onLanguageChange={handleLanguageChange}
                    onCodeChange={setCode}
                    onRunCode={handleExecuteCode}
                  />
                </Panel>
                <PanelResizeHandle className="h-2 bg-base-200 hover:bg-primary transition-colors cursor-row-resize" />
                <Panel defaultSize={30} minSize={30}>
                  <OutputPanel output={output}/>
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </>
  );
}

export default ProblemPage
