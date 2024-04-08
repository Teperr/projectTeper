'use strict'

var gStats = {
    game: null,
    gameIdx: null,
    homeTeam: null,
    awayTeam: null,
    darw: null,
    profitPerPage:[],

}

function onInit() {
    renderGames()
    refactorArray()


    

}


function renderGames() {
    var gamesFix = refactorArray()
    console.log('gamesFix:', gamesFix)

    // gStats.game = game
    // gStats.homeTeam = game[0].home_team

    var strHtml = gamesFix.map((game, idx) =>


        `
        <li onclick="onclickCardGame(this)" data-idx="${idx}">
            <article class="card-game card${idx} ">
                <p class="game-date"><i class="fa-solid fa-calendar-days"></i>${game[0].commence_time.slice(0, 10)}</p>
                <p class="game-time"><i class="fa-solid fa-clock"></i>${game[0].commence_time.slice(11, 16)}</p>
                <p class="home-team"><i class="fa-solid fa-calendar-days"></i>${game[0].home_team}</p>
                <p>VS</p>
                <p class="away-team"><i class="fa-solid fa-train-subway"></i>${game[0].away_team}</p>
                <p><span>Net Profits:</span><span class="net-profits">${(game[0].outcome_price * game[0].stake).toString().slice(0, 6)}</span><i class="fa-solid fa-hand-holding-dollar"></i></p>

                                   



            </article>
        </li>`

    )

    // var result = (game[0].outcome_price * game[0].stake).toString(); // המרת התוצאה למחרוזת
    // var slicedResult = result.slice(0, 6); // חיתוך של השישה תווים הראשונים


    // console.log('strHtml:', strHtml.join(''))
    document.querySelector('ul').innerHTML = strHtml.join('')

    var sum = sumProfitPerPage()
    document.querySelector('.total-page-profit-stat').innerText = 'Total Profit: ' +  sum.toString().slice(0, 6)
}

// renderStatsGame(game, idx, game[0].home_team)


function onclickCardGame(el) {
    var idx = el.dataset.idx
    var homeTeam = el.querySelector('.home-team').innerText
    var awayTeam = el.querySelector('.away-team').innerText

    console.log('idx:', idx)
    console.log('homeTeam:', homeTeam)
    console.log('awayTeam:', awayTeam)





    renderStatsGame(idx, homeTeam, awayTeam)

}
function renderStatsGame(idxGame, homeTeam, awayTeam) {
    var homeTeam_OutcomeName = getHomeTeam(idxGame, homeTeam, awayTeam)
    var { outcome_name, home_team, outcome_price, stake, bookmaker_title, commence_time } = homeTeam_OutcomeName

    var awayTeam_OutcomeName = getAwayTeam(idxGame, homeTeam, awayTeam)
    var { outcome_name: ATON, away_team, outcome_price: ATOP, stake: ATS, bookmaker_title: ATBT } = awayTeam_OutcomeName

    var drawTeam_OutcomeName = getDraw(idxGame, homeTeam, awayTeam)
    var { outcome_name: DTON, outcome_price: DTOP, stake: DTS, bookmaker_title: DTBT } = drawTeam_OutcomeName

    console.log('homeTeam_OutcomeName:', homeTeam_OutcomeName)
    console.log('awayTeam_OutcomeName :', awayTeam_OutcomeName)
    console.log('drawTeam_OutcomeName:', drawTeam_OutcomeName)

    var game = getGameByinx(idxGame)
    var strHtml = `
    <section class="main-container">
    <div class="date-and-time-header-dialog">
        <p class="date-title"> ${commence_time.slice(0, 10)} </p>
        <div class="title-game">
            <p class="Home Team"> ${outcome_name}</p>
            <p class="Away Team"> VS </p>
            <p class="Away Team">${ATON}</p>
        </div>
        <p class="date-title">${commence_time.slice(11, 16)}</p>
    </div>
   

   

       <tr>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Draw</th>
        </tr>
       <tr>
            <td>${outcome_name}</td>
            <td>${ATON}</td>
            <td>${DTON}</td>
        </tr>
        <tr>
            <td>${outcome_price}</td>
            <td>${ATOP}</td>
            <td>${DTOP}</td>
        </tr>
        <tr>
            <td>${bookmaker_title}</td>
            <td>${ATBT}</td>
            <td>${DTBT}</td>
        </tr>
        <tr>
            <td>${stake.toString().slice(0, 6)}</td>
            <td>${ATS.toString().slice(0, 6)}</td>
            <td>${DTS.toString().slice(0, 6)}</td>
        </tr>
        <tr>
            <td>${(stake * outcome_price).toString().slice(0, 6)}</td>
            <td>${(ATS * ATOP).toString().slice(0, 6)}</td>
            <td>${(DTS * DTOP).toString().slice(0, 6)}</td>
        </tr>
        </section>
    `
    console.log('strHtml:', strHtml)

    document.querySelector('table').innerHTML = strHtml
    document.querySelector('dialog').showModal()





}

function onCloseModal() {
    document.querySelector('dialog').close();
}    













// function renderGames1() {
//     var gamesFix = refactorArray()
//     console.log('gamesFix:', gamesFix)

//     var strHtml = `<li>`

//     gamesFix.map(game => {
//         strHtml += `<article class="card-game">`

//         console.log('game:', game[0].home_team, ' vs ', game[0].away_team)
//         strHtml += `${game[0].home_team}   vs   ${game[0].away_team}`

//         strHtml += `</article>
//         </li>`
//     })

//     // console.log('strHtml:', strHtml)
//     document.querySelector('ul').innerHTML = strHtml
// }