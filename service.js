var gGames = df_arbitrage
var gGameFix = null
// console.log('gGames:', gGames)

function getGames() {
    return gGames

}


function getGameFix() {
    return gGameFix

}


function refactorArray() {
    var groupedGames = [];

    // יצירת מערך חדש המקובץ את האובייקטים על פי game_id
    gGames.forEach(function (game) {
        var index = groupedGames.findIndex(function (group) {
            return group[0].game_id === game.game_id;
        });
        if (index === -1) {
            groupedGames.push([game]);
        } else {
            groupedGames[index].push(game);
        }
    });

    // נדפיס את המערך החדש
    // console.log(groupedGames);
    gGameFix = groupedGames

    // console.log('gGameFix:', gGameFix)
    return gGameFix
}


function getGameByinx(idx) {
    // console.log('sss:')
    return gGameFix[idx]


}


// getHomeTeamName()
function getHomeTeam(idxGame, homeTeam, awayTeam) {
    var game = getGameByinx(idxGame)
    return game.find(ops => ops.home_team === homeTeam && ops.outcome_name === homeTeam && ops.outcome_name !== 'Draw')
}

function getAwayTeam(idxGame, homeTeam, awayTeam) {
    var game = getGameByinx(idxGame)
    return game.find(ops => ops.away_team === awayTeam && ops.outcome_name === awayTeam && ops.outcome_name !== 'Draw')
}

function getDraw(idxGame, homeTeam, awayTeam) {
    var game = getGameByinx(idxGame)
    return game.find(ops => ops.outcome_name === 'Draw')
}





function sumProfitPerPage(){
    
    var sum = 0
    var game = refactorArray()
    console.log('game:', game)
    game.forEach(ops => {

        // console.log('ops.outcome_price:', ops[0].outcome_price * ops[0].stake) 
        sum += ops[0].outcome_price * ops[0].stake - 1000
        
        // console.log('sum:', sum)
    }
    )
    // console.log('sum:', sum )
    return sum
}



















// function getHomeTeamDetails(idxGame, homeTeam, awayTeam) {

    
//     return game.find(ops => {
//         if (ops.home_team === homeTeam) {
//             return ops

//         } else if (ops.away_team === awayTeam) {
//             return ops

//         } else if(opx.outcome_name === 'Draw'){
//             return opx
//         }

//     })
//     // return homeTeamDetails
// }

// function getOpsDetails(gamesFix, idxGame, HomeTeamName){
//     var homeTeamDetails = gamesFix.filter(ops => ops.outcome_name === HomeTeamName)
//     return homeTeamDetails
// }


