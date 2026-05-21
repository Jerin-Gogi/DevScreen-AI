export const getDifficultyBadge = function(difficulty){
    if (difficulty === "Easy") return  "badge-success" ;
      if(difficulty == "Medium")  return"badge-warning"; 
      if(difficulty == "Hard") return "badge-error";
      else return "badge-ghost"
}

export const getCount = function(arr, difficulty){
    return arr.reduce((a, c) => {
      if (c.difficulty === difficulty) {
        return (a = a + 1);
      } else {
        return a;
      }
    }, 0);
}