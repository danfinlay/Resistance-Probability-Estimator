var permArr = [], usedChars = [], chorePermutations = [], workshopPermutations=[];
exports.permute = function permute(input) {
    var i, ch;
    for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length == 0) {
            permArr.push(usedChars.slice());
        }
        permute(input);
        input.splice(i, 0, ch);
        usedChars.pop();
    }
    return permArr
};

exports.generate = function generate(playerList, spyCount){
    var raw = permuteRaw(playerList, spyCount);
    var result = [];
    raw.forEach(function(permutation){

        var spies = [];
        for(var i = 0; i < spyCount; i++){
            spies.push(permutation[spyCount]);
        }

        var permutation = {
            odds: spyCount / playerList.length,
            spies: spies
        }
        result.push(permutation);
    })
}

exports.permuteRaw = function permuteRaw(playerList, spyCount){

    var allArrangements = permute(playerList);
    var realArrangements = [];
    allArrangements.forEach(function(arrangement){
        if(!duplicates(arrangement, realArrangements, spyCount)){
            realArrangements.push(arrangement);
        }
    })
    return realArrangements;

}

exports.duplicates = function duplicates(arrangement, existantLists, spyCount){
    var spies = [];
    for(var i = 0; i < spyCount; i++){
        spies.push(arrangement[i]);
    }
    for(var i = 0, listCount = existantLists.length; i < listCount; i++){
        var theseSpies = [];
        for(var i = 0; i < spyCount; i++){
            theseSpies.push(arrangement[i]);
        }
        if(exports.isEqArrays(spies, theseSpies)){
            return true;
        }
    }
    return false;
}

exports.isEqArrays = function isEqArrays(arr1, arr2) {
  if ( arr1.length !== arr2.length ) {
    return false;
  }
  for ( var i = arr1.length; i--; ) {
    if ( !inArray( arr2, arr1[i] ) ) {
      return false;
    }
  }
  return true;
}

function inArray(arr, b){
    for(var i = 0, len = arr.length; i < len; i++){
        if(arr[i] === b){
            return true;
        }
    }
    return false;
}