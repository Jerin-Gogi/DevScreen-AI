
const PISTON_API = "http://localhost:2000/api/v2";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "20.11.1" },
  python: { language: "python", version: "3.12.0" },
  java: { language: "java", version: "15.0.2" },
};

export const executeCode = async function(language, code){
    try {
        const languageConfig = LANGUAGE_VERSIONS[language];
        if(!languageConfig){
            return {
                sucess: false,
                error: `Unsupported Language ${language}`
            }
        }
        const response = await fetch(`${PISTON_API}/execute`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: languageConfig.language,
            version: languageConfig.version,
            files: [
              {
                name: `main.${getFileExtension(languageConfig.language)}`,
                content: code,
              },
            ],
          }),
        });
        

        if(!response.ok){
            return {
                sucess:false, 
                error: `HTTP error ${response.status} `
            }
        }

        const data = await response.json();
        const {output}  = data.run; 
        const { stderr } = data.run || "";

        if(stderr){
            return{
                sucess: false, 
                output, 
                error: stderr
            }
        }
        return {
            sucess: true, 
            output: output || "No output"
        }

    } catch (err) {
        return {
            sucess: false, 
            error: `Error while execution:  ${err.message}`
        }
    }
    
}

const getFileExtension = function(language){
    const extensions = {
        javascript: "js", 
        python: "py", 
        java: "java"
    }
    return extensions[language]|| "txt";
}